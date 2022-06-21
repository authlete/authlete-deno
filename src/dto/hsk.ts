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


/**
 * A pair of a string key and a string value.
 */
export class Hsk
{
    /**
     * The key type of the key on the HSM.
     *
     * See [RFC 7517 JSON Web Key (JWK), 4.1. "kty" (Key Type) Parameter](
     * https://www.rfc-editor.org/rfc/rfc7517.html#section-4.1) for more
     * details.
     */
    public kty?: string;


    /**
     * Get the use of the key on the HSM.
     *
     * When the key use is `sig` (signature), the private key on the HSM
     * is used to sign data and the corresponding public key is used to
     * verify the signature.

     * When the key use is `enc` (encryption), the private key on the
     * HSM is used to decrypt encrypted data which have been encrypted
     * with the corresponding public key.
     *
     * See [RFC 7517 JSON Web Key (JWK), 4.2. "use" (Public Key Use) Parameter](
     * https://www.rfc-editor.org/rfc/rfc7517.html#section-4.2) for more
     * details.
     */
    public use?: string;


    /**
     * The algorithm of the key on the HSM.
     *
     * When the key use is `sig`, the algorithm represents a signing
     * algorithm such as `ES256`.
     *
     * When the key use is `enc`, the algorithm represents an encryption
     * algorithm such as `RSA-OAEP-256`.
     *
     * See the following links for more details.
     *
     * - [RFC 7517 JSON Web Key (JWK), 4.4. "alg" (Algorithm) Parameter](
     * https://www.rfc-editor.org/rfc/rfc7517.html#section-4.4)
     *
     * - [RFC 7518 JSON Web Algorithms (JWA), 3.1. "alg" (Algorithm)
     * Header Parameter Values for JWS](https://www.rfc-editor.org/rfc/rfc7518.html#section-3.1)
     *
     * - [RFC 7518 JSON Web Algorithms (JWA), 4.1. "alg" (Algorithm)
     * Header Parameter Values for JWE](https://www.rfc-editor.org/rfc/rfc7518.html#section-4.1)
     */
    public alg?: string;


    /**
     * The key ID for the key on the HSM.
     *
     * See [RFC 7517 JSON Web Key (JWK), 4.5. "kid" (Key ID) Parameter](
     * https://www.rfc-editor.org/rfc/rfc7517.html#section-4.5) for more
     * details.
     */
    public kid?: string;


    /**
     * The name of the HSM.
     *
     * The identifier for the HSM that sits behind the Authlete server.
     * For example, `google`.
     */
    public hsmName?: string;


    /**
     * The handle for the key on the HSM.
     *
     * A handle is a base64url-encoded 256-bit random value (43 letters)
     * which is assigned by Authlete on the call of the `/hsk/create`
     * API.
     *
     * A handle is needed to call the `/hsk/get/{handle}` API and the
     * `/hsk/delete/{handle}` API.
     */
    public handle?: string;


    /**
     * The public key that corresponds to the key on the HSM.
     */
    public publicKey?: string;
}