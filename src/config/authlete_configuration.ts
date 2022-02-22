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
 * The interface for configuration.
 */
export interface AuthleteConfiguration
{
    /**
     * The base URL of Authlete API.
     */
    baseUrl?: string;


    /**
     * The service owner API key.
     */
    serviceOwnerApiKey?: string;


    /**
     * The service owner API secret.
     */
    serviceOwnerApiSecret?: string;


    /**
     * The service API key.
     */
    serviceApiKey?: string;


    /**
     * The service API secret.
     */
    serviceApiSecret?: string;

    /**
     * The request fetch timeout.
     */
    timeout?: number;
}