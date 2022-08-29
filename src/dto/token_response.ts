// deno-lint-ignore-file
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
import { fromJsonValue } from '../type/base_extended_enum.ts';
import { ClientAuthMethod } from '../type/client_auth_method.ts';
import { GrantType } from '../type/grant_type.ts';
import { TokenType } from '../type/token_type.ts';
import { ApiResponse } from './api_response.ts';
import { AuthzDetails } from './authz_details.ts';
import { Pair } from './pair.ts';
import { Property } from './property.ts';
import { TokenInfo } from './token_info.ts';
const { Type, Transform } = ct;


/**
 * Response from Authlete `/auth/token` API.
 */
export class TokenResponse extends ApiResponse
{
    /**
     * The next action that the service implementation should take.
     */
    @Transform((value: any) => TokenResponse.Action[value])
    public action!: TokenResponse.Action;


    /**
     * The response content which can be used as the entity body of the
     * response returned to the client application.
     */
    public responseContent?: string;


    /**
     * The `username` request parameter.
     *
     * This property holds a valid value only when the value of `grant_type`
     * request parameter in the token request is `password`.
     *
     * See [RFC 6749, 4.3.2. Access Token Request](
     * http://tools.ietf.org/html/rfc6749#section-4.3.2).
     */
    public username?: string;


    /**
     * The `password` request parameter.
     *
     * This property holds a valid value only when the value of `grant_type`
     * request parameter in the token request is `password`.
     *
     * See [RFC 6749, 4.3.2. Access Token Request](
     * http://tools.ietf.org/html/rfc6749#section-4.3.2).
     */
    public password?: string;


    /**
     * The ticket issued from Authlete `/auth/token` endpoint. The value
     * is to be used as `ticket` request parameter for `/auth/token/issue`
     * API or `/auth/token/fail` API.
     *
     * This method returns a valid value only when `action` is
     * `TokenResponse.Action.PASSWORD`.
     */
    public ticket!: string;


    /**
     * The newly issued access token. This property holds a valid value
     * only when the value of the `action` property is `TokenResponse.Action.OK`.
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
     * the `action` property is `TokenResponse.Action.OK` and the service
     * supports the [refresh token](https://tools.ietf.org/html/rfc6749#section-6)
     * flow.
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
     * The ID token.
     *
     * An [ID token](http://openid.net/specs/openid-connect-core-1_0.html#IDToken)
     * is issued from a token endpoint when the [authorization code
     * flow](https://tools.ietf.org/html/rfc6749#section-4.1) is used
     * and `openid` is included in the scope list.
     */
    public idToken?: string;


    /**
     * The grant type of the token request.
     */
    @Transform((value: any) => fromJsonValue(value, GrantType), { toClassOnly: true })
    public grantType!: GrantType;


    /**
     * The client ID.
     */
    public clientId!: number;


    /**
     * The client ID alias.
     *
     * If the client did not have an alias, the value of this property
     * is unset.
     */
    public clientIdAlias?: string;


    /**
     * The flag which indicates whether the client ID alias was used
     * when the token request was made.
     */
    public clientIdAliasUsed!: boolean;


    /**
     * The subject (= resource owner's ID) of the access token.
     *
     * Even if an access token has been issued by the call of `/auth/token`
     * API, this property is unset if the flow of the token request was
     * [Client Credentials Flow](http://tools.ietf.org/html/rfc6749#section-4.4)
     * (`grant_type=client_credentials`) because it means the access
     * token is not associated with any specific end-user.
     */
    public subject?: string;


    /**
     * The scopes covered by the access token.
     */
    public scopes?: string[];


    /**
     * The extra properties associated with the access token. This property
     * is unset when no extra property is associated with the issued
     * access token.
     */
    @Type(() => Property)
    public properties?: Property[];


    /**
     * The newly issued access token in JWT format.
     *
     * If the authorization server is configured to issue JWT-based access
     * tokens (= if `Service.getAccessTokenSignAlg` holds a valid value),
     * a JWT-based access token is issued along with the original random-string
     * one.
     *
     * Regarding the detailed format of the JWT-based access token, see
     * the description of the `Service` class.
     */
    public jwtAccessToken?: string;


    /**
     * The client authentication method that should be performed at
     * the token endpoint.
     *
     * If the client could not be identified by the information in the
     * request, this property is unset.
     */
    @Transform((value: any) => fromJsonValue(value, ClientAuthMethod), { toClassOnly: true })
    public clientAuthMethod?: ClientAuthMethod;


    /**
     * The resources specified by the `resource` request parameters
     * in the token request.
     *
     * See _"Resource Indicators for OAuth 2.0"_ for details.
     */
    public resources?: string[];


    /**
     * The target resources of the access token being issued.
     *
     * See _"Resource Indicators for OAuth 2.0" for details.
     */
    public accessTokenResources?: string[];


    /**
     * The authorization details. This represents the value of the
     * `authorization_details` request parameter which is defined in
     * _"OAuth 2.0 Rich Authorization Requests"_.
     *
     * When the value of the `action` property is `TokenResponse.Action.PASSWORD`,
     * this property an array that represents the `authorization_details`
     * request parameter included in the token request. In other successful
     * cases, this property holds the authorization details associated
     * with the issued access token.
     */
    @Type(() => AuthzDetails)
    public authorizationDetails?: AuthzDetails;


