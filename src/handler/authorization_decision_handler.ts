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
import { AuthorizationResponse } from '../dto/authorization_response.ts';
import { AuthorizationDecisionHandlerSpi } from '../spi/authorization_decision_handler_spi.ts';
import { isEmpty, isNotEmpty } from '../util/util.ts';
import { WebApplicationException } from '../web/web_application_exception.ts';
import { BaseHandler } from './base_handler.ts';
import Reason = AuthorizationFailRequest.Reason;


/**
 * Normalize the given claim locales.
 */
function normalizeClaimLocales(claimLocales?: string[]): string[] | null
{
    if (isEmpty(claimLocales))
    {
        // OK. No claim locale is specified.
        return null;
    }

    // From 5.2. Claims Languages and Scripts in OpenID Connect Core 1.0
    //
    //     However, since BCP47 language tag values are case insensitive,
    //     implementations SHOULD interpret the language tag values
    //     supplied in a case insensitive manner.

    // A set for duplicate check.
    const set = new Set<string>();

    // The resultant list.
    const list: string[] = [];

    // Loop to drop empty and duplicate claim locales.
    claimLocales!.forEach((claimLocale) => {
        // Skip if the claim locale is empty.
        if (claimLocale.length === 0) return;

        // Skip if the claim locale is a duplicate.
        if (set.has(claimLocale.toLowerCase())) return;

        // Add the claim locale as a known one.
        set.add(claimLocale.toLowerCase());

        // Add the claim locale to the resultant list.
        list.push(claimLocale);
    })

    return list.length > 0 ? list : null;
}


/**
 * Handle an error.
 */
function handleError(e: Error)
{
    if (e instanceof WebApplicationException)
    {
        // Return a response associated to the error if the error is a
        // WebApplicationException.
        return e.response;
    }
    else
    {
        // Rethrow the other type of error.
        throw e;
    }
}


/**
 * Handler for end-user's decision on the authorization request.
 *
 * An authorization endpoint returns an authorization page (HTML) to
 * an end-user, and the end-user will select either 'authorize' or 'deny'
 * the authorization request. This class handles the decision and calls
 * Authlete `/api/auth/authorization/issue` API or `/api/auth/authorization/fail`
 * API accordingly.
 */
export class AuthorizationDecisionHandler extends BaseHandler<AuthorizationDecisionHandler.Params>
{
    /**
     * The SPI class for this handler.
     */
    private spi: AuthorizationDecisionHandlerSpi;


    /**
     * The constructor.
     *
     * @param api - an Authlete API client.
     *
     * @param spi - An implementation of `AuthorizationDecisionRequestHandlerSpi`
     *              interface.
     */
    public constructor(api: AuthleteApi, spi: AuthorizationDecisionHandlerSpi)
    {
        super(api);

        this.spi = spi;
    }


    protected async doHandle(params: AuthorizationDecisionHandler.Params)
    {
        // If the end-user did not grant authorization to the client
        // application.
        if (!this.spi.isClientAuthorized())
        {
            // The end-user denied the authorization request.
            return this.fail(params.ticket, Reason.DENIED);
        }

        // The subject (= unique identifier) of the end-user.
        const subject = this.spi.getUserSubject();

        // If the subject of the end-user is not available.
        if (isEmpty(subject))
        {
            // The end-user is not authenticated.
            return this.fail(params.ticket, Reason.NOT_AUTHENTICATED);
        }

        // Authorize the authorization request.
        return this.authorize(params, subject!);
    }


    private async authorize(params: AuthorizationDecisionHandler.Params, subject: string)
    {
        try
        {
            // Generate a redirect response containing an authorization code,
            // an access token and/or an ID token. If the original authorization
            // request had response_type=none, no tokens will be contained in
            // the generated response, though.
            return await this.apiCaller.authorizationIssue( this.createAuthorizationIssueRequest(params, subject) );
        }
        catch (e)
        {
            return handleError(e);
        }
    }


