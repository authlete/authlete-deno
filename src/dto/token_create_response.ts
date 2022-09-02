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
import { fromJsonValue } from '../type/base_extended_enum.ts';
import { GrantType } from '../type/grant_type.ts';
import { ApiResponse } from './api_response.ts';
import { AuthzDetails } from './authz_details.ts';
import { Property } from './property.ts';
const { Type, Transform } = ct;


/**
 * Response from Authlete `/auth/token/create` API.
 */
export class TokenCreateResponse extends ApiResponse
{
    /**
     * The next action that the service implementation should take.
     */
    @Transform((value: any) => TokenCreateResponse.Action[value])
    public action!: TokenCreateResponse.Action;


    /**
     * The grant type for a newly created access token.
     */
    @Transform((value: any) => fromJsonValue(value, GrantType), { toClassOnly: true })
    public grantType!: GrantType;


    /**
     * The client ID.
     */
    public clientId!: number;


    /**
     * The subject (= unique identifier) of the user associated with the
     * newly issued access token.  This value is `null` when the `grant type`
     * obtained by `grantType` is `GrantType.CLIENT_CREDENTIALS`.
     */
    public subject?: string;


    /**
     * The scopes covered by the access token.
     */
    public scopes?: string[];


    /**
     * The newly issued access token.
     */
    public accessToken?: string;


    /**
     * The token type of the access token. For example, `"Bearer"`.
     */
    public tokenType?: string;


    /**
     * The duration of the newly issued access token in seconds.
     */
    public expiresIn!: number;


    /**
     * The date at which the newly issued access token will expire.
     * The value is expressed in milliseconds since Unix epoch (1970-01-01).
     */
    public expiresAt!: number;


    /**
     * The newly issued Refresh token. This is `null` when the grant type
     * is either `GrantType.IMPLICIT IMPLICIT` or `GrantType.CLIENT_CREDENTIALS CLIENT_CREDENTIALS`.
     */
    public refreshToken?: string;


    /**
     * The properties associated with the access token.
     */
    @Type(() => Property)
    public properties?: Property[];


    /**
     * The newly issued access token in JWT format.
     *
     * If the authorization server is configured to issue JWT-based access
     * tokens (= if `Service.accessTokenSignAlg` is a non-null value),
     * a JWT-based access token is issued along with the original random-string
     * one.
     */
    public jwtAccessToken?: string;


    /**
     * The authorization details associated with the access token.
     */
    @Type(() => AuthzDetails)
    public authorizationDetails?: AuthzDetails;


    /**
     * The flag which indicates whether the access token is for an external
     * attachment.
     *
     * For more details, see [OpenID Connect for Identity Assurance 1.0,
     * External Attachments](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#name-external-attachments).
     */
    public forExternalAttachment!: boolean;


    /**
     * The unique token identifier.
     */
    public tokenId?: string;
}


export namespace TokenCreateResponse
{
    /**
     * The next action that the service implementation should take.
     */
    export enum Action
    {
        /**
         * An error occurred on Authlete side.
         */
        INTERNAL_SERVER_ERROR,

        /**
         * The request from the caller was wrong. For example, this
         * happens when the `grantType` request parameter was missing.
         */
        BAD_REQUEST,

        /**
         * The request from the caller was not allowed. For example,
         * this happens when the client application identified by the
         * `clientId` request parameter does not belong to the service
         * identified by the API key used for the API call.
         */
        FORBIDDEN,

        /**
         * An access token and optionally a refresh token were issued
         * successfully.
         */
        OK
    }
}