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
import { AuthzDetails } from './authz_details.ts';
import { Property } from './property.ts';
import { Scope } from './scope.ts';
const { Type } = ct;


/**
 * Information about a token of the type `urn:ietf:params:oauth:token-type:access_token`
 * or the type `urn:ietf:params:oauth:token-type:refresh_token`.
 *
 * This class is used to hold detailed information about a subject token
 * or an actor token. See the descriptions of `TokenResponse.subjectTokenInfo`
 * and `TokenResponse.actorTokenInfo` for details.
 *
 * For more details, see [RFC 8693 OAuth 2.0 Token Exchange](https://www.rfc-editor.org/rfc/rfc8693.html)
 */
export class TokenInfo
{
    /**
     * The client ID.
     */
    public clientId!: number;


    /**
     * The subject (= resource owner's unique identifier).
     */
    public subject?: string;


    /**
     * The scopes.
     */
    @Type(() => Scope)
    public scopes?: Scope[];


    /**
     * The expiration date/time in seconds since the Unix epoch.
     */
    public expiredAt!: number;


    /**
     * The extra properties associated with the token.
     */
    @Type(() => Property)
    public properties?: Property[];


    /**
     * The client ID alias.
     */
    public clientIdAlias?: string;


    /**
     * The flag which indicates whether the client ID alias was used
     * when the token was created.
     */
    public clientIdAliasUsed!: boolean;


    /**
     * The resources associated with the token.
     * The values are ones specified by the `resource` request parameters.
     *
     * For more details, see [RFC 8707 Resource Indicators for OAuth 2.0](https://www.rfc-editor.org/rfc/rfc8707.html).
     */
    public resources?: string[];


    /**
     * The authorization details associated with the token.
     * The values are ones specified by the `authorization_details` request
     * parameters.
     *
     * For more details, see [OAuth 2.0 Rich Authorization Requests](https://datatracker.ietf.org/doc/draft-ietf-oauth-rar/).
     */
    @Type(() => AuthzDetails)
    public authorizationDetails?: AuthzDetails;
}