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
import { Client } from './client.ts';
const { Type } = ct;


/**
 * Response from Authlete `/client/get/list` API.
 */
export class ClientListResponse
{
    /**
     * The start index (inclusive) for the result set of the query. It
     * is the value contained in the original request (= the value of
     * `start` parameter, or the default value (0) if the original request
     * did not contain the parameter.
     */
    public start!: number;


    /**
     * The end index (exclusive) for the result set of the query. It
     * is the value contained in the original request (= the value of
     * `end` parameter), or the default value defined in Authlete server
     * if the original request did not contain the parameter.
     */
    public end!: number;


    /**
     * The developer specified in the query. It is the value contained
     * in the original request (= the value of `developer` parameter).
     * When the `developer` parameter is unset, it means that all the
     * clients that belong to the service are targeted.
     */
    public developer?: string;


    /**
     * The total count of client applications either of the service (when
     * the `developer` property is unset) or of the developer (when it
     * is set).
     *
     * The value of this property is not the size of the array `clients`
     * property has. Instead, it is the total count of the client applications
     * (either of the service or of the developer) which exist in Authlete's
     * database.
     */
    public totalCount!: number;


    /**
     * The list of clients that match the query conditions.
     */
    @Type(() => Client)
    public clients?: Client[];
}