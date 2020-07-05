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


import { UserClaimProvider } from "./user_claim_provider.ts";


/**
 * Interface to get a claim value by specifying a user's subject,
 * a claim name and optionally a language tag.
 */
export class UserClaimProviderAdapter implements UserClaimProvider
{
    public getUserClaimValue(subject: string, claimName: string, languageTag?: string): any
    {
        return null;
    }
}