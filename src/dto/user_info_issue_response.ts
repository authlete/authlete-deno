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
 * Response from Authlete `/auth/userinfo/issue` API
 */
export class UserInfoIssueResponse
{
    /**
     * The next action the service implementation should take.
     */
    @Transform((value: any) => UserInfoIssueResponse.Action[value])
    public action!: UserInfoIssueResponse.Action;


    /**
     * Entity body of the response to the client.
     */
    public responseContent!: string;
}


export namespace UserInfoIssueResponse
{
    /**
     * The next action that the service implementation should take.
     */
    export enum Action
    {
        /**
         * The request from the service implementation was wrong or an
         * error occurred in Authlete. The service implementation should
         * return `"500 Internal Server Error"` to the client application.
         */
        INTERNAL_SERVER_ERROR,


        /**
         * The request does not contain an access token. The service
         * implementation should return `"400 Bad Request"` to the client
         * application.
         */
        BAD_REQUEST,


        /**
         * The access token does not exist or has expired. The service
         * implementation should return `"401 Unauthorized"` to the
         * client application.
         */
        UNAUTHORIZED,


        /**
         * The access token does not cover the required scopes. To be
         * concrete, the access token does not include the `"openid"`
         * scope. The service implementation should return `"403 Forbidden"`
         * to the client application.
         */
        FORBIDDEN,


        /**
         * The access token was valid and a userinfo response was generated
         * successfully in JSON format. The service implementation
         * should return `"200 OK"` to the client application with the
         * content type `"application/json;charset=UTF-8"`.
         */
        JSON,


        /**
         * The access token was valid and a userinfo response token was
         * generated successfully in JWT format. The service implementation
         * should return `"200 OK"` to the client application with the
         * content type `"application/jwt"`.
         */
        JWT,
    }
}