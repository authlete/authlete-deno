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
 * Values for `prompt`.
 *
 * For more details, see [OpenID Connect Core 1.0, 3.1.2.1. Authentication
 * Request](http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest).
 */
export class Prompt extends BaseExtendedEnum
{
    /**
     * `none` (0).
     *
     * The Authorization Server MUST NOT display any authentication or
     * consent user interface pages. An error is returned if an End-User
     * is not already authenticated or the Client does not have
     * pre-configured consent for the requested Claims or does not
     * fulfill other conditions for processing the request. The error
     * code will typically be `login_required`, `interaction_required`,
     * or another code defined in [Section 3.1.2.6](
     * http://openid.net/specs/openid-connect-core-1_0.html#AuthError).
     * This can be used as a method to check for existing authentication
     * and/or consent.
     */
    public static readonly NONE = new Prompt(0, 'none');


    /**
     * `login` (1).
     *
     * The Authorization Server SHOULD prompt the End-User for reauthentication.
     * If it cannot reauthenticate the End-User, it MUST return an error,
     * typically `login_required`.
     */
    public static readonly LOGIN = new Prompt(1, 'login');


    /**
     * `consent` (2).
     *
     * The Authorization Server SHOULD prompt the End-User for consent
     * before returning information to the Client. If it cannot obtain
     * consent, it MUST return an error, typically `consent_required`.
     */
    public static readonly CONSENT = new Prompt(2, 'consent');


    /**
     * `select_account` (3).
     *
     * The Authorization Server SHOULD prompt the End-User to select a
     * user account. This enables an End-User who has multiple accounts
     * at the Authorization Server to select amongst the multiple accounts
     * that they might have current sessions for. If it cannot obtain
     * an account selection choice made by the End-User, it MUST return
     * an error, typically `account_selection_required`.
     */
    public static readonly SELECT_ACCOUNT = new Prompt(3, 'select_account');
}