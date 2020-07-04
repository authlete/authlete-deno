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
 * Address claim that represents a physical mailing address. For more
 * details, see [OpenID Connect Core 1.0, 5.1.1. Address Claim](
 * http://openid.net/specs/openid-connect-core-1_0.html#AddressClaim).
 */
export class Address
{
    // NOTE: Some fields are intentionally in snake case.

    /**
     * The full mailing address, formatted for display or use on a
     * mailing label.
     */
    public formatted?: string;


    /**
     * The full street address, which MAY include house number, street
     * name, Post Office Box, and multi-line extended street address
     * information.
     */
    public street_address?: string;


    /**
     * The city or locality.
     */
    public locality?: string;


    /**
     * The state, province, prefecture, or region.
     */
    public region?: string;


    /**
     * The zip code or postal code.
     */
    public postal_code?: string;


    /**
     * The country name.
     */
    public country?: string;
}