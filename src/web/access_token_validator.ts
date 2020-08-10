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


import { Response } from 'https://deno.land/std@0.64.0/http/server.ts';
import { AuthleteApi } from '../api/authlete_api.ts';
import { IntrospectionRequest } from '../dto/introspection_request.ts';
import { IntrospectionResponse } from '../dto/introspection_response.ts';
import { Status, wwwAuthenticate } from './response_util.ts';
import Action = IntrospectionResponse.Action;


/**
 * Build an error response (`500 Internal Server Error`) that should be
 * returned to the client application when calling Authlete `/api/auth/introspection`
 * API failed.
 */
function buildErrorResponseOnApiCallFailure(e: Error)
{
    const challenge =
        'Bearer error="server_error",error_description="Introspection API call failed."';

    // Build a response that complies with RFC 6750.
    return wwwAuthenticate(Status.INTERNAL_SERVER_ERROR, challenge);
}


/**
 * Build an error response that should be returned to the client application
 * when the value of the `action` parameter in a response from Authlete
 * `/api/auth/introspection` API is not `OK`.
 */
function buildErrorResponseOnErrorAction(response: IntrospectionResponse)
{
    // The HTTP status code to be returned to the client application.
    let statusCode;

    // The 'action' parameter in the response from Authlete /api/auth/introspection
    // API denotes the next action that the API caller should take.
    switch (response.action)
    {
        case Action.INTERNAL_SERVER_ERROR:
            statusCode = Status.INTERNAL_SERVER_ERROR;
            break;

        case Action.BAD_REQUEST:
            statusCode = Status.BAD_REQUEST;
            break;

        case Action.UNAUTHORIZED:
            statusCode = Status.UNAUTHORIZED;
            break;

        case Action.FORBIDDEN:
            statusCode = Status.FORBIDDEN;
            break;

        default:
            // This should not happen. In this case, this function should
            // not be called.
            statusCode = Status.INTERNAL_SERVER_ERROR;
            break;
    }

    // In error cases, the 'responseContent' parameter in the response
    // from Authlete /api/auth/introspection API contains a value for
    // the WWW-Authenticate header.
    const challenge = response.responseContent;

    // Build a response that complies with RFC 6750.
    return wwwAuthenticate(statusCode, challenge);
}


/**
 * Access token validator.
 */
export class AccessTokenValidator
{
    private api: AuthleteApi;


    /**
     * The flag whether the access token given to `validate()` is valid
     * or not. After a call of `validate()` method, this property holds
     * the same value returned from `validate()`.
     *
     * On entry of <c>Validate()</c> method, this property is reset to
     * `false`.
     */
    public isValid: boolean = false;


    /**
     * A response from Authlete `/api/auth/introspection` API. `validate()`
     * method internally calls `/api/auth/introspection` API and sets
     * the response to this property. Note that this property remains
     * `undefined` if the API call threw an exception, and in that error
     * case, the `introspectionError` property is set.
     *
     * On entry of `validate()` method, this property is reset to
     * `undefined`.
     */
    public introspectionResult?: IntrospectionResponse;


    /**
     * `validate()` method internally calls Authlete `/api/auth/introspection`
     * API. If the API call threw an exception, the exception would be
     * set to this property. Note that this property remains `undefined`
     * if the API call succeeded, and in that successful case, the
     * `introspectionResult` property is set.
     *
     * On entry of `validate()` method, this property is reset to
     * `undefined`.
     */
    public introspectionError?: Error;


    /**
     * An error response that the API caller (here assuming that the API
     * caller is an implementation of a protected resource endpoint)
     * should return to the client application. This property is internally
     * set by `validate()` method when `validate()` returns `false`.
     * The error response complies with [RFC 6750](https://tools.ietf.org/html/rfc6750)
     * (The OAuth 2.0 Authorization Framework: Bearer Token Usage).
     *
     * On entry of `validate()` method, this property is reset to
     * `undefined`.
     */
    public errorResponse?: Response;


