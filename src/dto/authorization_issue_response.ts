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
 * Response from Authlete `/auth/authorization/issue` API.
 */
export class AuthorizationIssueResponse extends ApiResponse
{
    /**
     * The next action that the service implementation should take.
     */
    @Transform((value: any) => AuthorizationIssueResponse.Action[value])
    public action!: AuthorizationIssueResponse.Action;


    /**
     * The response content which can be used as the entity body of the
     * response returned to the client application.
     */
    public responseContent!: string;


    /**
     * An access token is issued when the `response_type` request parameter
     * of the authorization request includes `token`.
     *
     * If the service is configured to issue JWT-based access tokens,
     * a JWT-based access token is issued additionally. In the case,
     * `jwtAccessToken` returns the JWT-based access token.
     */
    public accessToken?: string;


    /**
     * The date in milliseconds since the Unix epoch at which the access
     * token will expire.
     */
    public accessTokenExpiresAt!: number;


    /**
     * The duration of the access token in seconds.
     */
    public accessTokenDuration!: number;


    /**
     * The newly issued ID token. An ID token is issued when the `response_type`
     * request parameter of the authorization request includes `id_token`.
     */
    public idToken?: string;


    /**
     * The newly issued authorization code. An authorization code is
     * issued when the `response_type` request parameter of the authorization
     * request includes `code`.
     */
    public authorizationCode?: string;


    /**
     * The newly issued access token in JWT format.
     *
     * If the authorization server is configured to issue JWT-based access
     * tokens (= if the service's `accessTokenSignAlg` is set), a JWT-based
     * access token is issued along with the original random-string one.
     *
     * For more details about the detailed format of the JWT-based access
     * token, see the description of the `Service` class.
     */
    public jwtAccessToken?: string;
}


export namespace AuthorizationIssueResponse
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


        /**
         * The authorization request was wrong and the service implementation
         * should notify the client application of the error by `'302
         * Found'`.
         */
        LOCATION,


        /**
         * The authorization request was wrong and the service implementation
         * should notify the client application of the error by `'200
         * OK'` with an HTML which triggers redirection by JavaScript.
         *
         * For more details, see [OAuth 2.0 Form Post Response Mode](
         * http://openid.net/specs/oauth-v2-form-post-response-mode-1_0.html).
         */
        FORM,
    }
}