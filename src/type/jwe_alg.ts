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
 * `"alg"` (Algorithm) Header Parameter Values for JWE.
 *
 * For more details, see [RFC 7518, 4.1. "alg" (Algorithm) Header Parameter
 * Values for JWE](https://tools.ietf.org/html/rfc7518#section-4.1).
 */
export class JWEAlg extends BaseExtendedEnum
{
    /**
     * `RSA1_5` (1); RSAES-PKCS1-V1_5.
     */
    public static readonly RSA1_5 = new JWEAlg(1, 'RSA1_5');


    /**
     * `RSA-OAEP` (2); RSAES OAEP using default parameters.
     */
    public static readonly RSA_OAEP = new JWEAlg(2, 'RSA-OAEP');


    /**
     * `RSA-OAEP-256` (3); RSAES OAEP using SHA-256 and MGF1 with SHA-256.
     */
    public static readonly RSA_OAEP_256= new JWEAlg(3, 'RSA-OEAP-256');


    /**
     * `A128KW` (4); AES Key Wrap with default initial value using 128
     * bit key.
     */
    public static readonly A128KW = new JWEAlg(4, 'A128KW');


    /**
     * `A192KW` (5); AES Key Wrap with default initial value using 192
     * bit key.
     */
    public static readonly A192KW = new JWEAlg(5, 'A192KW');


    /**
     * `A256KW` (6); AES Key Wrap with default initial value using 256
     * bit key.
     */
    public static readonly A256KW = new JWEAlg(6, 'A256KW');


    /**
     * `dir` (7); Direct use of a shared symmetric key as the CEK.
     */
    public static readonly DIR = new JWEAlg(7, 'dir');


    /**
     * `ECDH-ES` (8); Elliptic Curve Diffie-Hellman Ephemeral Static key
     * agreement using Concat KDF.
     */
    public static readonly ECDH_ES = new JWEAlg(8, 'ECDH-ES');


    /**
     * `ECDH-ES+A128KW` (9); ECDH-ES using Concat KDF and CEK wrapped
     * with 'A128KW'.
     */
    public static readonly ECDH_ES_A128KW = new JWEAlg(9, 'ECDH-ES+A128KW');


    /**
     * `ECDH-ES+A192KW` (10); ECDH-ES using Concat KDF and CEK wrapped
     * with 'A192KW'.
     */
    public static readonly ECDH_ES_A192KW = new JWEAlg(10, 'ECDH-ES+A192KW');


    /**
     * `ECDH-ES+A256KW` (11); ECDH-ES using Concat KDF and CEK wrapped
     * with 'A256KW'.
     */
    public static readonly ECDH_ES_A256KW = new JWEAlg(11, 'ECDH-ES+A256KW');


    /**
     * `A128GCMKW` (12); Key wrapping with AES GCM using 128 bit key.
     */
    public static readonly A128GCMKW = new JWEAlg(12, 'A128GCMKW');


    /**
     * `A192GCMKW` (13); Key wrapping with AES GCM using 192 bit key.
     */
    public static readonly A192GCMKW = new JWEAlg(13, 'A192GCMKW');


    /**
     * `A256GCMKW` (14); Key wrapping with AES GCM using 256 bit key.
     */
    public static readonly A256GCMKW = new JWEAlg(14, 'A256GCMKW');


    /**
     * `PBES2-HS256+A128KW` (15); PBES2 with HMAC SHA-256 and 'A128KW'.
     */
    public static readonly PBES2_HS256_A128KW = new JWEAlg(15, 'PBES2-HS256+A128KW');


    /**
     * `PBES2-HS384+A192KW` (16); PBES2 with HMAC SHA-384 and 'A192KW'.
     */
    public static readonly PBES2_HS384_A192KW = new JWEAlg(16, 'PBES2-HS384+A192KW');


    /**
     * `PBES2-HS512+A256KW` (17); PBES2 with HMAC SHA-512 and 'A256KW'.
     */
    public static readonly PBES2_HS512_A256KW = new JWEAlg(17, 'PBES2-HS512+A256KW');
}