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

import { Response } from 'https://deno.land/std/http/server.ts';
import { AuthleteApi } from '../api/authlete_api.ts';
import { AuthleteApiCaller } from '../web/authlete_api_caller.ts';
import { ContentType, internalServerError } from '../web/response_util.ts';
import { WebApplicationException } from '../web/web_application_exception.ts';


/**
 * Create a WebApplicationException instance that contains a response
 * of `'500 Internal Server Error'`.
 */
function unexpected(message: string, error: Error): WebApplicationException
{
    if (error && error.message)
    {
        // Append the message of the error.
        message += ': ' + error.message;
    }

    // A response of '500 Internal Server Error'.
    const response: Response = internalServerError(message, ContentType.TEXT_HTML_UTF8);

    // Throw an exception having the response.
    return new WebApplicationException(response, error);
}


/**
 * The base class for a handler class.
 */
export abstract class BaseHandler<ArgType>
{
    /**
     * The Authlete API caller
     */
    protected apiCaller: AuthleteApiCaller;


    /**
     * The constructor
     *
     * @param api - An Authlete API client.
     */
    public constructor(api: AuthleteApi)
    {
        // Create an Authlete API caller.
        this.apiCaller = new AuthleteApiCaller(api);
    }


    /**
     * Handle the process of this handler. The major part of the process
     * is delegated to `doHandle` method, which must be implemented by
     * a subclass that extends this class. This method returns a promise
     * containing a Deno's standard `Response` object (defined in
     * 'https://deno.land/std/http/server.ts').
     *
     * @param args - The arguments for this method. The type of the
     *               arguments must be the type specified by `ArgType`.
     *
     * @returns A promise containing a `Response` object.
     */
    public async handle(args: ArgType): Promise<Response>
    {
        try
        {
            // Process the given parameters.
            return await this.doHandle(args);
        }
        catch (e)
        {
            if (e instanceof WebApplicationException)
            {
                // Rethrow the error if it's a WebApplicationException.
                throw e;
            }
            else
            {
                // Unexpected error.
                throw unexpected(`Unexpected error in ${this.constructor.name}`, e);
            }
        }
    }


    /**
     * This method is responsible for processing the main task of this
     * handler. A subclass extending this class must implement this
     * method. Also, this method must return a promise containing a Deno's
     * standard `Response` object (defined in 'https://deno.land/std/http/server.ts').
     *
     * @param args - The arguments passed to `handle` method.
     *
     * @returns A promise containing a `Response` object.
     */
    protected abstract async doHandle(args: ArgType): Promise<Response>
}