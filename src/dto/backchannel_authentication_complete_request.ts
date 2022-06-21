// Copyright (C) 2022 Authlete, Inc.
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
const { Type, Transform } = ct;


/**
 * Request to Authlete `/backchannel/authentication/complete` API.
 */
export class BackchannelAuthenticationCompleteRequest
{
    /**
     * The ticket issued by Authlete `/backchannel/authentication` endpoint.
     */
    public ticket?: string;


    /**
     * The result of the end-user authentication and authorization.
     */
    @Transform((value: any) => BackchannelAuthenticationCompleteRequest.Result[value])
    public result?: BackchannelAuthenticationCompleteRequest.Result;


    /**
     * The subject (= unique identifier) of the end-user.
     */
    public subject?: string;


    /**
     * The value of the `sub` claim for the ID token. When this field
     * is empty, `subject` is used as the value of the `sub` claim.
     */
    public sub?: string;


    /**
     * The time at which the end-user was authenticated.
     */
    public authTime!: number;


    /**
     * The authentication context class reference.
     */
    public acr?: string;


    /**
     * Additional claims in JSON format.
     */
    public claims?: string;


    /**
     * Extra properties to associate with an access token and/or an
     * authorization code.
     */
    @Type(() => Property)
    public properties?: Property[];


    /**
     * Scopes associated with the access token. If this field is `null`,
     * the scopes specified in the original backchannel authentication
     * request are used. In other cases, the scopes here will replace
     * the original scopes contained in the original request.
     */
    public scopes?: string[];


    /**
     * JSON that represents additional JWS header parameters for the ID
     * token.
     */
    public idtHeaderParams?: string;


    /**
     * The description of the error. This property is referred to when the
     * result is not `AUTHORIZED`.
     */
    public errorDescription?: string;


    /**
     * The URI of a document which describes the error in detail. This
     * property is referred to when the result is not `AUTHORIZED`.
     */
    public errorUri?: string;
}


export namespace BackchannelAuthenticationCompleteRequest
{
    /**
     * Failure reasons of authorization requests.
     */
    export enum Result
    {
        /**
         * The end-user was authenticated and has granted authorization to
         * the client application.
         */
        AUTHORIZED = 1,


        /**
         * The end-user denied the backchannel authentication request.
         */
        ACCESS_DENIED = 2,


        /**
         * The authorization server could not get the result of end-user
         * authentication and authorization from the authentication device
         * for some reasons.
         *
         * For example, the authorization server failed to communicate with
         * the authentication device due to a network error, the device did
         * not return a response within a reasonable time, etc.
         *
         * This result can be used as a generic error.
         */
        TRANSACTION_FAILED = 3,
    }
}