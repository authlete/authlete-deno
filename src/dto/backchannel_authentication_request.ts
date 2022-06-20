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
 * Request to Authlete `/backchannel/authentication` API.
 */
export class BackchannelAuthenticationRequest
{
    /**
     * The value of `parameters` which are the request parameters that
     * the backchannel authentication endpoint of the OpenID provider
     * implementation received from the client application.
     */
    public parameters?: string;


    /**
     * The client ID extracted from `Authorization` header of the backchannel
     * authentication request from the client application.
     */
    public clientId?: string;


    /**
     * The client secret extracted from `Authorization` header of the
     * backchannel authentication request from the client application.
     */
    public clientSecret?: string;


    /**
     * The client certificate used in the TLS connection between the
     * client application and the backchannel authentication endpoint
     * of the OpenID provider.
     */
    public clientCertificate?: string;


    /**
     * The client certificate path presented by the client during client
     * authentication.
     */
    public clientCertificatePath?: string[];
}