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
 * Values for `subject_type`.
 *
 * For more details, see [OpenID Connect Core 1.0, 8. Subject Identifier
 * Types](http://openid.net/specs/openid-connect-core-1_0.html#SubjectIDTypes).
 */
export class SubjectType extends BaseExtendedEnum
{
    /**
     * `public` (1).
     *
     * This provides the same `sub` (subject) value to all Clients. It
     * is the default if the provider has no `subject_types_supported`
     * element in its discovery document.
     */
    public static readonly PUBLIC = new SubjectType(1, 'public');


    /**
     * `pairwise` (2).
     *
     * This provides a different `sub` value to each sector identifier,
     * so as not to enable Clients to correlate the End-User's activities
     * without permission. See [8.1. Pairwise Identifier Algorithm](
     * https://openid.net/specs/openid-connect-core-1_0.html#PairwiseAlg)
     * for details.
     */
    public static readonly PAIRWISE = new SubjectType(2, 'pairwise');
}