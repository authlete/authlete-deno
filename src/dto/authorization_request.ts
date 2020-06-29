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
 * Request to Authlete `/auth/authorization` API.
 */
export class AuthorizationRequest
{
    /**
     * OAuth 2.0 authorization request parameters which are the request
     * parameters that the OAuth 2.0 authorization endpoint of the
     * authorization server implementation received from the client
     * application.
     *
     * The value of `parameters` is either (1) the entire query string
     * when the HTTP method of the request from the client application
     * is `GET` or (2) the entire entity body (which is formatted in
     * `application/x-www-form-urlencoded`) when the HTTP method of the
     * request from the client application is `POST`.
     */
    public parameters?: string;
}