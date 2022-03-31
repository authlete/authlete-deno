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


import { AuthorizationRequestHandlerSpiAdapter } from './authorization_request_handler_spi_adapter.ts';
import { NoInteractionHandlerSpi } from './no_interaction_handler_spi.ts';


/**
 * Empty implementation of `AuthorizationRequestHandlerSpi` interface.
 */
export class NoInteractionHandlerSpiAdapter
    extends AuthorizationRequestHandlerSpiAdapter implements NoInteractionHandlerSpi
{
    public isUserAuthenticated(): boolean
    {
        return false;
    }
}