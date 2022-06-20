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
import { ApiResponse } from './api_response.ts';
import { AuthzDetails } from './authz_details.ts';
import { DynamicScope } from './dynamic_scope.ts';
import { Pair } from './pair.ts';
import { Scope } from './scope.ts';
const { Type, Transform } = ct;


/**
 * Response from Authlete `/device/verification` API.
 */
export class DeviceVerificationResponse extends ApiResponse
{
    /**
     * The next action that the service implementation should take.
     */
    @Transform((value: any) => DeviceVerificationResponse.Action[value])
    public action!: DeviceVerificationResponse.Action;


    /**
     * The client ID of the client application to which the user code
     * has been issued.
     */
    public clientId!: number;


    /**
     * The client ID alias of the client application to which the user
     * code has been issued.
     */
    public clientIdAlias?: string;


    /**
     * The flag which indicates whether the client ID alias was used in
     * the device authorization request for the user code.
     */
    public clientIdAliasUsed!: boolean;


    /**
     * The name of the client application to which the user code has been
     * issued.
     */
    public clientName?: string;


    /**
     * The scopes requested by the device authorization request for the
     * user code.
     *
     * Note that `description` and `descriptions` of each element (`Scope`
     * instance) in the scopes always `null` even if descriptions of
     * the scopes are registered.
     */
    @Type(() => Scope)
    public scopes?: Scope[];


    /**
     * The dynamic scopes which the client application requested by the
     * `scope` request parameter. See the description of `DynamicScope`
     * for details.
     */
    @Type(() => DynamicScope)
    public dynamicScopes?: DynamicScope[];


    /**
     * The names of the claims which were requested indirectly via some
     * special scopes. See [5.4. Requesting Claims using Scope Values](
     * https://openid.net/specs/openid-connect-core-1_0.html#ScopeClaims)
     * in [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
     * for details.
     *
     * This property has `null` if the `scope` request parameter of the
     * device authorization request does not include the `openid` scope
     * even if special scopes (such as `profile`) are included in the
     * request (unless the `openid` scope is included in the default set
     * of scopes which is used when the `scope` request parameter is omitted).
     */
    public clientNames?: string[];


    /**
     * The list of ACR values requested by the device authorization request.
     */
    public acrs?: string[];


    /**
     * tTe date in milliseconds since the Unix epoch (1970-01-01) at which
     * the user code will expire.
     */
    public expiresAt!: number;


    /**
     * The resources specified by the `resource` request parameters in
     * the preceding device authorization request. See _"Resource Indicators
     * for OAuth 2.0"_ for details.
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
     * Arbitrary attributes associated with the service.
     */
    @Type(() => Pair)
    public serviceAttributes?: Pair[];


    /**
     * Arbitrary attributes associated with the client.
     */
    @Type(() => Pair)
    public clientAttributes?: Pair[];
}


export namespace DeviceVerificationResponse
{
    /**
     * The next action that the service implementation should take.
     */
    export enum Action
    {
        /**
         * The user code is valid. This means that the user code exists, has
         * not expired, and belongs to the service. The authorization server
         * implementation should interact with the end-user to ask whether she
         * approves or rejects the authorization request from the device.
         */
        VALID,


        /**
         * The user code has expired. The authorization server implementation
         * should tell the end-user that the user code has expired and urge her
         * to re-initiate a device flow.
         */
        EXPIRED,


        /**
         * The user code does not exist. The authorization server implementation
         * should tell the end-user that the user code is invalid and urge her
         * to retry to input a valid user code.
         */
        NOT_EXIST,


        /**
         * An error occurred on Authlete side. The authorization server
         * implementation should tell the end-user that something wrong happened
         * and urge her to re-initiate a device flow.
         */
        SERVER_ERROR,
    }
}