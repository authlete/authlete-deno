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


import { BaseExtendedEnum } from './base_extended_enum.ts';


/**
 * Types of hints for end-user identification.
 */
export class UserIdentificationHintType extends BaseExtendedEnum
{
    /**
     * `id_token_hint` (1).
     *
     * An ID token previously issued to the client.
     */
    public static readonly ID_TOKEN_HINT = new UserIdentificationHintType(1, 'id_token_hint');


    /**
     * `login_hint` (2).
     *
     * An arbitrary string whose interpretation varies depending on contexts.
     */
    public static readonly LOGIN_HINT = new UserIdentificationHintType(2, 'login_hint');


    /**
     * `login_hint_token` (3).
     *
     * A token whose format is deployment or profile specific.
     */
    public static readonly LOGIN_HINT_TOKEN = new UserIdentificationHintType(3, 'login_hint_token');
}