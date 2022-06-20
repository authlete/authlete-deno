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
 * Request to Authlete `/device/complete` API.
 */
export class DeviceCompleteRequest
{
    /**
     * The user code input by the end-user.
     */
    public userCode?: string;


    /**
     * The result of end-user authentication and authorization.
     */
    @Transform((value: any) => DeviceCompleteRequest.Result[value])
    public result?: DeviceCompleteRequest.Result;


    /**
     * The subject (= unique identifier) of the end-user who has granted
     * authorization to the client application.
     *
     * This `subject` property is used as the value of the subject associated
     * with the access token and as the value of the `sub` claim in the
     * ID token.
     *
     * Note that, if `sub` has a non-empty value, it is used as the value
     * of the `sub` claim in the ID token. However, even in the case,
     * the value of the subject associated with the access token is still
     * the value of this `subject` property.
     */
    public subject?: string;


    /**
     * The value of the `sub` claim that should be used in the ID token.
     * If this property is `null` or empty, the value of `subject` is
     * used as the value of the `sub` claim. The main purpose of this
     * `sub` property is to hide the actual value of the subject from
     * client applications.
     *
     * Note that the value of the `subject` request parameter is used
     * as the value of the subject associated with the access token regardless
     * of whether this `sub` property is a non-empty value or not. In
     * other words, this `sub` property affects only the `sub` claim in
     * the ID token.
     */
    public sub?: string;


    /**
     * The time at which the end-user was authenticated.
     */
    public authTime!: number;


    /**
     * The reference of the authentication context class which the end-user
     * authentication satisfied.
     */
    public acr?: string;


    /**
     * Additional claims which will be embedded in the ID token.
     */
    public claims?: string;


    /**
     * The extra properties associated with the access token that will
     * be issued.
     */
    @Type(() => Property)
    public properties?: Property[];


    /**
     * Scopes associated with the access token. If this property has
     * a non-null value, the set of scopes will be used instead of the
     * scopes specified in the original device authorization request.
     */
    public scopes?: string[];


    /**
     * JSON that represents additional JWS header parameters for the ID
     * token that may be issued from the token endpoint.
     */
    public idtHeaderParams?: string;


    /**
     * The description of the error. This corresponds to the `error_description`
     * property in the response to the client.
     */
    public errorDescription?: string;


    /**
     * The URI of a document which describes the error in detail. This
     * corresponds to the `error_uri` property in the response to the
     * client.
     */
    public errorUri?: string;
}


export namespace DeviceCompleteRequest
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
         * The end-user denied the device authorization request.
         */
        ACCESS_DENIED = 2,


        /**
         * The authorization server could not get decision from the end-user
         * for some reasons.
         *
         * This result can be used as a generic error.
         */
        TRANSACTION_FAILED = 3,
    }
}