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
import { fromJsonValue } from '../type/base_extended_enum.ts';
import { Display } from '../type/display.ts';
import { Prompt } from '../type/prompt.ts';
import { ApiResponse } from './api_response.ts';
import { AuthzDetails } from './authz_details.ts';
import { Client } from './client.ts';
import { Scope } from './scope.ts';
import { Service } from './service.ts';
const { Type, Transform } = ct;


/**
 * Response from Authlete `/auth/authorization` API.
 */
export class AuthorizationResponse extends ApiResponse
{
    /**
     * The next action that the service implementation should take.
     */
    @Transform((value: any) => AuthorizationResponse.Action[value])
    public action!: AuthorizationResponse.Action;


    /**
     * The information about the service.
     */
    @Type(() => Service)
    public service!: Service;


    /**
     * The information about the client application.
     */
    @Type(() => Client)
    public client!: Client;


    /**
     * The display mode which the client application requests by `display`
     * request parameter. When the authorization request does not contain
     * `display` request parameter, this method returns `Display.PAGE` as
     * the default value.
     *
     * For more details, see [OpenID Connect Core 1.0, 3.1.2.1. Authentication
     * Request](http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest).
     */
    @Transform((value: string[]) => fromJsonValue(value, Display), { toClassOnly: true })
    public display?: Display;


    /**
     * The maximum authentication age which is the allowable elapsed time
     * in seconds since the last time the end-user was actively authenticated
     * by the service implementation. The value comes from `max_age`
     * request parameter or `default_max_age` configuration parameter
     * of the client application. `0` may be returned which means that
     * the max age constraint does not have to be imposed.
     *
     * For more details, see the following links.
     *
     * - [OpenID Connect Core 1.0, 3.1.2.1. Authentication Request](
     * http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)
     *
     * - [OpenID Connect Dynamic Client Registration 1.0, 2. Client
     * Metadata](http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    public maxAge!: number;


    /**
     * The scopes that the client application requests by `scope` request
     * parameter. When the authorization request does not contain `scope`
     * request parameter, this method returns a list of scopes which are
     * marked as default by the service implementation. This property
     * may be unset if the authorization request does not contain valid
     * scopes and none of registered scopes is marked as default.
     *
     * You may want to enable end-users to select/deselect scopes in
     * the authorization page. In other words, you may want to use a
     * different set of scopes than the set specified by the original
     * authorization request. You can replace scopes when you call Authlete
     * `/auth/authorization/issue` API. See the description of
     * `AuthorizationIssueRequest.scopes` property for details.
     */
    @Type(() => Scope)
    public scopes?: Scope[];


    /**
     * The list of preferred languages and scripts for the user interface.
     * The value comes from `ui_locales` request parameter.
     *
     * For more details, see [OpenID Connect Core 1.0, 3.1.2.1. Authentication
     * Request](http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest).
     */
    public uiLocales?: string[];


    /**
     * The list of preferred languages and scripts for claim values
     * contained in the ID token. The value comes from `claims_locales`
     * request parameter.
     *
     * For more details, see [OpenID Connect Core 1.0, 5.2. Claims Languages
     * and Scripts](http://openid.net/specs/openid-connect-core-1_0.html#ClaimsLanguagesAndScripts).
     */
    public claimsLocales?: string[];


    /**
     * The list of claims that the client application requests to be
     * embedded in the ID token. The value comes from `scope` and `claims`
     * request parameters of the original authorization request.
     *
     * For more details, see the following links.
     *
     * - [OpenID Connect Core 1.0, 5.4. Requesting Claims using Scope
     * Values](http://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims)
     *
     * - [OpenID Connect Core 1.0, 5.5. Requesting Claims using the
     * "claims" Request Parameter](
     * http://openid.net/specs/openid-connect-core-1_0.html#ClaimsParameter).
     */
    public claims?: string[];


    /**
     * The flag which indicates whether the end-user authentication must
     * satisfy one of the requested ACRs.
     *
     * This method returns `true` only when the authorization request
     * from the client contains `claim` request parameter and it contains
     *  an entry for `acr` claim with `"essential":true`.
     *
     * For more details, see [OpenID Connect Core 1.0, 5.5.1. Individual
     * Claims Requests](
     * http://openid.net/specs/openid-connect-core-1_0.html#IndividualClaimsRequests).
     */
    public acrEssential!: boolean;


