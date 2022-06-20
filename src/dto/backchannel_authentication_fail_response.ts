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
 * Response from Authlete `/backchannel/authentication/fail` API.
 */
export class BackchannelAuthenticationFailResponse extends ApiResponse
{
    /**
     * The next action that the service implementation should take.
     */
    @Transform((value: any) => BackchannelAuthenticationFailResponse.Action[value])
    public action!: BackchannelAuthenticationFailResponse.Action;


    /**
     * The content of the response body of the response to the client
     * application. Its format is always JSON.
     */
    public responseContent!: string;
}


export namespace BackchannelAuthenticationFailResponse
{
    /**
     * The next action that the service implementation should take.
     */
    export enum Action
    {
        /**
         * The implementation of the backchannel authentication endpoint
         * should return a `400 Bad Request` response to the client application.
         */
        BAD_REQUEST,


        /**
         * The implementation of the backchannel authentication endpoint
         * should return a `403 Forbidden` response to the client application.
         *
         * This value is used only when the `reason` request parameter
         * of the API call was `ACCESS_DENIED`.
         */
        FORBIDDEN,


        /**
         * The implementation of the backchannel authentication endpoint
         * should return a `500 Internal Server Error` response to the
         * client application. However, in most cases, commercial implementations
         * prefer to use other HTTP status code than 5xx.
         *
         * This value is used when (1) the `reason` request parameter
         * of the API call was `SERVER_ERROR`, (2) an error occurred on
         * Authlete side, or (3) the request parameters of the API call
         * were wrong.
         */
        INTERNAL_SERVER_ERROR,
    }
}