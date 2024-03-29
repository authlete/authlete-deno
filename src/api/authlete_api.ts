// Copyright (C) 2020−2022 Authlete, Inc.
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


import { AuthorizationFailRequest } from '../dto/authorization_fail_request.ts';
import { AuthorizationFailResponse } from '../dto/authorization_fail_response.ts';
import { AuthorizationIssueRequest } from '../dto/authorization_issue_request.ts';
import { AuthorizationIssueResponse } from '../dto/authorization_issue_response.ts';
import { AuthorizationRequest } from '../dto/authorization_request.ts';
import { AuthorizationResponse } from '../dto/authorization_response.ts';
import { BackchannelAuthenticationCompleteRequest } from '../dto/backchannel_authentication_complete_request.ts';
import { BackchannelAuthenticationCompleteResponse } from '../dto/backchannel_authentication_complete_response.ts';
import { BackchannelAuthenticationFailRequest } from '../dto/backchannel_authentication_fail_request.ts';
import { BackchannelAuthenticationFailResponse } from '../dto/backchannel_authentication_fail_response.ts';
import { BackchannelAuthenticationIssueRequest } from '../dto/backchannel_authentication_issue_request.ts';
import { BackchannelAuthenticationIssueResponse } from '../dto/backchannel_authentication_issue_response.ts';
import { BackchannelAuthenticationRequest } from '../dto/backchannel_authentication_request.ts';
import { BackchannelAuthenticationResponse } from '../dto/backchannel_authentication_response.ts';
import { Client } from '../dto/client.ts';
import { ClientListResponse } from '../dto/client_list_response.ts';
import { DeviceAuthorizationRequest } from '../dto/device_authorization_request.ts';
import { DeviceAuthorizationResponse } from '../dto/device_authorization_response.ts';
import { DeviceCompleteRequest } from '../dto/device_complete_request.ts';
import { DeviceCompleteResponse } from '../dto/device_complete_response.ts';
import { DeviceVerificationRequest } from '../dto/device_verification_request.ts';
import { DeviceVerificationResponse } from '../dto/device_verification_response.ts';
import { IntrospectionRequest } from '../dto/introspection_request.ts';
import { IntrospectionResponse } from '../dto/introspection_response.ts';
import { PushedAuthReqRequest } from '../dto/pushed_auth_req_request.ts';
import { PushedAuthReqResponse } from '../dto/pushed_auth_req_response.ts';
import { RevocationRequest } from '../dto/revocation_request.ts';
import { RevocationResponse } from '../dto/revocation_response.ts';
import { Service } from '../dto/service.ts';
import { ServiceListResponse } from '../dto/service_list_response.ts';
import { StandardIntrospectionRequest } from '../dto/standard_introspection_request.ts';
import { StandardIntrospectionResponse } from '../dto/standard_introspection_response.ts';
import { TokenCreateRequest } from '../dto/token_create_request.ts';
import { TokenCreateResponse } from '../dto/token_create_response.ts';
import { TokenFailRequest } from '../dto/token_fail_request.ts';
import { TokenFailResponse } from '../dto/token_fail_response.ts';
import { TokenIssueRequest } from '../dto/token_issue_request.ts';
import { TokenIssueResponse } from '../dto/token_issue_response.ts';
import { TokenListResponse } from '../dto/token_list_response.ts';
import { TokenRequest } from '../dto/token_request.ts';
import { TokenResponse } from '../dto/token_response.ts';
import { TokenRevokeRequest } from '../dto/token_revoke_request.ts';
import { TokenRevokeResponse } from '../dto/token_revoke_response.ts';
import { TokenUpdateRequest } from '../dto/token_update_request.ts';
import { TokenUpdateResponse } from '../dto/token_update_response.ts';
import { UserInfoIssueRequest } from '../dto/user_info_issue_request.ts';
import { UserInfoIssueResponse } from '../dto/user_info_issue_response.ts';
import { UserInfoRequest } from '../dto/user_info_request.ts';
import { UserInfoResponse } from '../dto/user_info_response.ts';


