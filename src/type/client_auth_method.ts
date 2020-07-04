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


import { BaseExtendedEnum } from './base_extended_enum.ts';


/**
 * Flags to indicate the type of authentication method.
 */
const FLAG_SECRET_BASED      = 0x1;
const FLAG_JWT_BASED         = 0x2;
const FLAG_CERTIFICATE_BASED = 0x4;


/**
 * Client authentication methods.
 *
 * For more details, see [OpenID Connect Core 1.0, 9. Client Authentication
 * ](http://openid.net/specs/openid-connect-core-1_0.html#ClientAuthentication).
 */
export class ClientAuthMethod extends BaseExtendedEnum
{
    /**
     * `none` (0).
     *
     * The Client does not authenticate itself at the Token Endpoint,
     * either because it uses only the Implicit Flow (and so does not
     * use the Token Endpoint) or because it is a Public Client with
     * no Client Secret or other authentication mechanism.
     */
    public static readonly NONE = new ClientAuthMethod(0, 'none', 0x0);


    /**
     * `client_secret_basic` (1).
     *
     * Clients that have received a `client_secret` value from the
     * Authorization Server authenticate with the Authorization Server
     * in accordance with [Section 3.2.1](http://tools.ietf.org/html/rfc6749#section-3.2.1)
     * of OAuth 2.0 [[RFC6749](http://tools.ietf.org/html/rfc6749)] using
     * the HTTP Basic authentication scheme.
     */
    public static readonly CLIENT_SECRET_BASIC = new ClientAuthMethod(1, 'client_secret_basic', 0x1);


    /**
     * 'client_secret_post' (2).
     *
     * Clients that have received a `client_secret` value from the
     * Authorization Server, authenticate with the Authorization Server
     * in accordance with [Section 3.2.1](http://tools.ietf.org/html/rfc6749#section-3.2.1)
     * of OAuth 2.0 [[RFC6749](http://tools.ietf.org/html/rfc6749)] by
     * including the Client Credentials in the request body.
     */
    public static readonly CLIENT_SECRET_POST = new ClientAuthMethod(2, 'client_secret_post', 0x1);


    /**
     *`client_secret_jwt` (3).
     *
     * Clients that have received a `client_secret` value from the
     * Authorization Server create a JWT using an HMAC SHA algorithm,
     * such as HMAC SHA-256. The HMAC (Hash-based Message Authentication
     * Code) is calculated using the octets of the UTF-8 representation
     * of the `client_secret` as the shared key.
     *
     * The Client authenticates in accordance with
     * [JSON Web Token (JWT) Profile for OAuth 2.0 Client Authentication
     * and Authorization Grants](http://openid.net/specs/openid-connect-core-1_0.html#OAuth.JWT)
     * [OAuth.JWT] and [Assertion Framework for OAuth 2.0 Client
     * Authentication and Authorization Grants](
     * http://openid.net/specs/openid-connect-core-1_0.html#OAuth.Assertions)
     * [OAuth.Assertions].
     */
    public static readonly CLIENT_SECRET_JWT = new ClientAuthMethod(3, 'client_secret_jwt', 0x2);


    /**
     * `private_key_jwt` (4).
     *
     * Clients that have registered a public key sign a JWT using that
     * key. The Client authenticates in accordance with [JSON Web Token
     * (JWT) Profile for OAuth 2.0 Client Authentication and Authorization
     * Grants](http://openid.net/specs/openid-connect-core-1_0.html#OAuth.JWT)
     * [OAuth.JWT] and [Assertion Framework for OAuth 2.0 Client Authentication
     * and Authorization Grants](
     * http://openid.net/specs/openid-connect-core-1_0.html#OAuth.Assertions)
     * [OAuth.Assertions].
     */
    public static readonly PRIVATE_KEY_JWT = new ClientAuthMethod(4, 'private_key_jwt', 0x2);


    /**
     * `tls_client_auth` (5).
     *
     * Clients authenticate with the Authorization Server using X.509
     * certificates as defined in _"Mutual TLS Profiles for OAuth Clients"_.
     */
    public static readonly TLS_CLIENT_AUTH = new ClientAuthMethod(5, 'tls_client_auth', 0x4);


    /**
     * `self_signed_tls_client_auth` (6).
     *
     * Clients authenticate with the Authorization Server using self-signed
     * certificates as defined in _"Mutual TLS Profiles for OAuth Clients"_.
     */
    public static readonly SELF_SIGNED_TLS_CLIENT_AUTH = new ClientAuthMethod(6, 'self_signed_tls_client_auth', 0x4);


    /**
     * The flag to indicate the type of this client authentication method.
     */
    public flags: number;


    /**
     * The constructor.
     */
    public constructor(value: number, string: string, flags: number)
    {
        super(value, string);
        this.flags = flags;
    }
}