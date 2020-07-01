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
 * Service Provider Interface to work with `UserInfoRequestHandler`.
 *
 * An implementation of this interface must be given to the constructor
 * of `UserInfoRequestHandler` class.
 */
export interface UserInfoRequestHandlerSpi
{
    /**
     * Prepare claim values of the user who is identified by the subject
     * (= unique identifier).
     *
     * This method is called before calls of `getUserClaim()` method.
     *
     * @param subject
     *         The subject (= unique identifier) of the user.
     *
     * @param claimNames
     *         Names of the requested claims. Each claim name
     *         may contain a language tag. See [5.2. Claims Languages
     *         and Scripts](http://openid.net/specs/openid-connect-core-1_0.html#ClaimsLanguagesAndScripts)
     *         in [OpenID Connect Core 1.0](http://openid.net/specs/openid-connect-core-1_0.html)
     *         for details.
     */
    prepareUserClaims(subject: string, claimNames: string[]): void;


    /**
     * Get the value of a claim of the user.
     *
     * This method may be called multiple times.
     *
     * @param claimName
     *         A claim name such as `name` and `family_name`. Standard
     *         claim names are listed in "[5.1. Standard Claims](
     *         http://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)"
     *         of [OpenID Connect Core 1.0](http://openid.net/specs/openid-connect-core-1_0.html).
     *         Java constant values that represent the standard claims
     *         are listed in `StandardClaims`} class. The value of
     *         `claimName` does NOT contain a language tag.
     *
     * @param languageTag
     *         A language tag such as `en` and `ja`. Implementations
     *         should take this into account whenever possible.
     *         See ">[5.2. Claims Languages and Scripts](
     *         http://openid.net/specs/openid-connect-core-1_0.html#ClaimsLanguagesAndScripts)"
     *         in [OpenID Connect Core 1.0](http://openid.net/specs/openid-connect-core-1_0.html)
     *         for details.
     *
     * @returns The claim value. `null` if the claim value of the claim
     *          is not available.
     */
    getUserClaim(claimName: string, languageTag?: string): any;
}