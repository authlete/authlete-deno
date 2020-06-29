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
import { AuthleteApiException } from '../api/authlete_api_exception.ts';
import { AuthorizationFailRequest } from '../dto/authorization_fail_request.ts';
import { AuthorizationFailResponse } from '../dto/authorization_fail_response.ts';
import { AuthorizationIssueRequest } from '../dto/authorization_issue_request.ts';
import { AuthorizationIssueResponse } from '../dto/authorization_issue_response.ts';
import { AuthorizationRequest } from '../dto/authorization_request.ts';
import { TokenFailRequest } from '../dto/token_fail_request.ts';
import { TokenFailResponse } from '../dto/token_fail_response.ts';
import { TokenIssueRequest } from '../dto/token_issue_request.ts';
import { TokenIssueResponse } from '../dto/token_issue_response.ts';
import { TokenRequest } from '../dto/token_request.ts';
import { isObject } from '../util/util.ts';
import { badRequest, ContentType, form, internalServerError, location, ok } from './response_util.ts';
import { formUrlEncode } from './url_coder.ts';
import { WebApplicationException } from './web_application_exception.ts';
import AfrAction = AuthorizationFailResponse.Action;
import AirAction = AuthorizationIssueResponse.Action;
import TfrAction = TokenFailResponse.Action;
import TirAction = TokenIssueResponse.Action;


/**
 * Normalize the given parameter as 'parameters' parameter for
 * '/api/auth/authorization' API and '/api/auth/token' API.
 */
export function normalizeParameters(parameters: string | { [key: string]: string } | null): string
{
    if (parameters === null)
    {
        // Authlete returns different error codes for null and an empty
        // string. 'null' is regarded as a caller's error. An empty string
        // is regarded as a client application's error.
        return '';
    }

    // If the 'parameters' is an Object ({ [key:string]: string }).
    if (isObject(parameters))
    {
        // Convert the object to a form-url-encoded string.
        return formUrlEncode(parameters as { [key: string]: string });
    }

    // The 'parameters' is a string. In this case, just return the original
    // value.
    return parameters as string;
}


/**
 * Create an `WebApplicationException` instance having a response body
 * that indicates `'500 Internal Server Error'`.
 */
function createInternalServerErrorException(message: string, error?: AuthleteApiException)
{
    // A response representing '500 Internal Server Error'.
    const response = internalServerError(message, ContentType.TEXT_HTML_UTF8);

    // Create an instance of WebApplicationException with it.
    return new WebApplicationException(response, error);
}


/**
 * Create an `WebApplicationException` instance to indicate that an
 * Authlete API call failed.
 */
function apiFailure(path: string, e: AuthleteApiException)
{
    // Error message.
    let message = `Authlete ${path} API failed: ${e.message}`;

    // Response body in the response from the Authlete server.
    if (e.responseBody)
    {
        // Append the content of the response body to the error message.
        message = `${message}: ${e.responseBody}`;
    }

    // 500 Internal Server Error.
    return createInternalServerErrorException(message, e);
}


/**
 * Process an error.
 */
function processError(e: Error, path: string)
{
    return e instanceof AuthleteApiException ? apiFailure(path, e) : e;
}


/**
 * Create a WebApplicationException instance to indicate that the value
 * of `action` parameter contained in a response from an Authlete API
 * is unknown.
 */
export function unknownAction(path: string)
{
    // Error message.
    const message = `Authlete ${path} API returned an unknown action`;

    // 500 Internal Server Error.
    return createInternalServerErrorException(message);
}


/**
 * Authlete API caller.
 */
export class AuthleteApiCaller
{
    /**
     * The Authlete API client.
     */
    private api: AuthleteApi;


    /**
     * The constructor.
     */
    public constructor(api: AuthleteApi)
    {
        this.api = api;
    }


    /**
     * Call Authlete `/api/auth/authorization` API.
     */
    public async callAuthorization(request: AuthorizationRequest)
    {
        try
        {
            // Call Authlete /api/auth/authorization API.
            return await this.api.authorization(request);
        }
        catch (e)
        {
            // Process the error.
            throw processError(e, '/api/auth/authorization');
        }
    }


    /**
     * Call Authlete `/api/auth/authorization/fail` API.
     */
    private async callAuthorizationFail(request: AuthorizationFailRequest)
    {
        try
        {
            // Call Authlete /api/auth/authorization/fail API.
            return await this.api.authorizationFail(request);
        }
        catch (e)
        {
            // Process the error.
            throw processError(e, '/api/auth/authorization/fail');
        }
    }


    /**
     * Create a response that describes the failure. This method calls
     * Authlete `/api/auth/authorization/fail` API.
     */
    private async createAuthorizationFailResponse(request: AuthorizationFailRequest)
    {
        // Call Authlete /api/auth/authorization/fail API.
        const response = await this.callAuthorizationFail(request);

        // Dispatch according to the action.
        switch (response.action)
        {
            case AfrAction.INTERNAL_SERVER_ERROR:
                // 500 Internal Server Error.
                return internalServerError(response.responseContent);

            case AfrAction.BAD_REQUEST:
                // 400 Bad Request.
                return badRequest(response.responseContent);

            case AfrAction.LOCATION:
                // 302 Found.
                return location(response.responseContent);

            case AfrAction.FORM:
                // 200 OK.
                return form(response.responseContent);

            default:
                // This never happens.
                throw unknownAction('/api/auth/authorization/fail');
        }
    }


