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

import { Response } from 'https://deno.land/std/http/server.ts';
import { AuthorizationResponse } from '../dto/authorization_response.ts';
import { Property } from '../dto/property.ts';
import { AuthorizationRequestHandlerSpi } from './authorization_request_handler_spi.ts';


/**
 * Empty implementation of `AuthorizationRequestHandlerSpi` interface.
 */
export class AuthorizationRequestHandlerSpiAdapter implements AuthorizationRequestHandlerSpi
{
    public isUserAuthenticated(): boolean
    {
        return false;
    }


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


    public async generateAuthorizationPage(info: AuthorizationResponse): Promise<Response>
    {
        throw Error('Implement generateAuthorizationPage().');
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