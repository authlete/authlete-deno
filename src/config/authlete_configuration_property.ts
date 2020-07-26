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


import { AuthleteConfiguration } from './authlete_configuration.ts';


/**
 * The name of the target property file (JSON). Below is an example of
 * a property file.
 *
 * ```json
 * {
 *   "baseUrl": "https://api.authlete.com/api",
 *   "serviceOwnerApiKey": "...",
 *   "serviceOwnerApiSecret": "...",
 *   "serviceApiKey": "...",
 *   "serviceApiSecret": "..."
 * }
 * ```
 */
const PROPERTY_FILE_NAME = 'authlete.json';


/**
 * The default value of the 'baseUrl' property of the configuration.
 */
const DEFAULT_BASE_URL = 'https://api.authlete.com/api';


/**
 * The alias for the type of an object that the contents of the property
 * file (JSON) is parsed into.
 */
type properties = { [key: string]: any };


/**
 * Read a property file from the execution directory and parse it as
 * JSON.
 */
async function loadProperty(propertyFileName: string): Promise<properties>
{
    // Read the property file.
    const file = await Deno.readTextFile(propertyFileName).catch(() => {
        // Failed to read the property file.
        throw new Error(`Failed to read ${propertyFileName}`);
    });

    try
    {
        // Parse the contents of the property file as JSON.
        return JSON.parse(file) as properties;
    }
    catch (e)
    {
        // Failed to parse the contents of the property file as JSON.
        throw new Error(`Failed to parse the contents of the property file as JSON.`);
    }
}


/**
 * Create an `AuthletePropertyConfiguration` instance from properties.
 */
function createConfiguration(props: properties)
{
    // Create a configuration instance.
    const config: AuthleteConfiguration = new AuthletePropertyConfiguration();

    // Set up the configuration.
    config.baseUrl               = props['baseUrl'] || DEFAULT_BASE_URL;
    config.serviceOwnerApiKey    = props['serviceOwnerApiKey'];
    config.serviceOwnerApiSecret = props['serviceOwnerApiSecret'];
    config.serviceApiKey         = props['serviceApiKey'];
    config.serviceApiSecret      = props['serviceApiSecret'];

    return config;
}


/**
 * Implementation of `AuthleteConfiguration` based on a properties file.
 * This is a utility class to load a configuration file that includes
 * properties related to Authlete.
 */
export class AuthletePropertyConfiguration implements AuthleteConfiguration
{
    /**
     * Create a configuration from the property file named `authlete.json`.
     * The property file must be located directly under the execution
     * directory. Here is an example of 'authlete.json'.
     *
     * ```json
     * {
     *   "baseUrl": "https://api.authlete.com/api",
     *   "serviceOwnerApiKey": "<YOUR_SERVICE_OWNER_API_KEY>",
     *   "serviceOwnerApiSecret": "<YOUR_SERVICE_OWNER_API_SECRET>",
     *   "serviceApiKey": "<YOUR_SERVICE_API_KEY>",
     *   "serviceApiSecret": "<YOUR_SERVICE_API_SECRET>"
     * }
     * ```
     *
     * If failed to read the property file or failed to parse it as JSON,
     * error is thrown.
     */
    public static async create()
    {
        // Load the property file.
        const props = await loadProperty(PROPERTY_FILE_NAME);

        // Create a configuration from the loaded properties.
        return createConfiguration(props);
    }
}