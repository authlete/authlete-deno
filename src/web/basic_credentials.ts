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


import { isEmpty } from '../util/util.ts';


/**
 * A regular expression to parse `Authorization` header.
 */
const PATTERN = /^Basic\s(.+)$/i;


/**
 * Credentials in Basic authentication.
 */
export class BasicCredentials
{
    /**
     * The ID of a user.
     */
    public userId?: string;


    /**
     * The password of a user.
     */
    public password?: string;


    /**
     * The constructor with the credentials.
     *
     * @param userId
     *         The ID of a user.
     *
     * @param password
     *         The password of a user.
     */
    constructor(userId?: string, password?: string)
    {
        this.userId   = userId;
        this.password = password;
    }


    /**
     * Parse `Authorization` header for Basic authentication.
     *
     * @param input
     *         The value of `Authorization` header. Expected inputs are
     *         either `"Basic _{Base64-Encoded-UserID-and-Password}_"`,
     *         or `"_{Base64-Encoded-UserID-and-Password}_"`.
     *
     * @returns If `input` was successfully parsed, parsed credentials
     *          is returned. Otherwise, `null` is returned.
     */
    public static parse(input: string | null): BasicCredentials | null
    {
        // Return null if the input is empty.
        if (isEmpty(input)) return null;

        const result = PATTERN.exec(input);

        // Return null if the value did not match the regex.
        if (result === null) return null;

        // "userid:password" encoded in Base64.
        const encoded = result[1];

        // Decode the Base64 string.
        const decoded = atob(encoded);

        // Split "userid:password" into "userid" and "password".
        const credentials = decoded.split(':', 2);

        // Create an instance of this class.
        return new BasicCredentials(credentials[0], credentials[1]);
    }
}