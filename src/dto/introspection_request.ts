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
 * Request to Authlete `/auth/introspection` API.
 */
export class IntrospectionRequest
{
    /**
     * The access token which has been issued by Authlete.
     */
    public token?: string;


    /**
     * The scopes which are required to access the target protected
     * resource. If the array contains a scope which is not covered by
     * the access token, Authlete `/auth/introspection` API returns
     * `FORBIDDEN` as the action and `insufficient_scope` as the error
     * code.
     *
     * @param scopes
     *         Scopes required to access the target protected resource.
     *         If this property is not set, Authlete `/auth/introspection`
     *         endpoint does not perform scope checking.
     */
    public scopes?: string[];


    /**
     * The subject (= end-user ID managed by the service implementation)
     * that is required to access the target protected resource. If the
     * specified subject is different from the one associated with the
     * access token, Authlete `/auth/introspection` API returns `FORBIDDEN`
     * as the action and `invalid_request` as the error code.
     *
     * @param subject
     *         Subject (= end-user ID managed by the service implementation)
     *         which is required to access the protected resource. If
     *         this property is not set, Authlete `/auth/introspection`
     *         endpoint does not perform subject checking.
     */
    public subject?: string;


    /**
     * The client certificate, used to validate binding against access
     * tokens using the TLS client certificate confirmation method.
     *
     * @param clientCertificate
     *         The certificate in PEM format.
     */
    public clientCertificate?: string;
}