    /**
     * The flag which indicates whether the value of the `client_id`
     * request parameter included in the authorization request is the
     * client ID alias or the original numeric client ID.
     */
    public clientIdAliasUsed!: boolean;


    /**
     * The list of ACRs (Authentication Context Class References) requested
     * by the client application. The value come from (1) `acr` claim in
     * `claims` request parameter, (2) `acr_values` request parameter,
     * or (3) `default_acr_values` configuration parameter of the client
     * application.
     *
     * For more details, see the following links.
     *
     * - [OpenID Connect Core 1.0, 5.5. Requesting Claims using the
     * "claims" Request Parameter](
     * http://openid.net/specs/openid-connect-core-1_0.html#ClaimsParameter)
     *
     * - [OpenID Connect Core 1.0, 3.1.2.1. Authentication Request](
     * http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest)
     *
     * - [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](
     * http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata)
     */
    public acrs?: string[];


    /**
     * The subject (= end-user's unique ID) that the client application
     * requests. The value comes from `sub` claim in `claims` request
     * parameter. This method may be unset (probably in most cases).
     *
     * For more details, see [OpenID Connect Core 1.0, 5.5. Requesting
     * Claims using the "claims" Request Parameter](
     * http://openid.net/specs/openid-connect-core-1_0.html#ClaimsParameter).
     */
    public subject?: string;


    /**
     * The value of login hint, which is specified by the client application
     * using `login_hint` request parameter.
     *
     * For more details, [OpenID Connect Core 1.0, 3.1.2.1. Authentication
     * Request](http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest).
     */
    public loginHint?: string;


    /**
     * The list of prompts contained in the authorization request
     * (= the value of `prompt` request parameter).
     *
     * For more details, see [OpenID Connect Core 1.0, 3.1.2.1. Authentication
     * Request](http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest).
     */
    @Transform((value: string[]) => fromJsonValue(value, Prompt), { toClassOnly: true })
    public prompts?: Prompt[];


    /**
     * The payload part of the request object.
     *
     * This property is unset if the authorization request does not
     * include a request object.
     */
    public requestObjectPayload?: string;


    /**
     * The value of the `id_token` property in the `claims` request
     * parameter or in the `"claims"` property in a request object.
     *
     * A client application may request certain claims be embedded in
     * an ID token or in a response from the UserInfo endpoint. There
     * are several ways. Including the `claims` request parameter and
     * including the `"claims"` property in a request object are such examples.
     * In both the cases, the value of the `claims` parameter/property
     * is JSON. Its format is described in [5.5. Requesting Claims using
     * the "claims" Request Parameter](
     * https://openid.net/specs/openid-connect-core-1_0.html#ClaimsParameter)
     * of [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html).
     *
     * The following is an excerpt from the specification. You can find
     * `userinfo` and `id_token` are top-level properties.
     *
     * ```json
     * {
     *   "userinfo":
     *   {
     *     "given_name": {"essential": true},
     *     "nickname": null,
     *     "email": {"essential": true},
     *     "email_verified": {"essential": true},
     *     "picture": null,
     *     "http://example.info/claims/groups": null
     *   },
     *   "id_token":
     *   {
     *     "auth_time": {"essential": true},
     *     "acr": {"values": ["urn:mace:incommon:iap:silver"] }
     *   }
     * }
     * ```
     *
     * This property holds the value of the `id_token` property in JSON
     * format. For example, if the JSON above is included in an authorization
     * request, this property holds JSON equivalent to the following.
     *
     * ```json
     * {
     *   "auth_time": {"essential": true},
     *   "acr": {"values": ["urn:mace:incommon:iap:silver"] }
     * }
     * ```
     *
     * Note that if a request object is given and it contains the `claims`
     * property and if the `claims` request parameter is also given,
     * this method returns the value in the  former.
     */
    public idTokenClaims?: string;


