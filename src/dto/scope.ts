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
import { Pair } from './pair.ts';
import { TaggedValue } from './tagged_value.ts';
const { Type } = ct;


/**
 * Information about a scope of a service.
 *
 * For more details, see [RFC 6749 (OAuth 2.0), 3.3. Access Token Scope
 * ](http://tools.ietf.org/html/rfc6749#section-3.3).
 */
export class Scope
{
    /**
     * The name of this scope.
     */
    public name?: string;


    /**
     * The flag that indicates whether this scope is included in the
     * default scope list.
     */
    public defaultEntry?: boolean;


    /**
     * The description of this scope.
     */
    public description?: string;


    /**
     * The description of this scope for various languages.
     */
    @Type(() => TaggedValue)
    public descriptions?: TaggedValue[];


    /**
     * The attributes of this scope.
     */
    @Type(() => Pair)
    public attributes?: Pair[];
}