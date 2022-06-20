// Copyright (C) 2022 Authlete, Inc.
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
 * Request to Authlete `/pushed_auth_req` API.
 */
export class PushedAuthReqRequest
{
    /**
     * The request parameters that the pushed authorization request
     * endpoint received from the client application.
     */
    public parameters?: string;


    /**
     * The client ID extracted from the `Authorization` header of the
     * request to the pushed authorization request endpoint.
     */
    public clientId?: string;


    /**
     * The client secret extracted from the `Authorization` header of
     * the request to the pushed authorization request endpoint.
     */
    public clientSecret?: string;


    /**
     * The client certificate used in the TLS connection between the client
     * application and the pushed authorization request endpoint.
     */
    public clientCertificate?: string;


    /**
     * The client certificate path presented by the client during client
     * authentication.
     */
    public clientCertificatePath?: string[];
}