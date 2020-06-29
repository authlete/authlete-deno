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
 * Request to Authlete `/auth/token/issue` API.
 */
export class TokenIssueRequest
{
    /**
     * The ticket issued by Authlete `/auth/token` API.
     */
    public ticket?: string;


    /**
     * The subject (unique identifier) of the authenticated user.
     */
    public subject?: string;


    /**
     * Extra properties to associate with an access token.
     */
    @Type(() => Property)
    public properties?: Property[];
}