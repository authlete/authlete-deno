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


/**
 * An interface that represents a resource owner (in the context of
 * [OAuth 2.0](https://tools.ietf.org/html/rfc6749)) or an end user (in
 * the context of [OpenID Connect](http://openid.net/connect/)).
 */
export interface User
{
    /**
     * The subject (= unique identifier) of the user.
     */
    subject: string;


    /**
     * Get the value of a claim of the user.
     *
     * @param claimName
     *         A claim name such as `name` and `family_name`. Standard
     *         claim names are listed in [5.1. Standard Claims](
     *         http://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)
     *         of [OpenID Connect Core 1.0](http://openid.net/specs/openid-connect-core-1_0.html)
     *         Those values are listed by `StandardClaims` class.
     *
     * @param languageTag
     *         A language tag such as `en` and `ja`. Implementations
     *         should take this into account whenever possible. See [5.2.
     *         Claims Languages and Scripts](http://openid.net/specs/openid-connect-core-1_0.html#ClaimsLanguagesAndScripts)
     *         in [OpenID Connect Core 1.0](http://openid.net/specs/openid-connect-core-1_0.html)
     *         for details.
     *
     * @returns The claim value. `null` if the claim value of the claim
     *          is not available.
     */
    getClaim(claimName: string, languageTag?: string): any;


    /**
     * The value of an attribute of the user.
     *
     * @param attributeName
     *         An attribute name.
     *
     * @returns The attribute value. `null` if the attribute value of
     *          the attribute is not available.
     */
    getAttribute(attributeName: string): any;
}