    /**
     * The constructor.
     *
     * @param api
     *         An implementation of the `AuthleteApi` interface.
     *         This is required because `validate()` method internally
     *         calls Authlete `/api/auth/introspection` API.
     */
    constructor(api: AuthleteApi)
    {
        this.api = api;
    }


    /**
     * Validate an access token.
     *
     * On entry, as the first step, the implementation of this method
     * resets the following properties to `false` or `undefined`.
     *
     * - `isValid`
     * - `introspectionResult`
     * - `introspectionError`
     * - `errorResponse`
     *
     * Then, this method internally calls Authlete `/api/auth/introspection`
     * API to get information about the access token.
     *
     * If the API call failed, the exception thrown by the API call is
     * set to the `introspectionError` property and an error response
     * (`500 Internal Server Error`) that should be returned to the client
     * application is set to the `errorResponse` property. Then, this
     * method sets `false` to the `isValid` property and returns `false`.
     *
     * If the API call succeeded, the response from the API is set to
     * the `introspectionResult` property. Then, the implementation of
     * this method checks the value of the `action` parameter in the
     * response from the API.
     *
     * If the value of the `action` parameter is `OK`, this method sets
     * `true` to the `isValid` property and returns `true`.
     *
     * If the value of the `action` parameter is not `OK`, this method
     * builds an error response that should be returned to the client
     * application and sets it to the `errorResponse` property. Then,
     * this method sets `false` to the `isValid` property and returns
     * `false`.
     *
     * @param accessToken
     *         An access token to be validated.
     *
     * @param requiredScopes
     *         Scopes that the access token should have. If a non-empty
     *         value is given to this parameter, the implementation of
     *         Authlete `/api/auth/introspection` API checks whether
     *         the access token covers all the required scopes.
     *
     * @param requiredSubject
     *         Subject (= unique identifier of an end-user) that the
     *         access token should be associated with. If a non-empty
     *         value is given to this parameter, the implementation of
     *         Authlete `/api/auth/introspection` API checks whether
     *         the access token is associated with the required subject.
     *
     * @returns If the given access token exists and has not expired,
     *          and optionally if the access token covers all the required
     *          scopes (in case `requiredScopes` was given) and the access
     *          token is associated with the required subject (in case
     *          `requiredSubject` was given), this method returns `true`.
     *          In other cases, this method returns `false`.
     */
    public async validate(accessToken?: string, requiredScopes?: string[], requiredSubject?: string)
    {
        // Clear properties that may have been set by the previous
        // validate() call.
        this.isValid             = false;
        this.introspectionResult = undefined;
        this.introspectionError  = undefined;
        this.errorResponse       = undefined;

        try
        {
            // Call Authlete /api/auth/introspection API.
            this.introspectionResult =
                await this.callIntrospectionApi(accessToken, requiredScopes, requiredSubject);
        }
        catch (e)
        {
            // The API call failed.
            this.introspectionError = e;
            this.errorResponse = buildErrorResponseOnApiCallFailure(e);
            return this.isValid = false;
        }

        // The 'action' parameter in the response from /api/auth/introspection
        // denotes the next action the API caller should take.
        switch (this.introspectionResult.action)
        {
            case Action.OK:
                // The access token is valid.
                return this.isValid = true;

            default:
                // The access token is not valid, or an unexpected error
                // occurred. An error response that the protected resource
                // endpoint should return to the client application is
                // set to the 'ErrorResponse' property.
                this.errorResponse = buildErrorResponseOnErrorAction(this.introspectionResult);
                return this.isValid = false;
        }
    }


    /**
     * Call Authlete `/api/auth/introspection` API.
     */
    private async callIntrospectionApi(
        accessToken?: string, requiredScopes?: string[], requiredSubject?: string)
    {
        const request = new IntrospectionRequest();

        request.token   = accessToken;
        request.scopes  = requiredScopes;
        request.subject = requiredSubject;

        return await this.api.introspection(request);
    }
}