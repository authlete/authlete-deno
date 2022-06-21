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
import { DeliveryMode } from '../type/delivery_mode.ts';
import { ApiResponse } from './api_response.ts';
import { AuthzDetails } from './authz_details.ts';
import { Pair } from './pair.ts';
const { Type, Transform } = ct;


/**
 * Response from Authlete `/backchannel/authentication/complete` API.
 */
export class BackchannelAuthenticationCompleteResponse extends ApiResponse
{
    /**
     * The next action that the service implementation should take.
     */
    @Transform((value: any) => BackchannelAuthenticationCompleteResponse.Action[value])
    public action!: BackchannelAuthenticationCompleteResponse.Action;


    /**
     * The content of the notification.
     *
     * When the value of `action` is `NOTIFICATION`, this property has
     * JSON which should be used as the request body of the notification.
     *
     * In successful cases, when the backchannel token delivery mode is
     * `ping`, the JSON contains `auth_req_id`. On the other hand, when
     * the backchannel token delivery mode is `push`, the JSON contains
     * an access token, an ID token, and optionally a refresh token (and
     * some other properties).
     */
    public responseContent?: string;


    /**
     * The client ID of the client application that has made the backchannel
     * authentication request.
     */
    public clientId!: number;


    /**
     * The client ID alias of the client application that has made the
     * backchannel authentication request.
     */
    public clientIdAlias?: string;


    /**
     * The flag which indicates whether the client ID alias was used in
     * the backchannel authentication request.
     */
    public clientIdAliasUsed!: boolean;


    /**
     * The name of the client application which has made the backchannel
     * authentication request.
     */
    public clientName?: string;


    /**
     * The backchannel token delivery mode.
     */
    @Transform((value: any) => fromJsonValue(value, DeliveryMode), { toClassOnly: true })
    public deliveryMode?: DeliveryMode;


    /**
     * The client notification endpoint to which a notification needs to be
     * sent.
     *
     * This corresponds to the `"client_notification_endpoint"` metadata
     * of the client application.
     */
    public clientNotificationEndpoint?: string;


    /**
     * The client notification token which needs to be embedded as a
     * `Bearer` token in the `Authorization` header in the notification.
     *
     * This is the value of the `"client_notification_token"` request
     * parameter included in the backchannel authentication request.
     */
    public clientNotificationToken?: string;


    /**
     * The value of the `"auth_req_id"` which is associated with the ticket.
     */
    public authReqId?: string;


    /**
     * The issued access token. This property has a non-null value only
     * when the backchannel token delivery mode is "push" and an access
     * token has been issued successfully.
     */
    public accessToken?: string;


    /**
     * The issued refresh token. This property has a non-null value
     * only when the backchannel token delivery mode is "push" and a refresh
     * token has been issued successfully.
     *
     * Note that refresh tokens are not issued if the service does not
     * support the refresh token flow.
     */
    public refreshToken?: string;


    /**
     * The issued ID token. This property has a non-null value only when
     * the backchannel token delivery mode is "push" and an ID token has
     * been issued successfully.
     */
    public idToken?: string;


    /**
     * The duration of the access token in seconds.
     */
    public accessTokenDuration!: number;


    /**
     * The duration of the refresh token in seconds.
     */
    public refreshTokenDuration!: number;


    /**
     * The duration of the refresh token in seconds.
     */
    public idTokenDuration!: number;


    /**
     * The newly issued access token in JWT format.
     *
     * If the authorization server is configured to issue JWT-based access
     * tokens (= if `Service.getAccessTokenSignAlg` holds a valid value),
     * a JWT-based access token is issued along with the original random-string
     * one.
     *
     * Regarding the detailed format of the JWT-based access token, see
     * the description of the `Service` class.
     */
    public jwtAccessToken?: string;


    /**
     * The resources specified by the _resource_ request parameters or
     * by the `resource` property in the request object in the preceding
     * backchannel authentication request. If both are given, the values
     * in the request object take precedence.
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


export namespace BackchannelAuthenticationCompleteResponse
{
    /**
     * The next action that the service implementation should take.
     */
    export enum Action
    {
        /**
         * The OpenID provider implementation must send a notification to the
         * client's notification endpoint. This action code is returned when
         * the backchannel token delivery mode is `ping` or `push`.
         */
        NOTIFICATION,


        /**
         * The OpenID provider implementation does not have to take any
         * immediate action for this API response. The remaining task
         * is just to handle polling requests from the client to the token
         * endpoint. This action code is returned when the backchannel
         * token delivery mode is `poll`.
         */
        NO_ACTION,


        /**
         * An error occurred either because the ticket included in the
         * API call was invalid or because an error occurred on Authlete
         * side.
         *
         * If an error occurred after Authlete succeeded in retrieving
         * data associated with the ticket from the database and if the
         * backchannel token delivery mode is `ping` or `push`, `NOTIFICATION`
         * is used as the value of `action` instead of `SERVER_ERROR`.
         * In the case, `responseContent` contains `"error":"server_error"`.
         */
        SERVER_ERROR,
    }
}