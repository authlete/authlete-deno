// Copyright (C) 2020−2022 Authlete, Inc.
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


import { isUndefined } from '../util/util.ts';
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
 *   "serviceApiSecret": "...",
 *   "timeout": 10000
 * }
 * ```
 */
const PROPERTY_FILE_NAME = 'authlete.json';


/**
 * The default value of the 'baseUrl' property of the configuration.
 */
const DEFAULT_BASE_URL = 'https://api.authlete.com/api';


/**
 * The default value of 'timeout' property of the configuration.
 */
const DEFAULT_TIMEOUT = 5000;


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
function createConfiguration(props: properties): AuthletePropertyConfiguration
{
    // Create a configuration instance.
    const config: AuthleteConfiguration = new AuthletePropertyConfiguration();

    // Set up the configuration.
    config.baseUrl               = getString(props['baseUrl'], DEFAULT_BASE_URL);
    config.serviceOwnerApiKey    = getString(props['serviceOwnerApiKey']);
    config.serviceOwnerApiSecret = getString(props['serviceOwnerApiSecret']);
    config.serviceApiKey         = getString(props['serviceApiKey']);
    config.serviceApiSecret      = getString(props['serviceApiSecret']);
    config.timeout               = getInteger(props['timeout'], DEFAULT_TIMEOUT);

    return config;
}


/**
 * Get a string value. If the given value is `undefined`, the default
 * value is returned.
 */
function getString(value: any, defaultValue: string | undefined = undefined):
    string | undefined
{
    // If the value is undefined.
    if (isUndefined(value))
    {
        return defaultValue;
    }

    // Convert the value as a string value.
    return value.toString();
}


/**
 * Get a integer value. If the given value is undefined or can't be parsed
 * as an integer value, the default value is returned.
 */
function getInteger(value: any, defaultValue: number | undefined = undefined):
    number | undefined
{
    // If the value is undefined.
    if (isUndefined(value))
    {
        return defaultValue;
    }

    // Parse the value as an integer value.
    const valueAsInteger = parseInt(value, 10);

    // If the parsed value is 'NaN'. This will happen if the given value
    // is set to a string that can't be parsed as a integer value (e.g.
    // 'ABC').
    if (isNaN(valueAsInteger))
    {
        return defaultValue;
    }

    // Return the parsed integer value.
    return valueAsInteger;
}


/**
 * Implementation of `AuthleteConfiguration` based on a properties file.
 * Use this class for creating configuration based on a property file
 * named `authlete.json`.
 */
export class AuthletePropertyConfiguration implements AuthleteConfiguration
{
    /**
     * Create a configuration from a property file named `authlete.json`.
     * The property file must be located directly under the execution
     * directory. Here is an example of `authlete.json`.
     *
     * ```json
     * {
     *   "baseUrl": "https://api.authlete.com/api",
     *   "serviceOwnerApiKey": "<YOUR_SERVICE_OWNER_API_KEY>",
     *   "serviceOwnerApiSecret": "<YOUR_SERVICE_OWNER_API_SECRET>",
     *   "serviceApiKey": "<YOUR_SERVICE_API_KEY>",
     *   "serviceApiSecret": "<YOUR_SERVICE_API_SECRET>",
     *   "timeout": 10000
     * }
     * ```
     *
     * If failed to read the property file or failed to parse it as JSON,
     * error is thrown.
     */
    public static async create(): Promise<AuthletePropertyConfiguration>
    {
        // Load the property file.
        const props = await loadProperty(PROPERTY_FILE_NAME);

        // Create a configuration from the loaded properties.
        return createConfiguration(props);
    }
}