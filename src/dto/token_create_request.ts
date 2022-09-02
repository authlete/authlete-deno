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
import { toJsonValue } from '../type/base_extended_enum.ts';
import { GrantType } from '../type/grant_type.ts';
import { AuthzDetails } from './authz_details.ts';
import { Property } from './property.ts';
const { Type, Transform } = ct;


/**
 * Request to Authlete `/auth/token/create` API.
 */
export class TokenCreateRequest
{
    /**
     * The grant type for a newly created access token.
     */
    @Transform(toJsonValue, { toPlainOnly: true })
    public grantType?: GrantType;


    /**
     * The client ID that will be associated with a newly created access
     * token.
     */
    public clientId?: string


    /**
     * The subject (= unique identifier) of the user who will be associated
     * with a newly created access token.
     */
    public subject?: string;


    /**
     * The scopes that will be associated with a newly created access
     * token.
     */
    public scopes?: string[];


    /**
     * The duration of a newly created access token in seconds. 0 means
     * that the duration will be determined according to the settings
     * of the service.
     */
    public accessTokenDuration!: number;


    /**
     * The duration of a newly created refresh token in seconds. 0 means
     * that the duration will be determined according to the settings
     * of the service.
     */
    public refreshTokenDuration!: number;


    /**
     * The extra properties to associate with an access token which will
     * be issued by this request.
     *
     * Keys of extra properties will be used as labels of top-level
     * entries in a JSON response containing an access token which is
     * returned from an authorization server. An example is
     * `example_parameter`, which you can find in [5.1. Successful Response](
     * https://tools.ietf.org/html/rfc6749#section-5.1) in RFC 6749. The
     * following code snippet is an example to set one extra property
     * having `example_parameter` as its key and `example_value` as its
     * value.
     *
     * ```
     * const property = new Property();
     * property.key   = 'example_parameter';
     * property.value = 'example_value';
     * request.properties = [ property ];
     * ```
     *
     * Keys listed below should not be used and they would be ignored
     * on the server side even if they were used. It's because they are
     * reserved in [RFC 6749](https://tools.ietf.org/html/rfc6749) and
     * [OpenID Connect Core 1.0](http://openid.net/specs/openid-connect-core-1_0.html).
     *
     * - `access_token`
     * - `token_type`
     * - `expires_in`
     * - `refresh_token`
     * - `scope`
     * - `error`
     * - `error_description`
     * - `error_uri`
     * - `id_token`
     *
     * Note that **there is an upper limit on the total size of extra
     * properties**. On the server side, the properties will be (1) converted
     * to a multidimensional string array, (2) converted to JSON, (3)
     * encrypted by AES/CBC/PKCS5Padding, (4) encoded by base64url, and
     * then stored into the database. The length of the resultant string
     * must not exceed 65,535 in bytes. This is the upper limit, but we
     * think it is big enough.
     */
    @Type(() => Property)
    public properties?: Property[];


    /**
     * The flag which indicates whether to emulate that the client ID
     * alias is used instead of the original numeric client ID when a
     * new access token is created.
     *
     * This has an effect only on the value of the `aud` claim in a response
     * from [UserInfo endpoint](http://openid.net/specs/openid-connect-core-1_0.html#UserInfo).
     * When you access the UserInfo endpoint (which is expected to be
     * implemented using Authlete's `/api/auth/userinfo` API and `/api/auth/userinfo/issue`
     * API) with an access token which has been created using Authlete's
     * `/api/auth/token/create` API with this property (`clientIdAliasUsed`)
     * true, the client ID alias is used as the value of the `aud` claim
     * in a response from the UserInfo endpoint.
     *
     * Note that if a client ID alias is not assigned to the client when
     * Authlete's `/api/auth/token/create` API is called, this property (
     * `clientIdAliasUsed`) has no effect (it is always regarded as `false`).
     */
    public clientIdAliasUsed!: boolean;


    /**
     * The access token.
     *
     * The `/api/auth/token/create` API generates an access token. Therefore,
     * callers of the API do not have to specify values of newly created
     * access tokens. However, in some cases, for example, if you want
     * to migrate existing access tokens from an old system to Authlete,
     * you may want to specify values of access tokens. In such a case,
     * you can specify the value of a newly created access token by passing
     * a non-null value as the value of `accessToken` request parameter.
     * The implementation of the `/api/auth/token/create` uses the value
     * of the `accessToken` request parameter instead of generating a
     * new value when the request parameter holds a non-null value.
     *
     * Note that if the hash value of the specified access token already
     * exists in Authlete's database, the access token cannot be inserted
     * and the `/auth/token/create` API will report an error.
     */
    public accessToken?: string;


    /**
     * The refresh token.
     *
     * The `/auth/token/create` API may generate a refresh token. Therefore,
     * callers of the API do not have to specify values of newly created
     * refresh tokens. However, in some cases, for example, if you want
     * to migrate existing refresh tokens from an old system to Authlete,
     * you may want to specify values of refresh tokens. In such a case,
     * you can specify the value of a newly created refresh token by
     * passing a non-null value as the value of `refreshToken` request
     * parameter. The implementation of the `/auth/token/create` uses
     * the value of the `refreshToken` request parameter instead of generating
     * a new value when the request parameter holds a non-null value.
     *
     * Note that if the hash value of the specified refresh token already
     * exists in Authlete's database, the refresh token cannot be inserted
     * and the `/auth/token/create` API will report an error.
     */
    public refreshToken?: string;


    /**
     * Whether the access token expires or not. By default, all access
     * tokens expire after a period of time determined by their service.
     * If this request parameter is `true` then the access token will
     * not automatically expire and must be revoked or deleted manually
     * at the service.
     *
     * If this request parameter is `true`, the `accessTokenDuration`
     * request parameter is ignored.
     */
    public accessTokenPersistent!: boolean;


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
     * the resources. This represents the value of one or more
     * `resource` request parameters which is defined in _"RFC8707 Resource
     * Indicators for OAuth 2.0"_.
     */
    public resources?: string[];


    /**
     * The flag which indicates whether the access token is for an external
     * attachment.
     *
     * For more details, see [OpenID Connect for Identity Assurance 1.0,
     * External Attachments](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#name-external-attachments).
     */
    public forExternalAttachment!: boolean;


    /**
     * The additional claims in JSON object format that are added to the
     * payload part of the JWT access token.
     *
     * This request parameter has a meaning only when the format of access
     * tokens issued by this service is JWT. In other words, it has a meaning
     * only when the `accessTokenSignAlg` property of the service holds
     * a non-null value. See the description of the `Service.accessTokenSignAlg`
     * for details.
     */
    public jwtAtClaims?: string;
}