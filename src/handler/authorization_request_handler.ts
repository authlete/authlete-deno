// Copyright (C) 2020 Authlete, Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { AuthleteApi } from '../api/authlete_api.ts';
import { AuthorizationFailRequest } from '../dto/authorization_fail_request.ts';
import { AuthorizationIssueRequest } from '../dto/authorization_issue_request.ts';
import { AuthorizationRequest } from '../dto/authorization_request.ts';
import { AuthorizationResponse } from '../dto/authorization_response.ts';
import { AuthorizationRequestHandlerSpi } from '../spi/authorization_request_handler_spi.ts';
import { isEmpty } from '../util/util.ts';
import { normalizeParameters, unknownAction } from '../web/authlete_api_caller.ts';
import { badRequest, form, internalServerError, location } from '../web/response_util.ts';
import { BaseHandler } from './base_handler.ts';
import Action = AuthorizationResponse.Action;
import Reason = AuthorizationFailRequest.Reason;


/**
 * Handler for authorization requests to an [authorization endpoint](
 * https://tools.ietf.org/html/rfc6749#section-3.1) of OAuth 2.0 ([RFC
 * 6749](https://tools.ietf.org/html/rfc6749)).
 *
 * In an implementation of authorization endpoint, call `handle` method
 * and use the response as the response from the endpoint to the client
 * application. `handle` method calls Authlete `/api/auth/authorization`
 * API, receives a response from the API, and dispatches processing
 * according to the `action` parameter in the response.
 */
export class AuthorizationRequestHandler extends BaseHandler<AuthorizationRequestHandler.parametersType>
{
    /**
     * The SPI class for this handler.
     */
    private spi: AuthorizationRequestHandlerSpi;


    /**
     * The constructor.
     *
     * @param api
     *         An Authlete API client.
     *
     * @param spi
     *         An implementation of `AuthorizationDecisionRequestHandlerSpi`
     *         interface.
     */
    public constructor(api: AuthleteApi, spi: AuthorizationRequestHandlerSpi)
    {
        super(api);

        this.spi = spi;
    }


    protected async doHandle(parameters: AuthorizationRequestHandler.parametersType)
    {
        // Call Authlete /api/auth/authorization API.
        const response = await this.callAuthorization(parameters);

        // Dispatch according to the action.
        switch (response.action)
        {
            case Action.INTERNAL_SERVER_ERROR:
                // 500 Internal Server Error.
                return internalServerError(response.responseContent!);

            case Action.BAD_REQUEST:
                // 400 Bad Request.
                return badRequest(response.responseContent!);

            case Action.LOCATION:
                // 302 Found.
                return location(response.responseContent!);

            case Action.FORM:
                // 200 OK.
                return form(response.responseContent!);

            case Action.INTERACTION:
                // Process the authorization request with user interaction.
                return await this.handleInteraction(response);

            case Action.NO_INTERACTION:
                // Process the authorization request without user interaction.
                // The flow reaches here only when the authorization request
                // contained prompt=none.
                return await this.handleNoInteraction(response);

            default:
                // This never happens.
                throw unknownAction('/api/auth/authorization');
        }
    }


    /**
     * Call Authlete `/api/auth/authorization` API.
     */
    private async callAuthorization(parameters: AuthorizationRequestHandler.parametersType)
    {
        // Create a request for Authlete /api/auth/authorization API.
        const request = new AuthorizationRequest();

        // Normalize parameters.
        request.parameters = normalizeParameters(parameters);

        // Call Authlete /api/auth/authorization API.
        return await this.apiCaller.callAuthorization(request);
    }


    /**
     * Handle the case where `action` parameter in a response from
     * Authlete `/api/auth/authorization` API is `INTERACTION`.
     */
    private async handleInteraction(response: AuthorizationResponse)
    {
        return await this.spi.generateAuthorizationPage(response);
    }


    /**
     * Handle the case where `action` parameter in a response from
     * Authlete `/api/auth/authorization` API is `NO_INTERACTION`.
     */
    private async handleNoInteraction(response: AuthorizationResponse)
    {
        // Check 1. End-User Authentication
        await this.noInteractionCheckAuthentication(response);

        // Get the time when the user was authenticated.
        const authTime = this.spi.getUserAuthenticatedAt();

        // Check 2. Max Age
        await this.noInteractionCheckMaxAge(response, authTime);

        // The current subject, i.e. the unique ID assigned by
        // the service to the current user.
        const subject = this.spi.getUserSubject();

        // Get a potentially pairwise subject based on the user and
        // the client.
        const sub = this.spi.getSub();

        // Check 3. Subject
        await this.noInteractionCheckSubject(response, subject);

        // Get the ACR that was satisfied when the current user
        // was authenticated.
        const acr = this.spi.getAcr();

        // Check 4. ACR
        await this.noInteractionCheckAcr(response, acr);

        // Issue
        return await this.noInteractionIssue(response, authTime, subject!, acr, sub);
    }


