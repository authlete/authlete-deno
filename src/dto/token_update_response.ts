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
import { AuthzDetails } from './authz_details.ts';
import { Property } from './property.ts';
const { Type, Transform } = ct;


/**
 * Response from Authlete `/auth/token/update` API.
 */
export class TokenUpdateResponse extends ApiResponse
{
    /**
     * The next action that the service implementation should take.
     */
    @Transform((value: any) => TokenUpdateResponse.Action[value])
    public action!: TokenUpdateResponse.Action;


    /**
     * The access token which has been specified by the request.
     */
    public accessToken?: string;


    /**
     * The token type associated with the access token.
     */
    public tokenType?: string;


    /**
     * The expiration date in milliseconds since the Unix epoch (1970-01-01).
     */
    public accessTokenExpiresAt!: number;


    /**
     * The scopes associated with the access token.
     */
    public scopes?: string[];


    /**
     * The properties associated with the access token.
     */
    @Type(() => Property)
    public properties?: Property[];


    /**
     * The authorization details. This represents the value of the
     * `"authorization_details"` request parameter which is defined in
     * <i>"OAuth 2.0 Rich Authorization Requests"</i>.
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


export namespace TokenUpdateResponse
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
         * happens when the `accessToken` request parameter was missing.
         */
        BAD_REQUEST,

        /**
         * The request from the caller was not allowed. For example,
         * this happens when the access token identified by the `accessToken`
         * request parameter does not belong to the service identified
         * by the API key used for the API call.
         */
        FORBIDDEN,

        /**
         * The specified access token does not exist.
         */
        NOT_FOUND,

        /**
         * The access token was updated successfully.
         */
        OK
    }
}