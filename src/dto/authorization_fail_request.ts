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
const { Transform } = ct;


/**
 * Request to Authlete `/auth/authorization/fail` API.
 */
export class AuthorizationFailRequest
{
    /**
     * The ticket issued by Authlete `/auth/authorization` API.
     */
    public ticket?: string;


    /**
     * The reason of the failure.
     */
    @Transform((value: any) => AuthorizationFailRequest.Reason[value])
    public reason?: AuthorizationFailRequest.Reason;


    /**
     * The custom description about the failure.
     */
    public description?: string;
}


export namespace AuthorizationFailRequest
{
    /**
     * Failure reasons of authorization requests.
     */
    export enum Reason
    {
        /**
         * Unknown reason.
         *
         * Using this reason will result in `error=server_error`.
         */
        UNKNOWN,


        /**
         * The authorization request from the client application contained
         * `prompt=none`, but any end-user has not logged in.
         *
         * See [OpenID Connect Core 1.0, 3.1.2.1. Authentication Request](
         * http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)
         * for `prompt` request parameter.
         *
         * Using this reason will result in `error=login_required`.
         */
        NOT_LOGGED_IN,


        /**
         * The authorization request from the client application contained
         * `max_age` parameter with a non-zero value or the client's
         * configuration has a non-zero value for `default_max_age`
         * configuration parameter, but the service implementation cannot
         * behave properly based on the max age value mainly because the
         * service implementation does not manage authentication time
         * of end-users.
         *
         * See [OpenID Connect Core 1.0, 3.1.2.1. Authentication Request](
         * http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)
         * for `max_age` request parameter.
         *
         * See [OpenID Connect Dynamic Client Registration 1.0, 2. Client
         * Metadata](http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata)
         * for `default_max_age` configuration parameter.
         *
         * Using this reason will result in `error=login_required`.
         */
        MAX_AGE_NOT_SUPPORTED,


        /**
         * The authorization request from the client application contained
         * `prompt=none`, but the time specified by `max_age` request
         * parameter or by `default_max_age` configuration parameter
         * has passed since the time at which the end-user logged in.
         *
         * See [OpenID Connect Core 1.0, 3.1.2.1. Authentication Request](
         * http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)
         * for `prompt` and `max_age` request parameters.
         *
         * See [OpenID Connect Dynamic Client Registration 1.0, 2. Client
         * Metadata](http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata)
         * for `default_max_age` configuration parameter.
         *
         * Using this reason will result in `error=login_required`.
         */
        EXCEEDS_MAX_AGE,


        /**
         * The authorization request from the client application requested
         * a specific value for `sub` claim, but the current end-user (in
         * the case of `prompt=none`) or the end-user after the authentication
         * is different from the specified value.
         *
         * Using this reason will result in `error=login_required`.
         */
        DIFFERENT_SUBJECT,


        /**
         * The authorization request from the client application contained
         * `acr` claim in `claims` request parameter and the claim was
         * marked as essential, but the ACR performed for the end-user
         * does not match any one of the requested ACRs.
         *
         * Using this reason will result in `error=login_required`.
         */
        ACR_NOT_SATISFIED,


        /**
         * The end-user denied the authorization request from the client
         * application.
         *
         * Using this reason will result in `error=access_denied`.
         */
        DENIED,


        /**
         * Server error.
         *
         * Using this reason will result in `error=server_error`.
         */
        SERVER_ERROR,


        /**
         * The end-user was not authenticated.
         *
         * Using this reason will result in `error=login_required`.
         */
        NOT_AUTHENTICATED,


        /**
         * The authorization server cannot obtain an account selection
         * choice made by the end-user.
         *
         * Using this reason will result in `error=account_selection_required`.
         */
        ACCOUNT_SELECTION_REQUIRED,


        /**
         * The authorization server cannot obtain consent from the end-user.
         *
         * Using this reason will result in `error=consent_required`.
         */
        CONSENT_REQUIRED,


        /**
         * The authorization server needs interaction with the end-user.
         *
         * Using this reason will result in `error=interaction_required`.
         */
        INTERACTION_REQUIRED,


        /**
         * The requested resource is invalid, missing, unknown, or malformed.
         * See _"Resource Indicators for OAuth 2.0"_ for details.
         *
         * Using this reason will result in `error=invalid_target`.
         */
        INVALID_TARGET,
    }
}