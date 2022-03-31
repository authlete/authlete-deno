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


import { AuthleteConfiguration } from '../config/authlete_configuration.ts';
import { AuthletePropertyConfiguration } from '../config/authlete_configuration_property.ts';
import { AuthleteApi } from './authlete_api.ts';


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
async function createImplClass(
    config: AuthleteConfiguration, implInfo: ImplInfo): Promise<AuthleteApi>
{
    // Dynamically import modules from the path in which the target
    // implementation class exists.
    const imported = await import(implInfo.path).catch((e) => {
        throw new Error(`Failed to import from ${implInfo.path}: ${e}`);
    });

    // Get the constructor of the target implementation class from the
    // imported modules.
    const ctor: { new(config: AuthleteConfiguration): AuthleteApi } = imported[implInfo.name];

    // The target implementation class was not found the imported modules.
    if (!ctor)
    {
        throw new Error(`The module ${implInfo.name} does not exist in the ${implInfo.path}.`);
    }

    // Instantiate the target implementation class using the constructor
    // with the given configuration.
    try
    {
        return new ctor(config);
    }
    catch(e)
    {
        throw new Error(`Failed to instantiate the class (${implInfo.name}): ${e}.`);
    }
}


/**
 * The factory to create an `AuthleteApi` instance.
 */
export class AuthleteApiFactory
{
    /**
     * The promise object for creating the default `AuthleteApi` instance.
     */
    private static defaultApiPromise: Promise<AuthleteApi> | null = null;


    /**
     * Get a promise object that returns the default `AuthleteApi` instance.
     *
     * When this method is first called, it creates a promise object
     * that loads configuration information from a property file named
     * `authlete.json` (, which must be located directly under the execution
     * directory) and creates an instance of the standard implementation
     * class of `AuthleteApi` interface with the configuration. And then,
     * the promise object is cached in this class. This means that subsequent
     * calls to this method return the cached promise object.
     */
    public static async getDefault(): Promise<AuthleteApi>
    {
        // If we don't have a promise object that creates the default
        // API instance.
        if (!this.defaultApiPromise)
        {
            // Create a promise object that creates the default API instance
            // and then cache the promise object.
            this.defaultApiPromise = this.createDefaultApi().catch((e) => {
                // Reset the cache to null.
                this.defaultApiPromise = null;

                // Failed to create the default API instance.
                throw new Error(`Failed to create the default API instance: ${e}`);
            });
        }

        // Return the promise object.
        return this.defaultApiPromise;
    }


    private static async createDefaultApi(): Promise<AuthleteApi>
    {
        // Get configuration from the property file (= 'authlete.json').
        const config = await AuthletePropertyConfiguration.create();

        // Create an AuthleteApi instance with the configuration.
        return this.create(config, STANDARD_IMPL_INFO);
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
    public static async create(
        config: AuthleteConfiguration, implInfo: ImplInfo = STANDARD_IMPL_INFO): Promise<AuthleteApi>
    {
        return createImplClass(config, implInfo);
    }
}