    private async noInteractionIssue(
        response: AuthorizationResponse, authTime: number, subject: string, acr: string | null,
        sub: string | null)
    {
        // When prompt=none is contained in an authorization request,
        // response.getClaims() returns null. This means that user
        // claims don't have to be collected. In other words, if an
        // authorization request contains prompt=none and requests
        // user claims at the same time, Authlete regards such a
        // request as illegal, because Authlete does not provide any
        // means to pre-configure consent for claims.
        //
        // See the description about prompt=none in "OpenID Connect
        // Core 1.0, 3.1.2.1. Authentication Request" for details.

        return await this.apiCaller.authorizationIssue(
            this.createAuthorizationIssueRequest(response.ticket, subject, authTime, acr, sub)
        );
    }


    private createAuthorizationIssueRequest(
        ticket: string, subject: string, authTime: number, acr: string | null, sub: string | null)
    {
        // Create a request for Authlete /api/auth/authorization/issue
        // API.
        const request = new AuthorizationIssueRequest();

        // Set parameters.
        request.ticket   = ticket;
        request.subject  = subject;
        request.authTime = authTime;

        if (acr) request.acr = acr;
        if (sub) request.sub = sub;

        // Extra properties to associate with an access token and/or
        // an authorization code.
        const properties = this.spi.getProperties();
        if (properties) request.properties = properties;

        // Scopes to associate with an access token and/or an authorization
        // code. If a non-null value is returned from this.spi.getScopes(),
        // the scope set replaces the scopes that have been specified
        // in the original authorization request.
        const scopes = this.spi.getScopes();
        if (scopes) request.scopes = scopes;

        return request;
    }


    /**
     * Check whether an end-user has already logged in or not.
     */
    private async noInteractionCheckAuthentication(response: AuthorizationResponse)
    {
        // If the current user has already been authenticated.
        if (this.spi.isUserAuthenticated())
        {
            // OK.
            return;
        }

        // A user must have logged in.
        throw await this.authorizationFail(response.ticket, Reason.NOT_LOGGED_IN);
    }


    private async noInteractionCheckMaxAge(response: AuthorizationResponse, authTime: number)
    {
        // Get the requested maximum authentication age.
        const maxAge = response.maxAge;

        // No check is needed if no maximum authentication age is requested.
        if (maxAge === 0) return;

        // The time at which the authentication expires.
        const expiresAtMillis = (authTime + maxAge) * 1000;

        // Ensure that the authentication has not expired yet.
        if (Date.now() < expiresAtMillis) return;

        // The maximum authentication age has elapsed.
        throw await this.authorizationFail(response.ticket, Reason.EXCEEDS_MAX_AGE);
    }


    private async noInteractionCheckSubject(response: AuthorizationResponse, subject: string | null)
    {
        // Get the requested subject.
        const requestedSubject = response.subject;

        // No check is needed if no subject is requested.
        if (!requestedSubject) return;

        // Check if the requested subject matches the current user.
        if (requestedSubject === subject) return;

        // The current user is different from the requested subject.
        throw await this.authorizationFail(response.ticket, Reason.DIFFERENT_SUBJECT);
    }


    private async noInteractionCheckAcr(response: AuthorizationResponse, acr: string | null)
    {
        // Get the list of requested ACRs.
        const requestedAcrs = response.acrs;

        // No check is needed if no ACR is requested.
        if (isEmpty(requestedAcrs)) return;

        for (const requestedAcr of requestedAcrs!)
        {
            // Check if the ACR satisfied when the current user was
            // authenticated matches one of the requested ACRs.
            if (requestedAcr === acr) return;
        }

        // If none of the requested ACRs is essential.
        if (!response.acrEssential) return;

        // The authorization request from the client application requests
        // ACR as essential. However, the ACR satisfied when the current
        // user was authenticated does not match any one of the requested
        // ACRs.

        // None of the requested ACRs is satisfied.
        throw await this.authorizationFail(response.ticket, Reason.ACR_NOT_SATISFIED);
    }


    private async authorizationFail(ticket: string, reason: Reason)
    {
        // Create a request for Authlete /api/auth/authorization/fail API.
        const request = new AuthorizationFailRequest();

        // Set parameters.
        request.ticket = ticket;
        request.reason = reason;

        // Call Authlete /api/auth/authorization/fail API and handle
        // the response.
        return await this.apiCaller.authorizationFail(request);
    }
}


export namespace AuthorizationRequestHandler
{
    /**
     * The type of 'parameters' parameter passed to the `handle` method
     * in `AuthorizationRequestHandler`.
     */
    export type parametersType = string | { [key: string]: string } | null;
}