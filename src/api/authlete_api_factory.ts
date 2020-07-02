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

import { AuthleteConfiguration } from "../config/authlete_configuration.ts";
import { AuthletePropertyConfiguration } from "../config/authlete_configuration_property.ts";
import { AuthleteApi } from "./authlete_api.ts";


/**
 * The alias for the type of an object holding information about an
 * implementation class of `AuthleteApi` interface.
 */
export type ImplInfo = {
    /**
     *  The name of the implementation class.
     */
    name: string,

    /**
     * The path of the file in which the implementation class exists.
     */
    path: string
}


/**
 * The information about the standard implementation of `AuthleteApi`
 * interface.
 */
export const STANDARD_IMPL_INFO = {
    name: 'AuthleteApiImpl',
    path: './authlete_api_impl.ts'
}


/**
 * Create an instance of the implementation class (that implements
 * `AuthleteApi` interface) with the configuration.
 */
async function createImplClass(config: AuthleteConfiguration, implInfo: ImplInfo): Promise<AuthleteApi>
{
    // Dynamically import modules from the path in which the target
    // implementation class exists.
    const imported = await import(implInfo.path).catch((e) => {
        throw `Failed to import from ${implInfo.path}: ${e}`;
    })

    // Get the constructor of the target implementation class from the
    // imported modules.
    const ctor: { new(config: AuthleteConfiguration): AuthleteApi } = imported[implInfo.name];

    // The target implementation class was not found the imported modules.
    if (!ctor)
    {
        throw `The module ${implInfo.name} does not exist in the ${implInfo.path}.`;
    }

    // Instantiate the target implementation class using the constructor
    // with the given configuration.
    try
    {
        return new ctor(config);
    }
    catch(e)
    {
        throw `Failed to instantiate the class (${implInfo.name}): ${e}`;
    }
}


/**
 * The factory to create an `AuthleteApi` instance.
 */
export class AuthleteApiFactory
{
    /**
     * The default `AuthleteApi` instance.
     */
    private static defaultApi: AuthleteApi | null = null;


    /**
     * Get the default `AuthleteApi` instance.
     *
     * When this method is first accessed, it loads configuration information
     * from a property file named `authlete.json` (which must be located
     * directly under the execution directory) and creates an instance
     * of the standard implementation class of `AuthleteApi` interface
     * with the configuration.
     *
     * Note that the created instance is internally cached in this class
     * and subsequent calls to this method return the cached instance.
     */
    public static async getDefault()
    {
        // If the instance has not been created yet.
        if (!this.defaultApi)
        {
            // Get configuration from the property file (= 'authlete.json').
            const config = await AuthletePropertyConfiguration.create();

            // Create an AuthleteApi instance with the configuration.
            this.defaultApi = await this.create(config, STANDARD_IMPL_INFO);
        }

        return this.defaultApi;
    }


    /**
     * Create an instance of a class that implements `AuthleteApi`
     * interface with configuration.
     *
     * @param config
     *         Configuration passed to the constructor of the target
     *         implementation class specified by `implInfo`.
     *
     * @param implInfo
     *         The information about a class that implements `AuthleteApi`
     *         interface. Defaults to the information about the standard
     *         implementation. Note that an implementation class specified
     *         by this must have a constructor that only takes one argument
     *         of type `AuthleteConfiguration`.
     */
    public static async create(config: AuthleteConfiguration, implInfo: ImplInfo = STANDARD_IMPL_INFO)
    {
        return await createImplClass(config, implInfo);
    }
}
