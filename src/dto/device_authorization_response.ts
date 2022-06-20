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
import { ClientAuthMethod } from '../type/client_auth_method.ts';
import { ApiResponse } from './api_response.ts';
import { AuthzDetails } from './authz_details.ts';
import { DynamicScope } from './dynamic_scope.ts';
import { Pair } from './pair.ts';
import { Scope } from './scope.ts';
import { TaggedValue } from './tagged_value.ts';
const { Type, Transform } = ct;


/**
 * Response from Authlete `/device/authorization` API.
 */
export class DeviceAuthorizationResponse extends ApiResponse
{
    /**
     * The next action that the implementation of the device authorization
     * endpoint should take.
     */
    @Transform((value: any) => DeviceAuthorizationResponse.Action[value])
    public action!: DeviceAuthorizationResponse.Action;


    /**
     * The content that can be used to generate a response to the client
     * application.
     */
    public responseContent?: string;


    /**
     * The client ID of the client application that has made the device
     * authorization request.
     */
    public clientId!: number;


    /**
     * The client ID alias of the client application that has made the
     * device authorization request.
     */
    public clientIdAlias?: string;


    /**
     * The client ID alias of the client application that has made the
     * device authorization request.
     */
    public clientIdAliasUsed!: boolean;


    /**
     * The name of the client application which has made the device
     * authorization request.
     */
    public clientName?: string;


    /**
     * The client authentication method that should be performed at the
     * device authorization endpoint.
     */
    @Transform((value: any) => fromJsonValue(value, ClientAuthMethod), { toClassOnly: true })
    public clientAuthMethod?: ClientAuthMethod;


    /**
     * The scopes requested by the device authorization request.
     *
     * Basically, this property has the value of the `scope` request
     * parameter in the device authorization request. However, because
     * unregistered scopes are dropped on Authlete side, if the `scope`
     * request parameter contains unknown scopes, the list this property
     * has becomes different from the value of the `scope` request parameter.
     *
     * Note that `description` property and `descriptions` property of
     * each element (`Scope` instance) in the array returned from this
     * method always return `null` even if descriptions of the scopes
     * are registered.
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
     * This property always has `null` if the `scope` request parameter
     * of the device authorization request does not include the `openid`
     * scope even if special scopes (such as `profile`) are included in
     * the request (unless the `openid` scope is included in the default
     * set of scopes which is used when the `scope` request parameter
     * is omitted).
     */
    @Type(() => TaggedValue)
    public clientNames?: TaggedValue[];


    /**
     * The list of ACR values requested by the device authorization request.
     *
     * Basically, this property has the value of the `acr_values` request
     * parameter in the device authorization request. However, because
     * unsupported ACR values are dropped on Authlete side, if the `acr_values`
     * request parameter contains unrecognized ACR values, the list this
     * property has becomes different from the value of the `acr_values`
     * request parameter.
     *
     * If the request does not include the `acr_values` request parameter,
     * the value of the `default_acr_values` client metadata is used.
     */
    public acrs?: string[];


    /**
     * The device verification code. This corresponds to the `device_code`
     * property in the response to the client.
     */
    public deviceCode?: string;


    /**
     * The end-user verification code. This corresponds to the `user_code`
     * property in the response to the client.
     */
    public userCode?: string;


    /**
     * The end-user verification URI. This corresponds to the `verification_uri`
     * property in the response to the client.
     */
    public verificationUri?: string;


    /**
     * The end-user verification URI that includes the end-user verification
     * code. This corresponds to the `verification_uri_complete` property
     * in the response to the client.
     */
    public verificationUriComplete?: string;


    /**
     * The duration of the issued device verification code and end-user
     * verification code in seconds. This corresponds to the `expires_in`
     * property in the response to the client.
     */
    public expiresIn!: number;


    /**
     * The minimum amount of time in seconds that the client must wait
     * for between polling requests to the token endpoint. This corresponds
     * to the `interval` property in the response to the client.
     */
    public interval!: number;


    /**
     * The resources specified by the `resource` request parameters.
     * See _"Resource Indicators for OAuth 2.0"_ for details.
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
     * The warnings raised during processing the device authorization
     * request.
     */
    public warnings?: string[];


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


export namespace DeviceAuthorizationResponse
{
    /**
     * The next action that the service implementation should take.
     */
    export enum Action
    {
        /**
         * The API call has been processed successfully. The authorization
         * server should return a successful response to the web browser
         * the end-user is using.
         */
        SUCCESS,


        /**
         * The API call is invalid. Probably, the authorization server
         * implementation has some bugs.
         */
        INVALID_REQUEST,


        /**
         * The user code has expired. The authorization server implementation
         * should tell the end-user that the user code has expired and
         * urge her to re-initiate a device flow.
         */
        USER_CODE_EXPIRED,


        /**
         * The user code does not exist. The authorization server implementation
         * should tell the end-user that the user code has been invalidated
         * and urge her to re-initiate a device flow.
         */
        USER_CODE_NOT_EXIST,


        /**
         * An error occurred on Authlete side. The authorization server
         * implementation should tell the end-user that something wrong
         * happened and urge her to re-initiate a device flow.
         */
        SERVER_ERROR,
    }
}