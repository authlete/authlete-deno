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
import { DeliveryMode } from '../type/delivery_mode.ts';
import { UserIdentificationHintType } from '../type/user_identification_hint_type.ts';
import { ApiResponse } from './api_response.ts';
import { AuthzDetails } from './authz_details.ts';
import { DynamicScope } from './dynamic_scope.ts';
import { Pair } from './pair.ts';
import { Scope } from './scope.ts';
import { TaggedValue } from './tagged_value.ts';
const { Type, Transform } = ct;


/**
 * Response from Authlete `/backchannel/authentication` API.
 */
export class BackchannelAuthenticationResponse extends ApiResponse
{
    /**
     * The next action that the service implementation should take.
     */
    @Transform((value: any) => BackchannelAuthenticationResponse.Action[value])
    public action!: BackchannelAuthenticationResponse.Action;


    /**
     * The response content which can be used as the entity body of the
     * response returned to the client application.
     */
    public responseContent?: string;


    /**
     * The client ID.
     */
    public clientId!: number;


    /**
     * The client ID alias.
     *
     * If the client did not have an alias, the value of this property
     * is unset.
     */
    public clientIdAlias?: string;


    /**
     * The flag which indicates whether the client ID alias was used
     * when the token request was made.
     */
    public clientIdAliasUsed!: boolean;


    /**
     * The name of the client application which has made the backchannel
     * authentication request.
     */
    public clientName?: string;


    /**
     * The client authentication method that should be performed at
     * the token endpoint.
     *
     * If the client could not be identified by the information in the
     * request, this property is unset.
     */
    @Transform((value: any) => fromJsonValue(value, ClientAuthMethod), { toClassOnly: true })
    public clientAuthMethod?: ClientAuthMethod;


    /**
     * The backchannel token delivery mode of the client application.
     */
    @Type(() => DeliveryMode)
    public deliveryModes?: DeliveryMode[];


    /**
     * The scopes requested by the backchannel authentication request.
     *
     * Basically, this property holds the value of the `scope` request
     * parameter in the backchannel authentication request. However, because
     * unregistered scopes are dropped on Authlete side, if the `scope`
     * request parameter contains unknown scopes, the list this property
     * has becomes different from the value of the `scope` request parameter.
     *
     * Note that `Scope.description` and `Scope.descriptions` property
     * of each element (`Scope` instance) in the array this property has
     * is always set to `null` even if descriptions of the scopes are
     * registered.
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
     */
    @Type(() => TaggedValue)
    public clientNames?: TaggedValue[];


    /**
     * The client notification token included in the backchannel authentication
     * request. It is the value of the `client_notification_token` request
     * parameter.
     *
     * When the backchannel token delivery mode is `"ping"` or `"push"`,
     * the backchannel authentication request must include a client notification
     * token.
     */
    public clientNotificationToken?: string;


    /**
     * The list of ACR values requested by the backchannel authentication
     * request.
     *
     * Basically, this property has the value of the `acr_values` request
     * parameter in the backchannel authentication request. However,
     * because unsupported ACR values are dropped on Authlete side, if the
     * `acr_values` request parameter contains unrecognized ACR values,
     * the list this property has becomes different from the value of the
     * `acr_values` request parameter.
     */
    public acrs?: string[];


    /**
     * The type of the hint for end-user identification which was included
     * in the backchannel authentication request.
     *
     * When the backchannel authentication request contains `id_token_hint`,
     * this property has `UserIdentificationHintType.ID_TOKEN_HINT`.
     * Likewise, this property has `UserIdentificationHintType.LOGIN_HINT LOGIN_HINT`
     * when the request contains `login_hint`, or has `UserIdentificationHintType.LOGIN_HINT_TOKEN`
     * when the request contains `login_hint_token`.
     *
     * Note that a backchannel authentication request must include one
     * and only one hint among `id_token_hint`, `login_hint` and
     * `login_hint_token`.
     */
    public hintType?: UserIdentificationHintType;


    /**
     * The value of the hint for end-user identification.
     *
     * When `hintType` has `UserIdentificationHintType.ID_TOKEN_HINT ID_TOKEN_HINT`,
     * this property has the value of the `id_token_hint` request parameter.
     * Likewise, this property has the value of the `login_hint` request
     * parameter when `hintType` has `UserIdentificationHintType.LOGIN_HINT`,
     * or has the value of the `login_hint_token` request parameter
     * when `hintType` has `UserIdentificationHintType.LOGIN_HINT_TOKEN`.
     */
    public hint?: string;


    /**
     * The value of the `sub` claim contained in the ID token hint included
     * in the backchannel authentication request.
     *
     * This property has a value only when the backchannel authentication
     * request contains the `id_token_hint` request parameter.
     */
    public sub?: string;


    /**
     * The binding message included in the backchannel authentication
     * request. It is the value of the `binding_message` request parameter.
     */
    public bindingMessage?: string;


    /**
     * The user code included in the backchannel authentication request.
     * It is the value of the `user_code` request parameter.
     */
    public userCode?: string;


    /**
     * The flag which indicates whether a user code is required.
     *
     * This property has `true` when both the `backchannel_user_code_parameter`
     * metadata of the client (= `Client`'s `bcUserCodeRequired` property)
     * and the `backchannel_user_code_parameter_supported` metadata of
     * the service (= `Service.backchannelUserCodeParameterSupported`)
     * are `true`.
     */
    public userCodeRequired!: boolean;


    /**
     * The requested expiry for the authentication request ID (`auth_req_id`).
     * It is the value of the `requested_expiry` request parameter.
     */
    public requestedExpiry!: number;


    /**
     * The request context of the backchannel authentication request.
     * It is the value of the `request_context` claim in the signed
     * authentication request and its format is JSON. `request_context`
     * is a new claim added by the FAPI-CIBA profile.
     *
     * This property has `null` if the backchannel authentication request
     * does not include a `request` request parameter or the JWT specified
     * by the request parameter does not include a `request_context` claim.
     */
    public requestContext?: string;


    /**
     * The resources specified by the `resource` request parameters or
     * by the `resource` property in the request object. If both are
     * given, the values in the request object take precedence.
     *
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
     * The warnings raised during processing the backchannel authentication
     * request.
     */
    public warnings?: string[];


    /**
     * The ticket that is necessary for the implementation of the backchannel
     * authentication endpoint to call `/backchannel/authentication/*`
     * API.
     */
    public ticket!: string;


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


export namespace BackchannelAuthenticationResponse
{
    /**
     * The next action that the service implementation should take.
     */
    export enum Action
    {
        /**
         * The backchannel authentication request is invalid. The authorization
         * server implementation should return an error response with
         * `400 Bad Request` and `application/json` to the client application.
         */
        BAD_REQUEST,


        /**
         * Client authentication of the backchannel authentication request
         * failed. The authorization server implementation should return
         * an error response with `401 Unauthorized` and `application/json`
         * to the client application.
         */
        UNAUTHORIZED,


        /**
         * The API call from the authorization server implementation was wrong
         * or an error occurred on Authlete side. The authorization server
         * implementation should return an error response with `500 Internal
         * Server Error` and `application/json` to the client application.
         */
        INTERNAL_SERVER_ERROR,


        /**
         * The backchannel authentication request was valid. The authorization
         * server implementation is required to (1) identify the subject
         * of the end-user from the given hint, (2) issue `auth_req_id`
         * to the client application, (3) communicate with an authentication
         * device of the end-user to perform end-user authentication and
         * authorization, etc. See the API document of `BackchannelAuthenticationResponse`
         * for details.
         */
        USER_IDENTIFICATION,
    }
}