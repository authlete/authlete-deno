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


import { BaseExtendedEnum } from './base_extended_enum.ts';


/**
 * Token types registered at [OAuth URI](https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml#uri)
 * of [OAuth Parameters](https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml)
 * of IANA (Internet Assigned Numbers Authority).
 *
 * For more details, see the following links.
 *
 * - [IANA / OAuth Parameters / OAuth URI](https://www.iana.org/assignments/oauth-parameters/oauth-parameters.xhtml#uri)
 *
 * - [RFC 7519 JSON Web Token (JWT), Section 9. URI for Declaring that
 *   Content is a JWT](https://www.rfc-editor.org/rfc/rfc7519.html#section-9)
 *
 * - [RFC 8693 OAuth 2.0 Token Exchange, Section 3. Token Type Identifiers](
 *   https://www.rfc-editor.org/rfc/rfc8693.html#section-3)
 */
export class TokenType extends BaseExtendedEnum
{
    /**
     * JSON Web Token (JWT) Token Type;
     * `urn:ietf:params:oauth:token-type:jwt`.
     *
     * For more details, see [RFC 7519 JSON Web Token (JWT), Section 9.
     * URI for Declaring that Content is a JWT](https://www.rfc-editor.org/rfc/rfc7519.html#section-9).
     */
    public static readonly JWT = new TokenType(1, 'urn:ietf:params:oauth:token-type:jwt');


    /**
     * Token type URI for an OAuth 2.0 access token;
     * `urn:ietf:params:oauth:token-type:access_token`.
     *
     * For more details, see [RFC 8693 OAuth 2.0 Token Exchange, Section 3.
     * Token Type Identifiers](https://www.rfc-editor.org/rfc/rfc8693.html#section-3).
     */
    public static readonly ACCESS_TOKEN = new TokenType(2, 'urn:ietf:params:oauth:token-type:access_token');


    /**
     * Token type URI for an OAuth 2.0 refresh token;
     * `urn:ietf:params:oauth:token-type:refresh_token`.
     *
     * For more details, see [RFC 8693 OAuth 2.0 Token Exchange, Section 3.
     * Token Type Identifiers](https://www.rfc-editor.org/rfc/rfc8693.html#section-3).
     */
    public static readonly REFRESH_TOKEN = new TokenType(3, 'urn:ietf:params:oauth:token-type:refresh_token');


    /**
     * Token type URI for an ID Token;
     * `urn:ietf:params:oauth:token-type:id_token`.
     *
     * For more details, see [RFC 8693 OAuth 2.0 Token Exchange, Section 3.
     * Token Type Identifiers](https://www.rfc-editor.org/rfc/rfc8693.html#section-3).
     */
    public static readonly ID_TOKEN = new TokenType(4, 'urn:ietf:params:oauth:token-type:id_token');


    /**
     * Token type URI for a base64url-encoded SAML 1.1 assertion;
     * `urn:ietf:params:oauth:token-type:saml1`.
     *
     * For more details, see [RFC 8693 OAuth 2.0 Token Exchange, Section 3.
     * Token Type Identifiers](https://www.rfc-editor.org/rfc/rfc8693.html#section-3).
     */
    public static readonly SAML1 = new TokenType(5, 'urn:ietf:params:oauth:token-type:saml1');


    /**
     * Token type URI for a base64url-encoded SAML 2.0 assertion;
     * `urn:ietf:params:oauth:token-type:saml2`.
     *
     * For more details, see [RFC 8693 OAuth 2.0 Token Exchange, Section 3.
     * Token Type Identifiers](https://www.rfc-editor.org/rfc/rfc8693.html#section-3).
     */
    public static readonly SAML2 = new TokenType(6, 'urn:ietf:params:oauth:token-type:saml2');
}