/**
 * Authlete API Interface.
 */
export interface AuthleteApi
{
    /**
     * Call `/auth/authorization` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    authorization(request: AuthorizationRequest): Promise<AuthorizationResponse>;


    /**
     * Call `/auth/authorization/issue` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    authorizationIssue(request: AuthorizationIssueRequest): Promise<AuthorizationIssueResponse>;


    /**
     * Call `/auth/authorization/fail` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    authorizationFail(request: AuthorizationFailRequest): Promise<AuthorizationFailResponse>;


    /**
     * Call `/auth/token` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    token(request: TokenRequest): Promise<TokenResponse>;


    /**
     * Call `/auth/token/issue` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    tokenIssue(request: TokenIssueRequest): Promise<TokenIssueResponse>;


    /**
     * Call `/auth/token/fail` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    tokenFail(request: TokenFailRequest): Promise<TokenFailResponse>;


    /**
     * Call `/auth/token/get/list` API.
     *
     * @param subject
     *         Unique user ID.
     *
     * @param clientId
     *         Client Identifier (client ID or client ID alias).
     *
     * @param start
     *         Start index of search results (inclusive). The default
     *         value is `0`.
     *
     * @param end
     *         End index of search results (exclusive). The default
     *         value is `5`.
     */
    getTokenList(subject?: string, clientIdentifier?: string, start?: number, end?: number): Promise<TokenListResponse>


    /**
     * Call `/auth/token/create` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    tokenCreate(request: TokenCreateRequest): Promise<TokenCreateResponse>


    /**
     * Call `/auth/token/update` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    tokenUpdate(request: TokenUpdateRequest): Promise<TokenUpdateResponse>


    /**
     * Call `/auth/token/delete` API.
     *
     * @param token
     *         An access token or its hash value.
     */
    tokenDelete(token: string): Promise<void>


    /**
     * Call `/auth/token/revoke` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    tokenRevoke(request: TokenRevokeRequest): Promise<TokenRevokeResponse>


    /**
     * Call Authlete `/auth/revocation` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    revocation(request: RevocationRequest): Promise<RevocationResponse>;


    /**
     * Call Authlete `/auth/userinfo` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    userInfo(request: UserInfoRequest): Promise<UserInfoResponse>;


    /**
     * Call Authlete `/auth/userinfo/issue` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    userInfoIssue(request: UserInfoIssueRequest): Promise<UserInfoIssueResponse>;


    /**
     * Call Authlete `/auth/introspection` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    introspection(request: IntrospectionRequest): Promise<IntrospectionResponse>;


    /**
     * Call Authlete `/auth/introspection/standard` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    standardIntrospection(request: StandardIntrospectionRequest): Promise<StandardIntrospectionResponse>;


    /**
     * Get information about a service.
     *
     * @param apiKey
     *         The API key of a service.
     */
    getService(apiKey: number): Promise<Service>;


    /**
     * Get list of services.
     *
     * @param start
     *         The start index (inclusive) of the result set. The default
     *         value is `0`. Must not be a negative number.
     *
     * @param end
     *         The end index (exclusive) of the result set. The default
     *         value is `5`. Must not be a negative number.
     */
    getServiceList(start?: number, end?: number): Promise<ServiceListResponse>


    /**
     * Create a service.
     *
     * @param service
     *         A service to create.
     */
    createService(service: Service): Promise<Service>


    /**
     * Update a service.
     *
     * @param service
     *         A service to update.
     */
    updateService(service: Service): Promise<Service>


    /**
     * Delete a service.
     *
     * @param apiKey
     *         The API key of a service.
     */
    deleteService(apiKey: number): Promise<void>


