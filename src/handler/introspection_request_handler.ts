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

import { StandardIntrospectionRequest } from '../dto/standard_introspection_request.ts';
import { StandardIntrospectionResponse } from '../dto/standard_introspection_response.ts';
import { badRequest, internalServerError, ok } from '../web/response_util.ts';
import { BaseApiRequestHandler } from './base_api_request_handler.ts';
import { normalizeParameters, unknownAction } from './base_handler.ts';
import Action = StandardIntrospectionResponse.Action;


/**
 * Handler for token introspection requests ([RFC 7662](
 * https://tools.ietf.org/html/rfc7662)).
 *
 * In an implementation of introspection endpoint, call `handle()` method
 * and use the response as the response from the endpoint to the client
 * application. `handle()` method calls Authlete `/api/auth/introspection/standard`
 * API, receives a response from the API, and dispatches processing according
 * to the `action` parameter in the response.
 */
export class IntrospectionRequestHandler
    extends BaseApiRequestHandler<IntrospectionRequestHandler.parametersType>
{
    /**
     * Handle an introspection request. This method calls Authlete
     * `/api/auth/introspection/standard` API.
     *
     * @param parameters
     *         Request parameters of an introspection request.
     *
     * @returns An HTTP response that should be returned from the introspection
     *          endpoint implementation to the client application.
     */
    public async handle(parameters: IntrospectionRequestHandler.parametersType)
    {
        // Call Authlete /api/auth/introspection/standard API.
        const response = await this.callStandardIntrospection(parameters);

        // Dispatch according to the action.
        switch (response.action)
        {
            case Action.INTERNAL_SERVER_ERROR:
                // 500 Internal Server Error.
                return internalServerError(response.responseContent);

            case Action.BAD_REQUEST:
                // 400 Bad Request.
                return badRequest(response.responseContent);

            case Action.OK:
                // 200 OK.
                return ok(response.responseContent);

            default:
                // This never happens.
                return unknownAction('/api/auth/introspection/standard');
        }
    }


    private async callStandardIntrospection(parameters: IntrospectionRequestHandler.parametersType)
    {
        // Create a request for Authlete /api/auth/introspection/standard API.
        const request = new StandardIntrospectionRequest();

        // 'parameters' parameter.
        request.parameters = normalizeParameters(parameters);

        // Call Authlete /api/auth/introspection/standard API.
        return await this.api.standardIntrospection(request);
    }
}


export namespace IntrospectionRequestHandler
{
    /**
     * The type of 'parameters' parameter passed to the `handle()` method
     * in `IntrospectionRequestHandler` class.
     */
    export type parametersType = { [key: string]: string } | null;
}