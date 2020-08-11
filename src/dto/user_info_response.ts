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
import { Property } from './property.ts';
const { Type, Transform } = ct;


/**
 * Response from Authlete `/auth/userinfo` API
 */
export class UserInfoResponse extends ApiResponse
{
    /**
     * The next action the service implementation should take.
     */
    @Transform((value: any) => UserInfoResponse.Action[value])
    public action!: UserInfoResponse.Action;


    /**
     * The client ID.
     */
    public clientId!: number;


    /**
     * The subject (= resource owner's ID).
     */
    public subject?: string;


    /**
     * The scopes covered by the access token.
     */
    public scopes?: string[];


    /**
     * The list of claims that the client application requests
     * to be embedded in the userinfo response. The value comes from
     * `scope` and `claims` request parameters of the original
     * authorization request. For more details, see the following links.
     *
     * - [OpenID Connect Core 1.0, 5.4. Requesting Claims using Scope
     * Values](http://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims)
     *
     * - [OpenID Connect Core 1.0, 5.5. Requesting Claims using the "claims"
     * Request Parameter](http://openid.net/specs/openid-connect-core-1_0.html#ClaimsParameter)
     */
    public claims?: string[];


    /**
     * The access token that came along with the userinfo request.
     */
    public token?: string;


    /**
     * Entity body of the response to the client.
     */
    public responseContent?: string;


    /**
     * Extra properties associated with the access token.
     */
    @Type(() => Property)
    public properties?: Property[];


    /**
     * The client ID alias when the authorization request for the access
     * token was made. Note that this value may be different from the
     * current client ID alias.
     */
    public clientIdAlias?: string;


    /**
     * Flag which indicates whether the client ID alias was used
     * when the authorization request for the access token was made.
     */
    public clientIdAliasUsed!: boolean;


    /**
     * The value of the `"userinfo"` property in the `claims` request
     * parameter or in the `"claims"` property in an authorization
     * request object.
     *
     * A client application may request certain claims be embedded in
     * an ID token or in a response from the UserInfo endpoint. There
     * are several ways. Including the `claims` request parameter and
     * including the `"claims"` property in a request object are such examples.
     * In both the cases, the value of the `claims` parameter/property
     * is JSON. Its format is described in [5.5. Requesting Claims using
     * the "claims" Request Parameter](https://openid.net/specs/openid-connect-core-1_0.html#ClaimsParameter)
     * of [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html).
     *
     * The following is an excerpt from the specification. You can find
     * `"userinfo"` and `"id_token"` are top-level properties.
     *
     * ```json
     * {
     *   "userinfo":
     *   {
     *     "given_name": {"essential": true},
     *     "nickname": null,
     *     "email": {"essential": true},
     *     "email_verified": {"essential": true},
     *     "picture": null,
     *     "http://example.info/claims/groups": null
     *   },
     *   "id_token":
     *   {
     *     "auth_time": {"essential": true},
     *     "acr": {"values": ["urn:mace:incommon:iap:silver"] }
     *   }
     * }
     * ```
     *
     * This property has the value of the `"userinfo"` property in JSON
     * format. For example, if the JSON above is included in an authorization
     * request, the value of this property is JSON equivalent to the
     * following.
     *
     * ```json
     * {
     *   "given_name": {"essential": true},
     *   "nickname": null,
     *   "email": {"essential": true},
     *   "email_verified": {"essential": true},
     *   "picture": null,
     *   "http://example.info/claims/groups": null
     * }
     * ```
     *
     * Note that if a request object is given and it contains the `"claims"`
     * property and if the `claims` request parameter is also given, this
     * method returns the value in the former.
     */
    public userInfoClaims?: string;
}


export namespace UserInfoResponse
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
         * The access token is valid. The service implementation should
         * collect information about requested claims and pass the
         * information to Authlete `/auth/userinfo/issue` endpoint in
         * order to make Authlete generate an ID token.
         */
        OK,
    }
}