// Copyright (C) 2022 Authlete, Inc.
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


import ct from 'https://cdn.pika.dev/class-transformer@^0.2.3';
import 'https://cdn.pika.dev/reflect-metadata@^0.1.13';
import { ApiResponse } from './api_response.ts';
const { Transform } = ct;


/**
 * Response from Authlete `/backchannel/authentication/issue` API.
 */
export class BackchannelAuthenticationIssueResponse extends ApiResponse
{
    /**
     * The next action that the service implementation should take.
     */
    @Transform((value: any) => BackchannelAuthenticationIssueResponse.Action[value])
    public action!: BackchannelAuthenticationIssueResponse.Action;


    /**
     * The content of the response body of the response to the client
     * application. Its format is JSON.
     *
     * In successful cases, the content contains `auth_req_id`. In error
     * cases, the content contains `error`.
     */
    public responseContent!: string;


    /**
     * The issued authentication request ID. This corresponds to the
     * `auth_req_id` property in the response to the client.
     */
    public authReqId?: string;


    /**
     * The duration of the issued authentication request ID in seconds.
     * This corresponds to the `expires_in` property in the response to
     * the client.
     */
    public expiresIn!: number;


    /**
     * The minimum amount of time in seconds that the client must wait
     * for between polling requests to the token endpoint. This corresponds
     * to the `interval` property in the response to the client.
     *
     * The value of this property has no meaning when the backchannel
     * token delivery mode is `push`.
     */
    public interval!: number;
}


export namespace BackchannelAuthenticationIssueResponse
{
    /**
     * The next action that the service implementation should take.
     */
    export enum Action
    {
        /**
         * The implementation of the backchannel authentication endpoint
         * should return a `200 OK` response to the client application.
         */
        OK,


        /**
         * The implementation of the backchannel authentication endpoint
         * should return a `500 Internal Server Error` response to the
         * client application. However, in most cases, commercial implementations
         * prefer to use other HTTP status code than 5xx.
         */
        INTERNAL_SERVER_ERROR,


        /**
         * The ticket included in the API call is invalid. It does not
         * exist or has expired.
         */
        INVALID_TICKET,
    }
}