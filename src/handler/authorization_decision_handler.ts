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
import { AuthorizationDecisionHandlerSpi } from '../spi/authorization_decision_handler_spi.ts';
import { isEmpty } from '../util/util.ts';
import { BaseAuthorizationRequestHandler } from './base_authorization_request_handler.ts';
import { ClaimCollector } from './claim_collector.ts';
import Reason = AuthorizationFailRequest.Reason;


/**
 * Handler for end-user's decision on the authorization request.
 *
 * An authorization endpoint returns an authorization page (HTML) to
 * an end-user, and the end-user will select either 'authorize' or 'deny'
 * the authorization request. This class handles the decision and calls
 * Authlete `/api/auth/authorization/issue` API or `/api/auth/authorization/fail`
 * API accordingly.
 */
export class AuthorizationDecisionHandler extends BaseAuthorizationRequestHandler<AuthorizationDecisionHandler.Params>
{
    /**
     * The SPI class for this handler.
     */
    private spi: AuthorizationDecisionHandlerSpi;


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
    public constructor(api: AuthleteApi, spi: AuthorizationDecisionHandlerSpi)
    {
        super(api);

        this.spi = spi;
    }


    public async handle(params: AuthorizationDecisionHandler.Params)
    {
        // If the end-user did not grant authorization to the client
        // application.
        if (!this.spi.isClientAuthorized())
        {
            return await this.authorizationFail(params.ticket, Reason.DENIED);
        }

        // The subject (= unique identifier) of the end-user.
        const subject = this.spi.getUserSubject();

        // If the subject of the end-user is not available (= the end-user
        // is not authenticated).
        if (isEmpty(subject))
        {
            return await this.authorizationFail(params.ticket, Reason.NOT_AUTHENTICATED);
        }

        // Authorize the authorization request.
        // Generate a redirect response containing an authorization code,
        // an access token and/or an ID token. If the original authorization
        // request had response_type=none, no tokens will be contained
        // in the generated response, though.
        return await this.authorize(params, subject!);
    }


    private async authorize(params: AuthorizationDecisionHandler.Params, subject: string)
    {
        // A ticket issued by /api/auth/authorization API.
        const ticket = params.ticket;

        // The time when the end-user was authenticated.
        const authTime = this.spi.getUserAuthenticatedAt()

        // The potentially pairwise subject of the end user.
        const sub = this.spi.getSub();

        // The ACR (Authentication Context Class Reference) of the
        // end-user authentication.
        const acr = this.spi.getAcr();

        // The claims of the end-user.
        const claims = new ClaimCollector(
            this.spi, subject!, params.claimNames, params.claimLocales).collect();

        // Extra properties to associate with an access token and/or
        // an authorization code.
        const properties = this.spi.getProperties();

        // Scopes to associate with an access token and/or an authorization
        // code. If a non-null value is returned from this.spi.getScopes(),
        // the scope set replaces the scopes that have been specified
        // in the original authorization request.
        const scopes = this.spi.getScopes();

        // Call Authlete '/auth/authorization/issue' API.
        return await this.authorizationIssue(
            ticket, subject!, authTime, sub, acr, claims, properties, scopes);
    }
}


export namespace AuthorizationDecisionHandler
{
    /**
     * Input parameters for the 'handle' method of AuthorizationRequestHandler
     * class.
     */
    export class Params
    {
        /**
         * The ticket issued by Authlete `/api/auth/authorization` API.
         */
        public ticket!: string;


        /**
         * The names of requested claims.
         */
        public claimNames?: string[];


        /**
         * The requested claim locales.
         */
        public claimLocales?: string[];


        /**
         * The value of the `id_token` property in the `claims` request
         * parameter.
         */
        public idTokenClaims?: string;


        /**
         * Create a `Params` instance from an instance of `AuthorizationResponse`.
         *
         * @param response
         *         An response from Authlete `/api/auth/authorization`
         *         API.
         */
        public static from(info: AuthorizationResponse)
        {
            const params = new Params();

            params.ticket        = info.ticket;
            params.claimNames    = info.claims;
            params.claimLocales  = info.claimsLocales;
            params.idTokenClaims = info.idTokenClaims;

            return params;
        }
    }
}