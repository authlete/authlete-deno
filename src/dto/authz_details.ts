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
import { AuthzDetailsElement } from './authz_details_element.ts';
const { Type } = ct;


/**
 * A class that represents `authorization_details` which is defined in
 * _"OAuth 2.0 Rich Authorization Requests"_.
 */
export class AuthzDetails
{
    /**
     * The elements of this authorization details.
     */
    @Type(() => AuthzDetailsElement)
    public elements?: AuthzDetailsElement[];
}