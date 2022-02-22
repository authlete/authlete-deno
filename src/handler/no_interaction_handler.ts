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
import { AuthorizationResponse } from '../dto/authorization_response.ts';
import { NoInteractionHandlerSpi } from '../spi/no_interaction_handler_spi.ts';
import { isEmpty } from '../util/util.ts';
import { AuthorizationRequestBaseHandler } from './authorization_request_base_handler.ts';
import { invalidAction } from './base_handler.ts';
import { ClaimCollector } from './claim_collector.ts';
import Action = AuthorizationResponse.Action;
import Reason = AuthorizationFailRequest.Reason;


/**
 * Handler for the case where an authorization request should be processed
 * without user interaction.
 *
 * A response from Authlete `/api/auth/authorization` API contains an
 * `action` response parameter. When the value of the response parameter
 * is `NO_INTERACTION`, the authorization request needs to be processed
 * without user interaction. This class is a handler for the case.
 */
export class NoInteractionHandler
    extends AuthorizationRequestBaseHandler<AuthorizationResponse>
{
    /**
     * The SPI class for this handler.
     */
    private spi: NoInteractionHandlerSpi;


    /**
     * The constructor.
     *
     * @param api
     *         An implementation of `AuthleteApi` interface.
     *
     * @param spi
     *         An implementation of `NoInteractionHandlerSpi` interface.
     */
    public constructor(api: AuthleteApi, spi: NoInteractionHandlerSpi)
    {
        super(api);

        this.spi = spi;
    }


    /**
     * Handle an authorization request without user interaction. This
     * method calls Authlete `/api/auth/authorization/issue` API or
     * `/api/auth/authorization/fail` API.
     *
     * @param response
     *         A response from Authlete `/api/auth/authorization` API.
     *
     * @returns A response from Authlete `/api/auth/authorization` API
     *          An HTTP response that should be returned to the user agent.
     *          If `response.Action` is not `AuthorizationResponse.Action.NO_INTERACTION`,
     *          this method returns an error response of `'500 Internal
     *          Server Error'`
     */
    public async handle(response: AuthorizationResponse)
    {
        // If the value of the "action" parameter in the
        // response from Authlete /api/auth/authorization API
        // is not "NO_INTERACTION".
        if (response.action !== Action.NO_INTERACTION)
        {
            // This handler does not handle other cases than NO_INTERACTION.
            return invalidAction(Action[response.action]);
        }

        // Check 1. End-User Authentication
        if (!this.checkAuthentication())
        {
            // A user must have logged in.
            return this.authorizationFail(response.ticket, Reason.NOT_LOGGED_IN);
        }

        // Get the time (in seconds) when the user was authenticated.
        const authTime = this.spi.getUserAuthenticatedAt();

        // Check 2. Max Age
        if(!this.checkMaxAge(response, authTime))
        {
            // The maximum authentication age has elapsed.
            return this.authorizationFail(response.ticket, Reason.EXCEEDS_MAX_AGE);
        }

        // The current subject, i.e. the unique ID assigned by
        // the service to the current user.
        const subject = this.spi.getUserSubject();

        // Check 3. Subject
        if(!this.checkSubject(response, subject))
        {
            // The current user is different from the requested subject.
            return this.authorizationFail(response.ticket, Reason.DIFFERENT_SUBJECT);
        }

        // Get the ACR that was satisfied when the current user
        // was authenticated.
        const acr = this.spi.getAcr();

        // Check 4. ACR
        if(!this.checkAcr(response, acr))
        {
            // None of the requested ACRs is satisfied.
            return this.authorizationFail(response.ticket, Reason.ACR_NOT_SATISFIED);
        }

        // Issue tokens without user interaction.
        return this.issue(response, subject!, authTime, acr);
    }


    private checkAuthentication()
    {
        return this.spi.isUserAuthenticated();
    }


    private checkMaxAge(response: AuthorizationResponse, authTime: number)
    {
        // Get the requested maximum authentication age (in seconds).
        const maxAge = response.maxAge;

        // No check is needed if no maximum authentication age is requested.
        if (maxAge === 0) return true;

        // The time at which the authentication expires.
        const expiresAtMillis = (authTime + maxAge) * 1000;

        // Ensure that the authentication has not expired yet.
        if (Date.now() < expiresAtMillis) return true;

        // Expired.
        return false;
    }


    private checkSubject(response: AuthorizationResponse, subject: string | null)
    {
        // Get the requested subject.
        const requestedSubject = response.subject;

        // No check is needed if no subject is requested.
        if (!requestedSubject) return true;

        // Check if the requested subject matches the current user.
        return requestedSubject === subject;
    }


    private checkAcr(response: AuthorizationResponse, acr: string | null)
    {
        // Get the list of requested ACRs.
        const requestedAcrs = response.acrs;

        // No check is needed if no ACR is requested.
        if (isEmpty(requestedAcrs)) return true;

        for (const requestedAcr of requestedAcrs!)
        {
            // Check if the ACR satisfied when the current user was
            // authenticated matches one of the requested ACRs.
            if (requestedAcr === acr) return true;
        }

        // If one of the requested ACRs must be satisfied.
        if (response.acrEssential)
        {
            // None of the requested ACRs is satisfied.
            return false;
        }

        // The ACR satisfied when the current user was authenticated
        // does not match any one of the requested ACRs, but the authorization
        // request from the client application did not request ACR as
        // essential. Then, it is OK to return true here.
        return true;
    }


    private async issue(
        response: AuthorizationResponse, subject: string, authTime: number, acr: string | null)
    {
        // The ticket issued by Authlete '/auth/authorization' API.
        const ticket = response.ticket;

        // Get the value of the "sub" claim. This is optional. When 'sub'
        // is null, the value of 'subject' will be used as the value of
        // the "sub" claim.
        const sub = this.spi.getSub();

        // Collect claim values.
        const claims = new ClaimCollector(
            this.spi, subject!, response.claims, response.claimsLocales).collect();

        // Extra properties to associate with an access token and/or
        // an authorization code.
        const properties = this.spi.getProperties();

        // Scopes to associate with an access token and/or an authorization
        // code. If a non-null value is returned from this.spi.getScopes(),
        // the scope set replaces the scopes that have been specified
        // in the original authorization request.
        const scopes = this.spi.getScopes();

        // Call Authlete '/auth/authorization/issue' API.
        return this.authorizationIssue(
            ticket, subject, authTime, sub, acr, claims, properties, scopes);
    }
}