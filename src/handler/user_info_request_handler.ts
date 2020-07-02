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
import { UserInfoRequest } from '../dto/user_info_request.ts';
import { UserInfoResponse } from '../dto/user_info_response.ts';
import { UserInfoRequestHandlerSpi } from '../spi/user_info_request_handler_spi.ts';
import { isEmpty, isUndefined } from '../util/util.ts';
import { unknownAction } from '../web/authlete_api_caller.ts';
import { bearerError, Status } from '../web/response_util.ts';
import { BaseHandler } from './base_handler.ts';
import Action = UserInfoResponse.Action;


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
export class UserInfoRequestHandler extends BaseHandler<UserInfoRequestHandler.Params>
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
     *         An implementation of  `UserInfoRequestHandlerSpi` interface.
     */
    public constructor(api: AuthleteApi, spi: UserInfoRequestHandlerSpi)
    {
        super(api);

        this.spi = spi;
    }


    protected async doHandle(params: UserInfoRequestHandler.Params)
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
            case Action.INTERNAL_SERVER_ERROR:
                // 500 Internal Server Error.
                return bearerError(Status.INTERNAL_SERVER_ERROR, response.responseContent!);

            case Action.BAD_REQUEST:
                // 400 Bad Request.
                return bearerError(Status.BAD_REQUEST, response.responseContent!);

            case Action.UNAUTHORIZED:
                // 401 Unauthorized.
                return bearerError(Status.UNAUTHORIZED, response.responseContent!);

            case Action.FORBIDDEN:
                // 403 Forbidden.
                return bearerError(Status.FORBIDDEN, response.responseContent!);

            case Action.OK:
                // Return the user information.
                return this.getUserInfo(response);

            default:
                // This never happens.
                throw unknownAction('/api/auth/userinfo');
        }
    }


    private async callUserInfo(params: UserInfoRequestHandler.Params)
    {
        // Create a request for Authlete /api/auth/userinfo API.
        const request = new UserInfoRequest();

        // Set the 'token' parameter.
        request.token = params.accessToken;

        // Set the 'clientCertificate' parameter.
        const clientCertificate = params.clientCertificate;
        if (clientCertificate) request.clientCertificate = clientCertificate;

        // Call Authlete /api/auth/userinfo API.
        return await this.apiCaller.callUserInfo(request);
    }


    /**
     * Generate a JSON or a JWT containing user information by calling
     * Authlete `/api/auth/userinfo/issue` API.
     */
    private async getUserInfo(response: UserInfoResponse)
    {
        // Create a request for Authlete /api/auth/userinfo/issue API.
        const request = new UserInfoIssueRequest();

        // Set the 'token' parameter.
        request.token = response.token;

        // Collect claim values of the user.
        const claims = this.collectClaims(response.subject!, response.claims);
        if (claims && Object.keys(claims).length > 0) request.setClaims(claims);

        // Generate a JSON or a JWT containing user information by calling
        // Authlete /api/auth/userinfo/issue API.
        return await this.apiCaller.userInfoIssue(request);
    }


    private collectClaims(subject: string, claimNames?: string[]): { [key: string]: any } | null
    {
        // If no claim is required.
        if (isEmpty(claimNames)) return null;

        // Let the implementation of UserInfoRequestHandlerSpi prepare
        // claims of the user who is identified by the subject.
        this.spi.prepareUserClaims(subject, claimNames!);

        // Claim values.
        const claims: { [key: string]: any } = {};

        // For each requested claim.
        claimNames!.forEach((claimName) => {
            // Skip if the claim name is empty.
            if (claimName.length === 0) return;

            // Split the claim name into the name part and the tag part.
            const [ name, tag ] = claimName.split('#', 2);

            // Skip if the name part is empty.
            if (name.length === 0) return;

            // Get the claim value of the claim.
            const value = this.spi.getUserClaim(name, tag);

            // Skip if the claim value was not obtained.
            if (value === null) return;

            // Just for an edge case where claimName ends with '#'.
            if (isUndefined(tag)) claimName = name;

            // Add the pair of the claim name and the claim value.
            claims[claimName] = value;
        });

        // Return the collected claims or null.
        return Object.keys(claims).length > 0 ? claims : null;
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