    /**
     * The value of the `userinfo` property in the `claims` request
     * parameter or in the `"claims"` property in a request object.
     *
     * A client application may request certain claims be embedded in
     * an ID token or in a response from the UserInfo endpoint. There
     * are several ways. Including the `claims` request parameter and
     * including the `"claims"` property in a request object are such examples.
     * In both the cases, the value of the `claims` parameter/property
     * is JSON. Its format is described in [5.5. Requesting Claims using
     * the "claims" Request Parameter](
     * https://openid.net/specs/openid-connect-core-1_0.html#ClaimsParameter)
     * of [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html).
     *
     * The following is an excerpt from the specification. You can find
     * `userinfo` and `id_token` are top-level properties.
     *
     * ```json
     * {
     *   "userinfo":
     *   {
     *     "given_name": {"essential": true},
     *     "nickname": null,
     *     "email": {"essential": true},
     *     "email_verified": {"essential": true},
     *     "picture": null,
     *     "http://example.info/claims/groups": null
     *   },
     *   "id_token":
     *   {
     *     "auth_time": {"essential": true},
     *     "acr": {"values": ["urn:mace:incommon:iap:silver"]}
     *   }
     * }
     * ```
     *
     * This property holds the value of the `userinfo` property in JSON
     * format. For example, if the JSON above is included in an authorization
     * request, this property holds JSON equivalent to the following.
     *
     * ```json
     * {
     *   "given_name": {"essential": true},
     *   "nickname": null,
     *   "email": {"essential": true},
     *   "email_verified": {"essential": true},
     *   "picture": null,
     *   "http://example.info/claims/groups": null
     * }
     * ```
     *
     * Note that if a request object is given and it contains the `claims`
     * property and if the `claims` request parameter is also given,
     * this method returns the value in the former.
     */
    public userInfoClaims?: string;


    /**
     * The resources specified by the `resource` request parameters
     * or by the `resource` property in the request object. If both are
     * given, the values in the request object take precedence. See
     * _"Resource Indicators for OAuth 2.0"_ for details.
     */
    public resources?: string[];


    /**
     * The authorization details. This represents the value of the
     * `authorization_details` request parameter which is defined in
     * _"OAuth 2.0 Rich Authorization Requests"_.
     */
    @Type(() => AuthzDetails)
    public authorizationDetails?: AuthzDetails;


    /**
     * The value of the `purpose` request parameter.
     *
     * The `purpose` request parameter is defined in [8. Transaction-specific
     * Purpose](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#rfc.section.8)
     * of [OpenID Connect for Identity Assurance 1.0](
     * https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html)
     *
     * > `purpose` OPTIONAL. String describing the purpose for obtaining
     * certain user data from the OP. The purpose MUST NOT be shorter
     * than 3 characters and MUST NOT be longer than 300 characters.
     * If these rules are violated, the authentication request MUST
     * fail and the OP returns an error `invalid_request` to the RP.
     *
     * NOTE: This property has a valid value only when Authlete server
     * you are using supports OpenID Connect for Identity Assurance 1.0.
     */
    public purpose?: string;


    /**
     * The response content which can be used to generate a response
     * to the client application. The format of the value varies depending
     * on the value of `action`.
     */
    public responseContent?: string;


    /**
     * The ticket which has been issued to the service implementation
     * from Authlete' `/auth/authorization` API. This ticket is needed
     * for calling `/auth/authorization/issue` API and `/auth/authorization/fail`
     * API.
     */
    public ticket!: string;
}


export namespace AuthorizationResponse
{
    export enum Action
    {
        /**
         * The request from the service implementation was wrong or an
         * error occurred in Authlete. The service implementation should
         * return `'500 Internal Server Error'` to the client application.
         */
        INTERNAL_SERVER_ERROR,


        /**
         * The authorization request was wrong and the service implementation
         * should notify the client application of the error by `'400
         * Bad Request'`.
         */
        BAD_REQUEST,


        /**
         * The authorization request was wrong and the service implementation
         * should notify the client application of the error by `'302
         * Found'`.
         */
        LOCATION,


        /**
         * The authorization request was wrong and the service implementation
         * should notify the client application of the error by `'200
         * OK'` with an HTML which triggers redirection by JavaScript.
         *
         * For more details, see [OAuth 2.0 Form Post Response Mode](
         * http://openid.net/specs/oauth-v2-form-post-response-mode-1_0.html).
         */
        FORM,


        /**
         * The authorization request was valid and the service implementation
         * should issue an authorization code, an ID token and/or an
         * access token without interaction with the end-user.
         */
        NO_INTERACTION,


        /**
         * The authorization request was valid and the service implementation
         * should display UI to ask for authorization from the end-user.
         */
        INTERACTION,
    }
}