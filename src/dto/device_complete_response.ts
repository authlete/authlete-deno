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
import { ApiResponse } from './api_response.ts';
const { Transform } = ct;


/**
 * Response from Authlete `/device/complete` API.
 */
export class DeviceCompleteResponse extends ApiResponse
{
    /**
     * The next action that the service implementation should take.
     */
    @Transform((value: any) => DeviceCompleteResponse.Action[value])
    public action!: DeviceCompleteResponse.Action;
}


export namespace DeviceCompleteResponse
{
    /**
     * The next action that the service implementation should take.
     */
    export enum Action
    {
        /**
         * The API call has been processed successfully. The authorization
         * server should return a successful response to the web browser
         * the end-user is using.
         */
        SUCCESS,


        /**
         * The API call is invalid. Probably, the authorization server
         * implementation has some bugs.
         */
        INVALID_REQUEST,


        /**
         * The user code has expired. The authorization server implementation
         * should tell the end-user that the user code has expired and
         * urge her to re-initiate a device flow.
         */
        USER_CODE_EXPIRED,


        /**
         * The user code does not exist. The authorization server implementation
         * should tell the end-user that the user code has been invalidated
         * and urge her to re-initiate a device flow.
         */
        USER_CODE_NOT_EXIST,


        /**
         * An error occurred on Authlete side. The authorization server
         * implementation should tell the end-user that something wrong
         * happened and urge her to re-initiate a device flow.
         */
        SERVER_ERROR,
    }
}