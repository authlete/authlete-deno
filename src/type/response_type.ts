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
 * Flags to indicate the type of a response type.
 */
const FLAG_CODE     = 0x1;
const FLAG_TOKEN    = 0x2;
const FLAG_ID_TOKEN = 0x4;


/**
 * From [RFC 6749 (OAuth 2.0)](http://tools.ietf.org/html/rfc6749), [3.1.1.
 * Response Type](http://tools.ietf.org/html/rfc6749#section-3.1.1)
 *
 * > `response_type`
 * >
 * > REQUIRED. The value MUST be one of **`"code"`** for requesting an
 * authorization code as described by [Section 4.1.1](
 * http://tools.ietf.org/html/rfc6749#section-4.1.1), **`"token"`** for
 * requesting an access token (implicit grant) as described by [Section
 * 4.2.1](http://tools.ietf.org/html/rfc6749#section-4.2.1), or a registered
 * extension value as described by [Section 8.4.](http://tools.ietf.org/html/rfc6749#section-8.4)
 *
 * From [OAuth 2.0 Multiple Response Type Encoding Practices](
 * http://openid.net/specs/oauth-v2-multiple-response-types-1_0.html),
 * [3. ID Token Response Type](
 * http://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#id_token)
 *
 * > `id_token`
 * >
 * > When supplied as the `response_type` parameter in an OAuth 2.0
 * Authorization Request, a successful response MUST include the parameter
 * `id_token`. The Authorization Server SHOULD NOT return an OAuth 2.0
 * Authorization Code, Access Token, or Access Token Type in a successful
 * response to the grant request. If a `redirect_uri` is supplied, the
 * User Agent SHOULD be redirected there after granting or denying access.
 * The request MAY include a `state` parameter, and if so, the Authorization
 * Server MUST echo its value as a response parameter when issuing either
 * a successful response or an error response. The default Response Mode
 * for this Response Type is the fragment encoding and the query encoding
 * MUST NOT be used. Both successful and error responses SHOULD be returned
 * using the supplied Response Mode, or if none is supplied, using the
 * default Response Mode.
 *
 * From [OAuth 2.0 Multiple Response Type Encoding Practices](
 * http://openid.net/specs/oauth-v2-multiple-response-types-1_0.html),
 * [4. None Response Type](http://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#none)
 *
 * > `none`
 * >
 * > When supplied as the `response_type` parameter in an OAuth 2.0
 * Authorization Request, the Authorization Server SHOULD NOT return
 * an OAuth 2.0 Authorization Code, Access Token, Access Token Type,
 * or ID Token in a successful response to the grant request. If a
 * `redirect_uri` is supplied, the User Agent SHOULD be redirected there
 * after granting or denying access. The request MAY include a `state`
 * parameter, and if so, the Authorization Server MUST echo its value
 * as a response parameter when issuing either a successful response
 * or an error response. The default Response Mode for this Response Type
 * is the query encoding. Both successful and error responses SHOULD be
 * returned using the supplied Response Mode, or if none is supplied,
 * using the default Response Mode.
 *
 * From [OAuth 2.0 Multiple Response Type Encoding Practices](
 * http://openid.net/specs/oauth-v2-multiple-response-types-1_0.html),
 * [5. Definitions of Multiple-Valued Response Type Combinations](
 * http://openid.net/specs/oauth-v2-multiple-response-types-1_0.html#Combinations)
 *
 * > `code token`
 * >
 * > When supplied as the value for the `response_type` parameter, a
 * successful response MUST include an Access Token, an Access Token Type,
 * and an Authorization Code. The default Response Mode for this Response
 * Type is the fragment encoding and the query encoding MUST NOT be used.
 * Both successful and error responses SHOULD be returned using the supplied
 * Response Mode, or if none is supplied, using the default Response Mode.
 * >
 * >
 * > `code id_token`
 * >
 * > When supplied as the value for the `response_type` parameter, a
 * successful response MUST include both an Authorization Code and an
 * `id_token`. The default Response Mode for this Response Type is the
 * fragment encoding and the query encoding MUST NOT be used. Both
 * successful and error responses SHOULD be returned using the supplied
 * Response Mode, or if none is supplied, using the default Response Mode.
 * >
 * >
 * > `id_token token`
 * >
 * > When supplied as the value for the `response_type` parameter, a
 * successful response MUST include an Access Token, an Access Token
 * Type, and an `id_token`. The default Response Mode for this Response
 * Type is the fragment encoding and the query encoding MUST NOT be used.
 * Both successful and error responses SHOULD be returned using the
 * supplied Response Mode, or if none is supplied, using the default
 * Response Mode.
 * >
 * >
 * > `code id_token token`
 * >
 * > When supplied as the value for the `response_type` parameter, a
 * successful response MUST include an Authorization Code, an `id_token`,
 * an Access Token, and an Access Token Type. The default Response Mode
 * for this Response Type is the fragment encoding and the query encoding
 * MUST NOT be used. Both successful and error responses SHOULD be
 * returned using the supplied Response Mode, or if none is supplied,
 * using the default Response Mode.
 */
export class ResponseType extends BaseExtendedEnum
{
    /**
     * `none` (0), a `response_type` to request no access credentials.
     */
    public static readonly NONE = new ResponseType(0, 'none', 0x0);


    /**
     * `code` (1), a `response_type` to request an authorization code.
     */
    public static readonly CODE = new ResponseType(1, 'code', 0x1);


    /**
     * `token` (2), a `response_type` to request an access token.
     */
    public static readonly TOKEN = new ResponseType(2, 'token', 0x2);


    /**
     * `id_token` (3), a `response_type` to request an ID token.
     */
    public static readonly ID_TOKEN = new ResponseType(3, 'id_token', 0x4);


    /**
     * `code token` (4), a `response_type` to request an authorization
     * code and an access token.
     */
    public static readonly CODE_TOKEN = new ResponseType(4, 'code token', 0x3);


    /**
     * `code id_token` (5), a `response_type` to request an authorization
     * code and an ID token.
     */
    public static readonly CODE_ID_TOKEN = new ResponseType(5, 'code id_token', 0x5);


    /**
     * `id_token token` (6), a `response_type` to request an ID token
     * and an access token.
     */
    public static readonly ID_TOKEN_TOKEN = new ResponseType(6, 'id_token token', 0x6);


    /**
     * `code id_token token` (7), a `response_type` to request an
     * authorization code, an ID token and an access token.
     */
    public static readonly CODE_ID_TOKEN_TOKEN = new ResponseType(7, 'code id_token token', 0x7);


    /**
     * The flag to indicate the type of this response type.
     */
    public flags: number;


    /**
     * The private constructor.
     */
    public constructor(value: number, string: string, flags: number)
    {
        super(value, string);
        this.flags = flags;
    }
}