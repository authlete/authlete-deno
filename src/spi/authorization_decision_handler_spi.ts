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

import { Property } from '../dto/property.ts';


/**
 * Service Provider Interface to work with `AuthorizationDecisionHandler`.
 *
 * An implementation of this interface must be given to the constructor
 * of `AuthorizationDecisionHandler` class.
 */
export interface AuthorizationDecisionHandlerSpi
{
    /**
     * Get the decision on the authorization request.
     *
     * @returns `true` if the end-user has decided to grant authorization
     *          to the client application. Otherwise, `false`.
     */
    isClientAuthorized(): boolean;


    /**
     * Get the time when the end-user was authenticated.
     *
     * For example, if an authorization always requires an end-user
     * to login, the authentication time is always "just now", so the
     * implementation of this method will be like the following.
     *
     * ```ts
     * public getUserAuthenticatedAt(): number
     * {
     *     Math.round( Date.now() / 1000 );
     * }
     * ```
     *
     * This method is not called when `isClientAuthorized()` has returned
     *`false`.
     *
     * @returns The time when the end-user authentication occurred.
     *          The number of seconds since Unix epoch (1970-01-01).
     *          Return 0 if the time is unknown.
     */
    getUserAuthenticatedAt(): number;


    /**
     * Ge the subject (= unique identifier) of the end-user. It must
     * consist of only ASCII letters and its length must not exceed 100.
     *
     * In a typical case, the subject is a primary key or another unique
     * ID of the record that represents the end-user in your user database.
     *
     * This method is not called when `isClientAuthorized()` has returned
     *`false`.
     *
     * @returns The subject (= unique identifier) of the end-user.
     *          Returning `null` makes the authorization request fail.
     */
    getUserSubject(): string | null;


    /**
     * Get the authentication context class reference (ACR) that was
     * satisfied when the current end-user was authenticated.
     *
     * The value returned by this method has an important meaning only
     * when an authorization requests `acr` claim as an essential claim.
     * Practically speaking, it is unlikely to happen. See [5.5.1.1.
     * Requesting the "acr" Claim](
     * http://openid.net/specs/openid-connect-core-1_0.html#acrSemanticss)
     * in [OpenID Connect Core 1.0](
     * http://openid.net/specs/openid-connect-core-1_0.html) if you are
     * interested in the details.
     *
     * If you don't know what ACR is, return `null`.
     *
     * @returns The authentication context class reference (ACR) that
     *          was satisfied when the current end-user was authenticated.
     */
    getAcr(): string | null;


    /**
     * Get the value of a claim of the user.
     *
     * This method may be called multiple times. On the other hand, this
     * method is not called when `isClientAuthorized()` has returned
     * `false` or when `getUserSubject()` has returned `null`.
     *
     * @param claimName
     *         A claim name such as `name` and `family_name`. Standard
     *         claim names are listed in "[5.1. Standard Claims](
     *         http://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)"
     *         of [OpenID Connect Core 1.0](http://openid.net/specs/openid-connect-core-1_0.html).
     *         Those values are represented by values listed in `StandardClaims`
     *         enum. The value of `claimName` does NOT contain a language
     *         tag.
     *
     * @param languageTag
     *         A language tag such as `en` and `ja`. Implementations
     *         should take this into account whenever possible. See
     *         "[5.2. Claims Languages and Scripts](
     *         http://openid.net/specs/openid-connect-core-1_0.html#ClaimsLanguagesAndScripts)"
     *         in [OpenID Connect Core 1.0](
     *         http://openid.net/specs/openid-connect-core-1_0.html)
     *         for details.
     *
     * @returns The claim value. `null` if the claim value of the claim
     *          is not available.
     */
    getUserClaim(claimName: string, languageTag?: string): object | null;


    /**
     * Get extra properties to associate with an access token and/or an
     * authorization code.
     *
     * This method is expected to return an array of extra properties.
     * The following is an example that returns an array containing one
     * extra property.
     *
     * ```ts
     * public getProperties(): Property[] | null
     * {
     *     return [
     *         new Property('example_parameter', 'example_value')
     *     ];
     * }
     * ```
     *
     * Extra properties returned from this method will appear as top-level entries
     * in a JSON response from an authorization server as shown in [5.1.
     * Successful Response](https://tools.ietf.org/html/rfc6749#section-5.1)
     * in RFC 6749.
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
     * Note that there is an upper limit on the total size of extra
     * properties. On the server side, the properties will be (1) converted
     * to a multidimensional string array, (2) converted to JSON, (3)
     * encrypted by AES/CBC/PKCS5Padding, (4) encoded by base64url, and
     * then stored into the database. The length of the resultant string
     * must not exceed 65,535 in bytes. This is the upper limit, but
     * we think it is big enough.
     *
     * @returns Extra properties. If `null` is returned, any extra property
     *          will not be associated.
     */
    getProperties(): Property[] | null;


    /**
     * Get scopes to associate with an access token and/or an authorization
     * code.
     *
     * If `null` is returned, the scopes specified in the original
     * authorization request from the client application are used. In
     * other cases, including the case of an empty array, the specified
     * scopes will replace the original scopes contained in the original
     * authorization request.
     *
     * Even scopes that are not included in the original authorization
     * request can be specified. However, as an exception, `openid` scope
     * is ignored on the server side if it is not included in the original
     * request. It is because the existence of `openid` scope considerably
     * changes the validation steps and because adding `openid` triggers
     * generation of an ID token (although the client application has
     * not requested it) and the behavior is a major violation against
     * the specification.
     *
     * If you add `offline_access` scope although it is not included in
     * the original request, keep in mind that the specification
     * requires explicit consent from the user for the scope ([OpenID
     * Connect Core 1.0, 11. Offline Access](
     * http://openid.net/specs/openid-connect-core-1_0.html#OfflineAccess)).
     * When `offline_access` is included in the original request, the
     * current implementation of Authlete `/api/auth/authorization` API
     * checks whether the request has come along with `prompt` request
     * parameter and the value includes `consent`. However, note that
     * the implementation of Authlete `/api/auth/authorization/issue`
     * API does not perform such checking if `offline_access` scope is
     * is added via this `scopes` parameter.
     *
     * @returns Scopes to associate with an authorization code and/or
     *          an access token. If a non-null value is set, the original
     *          scopes requested by the client application are replaced.
     */
    getScopes(): string[] | null;


    /**
     * Get the value of the `"sub"` claim to be used in the id_token.
     *
     * If doing a pairwise subject derivation, this method should check
     * the registration of the current Client to see if it has a PAIRWISE
     * subject identifier type. If so, it returns the calculated string
     * of that subject. If not, it returns `null` and the value of
     * `getUserSubject()` is used by the API instead.
     *
     * @returns The value of the `sub` claim to be used in the ID token,
     *          or `null` if no such subject exists.
     */
    getSub(): string | null;
}