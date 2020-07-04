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
import { AuthzDetails } from './authz_details.ts';
import { Property } from './property.ts';
const { Type, Transform } = ct;


/**
 * Response from Authlete `/auth/token/issue` API.
 */
export class TokenIssueResponse extends ApiResponse
{
    /**
     * The next action that the service implementation should take.
     */
    @Transform((value: any) => TokenIssueResponse.Action[value])
    public action!: TokenIssueResponse.Action;


    /**
     * The response content which can be used as the entity body of the
     * response returned to the client application.
     */
    public responseContent!: string;


    /**
     * The newly issued access token. This property holds a valid value
     * only when the value of the `action` property is `TokenIssueResponse.Action.OK`.
     *
     * If the service is configured to issue JWT-based access tokens,
     * a JWT-based access token is issued additionally. In the case,
     * the `jwtAccessToken` property holds the JWT-based access token.
     */
    public accessToken?: string;


    /**
     * The date in milliseconds since the Unix epoch (1970-01-01)
     * at which the access token will expire.
     */
    public accessTokenExpiresAt!: number;


    /**
     * The duration of the access token in seconds.
     */
    public accessTokenDuration!: number;


    /**
     * The refresh token. This property holds a valid value only when
     * the `action` property is `TokenIssueResponse.Action.OK` and the
     * service supports the [refresh token](https://tools.ietf.org/html/rfc6749#section-6)
     * flow.
     *
     * If the service's `refreshTokenKept` property is set to `false`,
     * a new refresh token is issued and the old refresh token used in
     * the refresh token flow is invalidated. On the contrary, if the
     * it is set to `true`, the refresh token itself is not refreshed.
     */
    public refreshToken?: string;


    /**
     * The date in milliseconds since the Unix epoch (1970-01-01) at
     * which the refresh token will expire.
     */
    public refreshTokenExpiresAt!: number;


    /**
     * The duration of the refresh token in seconds.
     */
    public refreshTokenDuration!: number;


    /**
     * The client ID.
     */
    public clientId!: number;


    /**
     * The client ID alias.
     *
     * If the client did not have an alias, the value of this property
     * is `undefined`.
     */
    public clientIdAlias?: string;


    /**
     * The flag which indicates whether the client ID alias was used
     * when the token request was made.
     */
    public clientIdAliasUsed!: boolean;


    /**
     * The subject (= resource owner's ID) of the access token.
     */
    public subject?: string;


    /**
     * The scopes covered by the access token.
     */
    public scopes?: string[];


    /**
     * The extra properties associated with the access token. This
     * property is unset when no extra property is associated with the
     * issued access token.
     */
    @Type(() => Property)
    public properties?: Property[];


    /**
     * The newly issued access token in JWT format.
     *
     * If the authorization server is configured to issue JWT-based access
     * tokens (= if the service's `accessTokenSignAlg` is set), a JWT-based
     * access token is issued along with the original random-string one.
     *
     * Regarding the detailed format of the JWT-based access token, see
     * the description of the `Service` class.
     */
    public jwtAccessToken?: string[];


    /**
     * The target resources of the access token.
     *
     * See _"Resource Indicators for OAuth 2.0"_ for details.
     */
    public accessTokenResources?: string[];


    /**
     * The authorization details.
     *
     * This represents the value of the
     * `authorization_details` request parameter which is defined in
     * _"OAuth 2.0 Rich Authorization Requests"_.
     */
    @Type(() => AuthzDetails)
    public authorizationDetails?: AuthzDetails;
}


export namespace TokenIssueResponse
{
    /**
     * The next action that the service implementation should take.
     */
    export enum Action
    {
        /**
         * The request from the service implementation was wrong or an
         * error occurred in Authlete. The service implementation should
         * return `'500 Internal Server Error'` to the client application.
         */
        INTERNAL_SERVER_ERROR,


        /**
         * The authorization request was wrong and the service implementation
         * should notify the client application of the error by `'400
         * Bad Request'`.
         */
        OK,
    }
}