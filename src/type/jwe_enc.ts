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
 * `"enc"` (Encryption Algorithm) Header Parameter Values for JWE.
 *
 * For more details, see [RFC 7518, 5.1. "enc" (Encryption Algorithm)
 * Header Parameter Values for JWE](https://tools.ietf.org/html/rfc7518#section-5.1).
 */
export class JWEEnc extends BaseExtendedEnum
{
    /**
     * 'A128CBC-HS256' (1);
     *
     * Algorithm defined in [5.2.3. AES_128_CBC_HMAC_SHA_256](
     * https://tools.ietf.org/html/rfc7518#section-5.2.3) in RFC 7518.
     */
    public static readonly A128CBC_HS256 = new JWEEnc(1, 'A128CBC-HS256');


    /**
     * `A192CBC-HS384` (2);
     *
     * Algorithm defined in [5.2.4. AES_192_CBC_HMAC_SHA_384](
     * https://tools.ietf.org/html/rfc7518#section-5.2.4) in RFC 7518.
     */
    public static readonly A192CBC_HS384 = new JWEEnc(2, 'A192CBC-HS384');


    /**
     * `A256CBC-HS512` (3);
     *
     * Algorithm defined in [5.2.5. AES_256_CBC_HMAC_SHA_512](
     * https://tools.ietf.org/html/rfc7518#section-5.2.5) in RFC 7518.
     */
    public static readonly A256CBC_HS512 = new JWEEnc(3, 'A256CBC-HS512');


    /**
     * `A128GCM` (4); AES GCM using 128 bit key.
     */
    public static readonly A128GCM = new JWEEnc(4, 'A128GCM');


    /**
     * `A192GCM` (5); AES GCM using 192 bit key.
     */
    public static readonly A192GCM = new JWEEnc(5, 'A192GCM');


    /**
     * `A256GCM` (6); AES GCM using 256 bit key.
     */
    public static readonly A256GCM = new JWEEnc(6, 'A256GCM');
}