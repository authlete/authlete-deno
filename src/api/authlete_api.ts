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
import { AuthorizationRequest } from '../dto/authorization_request.ts';
import { AuthorizationResponse } from '../dto/authorization_response.ts';
import { Client } from '../dto/client.ts';
import { ClientListResponse } from '../dto/client_list_response.ts';
import { Service } from '../dto/service.ts';
import { ServiceListResponse } from '../dto/service_list_response.ts';
import { TokenFailRequest } from '../dto/token_fail_request.ts';
import { TokenFailResponse } from '../dto/token_fail_response.ts';
import { TokenIssueRequest } from '../dto/token_issue_request.ts';
import { TokenIssueResponse } from '../dto/token_issue_response.ts';
import { TokenRequest } from '../dto/token_request.ts';
import { TokenResponse } from '../dto/token_response.ts';


/**
 * Authlete API Interface.
 */
export interface AuthleteApi
{
    /**
     * Call `/auth/authorization` API.
     *
     * @param request - A request.
     */
    authorization(request: AuthorizationRequest): Promise<AuthorizationResponse>;


    /**
     * Call `/auth/authorization/issue` API.
     *
     * @param request - A request.
     */
    authorizationIssue(request: AuthorizationIssueRequest): Promise<AuthorizationIssueResponse>;


    /**
     * Call `/auth/authorization/fail` API.
     *
     * @param request - A request.
     */
    authorizationFail(request: AuthorizationFailRequest): Promise<AuthorizationFailResponse>;


    /**
     * Call `/auth/token` API.
     *
     * @param request - A request.
     */
    token(request: TokenRequest):Promise<TokenResponse>;


    /**
     * Call `/auth/token/issue` API.
     *
     * @param request - A request.
     */
    tokenIssue(request: TokenIssueRequest): Promise<TokenIssueResponse>;


    /**
     * Call `/auth/token/fail` API.
     *
     * @param request - A request.
     */
    tokenFail(request: TokenFailRequest): Promise<TokenFailResponse>;


    /**
     * Get information about a service.
     *
     * @param apiKey - The API key of a service.
     */
    getService(apiKey: number): Promise<Service>;


    /**
     * Get list of services.
     *
     * @param start - The start index (inclusive) of the result set.
     *                The default value is 0. Must not be a negative number.
     *
     * @param end - The end index (exclusive) of the result set. The default
     *              value is 5. Must not be a negative number.
     */
    getServiceList(start?: number, end?: number): Promise<ServiceListResponse>


    /**
     * Create a service.
     *
     * @param service A `Service` object representing a new service.
     */
    createService(service: Service): Promise<Service>


    /**
     * Update a service.
     *
     * @param service A `Service` object representing an updated service.
     */
    updateService(service: Service): Promise<Service>


    /**
     * Delete a service.
     *
     * @param apiKey - The API key of a service.
     */
    deleteService(apiKey: number): Promise<void>


    /**
     * Get information about a client application.
     *
     * @param clientId - The client ID of a client application.
     */
    getClient(clientId: number): Promise<Client>


    /**
     * Get list of client applications.
     *
     * @param developer - The developer of client applications. If this
     *                    parameter is specified, client applications
     *                    of the specified developer are returned.
     *                    Otherwise, all the client applications that
     *                    belong to the service are returned.
     *
     * @param start - The start index (inclusive) of the result set.
     *                The default value is 0. Must not be a negative number.
     *
     * @param end - The end index (exclusive) of the result set. The default
     *              value is 5. Must not be a negative number.
     */
    getClientList(developer?: string, start?: number, end?: number): Promise<ClientListResponse>;


    /**
     * Create a client application.
     *
     * @param client A `Client` object representing a new client application.
     */
    createClient(client: Client): Promise<Client>;


    /**
     * Update a client application.
     *
     * @param client A `Client` object representing an updated client application.
     */
    updateClient(client: Client): Promise<Client>;


    /**
     * Delete a client application.
     *
     * @param clientId - The client ID of a client application.
     */
    deleteClient(clientId: number): Promise<void>;
}