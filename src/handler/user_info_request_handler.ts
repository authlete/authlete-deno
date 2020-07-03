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

import { AuthleteApi } from '../api/authlete_api.ts';
import { UserInfoIssueRequest } from '../dto/user_info_issue_request.ts';
import { UserInfoIssueResponse } from '../dto/user_info_issue_response.ts';
import { UserInfoRequest } from '../dto/user_info_request.ts';
import { UserInfoResponse } from '../dto/user_info_response.ts';
import { UserInfoRequestHandlerSpi } from '../spi/user_info_request_handler_spi.ts';
import { isEmpty } from '../util/util.ts';
import { bearerError, ContentType, ok, Status } from '../web/response_util.ts';
import { BaseApiRequestHandler } from './base_api_request_handler.ts';
import { unknownAction } from './base_handler.ts';
import { ClaimCollector } from './claim_collector.ts';
import UirAction = UserInfoResponse.Action;
import UiirAction = UserInfoIssueResponse.Action;


/**
 * The value for `WWW-Authenticate` header of a response for when an access
 * token is not available.
 */
const CHALLENGE_ON_MISSING_ACCESS_TOKEN =
    'Bearer error="invalid_token",error_description="' +
    'An access token must be sent as a Bearer Token. ' +
    'See OpenID Connect Core 1.0, 5.3.1. UserInfo Request for details."';


/**
 * Handler for userinfo requests to a "[UserInfo Endpoint](
 * http://openid.net/specs/openid-connect-core-1_0.html#UserInfo)" defined
 * in [OpenID Connect Core 1.0](http://openid.net/specs/openid-connect-core-1_0.html).
 *
 * In an implementation of userinfo endpoint, call one of `handle()`
 * method variants and use the response as the response from the endpoint
 * to the client application. `handle()` method calls Authlete `/api/auth/userinfo`
 * API and `/api/auth/userinfo/issue` API.
 */
export class UserInfoRequestHandler extends BaseApiRequestHandler<UserInfoRequestHandler.Params>
{
    /**
     * The SPI class for this handler.
     */
    private spi: UserInfoRequestHandlerSpi;


    /**
     * The constructor.
     *
     * @param api
     *         An Authlete API client.
     *
     * @param spi
     *         An implementation of `TokenRequestHandler` interface.
     */
    public constructor(api: AuthleteApi, spi: UserInfoRequestHandlerSpi)
    {
        super(api);

        this.spi = spi;
    }


    /**
     * Handle a userinfo request. This method calls Authlete `/api/auth/userinfo`
     * API and conditionally `/api/auth/userinfo/issue` API.
     *
     * @param params
     *         Parameters for this handler.
     *
     * @returns An HTTP response that should be returned from the userinfo
     *          endpoint implementation to the client application.
     */
    public async handle(params: UserInfoRequestHandler.Params)
    {
        // Return a response of '400 Bad Request' if an access token is
        // not available.
        if (isEmpty(params.accessToken))
        {
            return bearerError(Status.BAD_REQUEST, CHALLENGE_ON_MISSING_ACCESS_TOKEN);
        }

        // Call Authlete /api/auth/userinfo API.
        const response = await this.callUserInfo(params);

        // Dispatch according to the action.
        switch (response.action)
        {
            case UirAction.INTERNAL_SERVER_ERROR:
                // 500 Internal Server Error.
                return bearerError(Status.INTERNAL_SERVER_ERROR, response.responseContent!);

            case UirAction.BAD_REQUEST:
                // 400 Bad Request.
                return bearerError(Status.BAD_REQUEST, response.responseContent!);

            case UirAction.UNAUTHORIZED:
                // 401 Unauthorized.
                return bearerError(Status.UNAUTHORIZED, response.responseContent!);

            case UirAction.FORBIDDEN:
                // 403 Forbidden.
                return bearerError(Status.FORBIDDEN, response.responseContent!);

            case UirAction.OK:
                // Return the user information.
                return await this.getUserInfo(response);

            default:
                // This never happens.
                return unknownAction('/api/auth/userinfo');
        }
    }


    private async callUserInfo(params: UserInfoRequestHandler.Params)
    {
        // Create a request for Authlete /api/auth/userinfo API.
        const request = new UserInfoRequest();

        // Access token.
        request.token = params.accessToken;

        // Client Certificate.
        const clientCertificate = params.clientCertificate;
        if (clientCertificate) request.clientCertificate = clientCertificate;

        // Call Authlete /api/auth/userinfo API.
        return await this.api.userInfo(request);
    }


    private async getUserInfo(uir: UserInfoResponse)
    {
        // Call Authlete /api/auth/userinfo/issue API.
        const response = await this.callUserInfoIssue(uir);

        // Dispatch according to the action.
        switch (response.action)
        {
            case UiirAction.INTERNAL_SERVER_ERROR:
                // 500 Internal Server Error.
                return bearerError(Status.INTERNAL_SERVER_ERROR, response.responseContent);

            case UiirAction.BAD_REQUEST:
                // 400 Bad Request.
                return bearerError(Status.BAD_REQUEST, response.responseContent);

            case UiirAction.UNAUTHORIZED:
                // 401 Unauthorized.
                return bearerError(Status.UNAUTHORIZED, response.responseContent);

            case UiirAction.FORBIDDEN:
                // 403 Forbidden.
                return bearerError(Status.FORBIDDEN, response.responseContent);

            case UiirAction.JSON:
                // 200 OK.
                return ok(response.responseContent);

            case UiirAction.JWT:
                // 200 OK.
                // TODO
                return ok(response.responseContent, ContentType.JWT);

            default:
                // This never happens.
                return unknownAction('/api/auth/authorization/issue');
        }
    }


    private async callUserInfoIssue(uir: UserInfoResponse)
    {
        // Create a request for Authlete /api/auth/userinfo/issue API.
        const request = new UserInfoIssueRequest();

        // Access token.
        request.token = uir.token;

        // The value of the 'sub' claim (optional).
        const sub = this.spi.getSub();
        if (sub) request.sub = sub;

        // Collect claim values of the user.
        const claims = new ClaimCollector(this.spi, uir.subject!, uir.claims).collect();
        if (claims && Object.keys(claims).length > 0) request.setClaims(claims);

        // Call Authlete /api/auth/userinfo/issue API.
        return await this.api.userInfoIssue(request);
    }
}


export namespace UserInfoRequestHandler
{
    /**
     * Input parameters for the `handle()` method of `UserInfoRequestHandler`
     * class.
     */
    export interface Params
    {
        /**
         * The access token included in the userinfo request.
         */
        accessToken?: string;


        /**
         * Get the client certificate included in the userinfo request.
         *
         * For more details, see [RFC 8705 : OAuth 2.0 Mutual-TLS Client
         * Authentication and Certificate-Bound Access Tokens](
         * https://www.rfc-editor.org/rfc/rfc8705.html).
         */
        clientCertificate?: string;
    }
}