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
import { Service } from './service.ts';
const { Type } = ct;


/**
 * Response from Authlete `/service/get/list` API.
 */
export class ServiceListResponse
{
    /**
     * The start index (inclusive) for the result set of the query. It
     * is the value contained in the original request (= the value of
     * `start` parameter), or the default value (0) if the original
     * request did not contain the parameter.
     */
    public start!: number;


    /**
     * The end index (exclusive) for the result set of the query. It
     * is the value contained in the original request (= the value of
     * `end` parameter), or the default value used by Authlete server
     * if the original request did not contain the parameter.
     */
    public end!: number;


    /**
     * The total count of services.
     */
    public totalCount!: number;


    /**
     * The list of services that match the query conditions.
     */
    @Type(() => Service)
    public services?: Service[];
}