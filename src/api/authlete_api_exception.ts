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
 * Authlete API Exception.
 */
export class AuthleteApiException extends Error
{
    /**
     * HTTP status code of the error response associated with this exception.
     */
    public statusCode?: number;


    /**
     * HTTP status message of the error response associated with this exception.
     */
    public statusMessage?: string;


    /**
     * The body of the error response associated with this exception.
     */
    public responseBody?: string;


    /**
     * The headers of the error response associated with this exception.
     */
    public headers?: Headers;


    /**
     * Create an `AuthleteApiException` instance.
     *
     * @param message - A message of the exception.
     *
     * @param statusCode - HTTP status code of the error response
     *                     to be associated with the exception.
     *
     * @param statusMessage - HTTP status message of the error response
     *                        to be associated with the exception.
     *
     * @param responseBody - The body of the error response to be
     *                       associated with the exception.
     *
     * @param headers - The headers of the error response to be
     *                  associated with the exception.
     */
    public constructor(
        message?: string, statusCode?: number, statusMessage?: string, responseBody?: string, headers?: Headers)
    {
        super(message);

        // Set the class name.
        this.name = new.target.name;

        // Restore prototype chain.
        Object.setPrototypeOf(this, new.target.prototype);

        this.statusCode    = statusCode;
        this.statusMessage = statusMessage;
        this.responseBody  = responseBody;
        this.headers       = headers;
    }
}