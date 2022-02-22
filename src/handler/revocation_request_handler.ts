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


import { RevocationRequest } from '../dto/revocation_request.ts';
import { RevocationResponse } from '../dto/revocation_response.ts';
import { BasicCredentials } from '../web/basic_credentials.ts';
import { badRequest, internalServerError, okJavascript, unauthorized } from '../web/response_util.ts';
import { BaseApiRequestHandler } from './base_api_request_handler.ts';
import { normalizeParameters, unknownAction } from './base_handler.ts';
import Action = RevocationResponse.Action;


/**
 * The value for `WWW-Authenticate` header on `'401 Unauthorized'`.
 */
const CHALLENGE = 'Basic realm="revocation"';


/**
 * Handler for token revocation requests ([RFC 7009](https://tools.ietf.org/html/rfc7009)).
 *
 * In an implementation of revocation endpoint, call `handle()` method
 * and use the response as the response from the endpoint to the client
 * application. `handle()` method calls Authlete `/api/auth/revocation`
 * API, receives a response from the API, and dispatches processing
 * according to the `action` parameter in the response.
 */
export class RevocationRequestHandler
    extends BaseApiRequestHandler<RevocationRequestHandler.Params>
{
    /**
     * Handle a revocation request ([RFC 7009](https://tools.ietf.org/html/rfc7009)).
     * This method calls Authlete `/api/auth/revocation` API.
     *
     * @param params
     *         Request parameters of a revocation request.
     *
     * @returns An HTTP response that should be returned from the revocation
     *          endpoint implementation to the client application.
     */
    public async handle(params: RevocationRequestHandler.Params)
    {
        // Call Authlete /api/auth/revocation API.
        const response = await this.callRevocation(params);

        // Dispatch according to the action.
        switch (response.action)
        {
            case Action.INVALID_CLIENT:
                // 401 Unauthorized.
                return unauthorized(CHALLENGE, response.responseContent!);

            case Action.INTERNAL_SERVER_ERROR:
                // 500 Internal Server Error.
                return internalServerError(response.responseContent!);

            case Action.BAD_REQUEST:
                // 400 Bad Request.
                return badRequest(response.responseContent!);

            case Action.OK:
                // 200 OK.
                return okJavascript(response.responseContent || '');

            default:
                // This never happens.
                return unknownAction('/api/auth/revocation');
        }
    }


    private async callRevocation(params: RevocationRequestHandler.Params)
    {
        // Create a request for Authlete /api/auth/token API.
        const request = new RevocationRequest();

        // The 'parameters' parameter.
        request.parameters = normalizeParameters(params.parameters);

        // Extract the credentials of the client application from
        // 'Authorization' header.
        const credentials = BasicCredentials.parse(params.authorization);

        // The client ID.
        if (credentials && credentials.userId) request.clientId = credentials.userId;

        // The client secret.
        if (credentials && credentials.password) request.clientSecret = credentials.password;

        // Call Authlete /api/auth/revocation API.
        return this.api.revocation(request);
    }
}


export namespace RevocationRequestHandler
{
    /**
     * Input parameters for the `handle()` method of `RevocationRequestHandler`
     * class.
     */
    export interface Params
    {
        /**
         * The request parameters of a revocation request.
         */
        parameters: { [key: string]: string } | null;


        /**
         * The value of the `Authorization` header in the revocation request.
         * A pair of client ID and client secret is embedded there when
         * the client authentication method is `client_secret_basic`.
         */
        authorization: string | null;
    }
}