    /**
     * Get the JWK Set of a service.
     *
     * This methods returns the value of the service's `jwks` property
     * or the value provided at the service's `jwksUri` location. If
     * both properties have been set, the value of the `jwks` property
     * is returned in preference to the other one.
     *
     * For more details, see [RFC 7517: JSON Web Key (JWK)](
     * https://tools.ietf.org/html/rfc7517).
     *
     * @param pretty
     *         `true` to get the JSON in pretty format.
     *
     * @param includePrivateKeys
     *         `true` to keep private keys in the JSON. `false` to remove
     *         private keys.
     *
     * @returns JSON representation of the JWK Set of the service. `null`
     *          is returned when the service has registered neither content
     *          or URI of its JWK Set.
     */
    getServiceJwks(pretty?: boolean, includePrivateKeys?: boolean): Promise<string | null>;


    /**
     * Get the configuration of the service in JSON format that complies
     * with [OpenID Connect Discovery 1.0](
     * http://openid.net/specs/openid-connect-discovery-1_0.html).
     *
     * The value returned from this method can be used as the response
     * body from `/.well-known/openid-configuration`. See "[4. Obtaining
     * OpenID Provider Configuration Information](
     * http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderConfig)"
     * in OpenID Connect Discovery 1.0 for details.
     *
     * @param pretty
     *         `true` to get the JSON in pretty format.
     *
     * @returns The configuration of the service in JSON format.
     */
    getServiceConfiguration(pretty?: boolean): Promise<string>;


    /**
     * Get information about a client application.
     *
     * @param clientId
     *         The client ID of a client application.
     */
    getClient(clientId: number): Promise<Client>


    /**
     * Get list of client applications.
     *
     * @param developer
     *         The developer of client applications. If this parameter
     *         is specified, client applications of the specified developer
     *         are returned. Otherwise, all the client applications that
     *         belong to the service are returned.
     *
     * @param start
     *         The start index (inclusive) of the result set. The default
     *         value is `0`. Must not be a negative number.
     *
     * @param end
     *         The end index (exclusive) of the result set. The default
     *         value is `5`. Must not be a negative number.
     */
    getClientList(developer?: string, start?: number, end?: number): Promise<ClientListResponse>;


    /**
     * Create a client application.
     *
     * @param client
     *         A client application to create.
     */
    createClient(client: Client): Promise<Client>;


    /**
     * Update a client application.
     *
     * @param client
     *         A client application to update.
     */
    updateClient(client: Client): Promise<Client>;


    /**
     * Delete a client application.
     *
     * @param clientId
     *         The client ID of a client application.
     */
    deleteClient(clientId: number): Promise<void>;


    /**
     * Call Authlete `/backchannel/authentication` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    backchannelAuthentication(request: BackchannelAuthenticationRequest):
        Promise<BackchannelAuthenticationResponse>;


    /**
     * Call Authlete `/backchannel/authentication/issue` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    backchannelAuthenticationIssue(request: BackchannelAuthenticationIssueRequest):
        Promise<BackchannelAuthenticationIssueResponse>;


    /**
     * Call Authlete `/backchannel/authentication/fail` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    backchannelAuthenticationFail(request: BackchannelAuthenticationFailRequest):
        Promise<BackchannelAuthenticationFailResponse>;


    /**
     * Call Authlete `/backchannel/authentication/complete` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    backchannelAuthenticationComplete(request: BackchannelAuthenticationCompleteRequest):
        Promise<BackchannelAuthenticationCompleteResponse>;


    /**
     * Call Authlete `/device/authorization` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    deviceAuthorization(request: DeviceAuthorizationRequest): Promise<DeviceAuthorizationResponse>;


    /**
     * Call Authlete `/device/verification` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    deviceVerification(request: DeviceVerificationRequest): Promise<DeviceVerificationResponse>;


    /**
     * Call Authlete `/device/complete` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    deviceComplete(request: DeviceCompleteRequest): Promise<DeviceCompleteResponse>;


    /**
     * Call Authlete `/pushed_auth_req` API.
     *
     * @param request
     *         Request parameters passed to the API.
     */
    pushedAuthorizationRequest(request: PushedAuthReqRequest): Promise<PushedAuthReqResponse>;
}