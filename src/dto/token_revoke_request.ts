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


import 'https://cdn.pika.dev/reflect-metadata@^0.1.13';


/**
 * Request to Authlete `/auth/token/revoke` API.
 */
export class TokenRevokeRequest
{
    /**
     * The identifier of an access token to revoke.
     *
     * The hash of an access token is recognized as an identifier as well
     * as the access token itself.
     */
    public accessTokenIdentifier?: string;


    /**
     * The identifier of an refresh token to revoke.
     *
     * The hash of an refresh token is recognized as an identifier as
     * well as the refresh token itself.
     */
    public refreshTokenIdentifier?: string;


    /**
     * The identifier of a client.
     */
    public clientIdentifier?: string;


    /**
     * The subject of a resource owner.
     */
    public subject?: string;
}