    /**
     * Arbitrary attributes associated with the service.
     */
    @Type(() => Pair)
    public serviceAttributes?: Pair[];


    /**
     * Arbitrary attributes associated with the client.
     */
    @Type(() => Pair)
    public clientAttributes?: Pair[];


    /**
     * The values of the `audience` request parameters that are contained
     * in the token exchange request (cf. [RFC 8693](https://www.rfc-editor.org/rfc/rfc8693.html)).
     *
     * The `audience` request parameter is defined in [RFC 8693 OAuth
     * 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html).
     * Although [RFC 6749 The OAuth 2.0 Authorization Framework](https://www.rfc-editor.org/rfc/rfc6749.html)
     * states _"Request and response parameters MUST NOT be included more
     * than once"_, RFC 8693 allows a token exchange request to include
     * the `audience` request parameter multiple times.
     *
     * For more details, see [RFC 8693 OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html).
     */
    public audiences?: string[];


    /**
     * The value of the `requested_token_type` request parameter.
     *
     * The `requested_token_type` request parameter is defined in [RFC
     * 8693 OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html).
     *
     * For more details, see [RFC 8693 OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html).
     */
    @Transform((value: any) => fromJsonValue(value, TokenType), { toClassOnly: true })
    public requestedTokenType?: TokenType;


    /**
     * The value of the `subject_token` request parameter.
     *
     * The `subject_token` request parameter is defined in [RFC 8693 OAuth
     * 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html).
     *
     * For more details, see [RFC 8693 OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html).
     */
    public subjectToken?: string;


    /**
     * The value of the `subject_token_type` request parameter.
     *
     * The `subject_token_type` request parameter is defined in [RFC 8693
     * OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html).
     *
     * For more details, see [RFC 8693 OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html).
     */
    @Transform((value: any) => fromJsonValue(value, TokenType), { toClassOnly: true })
    public subjectTokenType?: TokenType;


    /**
     * The information about the token specified by the `subject_token`
     * request parameter.
     *
     * This property holds a non-null value only when the value of the
     * `subject_token_type` request parameter is either `urn:ietf:params:oauth:token-type:access_token`
     * or `urn:ietf:params:oauth:token-type:refresh_token` (= only when
     * the `subjectTokenType` property is either `TokenType.ACCESS_TOKEN ACCESS_TOKEN`
     * or `TokenType.REFRESH_TOKEN REFRESH_TOKEN`).
     *
     * For more details, see [RFC 8693 OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html).
     */
    @Type(() => TokenInfo)
    public subjectTokenInfo?: TokenInfo;


    /**
     * The value of the `actor_token` request parameter.
     *
     * The `actor_token` request parameter is defined in [RFC 8693 OAuth
     * 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html).
     *
     * For more details, see [RFC 8693 OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html).
     */
    public actorToken?: string;


    /**
     * The value of the `actor_token_type` request parameter.
     *
     * The `actor_token_type` request parameter is defined in [RFC 8693 OAuth
     * 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html).
     *
     * For more details, see [RFC 8693 OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html).
     */
    @Transform((value: any) => fromJsonValue(value, TokenType), { toClassOnly: true })
    public actorTokenType?: TokenType;


    /**
     * The information about the token specified by the `actor_token`
     * request parameter.
     *
     * This property holds a non-null value only when the value of the
     * `actor_token_type` request parameter is either `urn:ietf:params:oauth:token-type:access_token`
     * or `urn:ietf:params:oauth:token-type:refresh_token` (= only when
     * the `actorTokenType` property is either `TokenType.ACCESS_TOKEN ACCESS_TOKEN`
     * or `TokenType.REFRESH_TOKEN REFRESH_TOKEN`).
     *
     * For more details, see [RFC 8693 OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html).
     */
    @Type(() => TokenInfo)
    public actorTokenInfo?: TokenInfo;
}


export namespace TokenResponse
{
    /**
     * The next action that the service implementation should take.
     */
    export enum Action
    {
        /**
         * Authentication of the client application failed. The service
         * implementation should return either `"400 Bad Request"` or
         * `"401 Unauthorized"` to the client application.
         */
        INVALID_CLIENT,


        /**
         * The request from the service was wrong or an error occurred
         * in Authlete. The service implementation should return `'500
         * Internal Server Error'` to the client application.
         */
        INTERNAL_SERVER_ERROR,


        /**
         * The token request from the client was wrong. The service
         * implementation should return `'400 Bad Request'` to the
         * client application.
         */
        BAD_REQUEST,


        /**
         * The token request from the client application was valid and
         * the grant type is `password`. The service implementation
         * should validate the credentials of the resource owner and call
         * Authlete `/auth/token/issue` API or `/auth/token/fail` API
         * according to the result of the validation.
         */
        PASSWORD,


        /**
         * The token request from the client was valid. The service
         * implementation should return `'200 OK'` to the client application
         * with an access token.
         */
        OK,


        /**
         * The token request from the client was a valid token exchange
         * request. The service implementation should take necessary
         * actions (e.g. create an access token), generate a response
         * and return it to the client application.
         *
         * For more details, see [RFC 8693 OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html).
         */
        TOKEN_EXCHANGE,
    }
}