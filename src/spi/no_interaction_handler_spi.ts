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
 * Service Provider Interface to work with `AuthorizationRequestHandler`.
 *
 * An implementation of this interface must be given to the constructor
 * of `AuthorizationRequestHandler` class.
 */
export interface NoInteractionHandlerSpi extends AuthorizationRequestHandlerSpi
{
    /**
     * Check whether an end-user has already logged in or not.
     *
     * This method is called only when an authorization request comes
     * with `prompt=none`. Therefore, if you have no mind to support
     * `prompt=none`, always return `false`. See [3.1.2.1. Authentication
     * Request](http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)
     * in [OpenID Connect Core 1.0](http://openid.net/specs/openid-connect-core-1_0.html)
     * for details about `prompt=none`.
     *
     * @returns `true` if an end-user has already logged in. Otherwise,
     *          `false`. When `false` is returned, the client application
     *          will receive `error=login_required`.
     */
    isUserAuthenticated(): boolean;
}