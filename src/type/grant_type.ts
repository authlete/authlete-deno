// Copyright (C) 2020-2022 Authlete, Inc.
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


import { BaseExtendedEnum } from './base_extended_enum.ts';


/**
 * Values for `grant_type`.
 */
export class GrantType extends BaseExtendedEnum
{
    /**
     * `authorization_code` (1), a `grant_type` to request an access
     * token and/or an ID token, and optionally a refresh token, using
     * an authorization code.
     *
     * For more details, see the following links.
     *
     * - [RFC 6749 (OAuth 2.0), 4.1.3. Access Token Request](
     * http://tools.ietf.org/html/rfc6749#section-4.1.3)
     *
     * - [OpenID Connect Core 1.0, 3.1.3. Token Endpoint](
     * http://openid.net/specs/openid-connect-core-1_0.html#TokenEndpoint)
     */
    public static readonly AUTHORIZATION_CODE = new GrantType(1, 'authorization_code');


    /**
     * `implicit` (2), representing Implicit Flow.
     *
     * This is not a value for `grant_type` but listed in this enum
     * because OpenID Connect Dynamic Client Registration 1.0 uses
     * `'implicit'` as a value for `grant_types` of client metadata.
     *
     * For more details, see [OpenID Connect Dynamic Client Registration
     * 1.0, 2. Client Metadata](http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    public static readonly IMPLICIT = new GrantType(2, 'implicit');


    /**
     * `password` (3), a `grant_type` to request an access token using
     * a resource owner's username and password.
     *
     * For more details, see [RFC 6749 (OAuth 2.0), 4.3.2. Access Token
     * Request](http://tools.ietf.org/html/rfc6749#section-4.3.2).
     */
    public static readonly PASSWORD = new GrantType(3, 'password');


    /**
     * `client_credentials` (4), a `grant_type` to request an access
     * token using a client's credentials.
     *
     * For more details, see [RFC 6749 (OAuth 2.0), 4.4.2. Access Token
     * Request](http://tools.ietf.org/html/rfc6749#section-4.4.2).
     */
    public static readonly CLIENT_CREDENTIALS = new GrantType(4, 'client_credentials');


    /**
     * `refresh_token` (5), a `grant_type` to request an access token,
     * and optionally an ID token and/or a refresh token, using a refresh
     * token.
     *
     * For more details, see the following links.
     *
     * - [RFC 6749 (OAuth 2.0), 6. Refreshing an Access Token](
     * http://tools.ietf.org/html/rfc6749#section-6)
     *
     * - [OpenID Connect Core 1.0, 12. Using Refresh Tokens](
     * http://openid.net/specs/openid-connect-core-1_0.html#RefreshTokens)
     */
    public static readonly REFRESH_TOKEN = new GrantType(5, 'refresh_token');


    /**
     * `urn:openid:params:grant-type:ciba` (6), a `grant_type` to request
     * an ID token, an access token, and optionally a refresh token,
     * using a CIBA flow.
     *
     * CIBA is short for Client Initiated Backchannel Authentication.
     */
    public static readonly CIBA = new GrantType(6, 'urn:openid:params:grant-type:ciba');


    /**
     * `urn:ietf:params:oauth:grant-type:device_code` (7), a `grant_type`
     * to request an access token and optionally a refresh token, using
     * Device Flow.
     */
    public static readonly DEVICE_CODE = new GrantType(7, 'urn:ietf:params:oauth:grant-type:device_code');


    /**
     * `urn:ietf:params:oauth:grant-type:token-exchange` (8), a `grant_type`
     * for token exchange.
     *
     * For more details, see [RFC 8693 OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html).
     */
    public static readonly TOKEN_EXCHANGE = new GrantType(8, 'urn:ietf:params:oauth:grant-type:token-exchange');
}