    /**
     * Create an exception that describes the failure. This method calls
     * Authlete `/api/auth/authorization/fail` API.
     */
    public async authorizationFail(request: AuthorizationFailRequest)
    {
        // Create a response to the client application with the help of
        // Authlete /api/auth/authorization/fail API.
        const response = await this.createAuthorizationFailResponse(request);

        // Create an exception containing the response.
        return new WebApplicationException(response);
    }


    /**
     * Call Authlete `/api/auth/authorization/issue` API.
     */
    private async callAuthorizationIssue(request: AuthorizationIssueRequest)
    {
        try
        {
            // Call Authlete /api/auth/authorization/issue API.
            return await this.api.authorizationIssue(request);
        }
        catch (e)
        {
            // Process the error.
            throw processError(e, '/api/auth/authorization/issue');
        }
    }


    /**
     * Issue an authorization code, an ID token and/or an access token.
     * This method calls Authlete `/api/auth/authorization/issue` API.
     */
    public async authorizationIssue(request: AuthorizationIssueRequest)
    {
        // Call Authlete /api/auth/authorization/issue API.
        const response = await this.callAuthorizationIssue(request);

        // Dispatch according to the action.
        switch (response.action)
        {
            case AirAction.INTERNAL_SERVER_ERROR:
                // 500 Internal Server Error.
                return internalServerError(response.responseContent);

            case AirAction.BAD_REQUEST:
                // 400 Bad Request.
                return badRequest(response.responseContent);

            case AirAction.LOCATION:
                // 302 Found.
                return location(response.responseContent);

            case AirAction.FORM:
                // 200 OK.
                return form(response.responseContent);

            default:
                // This never happens.
                throw unknownAction('/api/auth/authorization/issue');
        }
    }


    /**
     * Call Authlete `/api/auth/authorization/issue` API.
     */
    public async callToken(request: TokenRequest)
    {
        try
        {
            // Call Authlete /api/auth/token API.
            return await this.api.token(request);
        }
        catch (e)
        {
            // Process the error.
            throw processError(e, '/api/auth/token');
        }
    }


    /**
     * Call Authlete `/api/auth/token/fail` API.
     */
    private async callTokenFail(request: TokenFailRequest)
    {
        try
        {
            // Call Authlete /api/auth/token/fail API.
            return await this.api.tokenFail(request);
        }
        catch (e)
        {
            // Process the error.
            throw processError(e, '/api/auth/token/fail');
        }
    }


    /**
     * Create a response that describes the failure. This method calls
     * Authlete `/api/auth/token/fail` API.
     */
    private async createTokenFailResponse(request: TokenFailRequest)
    {
        // Call Authlete /api/auth/token/fail API.
        const response = await this.callTokenFail(request);

        // Dispatch according to the action.
        switch (response.action)
        {
            case TfrAction.INTERNAL_SERVER_ERROR:
                // 500 Internal Server Error.
                return internalServerError(response.responseContent);

            case TfrAction.BAD_REQUEST:
                // 400 Bad Request.
                return badRequest(response.responseContent);

            default:
                // This never happens.
                throw unknownAction('/api/auth/token/fail');
        }
    }


    /**
     * Create an exception that describes the failure. This method
     * calls Authlete `/api/auth/token/fail` API.
     */
    public async tokenFail(request: TokenFailRequest)
    {
        // Create a response to the client application with the help of
        // Authlete /api/auth/token/fail API.
        const response = await this.createTokenFailResponse(request);

        // Create an exception containing the response.
        return new WebApplicationException(response);
    }


    /**
     * Call Authlete `/api/auth/token/issue` API.
     */
    private async callTokenIssue(request: TokenIssueRequest)
    {
        try
        {
            // Call Authlete /api/auth/token/issue API.
            return await this.api.tokenIssue(request);
        }
        catch (e)
        {
            // Process the error.
            throw processError(e, '/api/auth/token/issue');
        }
    }


    /**
     * Issue an access token and optionally an ID token. This method
     * calls Authlete `/api/auth/token/issue` API.
     */
    public async tokenIssue(request: TokenIssueRequest)
    {
        // Call Authlete /api/auth/token/issue API.
        const response = await this.callTokenIssue(request);

        // Dispatch according to the action.
        switch (response.action)
        {
            case TirAction.INTERNAL_SERVER_ERROR:
                // 500 Internal Server Error.
                return internalServerError(response.responseContent);

            case TirAction.OK:
                // 200 OK.
                return ok(response.responseContent);

            default:
                // This never happens.
                throw unknownAction('/api/auth/token/issue');
        }
    }
}