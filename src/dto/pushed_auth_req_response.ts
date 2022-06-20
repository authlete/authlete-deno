// Copyright (C) 2020-2022 Authlete, Inc.
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
import { fromJsonValue } from '../type/base_extended_enum.ts';
import { ClientAuthMethod } from '../type/client_auth_method.ts';
import { ApiResponse } from './api_response.ts';
const { Transform } = ct;


/**
 * Response from Authlete `/pushed_auth_req` API.
 */
export class PushedAuthReqResponse extends ApiResponse
{
    /**
     * The next action that the service implementation should take.
     */
    @Transform((value: any) => PushedAuthReqResponse.Action[value])
    public action!: PushedAuthReqResponse.Action;


    /**
     * The response content which can be used as the entity body of the
     * response returned to the client application.
     */
    public responseContent?: string;


    /**
     * The client authentication method that should be performed at the
     * pushed authorization request endpoint.
     *
     * If the client could not be identified by the information in the
     * request, this property has `null`.
     */
    @Transform((value: any) => fromJsonValue(value, ClientAuthMethod), { toClassOnly: true })
    public clientAuthMethod?: ClientAuthMethod;


    /**
     * The request URI created to represent the pushed authorization
     * request. This can be sent by the client as the 'request_uri' parameter
     * in an authorization request.
     */
    public requestUri?: string;
}


export namespace PushedAuthReqResponse
{
    /**
     * The next action that the service implementation should take.
     */
    export enum Action
    {
        /**
         * The pushed authorization request has been registered successfully.
         * The endpoint should return `201 Created` to the client application.
         */
        CREATED,


        /**
         * The request is invalid. The pushed authorization request endpoint
         * should return `400 Bad Request` to the client application.
         */
        BAD_REQUEST,


        /**
         * The client authentication at the pushed authorization request
         * endpoint failed. The endpoint should return `401 Unauthorized`
         * to the client application.
         */
        UNAUTHORIZED,


        /**
         * The client application is not allowed to use the pushed
         * authorization request endpoint. The endpoint should return
         * `403 Forbidden` to the client application.
         */
        FORBIDDEN,


        /**
         * The size of the pushed authorization request is too large. The
         * endpoint should return `413 Payload Too Large` to the client
         * application.
         */
        PAYLOAD_TOO_LARGE,


        /**
         * The API call was wrong or an error occurred on Authlete side.
         * The pushed authorization request endpoint should return
         * `500 Internal Server Error` to the client application.
         * However, it is up to the authorization server's policy whether
         * to return `500` actually.
         */
        INTERNAL_SERVER_ERROR,
    }
}