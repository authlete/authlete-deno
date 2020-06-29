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

import { Response } from 'https://deno.land/std/http/server.ts';
import { AuthleteApi } from '../api/authlete_api.ts';
import { TokenFailRequest } from '../dto/token_fail_request.ts';
import { TokenIssueRequest } from '../dto/token_issue_request.ts';
import { TokenRequest } from '../dto/token_request.ts';
import { TokenResponse } from '../dto/token_response.ts';
import { TokenRequestHandlerSpi } from '../spi/token_request_handler_spi.ts';
import { normalizeParameters, unknownAction } from '../web/authlete_api_caller.ts';
import { BasicCredentials } from '../web/basic_credentials.ts';
import { badRequest, internalServerError, ok, unauthorized } from '../web/response_util.ts';
import { BaseHandler } from './base_handler.ts';
import Action = TokenResponse.Action;
import Reason = TokenFailRequest.Reason;


/**
 * The value for `WWW-Authenticate` header on `'401 Unauthorized'`.
 */
const CHALLENGE = 'Basic realm="token"';


/**
 * Set up client credentials (client ID and client secret)
 * to the given request.
 */
function setupClientCredentials(request: TokenRequest, authorization: string | null)
{
    // The credentials of the client application extracted from
    // 'Authorization' header. These may be null.
    const credentials: BasicCredentials | null = BasicCredentials.parse(authorization);

    if (!credentials)
    {
        // The credentials of the client application are not given.
        return;
    }

    if (credentials.userId)
    {
        request.clientId = credentials.userId;
    }

    if (credentials.password)
    {
        request.clientSecret = credentials.password;
    }
}

/**
 * Handler for token requests to a [token endpoint](
 * https://tools.ietf.org/html/rfc6749#section-3.2) of OAuth 2.0 ([RFC
 * 6749](https://tools.ietf.org/html/rfc6749)).
 *
 * In an implementation of token endpoint, call one of `handle` method
 * variants and use the response as the response from the endpoint to
 * the client application. `handle` method calls Authlete `/api/auth/token`
 * API, receives a response from the API, and dispatches processing
 * according to the `action` parameter in the response.
 */
export class TokenRequestHandler extends BaseHandler<TokenRequestHandler.Params>
{
    /**
     * The SPI class for this handler.
     */
    private spi: TokenRequestHandlerSpi;


    /**
     * The constructor.
     *
     * @param api - an Authlete API client.
     *
     * @param spi - An implementation of  `TokenRequestHandlerSpi`
     *              interface.
     */
    public constructor(api: AuthleteApi, spi: TokenRequestHandlerSpi)
    {
        super(api);

        this.spi = spi;
    }


    protected async doHandle(params: TokenRequestHandler.Params)
    {
        // Call Authlete /api/auth/token API.
        const response = await this.apiCaller.callToken( this.createTokenRequest(params) );

        // Dispatch according to the action.
        switch (response.action)
        {
            case Action.INVALID_CLIENT:
                // 401 Unauthorized.
                return unauthorized(response.responseContent!, CHALLENGE);

            case Action.INTERNAL_SERVER_ERROR:
                // 500 Internal Server Error.
                return internalServerError(response.responseContent!);

            case Action.BAD_REQUEST:
                // 400 Bad Request.
                return badRequest(response.responseContent!);

            case Action.PASSWORD:
                // Process the token request whose flow is 'Resource Owner Password Credentials'.
                return this.handlePassword(response);

            case Action.OK:
                // 200 OK.
                return ok(response.responseContent!);

            default:
                // This never happens.
                throw unknownAction('/api/auth/token');
        }
    }


    private createTokenRequest(params: TokenRequestHandler.Params)
    {
        // Create a request for Authlete /api/auth/token API.
        const request = new TokenRequest();

        // Set the 'parameters' parameter.
        request.parameters = normalizeParameters(params.parameters);

        // Set up client ID and client secret.
        setupClientCredentials(request, params.authorization);

        // Extra properties to associate with an access token.
        const properties = this.spi.getProperties();
        if (properties) request.properties = properties;

        return request;
    }


    private async handlePassword(response: TokenResponse): Promise<Response>
    {
        // The credentials of the resource owner.
        const username = response.username || null;
        const password = response.password || null;

        // Validate the credentials.
        const subject = this.spi.authenticateUser(username, password);

        if (subject)
        {
            // Issue an access token and optionally an ID token.
            return this.tokenIssue(response.ticket, subject!);
        }
        else
        {
            // The credentials are invalid. An access token is not issued.
            throw this.tokenFail(response.ticket, Reason.INVALID_RESOURCE_OWNER_CREDENTIALS);
        }
    }


    private async tokenIssue(ticket: string, subject: string)
    {
        // Create a request for Authlete /api/auth/token/issue API.
        const request = new TokenIssueRequest();

        // Set parameters.
        request.ticket = ticket;
        request.subject = subject;

        // Extra properties to associate with an access token.
        const properties = this.spi.getProperties();
        if (properties) request.properties = properties;

        // Call Authlete /api/auth/token/issue API.
        return await this.apiCaller.tokenIssue(request);
    }


    private async tokenFail(ticket: string, reason: Reason)
    {
        // Create a request for /api/auth/token/fail API.
        const request = new TokenFailRequest();

        // Set parameters.
        request.ticket = ticket;
        request.reason = reason;

        // Create a response to the client application with the help of
        // Authlete /api/auth/token/fail API.
        return await this.apiCaller.tokenFail(request);
    }
}


export namespace TokenRequestHandler
{
    /**
     * Input parameters for the 'handle' method of TokenRequestHandler
     * class.
     */
    export interface Params
    {
        /**
         * The request parameters of a token request.
         */
        parameters: { [key: string]: string } | null;


        /**
         * The value of the `Authorization` header in the token request.
         * A pair of client ID and client secret is embedded there when
         * the client authentication method is `client_secret_basic`.
         */
        authorization: string | null;


        /**
         * The path of the client's certificate, each in PEM format.
         * The first item in the array is the client's certificate itself.
         *
         * For more details, see [RFC 8705 : OAuth 2.0 Mutual-TLS Client
         * Authentication and Certificate-Bound Access Tokens](
         * https://www.rfc-editor.org/rfc/rfc8705.html).
         */
        clientCertificatePath?: string[];
    }
}