    private createAuthorizationIssueRequest(params: AuthorizationDecisionHandler.Params, subject: string)
    {
        // Create a request for Authlete /api/auth/authorization/issue API.
        const request = new AuthorizationIssueRequest();

        // A ticket issued by /api/auth/authorization API.
        request.ticket = params.ticket;

        // The subject of the end-user.
        request.subject = subject;

        // The time when the end-user was authenticated.
        request.authTime = this.spi.getUserAuthenticatedAt();

        // The ACR (Authentication Context Class Reference) of the
        // end-user authentication.
        const acr = this.spi.getAcr();
        if (acr) request.acr = acr;

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

        // The claims of the end-user.
        const claims = this.collectClaims(params.claimNames, params.claimLocales);
        if (claims && Object.keys(claims).length > 0) request.setClaims(claims);

        // The potentially pairwise subject of the end user.
        const sub = this.spi.getSub();
        if (sub) request.sub = sub;

        return request;
    }


    /**
     * Collect claims of the end-user.
     */
    private collectClaims(claimNames?: string[], claimLocales?: string[]): { [key: string]: any } | null
    {
        // If no claim is required.
        if (isEmpty(claimNames))
        {
            return null;
        }

        // Drop empty and duplicate entries from claimLocales.
        const normalizedClaimLocales = normalizeClaimLocales(claimLocales);

        // Claim values.
        const claims: { [key: string]: any } = {};

        // For each requested claim.
        claimNames!.forEach((claimName) => {
            // Skip if the claim name is empty.
            if (claimName.length === 0) return;

            // Split the claim name into the name part and the tag part.
            const elements = claimName.split('#', 2);
            const name     = elements[0];
            const tag      = elements[1] || null;

            // Skip if the name part is empty.
            if (name.length === 0) return;

            // Get the claim value of the claim.
            const value = this.getClaim(name, tag, normalizedClaimLocales);

            // Skip if the claim value was not obtained.
            if (value === null) return;

            // Just for an edge case where claimName ends with '#'.
            if (tag === null) claimName = name;

            // Add the pair of the claim name and the claim value.
            claims[claimName] = value;
        });

        return Object.keys(claims).length > 0 ? claims : null;
    }


    private getClaim(name: string, tag: string | null, claimLocales: string[] | null): object | null
    {
        // If a language tag is explicitly appended.
        if (isNotEmpty(tag))
        {
            // Get the claim value of the claim with the specific language tag.
            return this.spi.getUserClaim(name, tag!);
        }

        // If claim locales are not specified by 'claims_locales' request parameter.
        if (isEmpty(claimLocales))
        {
            // Get the claim value of the claim without any language tag.
            return this.spi.getUserClaim(name);
        }

        // For each claim locale. They are ordered by preference.
        for(const claimLocale of claimLocales!)
        {
            // Try to get the claim value with the claim locale.
            const value = this.spi.getUserClaim(name, claimLocale);

            // If the claim value was obtained.
            if (value) return value;
        }

        // The last resort. Try to get the claim value without any language tag.
        return this.spi.getUserClaim(name);
    }


    private async fail(ticket: string, reason: Reason)
    {
        // Create a request for Authlete /api/auth/authorization/fail API.
        const request = new AuthorizationFailRequest();

        // Set parameters.
        request.ticket = ticket;
        request.reason = reason;

        try
        {
            // Generate an error response to indicate that
            // the authorization request failed.
            return (await this.apiCaller.authorizationFail(request)).response;
        }
        catch (e)
        {
            return handleError(e);
        }
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
         * @param response - An response from Authlete `/api/auth/authorization`
         *                   API.
         */
        public static from(info: AuthorizationResponse)
        {
            const params = new Params();

            params.ticket = info.ticket;
            params.claimNames = info.claims;
            params.claimLocales = info.claimsLocales;
            params.idTokenClaims = info.idTokenClaims;

            return params;
        }
    }
}