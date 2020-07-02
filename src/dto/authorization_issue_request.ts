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

import ct from 'https://cdn.pika.dev/class-transformer@^0.2.3';
import 'https://cdn.pika.dev/reflect-metadata@^0.1.13';
import { Property } from './property.ts';
const { Type } = ct;


/**
 * Request to Authlete `/auth/authorization/issue` API.
 */
export class AuthorizationIssueRequest
{
    /**
     * The ticket issued by Authlete `/auth/authorization` endpoint.
     */
    public ticket?: string;


    /**
     * The subject (end-user) managed by the service.
     */
    public subject?: string;


    /**
     * The value of the `sub` claim in an ID token. When this field is
     * empty, `subject` is used.
     */
    public sub?: string;


    /**
     * The time when the end-user was authenticated.
     */
    public authTime?: number;


    /**
     * The authentication context class reference.
     */
    public acr?: string;


    /**
     * Claims in JSON format.
     */
    public claims?: string;


    /**
     * Extra properties to associate with an access token and/or an
     * authorization code.
     */
    @Type(() => Property)
    public properties?: Property[];


    /**
     * Scopes to associate with an access token and/or an authorization
     * code. If this field is unset, the scopes specified in the original
     * authorization request from the client application are used. In
     * other cases, including the case of an empty array, the scopes
     * here will replace the original scopes contained in the original
     * request.
     */
    public scopes?: string[];


    /**
     * Set the `claims` property.
     *
     * The service implementation is required to retrieve claims of the
     * subject (= information about the end-user) from its database and
     * format them in JSON format.
     *
     * For example, if `given_name` claim, `family_name` claim and `email`
     * claim are requested, the service implementation should generate
     * a JSON object like the following:
     *
     * ```json
     * {
     *   "given_name": "Hideki",
     *   "family_name": "Ikeda",
     *   "email": "hideki.ikeda@example.com"
     * }
     * ```
     *
     * and set its String representation by this method.
     *
     * See [OpenID Connect Core 1.0, 5.1. Standard Claims](
     * http://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)
     * for further details about the format.
     *
     * @param claims
     *         The claims of the subject. Keys are claim names.
     */
    public setClaims(claims: { [key: string]: any }): void
    {
        try
        {
            // Store the claim object as a JSON string.
            this.claims = JSON.stringify(claims);
        }
        catch(e)
        {
            // Do nothing if the conversion fails.
        }
    }
}