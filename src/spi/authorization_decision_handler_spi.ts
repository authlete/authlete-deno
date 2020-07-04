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


import { AuthorizationRequestHandlerSpi } from './authorization_request_handler_spi.ts';


/**
 * Service Provider Interface to work with `AuthorizationDecisionHandler`.
 *
 * An implementation of this interface must be given to the constructor
 * of `AuthorizationDecisionHandler` class.
 */
export interface AuthorizationDecisionHandlerSpi extends AuthorizationRequestHandlerSpi
{
    /**
     * Get the decision on the authorization request.
     *
     * @returns `true` if the end-user has decided to grant authorization
     *          to the client application. Otherwise, `false`.
     */
    isClientAuthorized(): boolean;
}