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


/**
 * Client extension.
 *
 * There are some attributes that belong to a client application but
 * should not be changed by the developer of the client application.
 * Basically, this class holds such attributes.
 *
 * For example, an authorization server may narrow the range of scopes
 * (permissions) that a particular client application can request.
 * In this case, it is meaningless if the developer of the client
 * application can freely decide the set of requestable scopes. It is
 * not the developer of the client application but the administrator
 * of the authorization server that should be allowed to define the
 * set of scopes that the client application can request.
 */
export class ClientExtension
{
    /**
     * The flag to indicate whether _"Requestable Scopes per Client"_
     * is enabled or not.
     *
     * If this method returns `true`, a special set of scopes (permissions)
     * is defined on the server side (the `requestableScopes` array
     * represents the special set) and scopes which this client application
     * can request are limited to the scopes listed in the set. In other
     * words, this application cannot request scopes that are not included
     * in the set. To be specific, this client application cannot list
     * other scopes in the `scope` request parameter when it makes an
     * authorization request. To be exact, other scopes can be listed
     * but will be ignored by the authorization server.
     *
     * On the other hand, if this method returns `false`, the valid set
     * of scopes (permissions) that this client application can request
     * is equal to the whole scope set defined by the authorization server.
     */
    public requestableScopesEnabled?: boolean;


    /**
     * The set of scopes that this client application can request when
     * _"Requestable Scopes per Client"_ is enabled (= when `requestableScopesEnabled`
     * returns `true`).
     *
     * See the description of `requestableScopesEnabled` for details
     * about _"Requestable Scopes per Client"_.
     */
    public requestableScopes?: string[];


    /**
     * The value of the duration of access tokens per client in seconds.
     *
     * In normal cases, the value of the service's `accessTokenDuration`
     * property is used as the duration of access tokens issued by the
     * service. However, if this `accessTokenDuration` property holds
     * a non-zero positive number and its value is less than the duration
     * configured by the service, the value is used as the duration of
     * access tokens issued to the client application.
     *
     * Note that the duration of access tokens can be controlled by the
     * scope attribute `"access_token.duration"`, too. Authlete chooses
     * the minimum value among the candidates.
     */
    public accessTokenDuration?: number;


    /**
     * The value of the duration of refresh tokens per client in
     * seconds.
     *
     * In normal cases, the value of the service's `refreshTokenDuration`
     * property is used as the duration of refresh tokens issued by the
     * service. However, if this `refreshTokenDuration` property holds
     * a non-zero positive number and its value is less than the duration
     * configured by the service, the value is used as the duration of
     * refresh tokens issued to the client application.
     *
     * Note that the duration of refresh tokens can be controlled by the
     * scope attribute `"refresh_token.duration"`, too. Authlete chooses
     * the minimum value among the candidates.
     */
    public refreshTokenDuration?: number;
}