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


import { AuthorizationFailRequest } from '../dto/authorization_fail_request.ts';
import { AuthorizationFailResponse } from '../dto/authorization_fail_response.ts';
import { AuthorizationIssueRequest } from '../dto/authorization_issue_request.ts';
import { AuthorizationIssueResponse } from '../dto/authorization_issue_response.ts';
import { Property } from '../dto/property.ts';
import { isNotEmpty, stringfyJson } from '../util/util.ts';
import { badRequest, internalServerError, location, okHtml } from '../web/response_util.ts';
import { BaseApiRequestHandler } from './base_api_request_handler.ts';
import { unknownAction } from './base_handler.ts';
import AfrAction = AuthorizationFailResponse.Action;
import AirAction = AuthorizationIssueResponse.Action;
import Reason = AuthorizationFailRequest.Reason;


/**
 * The base class for request handlers that are used in the implementation
 * of an authorization endpoint.
 */
export abstract class AuthorizationRequestBaseHandler<ArgType>
    extends BaseApiRequestHandler<ArgType>
{
    /**
     * Call Authlete `/api/auth/authorization/issue` API and generate
     * an instance of Deno's standard `Response` class (defined in
     * https://deno.land/std/http/server.ts) according to the value of
     * the `action` parameter in the response from the API.
     *
     * @param ticket
     *         An ticket issued by Authlete `/auth/authorization` API.
     *
     * @param subject
     *         The subject (= unique identifier) of the end-user.
     *
     * @param authTime
     *         The time at which the end-user was authenticated.
     *         The value should be seconds since the Unix epoch (1970-Jan-1).
     *
     * @param acr
     *         The Authentication Context Class Reference performed
     *         for the end-user authentication.
     *
     * @param sub
     *         The value of the "sub" claim which is embedded in an ID
     *         token. If this argument is null, the value of 'subject'
     *         will be used instead.
     *
     * @param claims
     *         The claims about the end-user.
     *
     * @param properties
     *         Arbitrary properties to be associated with an access
     *         token and/or an authorization code.
     *
     * @param scopes
     *         Scopes to be associated with an access token and/or an
     *         authorization code.
     *
     * @returns An HTTP response that should be returned from the
     *          authorization endpoint implementation to the user agent.
     */
    protected async authorizationIssue(
        ticket: string, subject: string, authTime: number, acr: string | null,
        sub: string | null, claims: { [key: string]: any } | null,
        properties: Property[] | null, scopes: string[] | null)
    {
        // Create a request.
        const request = this.createAuthorizationIssueRequest(
            ticket, subject, authTime, acr, sub, claims, properties, scopes)

        // Call Authlete /api/auth/authorization/issue API.
        const response = await this.api.authorizationIssue(request);

        // Dispatch according to the action.
        switch (response.action)
        {
            case AirAction.INTERNAL_SERVER_ERROR:
                // 500 Internal Server Error.
                return internalServerError(response.responseContent);

            case AirAction.BAD_REQUEST:
                // 400 Bad Request.
                return badRequest(response.responseContent);

            case AirAction.LOCATION:
                // 302 Found.
                return location(response.responseContent);

            case AirAction.FORM:
                // 200 OK.
                return okHtml(response.responseContent);

            default:
                // This never happens.
                return unknownAction('/api/auth/authorization/issue');
        }
    }


    private createAuthorizationIssueRequest(
        ticket: string, subject: string, authTime: number, sub: string | null,
        acr: string | null, claims: { [key: string]: any } | null,
        properties: Property[] | null, scopes: string[] | null)
    {
        // A request for Authlete /api/auth/authorization/issue API.
        const request = new AuthorizationIssueRequest();

        // The ticket issued by Authlete /api/auth/authorization API.
        request.ticket = ticket;

        // The end-user's subject.
        request.subject  = subject;

        // The time when the end-user was authenticated.
        request.authTime = authTime;

        // The potentially pairwise subject of the end user.
        if (sub) request.sub = sub;

        // The ACR (Authentication Context Class Reference) of the
        // end-user authentication.
        if (acr) request.acr = acr;

        // The claims of the end-user.
        const stringClaims = stringfyJson(claims);
        if (isNotEmpty(stringClaims)) request.claims = stringClaims!;

        // Extra properties to associate with an access token and/or
        // an authorization code.
        if (properties) request.properties = properties;

        // Scopes to associate with an access token and/or an authorization
        // code. If a non-null value is returned from this.spi.getScopes(),
        // the scope set replaces the scopes that have been specified
        // in the original authorization request.
        if (scopes) request.scopes = scopes;

        return request;
    }


    /**
     * Call Authlete `/api/auth/authorization/fail` API and generate
     * an instance of Deno's standard `Response` class (defined in
     * https://deno.land/std/http/server.ts) according to the value of
     * the `action` parameter in the response from the API.
     *
     * @param ticket
     *         An ticket issued by Authlete `/auth/authorization` API.
     *
     * @param reason
     *         The reason of the failure of the authorization request.
     *
     * @returns An HTTP response that should be returned from the
     *          authorization endpoint implementation to the user agent.
     */
    protected async authorizationFail(ticket: string, reason: Reason)
    {
        // Create a request for Authlete /api/auth/authorization/fail API.
        const request = this.createAuthorizationFailRequest(ticket, reason);

        // Call Authlete /api/auth/authorization/fail API.
        const response = await this.api.authorizationFail(request);

        // Dispatch according to the action.
        switch (response.action)
        {
            case AfrAction.INTERNAL_SERVER_ERROR:
                // 500 Internal Server Error.
                return internalServerError(response.responseContent);

            case AfrAction.BAD_REQUEST:
                // 400 Bad Request.
                return badRequest(response.responseContent);

            case AfrAction.LOCATION:
                // 302 Found.
                return location(response.responseContent);

            case AfrAction.FORM:
                // 200 OK.
                return okHtml(response.responseContent);

            default:
                // This never happens.
                return unknownAction('/api/auth/authorization/fail');
        }
    }


    private createAuthorizationFailRequest(ticket: string, reason: Reason)
    {
        // A request for Authlete /api/auth/authorization/issue API.
        const request = new AuthorizationFailRequest();

        // The ticket issued by Authlete /api/auth/authorization API.
        request.ticket = ticket;

        // The failure reason.
        request.reason = reason;

        return request;
    }
}