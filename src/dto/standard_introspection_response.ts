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
const { Transform } = ct;


/**
 * Request to Authlete `/auth/introspection/standard` API.
 */
export class StandardIntrospectionResponse
{
    /**
     * The next action that the service implementation should take.
     */
    @Transform((value: any) => StandardIntrospectionResponse.Action[value])
    public action!: StandardIntrospectionResponse.Action;


    /**
     * The response content which can be used as the entity body of the
     * response returned to the client application.
     */
    public responseContent!: string;
}


export namespace StandardIntrospectionResponse
{
    /**
     * The next action that the service implementation should take.
     */
    export enum Action
    {
        /**
         * The request from your system to Authlete (`StandardIntrospectionRequest`)
         * was wrong or an error occurred in Authlete. The introspection
         * endpoint of your authorization server should return `"500
         * Internal Server Error"` to the client application.
         */
        INTERNAL_SERVER_ERROR,


        /**
        * The request from the client was wrong. The introspection endpoint
        * of your authorization server should return `"400 Bad Request"`
        * to the client application.
        */
        BAD_REQUEST,


        /**
        * The request from the client was valid. The introspection endpoint
        * of your authorization server should return `"200 OK"` to the
        * client application.
        */
        OK,
    }
}