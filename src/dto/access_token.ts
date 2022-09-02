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
import { fromJsonValue } from '../type/base_extended_enum.ts';
import { GrantType } from '../type/grant_type.ts';
import { Property } from './property.ts';
const { Type, Transform } = ct;


/**
 * Information about an access token.
 */
export class AccessToken
{
    /**
     * The hash of the access token.
     */
    public accessTokenHash?: string;


    /**
     * The hash of the refresh token.
     */
    public refreshTokenHash?: string;


    /**
     * The ID of the client associated with the access token.
     */
    public clientId!: number;


    /**
     * The subject (= unique user ID) associated with the access token
     * or `null` if the access token was created using the [Client Credentials](https://tools.ietf.org/html/rfc6749#section-4.4)
     * flow.
     */
    public subject?: string;


    /**
     * The grant type of the access token when the access token was created.
     * Note that the value of the grant type is not changed when the access
     * token is refreshed using the refresh token.
     */
    @Transform((value: any) => fromJsonValue(value, GrantType), { toClassOnly: true })
    public grantType!: GrantType;


    /**
     * The scopes covered by the access token.
     */
    public scopes?: string[];


    /**
     * The timestamp at which the access token will expire.
     */
    public accessTokenExpiresAt!: number;


    /**
     * The timestamp at which the refresh token will expire. `0` is returned
     * if `refreshTokenHash` is `null`.
     */
    public refreshTokenExpiresAt!: number;


    /**
     * The timestamp at which the access token was first created. Note
     * that the value of the timestamp is not changed when the access
     * token is refreshed with the refresh token.
     */
    public createdAt!: number;


    /**
     * The timestamp at which the access token was last refreshed using
     * the refresh token. `0` is returned if it has never been refreshed.
     */
    public lastRefreshedAt!: number;


    /**
     * The properties associated with the access token.
     */
    @Type(() => Property)
    public properties?: Property[];
}