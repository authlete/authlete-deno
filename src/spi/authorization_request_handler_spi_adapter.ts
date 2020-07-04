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
import { AuthorizationRequestHandlerSpi } from './authorization_request_handler_spi.ts';
import { UserClaimProviderAdapter } from './user_claim_provider_adapter.ts';


/**
 * Empty implementation of `AuthorizationRequestHandlerSpi` interface.
 */
export class AuthorizationRequestHandlerSpiAdapter
    extends UserClaimProviderAdapter implements AuthorizationRequestHandlerSpi
{
    public getUserAuthenticatedAt(): number
    {
        return 0;
    }


    public getUserSubject(): string | null
    {
        return null;
    }


    public getAcr(): string | null
    {
        return null;
    }


    public getProperties(): Property[] | null
    {
        return null;
    }


    public getScopes(): string[] | null
    {
        return null;
    }


    public getSub(): string | null
    {
        return null;
    }
}