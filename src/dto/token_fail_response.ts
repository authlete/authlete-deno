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

import ct from 'https://cdn.pika.dev/class-transformer@^0.2.3';
import 'https://cdn.pika.dev/reflect-metadata@^0.1.13';
import { ApiResponse } from './api_response.ts';
const { Transform } = ct;


/**
 * Response from Authlete `/auth/token/fail` API.
 */
export class TokenFailResponse extends ApiResponse
{
    /**
     * The next action that the service implementation should take.
     */
    @Transform((value: any) => TokenFailResponse.Action[value])
    public action!: TokenFailResponse.Action;


    /**
     * The response content which can be used as the entity body of the
     * response returned to the client application.
     */
    public responseContent!: string;
}


export namespace TokenFailResponse
{
    /**
     * The next action that the service implementation should take.
     */
    export enum Action
    {
        /**
         * The request from the service implementation was wrong or
         * an error occurred in Authlete. The service implementation
         * should return `'500 Internal Server Error'` to the client
         * application.
         */
        INTERNAL_SERVER_ERROR,


        /**
         * The authorization request was wrong and the service implementation
         * should notify the client application of the error by `'400
         * Bad Request'`.
         */
        BAD_REQUEST,
    }
}