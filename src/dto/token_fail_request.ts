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
const { Transform } = ct;


/**
 * Request to Authlete `/auth/token/fail` API.
 */
export class TokenFailRequest
{
    /**
     * The ticket issued by Authlete `/auth/token` API.
     */
    public ticket?: string;


    /**
     * The reason of the failure.
     */
    @Transform((value: any) => TokenFailRequest.Reason[value])
    public reason?: TokenFailRequest.Reason;
}


export namespace TokenFailRequest
{
    /**
     * Failure reasons of token requests.
     */
    export enum Reason
    {
        /**
         * Unknown reason.
         *
         * Using this reason will result in `"error":"server_error"`.
         */
        UNKNOWN,


        /**
         * The resource owner's credentials (`username` and `password`)
         * contained in the token request whose flow is [Resource Owner
         * Password Credentials](http://tools.ietf.org/html/rfc6749#section-4.3)
         * are invalid.
         *
         * Using this reason will result in `"error":"invalid_request"`.
         */
        INVALID_RESOURCE_OWNER_CREDENTIALS,


        /**
         * The requested resource is invalid, missing, unknown, or malformed.
         * See _"Resource Indicators for OAuth 2.0"_ for details.
         *
         * Using this reason will result in `"error":"invalid_target"`.
         */
        INVALID_TARGET,
    }
}