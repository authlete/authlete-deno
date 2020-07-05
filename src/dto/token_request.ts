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
 * Request to Authlete `/auth/token` API.
 */
export class TokenRequest
{
    /**
     * OAuth 2.0 token request parameters which are the request parameters
     * that the OAuth 2.0 token endpoint of the authorization server
     * implementation received from the client application.
     *
     * The value of `parameters` is the entire entity body (which is
     * formatted in `application/x-www-form-urlencoded`) of the request
     * from the client application.
     */
    public parameters?: string;


    /**
     * The client ID extracted from `Authorization` header of the token
     * request from the client application.
     *
     * If the token endpoint of the authorization server implementation
     * supports [Basic Authentication](http://tools.ietf.org/html/rfc2617)
     * as a means of [client authentication](
     * http://tools.ietf.org/html/rfc6749#section-2.3), and the request
     * from the client application contained its client ID in `Authorization`
     * header, the value should be extracted and set as this parameter.
     */
    public clientId?: string;


    /**
     * The client secret extracted from `Authorization` header of the
     * token request from the client application.
     *
     * If the token endpoint of the authorization server implementation
     * supports [Basic Authentication](http://tools.ietf.org/html/rfc2617)
     * as a means of [client authentication](
     * http://tools.ietf.org/html/rfc6749#section-2.3), and the request
     * from the client application contained its client secret in
     * `Authorization` header, the value should be extracted and set
     * as this parameter.
     */
    public clientSecret?: string;


    /**
     * Client certificate (used in MTLS auth and bound access tokens).
     */
    public clientCertificate?: string;


    /**
     * Client certificate path (used in PKI-based MTLS auth when
     * certificates are validated by the Authlete service).
     */
    public clientCertificatePath?: string[];


    /**
     * Extra properties to associate with an access token.
     */
    @Type(() => Property)
    public properties?: Property[];
}