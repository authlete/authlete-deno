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
import { HashAlg } from './hash_alg.ts';


/**
 * `"alg"` (Algorithm) Header Parameter Values for JWS.
 *
 * For more details, see [RFC 7518, 3.1. "alg" (Algorithm) Header Parameter
 * Values for JWS](https://tools.ietf.org/html/rfc7518#section-3.1).
 */
export class JWSAlg extends BaseExtendedEnum
{
    /**
     * `none` (0); No digital signature or MAC performed.
     */
    public static readonly NONE = new JWSAlg(0, 'none');


    /**
     * `HS256` (1); HMAC using SHA-256.
     */
    public static readonly HS256 = new JWSAlg(1, 'HS256', HashAlg.SHA_256);


    /**
     * `HS384` (2); HMAC using SHA-384.
     */
    public static readonly HS384 = new JWSAlg(2, 'HS384', HashAlg.SHA_384);


    /**
     * `HS512` (3); HMAC using SHA-512.
     */
    public static readonly HS512 = new JWSAlg(3, 'HS512', HashAlg.SHA_512);


    /**
     * `RS256` (4); RSASSA-PKCS-v1_5 using SHA-256.
     */
    public static readonly RS256 = new JWSAlg(4, 'RS256', HashAlg.SHA_256);


    /**
     * `RS38` (5); RSASSA-PKCS-v1_5 using SHA-384.
     */
    public static readonly RS384 = new JWSAlg(5, 'RS384', HashAlg.SHA_384);


    /**
     * `RS512` (6); RSASSA-PKCS-v1_5 using SHA-512.
     */
    public static readonly RS512 = new JWSAlg(6, 'RS512', HashAlg.SHA_512);


    /**
     * `ES256` (7); ECDSA using P-256 and SHA-256.
     */
    public static readonly ES256 = new JWSAlg(7, 'ES256', HashAlg.SHA_256);


    /**
     * `ES384` (8); ECDSA using P-384 and SHA-384.
     */
    public static readonly ES384 = new JWSAlg(8, 'ES384', HashAlg.SHA_384);


    /**
     * `ES512` (9); ECDSA using P-521 and SHA-512.
     */
    public static readonly ES512 = new JWSAlg(9, 'ES512', HashAlg.SHA_512);


    /**
     * `PS256` (10); RSASSA-PSS using SHA-256 and MGF1 with SHA-256.
     */
    public static readonly PS256 = new JWSAlg(10, 'PS256', HashAlg.SHA_256);


    /**
     * `PS384` (11); RSASSA-PSS using SHA-384 and MGF1 with SHA-384.
     */
    public static readonly PS384 = new JWSAlg(11, 'PS384', HashAlg.SHA_384);


    /**
     * `PS512` (12); RSASSA-PSS using SHA-512 and MGF1 with SHA-512.
     */
    public static readonly PS512 = new JWSAlg(12, 'PS512', HashAlg.SHA_512);


    /**
     * The hash algorithm.
     */
    public hashAlg?: HashAlg;


    /**
     * The private constructor.
     */
    public constructor(value: number, string: string, hashAlg?: HashAlg)
    {
        super(value, string);
        if (hashAlg) this.hashAlg = hashAlg;
    }
}