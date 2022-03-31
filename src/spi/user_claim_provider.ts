// Copyright (C) 2020-2022 Authlete, Inc.
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
 * Interface to get a claim value by specifying a user's subject,
 * a claim name and optionally a language tag.
 */
export interface UserClaimProvider
{
    /**
     * Get the value of a claim of the user. This method may be called
     * multiple times.
     *
     * @param subject
     *         The subject (= unique identifier) of a user.
     *
     * @param claimName
     *         A claim name such as `"name"` and `"family_name"`. Standard
     *         claim names are listed in [5.1. Standard Claims](https://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)
     *         of [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html).
     *         Constant values that represent the standard claims are
     *         listed in `StandardClaims` class. Note that the value of
     *         this argument (`claimName`) does NOT contain a language
     *         tag.
     *
     * @param languageTag
     *         A language tag such as `"en"` and `"ja"`. Implementations
     *         of this method should take this into consideration if possible.
     *         See [5.2. Claims Languages and Scripts](https://openid.net/specs/openid-connect-core-1_0.html#ClaimsLanguagesAndScripts)
     *         of [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
     *         for details.
     *
     * @return The value of the claim. The `Promise` resolves to `null`
     *         if the value is not available. In most cases, it resolves
     *         to a string value. When `claimName` is `"address"`, it
     *         resolves to an instance of `Address` class.
     */
    getUserClaimValue(subject: string, claimName: string, languageTag?: string): any;
}