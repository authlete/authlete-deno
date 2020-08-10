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


import { Response } from 'https://deno.land/std@0.64.0/http/server.ts';
import { isObject } from '../util/util.ts';
import { internalServerError } from '../web/response_util.ts';
import { formUrlEncode } from '../web/url_coder.ts';


/**
 * Normalize the given parameter as `parameters` parameter for
 * some Authlete APIs such as `/api/auth/authorization` API and
 * `/api/auth/token` API.
 */
export function normalizeParameters(
    parameters: string | { [key: string]: string } | null): string
{
    if (parameters === null)
    {
        // Authlete returns different error codes for null and an empty
        // string. 'null' is regarded as a caller's error. An empty string
        // is regarded as a client application's error.
        return '';
    }

    // If the 'parameters' is an Object ({ [key:string]: string }).
    if (isObject(parameters))
    {
        // Convert the object to a form-url-encoded string.
        return formUrlEncode(parameters as { [key: string]: string });
    }

    // The 'parameters' is a string. In this case, just return the original
    // value.
    return parameters as string;
}


/**
 * Create a `Response` instance that indicates the value of `action`
 * parameter contained in a response from an Authlete API is unknown.
 */
export function unknownAction(path: string)
{
    // 500 Internal Server Error.
    return internalServerError(`Authlete ${path} API returned an unknown action`);
}


/**
 * Create a `Response` instance that indicates the value of `action`
 * parameter contained in a response from an Authlete API is invalid.
 */
export function invalidAction(action: string)
{
    // 500 Internal Server Error.
    return internalServerError(`${action} is an invalid action.`);
}


/**
 * The base class for a handler class.
 */
export abstract class BaseHandler<ArgType>
{
    /**
     * This method is responsible for processing the main task of this
     * handler. This method must return a promise containing an instance
     * of Deno's standard `Response` class (defined in https://deno.land/std/http/server.ts).
     *
     * A subclass extending this class must implement this method.
     *
     * @param args
     *         The arguments for this method. The type of the arguments
     *         must be the type specified by `ArgType` you specify for
     *         this class.
     *
     * @returns A promise containing a `Response` object.
     */
    public abstract async handle(args: ArgType): Promise<Response>
}