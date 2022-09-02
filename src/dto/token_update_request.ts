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
import { AuthzDetails } from './authz_details.ts';
import { Property } from './property.ts';
const { Type } = ct;


/**
 * Request to Authlete `/auth/token/update` API.
 */
export class TokenUpdateRequest
{
    /**
     * An existing access token to update.
     */
    public accessToken?: string;


    /**
     * The new expiration date in milliseconds since the Unix epoch (1970-01-01).
     */
    public accessTokenExpiresAt!: number;


    /**
     * A new set of scopes assigned to the access token. If `null` is
     * given, the scope set associated with the access token is not changed.
     */
    public scopes?: string[];


    /**
     * A new set of properties assigned to the access token.
     *
     * If `null` is given, the property set associated with the access
     * token is not changed.
     */
    @Type(() => Property)
    public properties?: Property[];


    /**
     * The flag which indicates whether `/auth/token/update` API attempts
     * to update the expiration date of the access token when the scopes
     * linked to the access token are changed by this request. This request
     * parameter is optional and its default value is `false`. If this
     * request parameter is set to `true` and all of the following conditions
     * are satisfied, the API performs an update on the expiration date
     * of the access token even if the `accessTokenExpiresAt` request
     * parameter is not explicitly specified in the request.
     *
     * 1. The `accessTokenExpiresAt` request parameter is not included
     * in the request or its value is `0` (or negative).
     * 2. The scopes linked to the access token are changed by the `scopes`
     * request parameter in the request.
     * 3. Any of the new scopes to be linked to the access token has one
     * or more attributes specifying access token duration.
     *
     * When multiple access token duration values are found in the attributes
     * of the specified scopes, the smallest value among them is used.
     *
     * For more details, see the following examples.
     *
     * **Example 1.**
     *
     * Let's say we send the following request to `/auth/token/update`
     * API
     *
     * ```
     * {
     *   "accessToken" : "JDGiiM9PuWT63FIwGjG9eYlGi-aZMq6CQ2IB475JUxs",
     *   "scopes" : ["read_profile"]
     * }
     * ```
     *
     * and `"read_profile"` has the following attributes.
     *
     * ```
     * {
     *   "key" : "access_token.duration",
     *   "value" : "10000"
     * }
     * ```
     *
     * In this case, the API evaluates `"10000"` as a new value of the
     * duration of the access token (in seconds) and updates the expiration
     * date of the access token using the duration.
     *
     * **Example 2.**
     *
     * Let's say we send the following request to `/auth/token/update`
     * API.
     *
     * ```
     * {
     *   "accessToken" : "JDGiiM9PuWT63FIwGjG9eYlGi-aZMq6CQ2IB475JUxs",
     *   "scopes" : ["read_profile", "write_profile"]
     * }
     * ```
     *
     * and `"read_profile"` has the following attributes
     *
     * ```
     * {
     *   "key" : "access_token.duration",
     *   "value" : "10000"
     * }
     * ```
     *
     * and `"write_profile"` has the following attributes.
     *
     * ```
     * {
     *   "key" : "access_token.duration",
     *   "value" : "5000"
     * }
     * ```
     *
     * In this case, the API evaluates `"10000"` and `"5000"` as candidate
     * values for new duration of the access token (in seconds) and chooses
     * the smallest value of them (i.e. "5000" is adopted) and updates
     * the expiration date of the access token using the duration.
     */
    public accessTokenExpiresAtUpdatedOnScopeUpdate!: boolean;


    /**
     * Whether the access token expires or not. By default, all access
     * tokens expire after a period of time determined by their service.
     * If this request parameter is `true` then the access token will
     * not automatically expire and must be revoked or deleted manually
     * at the service.
     *
     * If this request parameter is `true`, the `accessTokenExpiresAt`
     * request parameter is ignored. If this request parameter is `false`,
     * the `accessTokenExpiresAt` request parameter is processed normally.
     */
    public accessTokenPersistent!: boolean;


    /**
     * The hash of the access token value. Used when the hash of the token
     * is known (perhaps from lookup) but the value of the token itself
     * is not.
     *
     * The value of the `accessToken` parameter takes precedence.
     */
    public accessTokenHash?: string


    /**
     * Whether to update the value of the access token in the data store.
     * If this parameter is set to `true` then a new access token value
     * is generated by the server and returned in the response.
     */
    public accessTokenValueUpdated!: boolean;


    /**
     * The thumbprint of the MTLS certificate bound to this token. If
     * this field is set, a certificate with the corresponding value MUST
     * be presented with the access token when it is used by a client.
     */
    public certificateThumbprint?: string;


    /**
     * The thumbprint of the public key used for DPoP presentation of
     * this token. If this field is set, a DPoP proof signed with the
     * corresponding private key MUST be presented with the access token
     * when it is used by a client. Additionally, the token's `token_type`
     * will be set to `'DPoP'`.
     */
    public dpopKeyThumbprint?: string;


    /**
     * The authorization details. This represents the value of the
     * `authorization_details` request parameter which is defined in
     * _"OAuth 2.0 Rich Authorization Requests"_.
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
     * The token identifier.
     */
    public tokenId?: string;
}