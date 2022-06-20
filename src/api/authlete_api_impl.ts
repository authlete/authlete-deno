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


import 'https://cdn.pika.dev/reflect-metadata@^0.1.13';
import ct from 'https://cdn.pika.dev/class-transformer@^0.2.3';
import { AuthleteConfiguration } from '../config/authlete_configuration.ts';
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
import { ClientListResponse } from '../dto/client_list_response.ts';
import { Client } from '../dto/client.ts';
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
import { TokenFailRequest } from '../dto/token_fail_request.ts';
import { TokenFailResponse } from '../dto/token_fail_response.ts';
import { TokenIssueRequest } from '../dto/token_issue_request.ts';
import { TokenIssueResponse } from '../dto/token_issue_response.ts';
import { TokenRequest } from '../dto/token_request.ts';
import { TokenResponse } from '../dto/token_response.ts';
import { UserInfoIssueRequest } from '../dto/user_info_issue_request.ts';
import { UserInfoIssueResponse } from '../dto/user_info_issue_response.ts';
import { UserInfoRequest } from '../dto/user_info_request.ts';
import { UserInfoResponse } from '../dto/user_info_response.ts';
import { isNotUndefined } from '../util/util.ts';
import { BasicCredentials } from '../web/basic_credentials.ts';
import { AuthleteApi } from './authlete_api.ts';
import { AuthleteApiException } from './authlete_api_exception.ts';
const { classToPlain, plainToClass } = ct;


/**
 * API Path.
 */
const AUTHORIZATION_API_PATH                       = '/auth/authorization';
const AUTHORIZATION_ISSUE_API_PATH                 = '/auth/authorization/issue';
const AUTHORIZATION_FAIL_API_PATH                  = '/auth/authorization/fail';
const BACKCHANNEL_AUTHENTICATION_API_PATH          = '/backchannel/authentication';
const BACKCHANNEL_AUTHENTICATION_ISSUE_API_PATH    = '/backchannel/authentication/issue';
const BACKCHANNEL_AUTHENTICATION_FAIL_API_PATH     = '/backchannel/authentication/fail';
const BACKCHANNEL_AUTHENTICATION_COMPLETE_API_PATH = '/backchannel/authentication/complete';
const DEVICE_AUTHORIZATION_API_PATH                = '/device/authorization';
const DEVICE_VERIFICATION_API_PATH                 = '/device/verification';
const DEVICE_COMPLETE_API_PATH                     = '/device/complete';
const TOKEN_API_PATH                               = '/auth/token';
const TOKEN_ISSUE_API_PATH                         = '/auth/token/issue';
const TOKEN_FAIL_API_PATH                          = '/auth/token/fail';
const REVOCATION_API_PATH                          = '/auth/revocation';
const USER_INFO_API_PATH                           = '/auth/userinfo';
const USER_INFO_ISSUE_API_PATH                     = '/auth/userinfo/issue';
const INTROSPECTION_API_PATH                       = '/auth/introspection';
const INTROSPECTION_STANDARD_API_PATH              = '/auth/introspection/standard';
const SERVICE_GET_API_PATH                         = '/service/get/{apiKey}';
const SERVICE_GET_LIST_API_PATH                    = '/service/get/list';
const SERVICE_CREATE_API_PATH                      = '/service/create';
const SERVICE_UPDATE_API_PATH                      = '/service/update';
const SERVICE_DELETE_API_PATH                      = '/service/delete/{apiKey}';
const SERVICE_JWKS_GET_API_PATH                    = '/service/jwks/get';
const SERVICE_CONFIGURATION_API_PATH               = '/service/configuration';
const CLIENT_GET_API_PATH                          = '/client/get/{clientId}';
const CLIENT_GET_LIST_API_PATH                     = '/client/get/list';
const CLIENT_CREATE_API_PATH                       = '/client/create';
const CLIENT_UPDATE_API_PATH                       = '/client/update';
const CLIENT_DELETE_API_PATH                       = '/client/delete/{clientId}';
const PUSHED_AUTH_REQ_API_PATH                     = '/pushed_auth_req';


/**
 * HTTP method.
 */
enum HttpMethod
{
    GET,
    POST,
    DELETE
}


/**
 * Type alias.
 */
type ResponseClass<TResponse> = { new(...args: any[]): TResponse };
type QueryParams = { [key: string]: string };


/**
 * Get the base URL of Authlete API.
 */
function getBaseUrl(config: AuthleteConfiguration)
{
    // The base URL in the configuration file.
    const baseUrl = config.baseUrl;

    if (!baseUrl)
    {
        // The 'baseUrl' property was not set in the configuration.
        throw new Error("The 'baseUrl' property was not set in the configuration.");
    }

    // Validate the base URL.
    validateBaseUrl(baseUrl);

    // Normalize the bae URL if necessary.
    return normalizeBaseUrl(baseUrl);
}


/**
 * Validate the given URL.
 */
function validateBaseUrl(url: string)
{
    try
    {
        // Ensure that the base URL is a valid URL.
        new URL(url);
    }
    catch(e)
    {
        if (e instanceof TypeError)
        {
            // Malformed URL.
            throw new Error('Malformed base URL.');
        }

        // Unknown error.
        throw e;
    }
}


/**
 * Normalize the base URL if necessary.
 */
function normalizeBaseUrl(url: string)
{
    // If the base URL ends with a slash, return a string without the
    // last slash.
    return url.endsWith('/') ? url.slice(0, -1) : url;
}


/**
 * Create a `BasicCredentials` instance based on the service owner credentials
 * in the configuration.
 */
function getServiceOwnerCredentials(config: AuthleteConfiguration)
{
    return new BasicCredentials(config.serviceOwnerApiKey, config.serviceOwnerApiSecret);
}


/**
 * Create a `BasicCredentials` instance based on the service credentials
 * in the configuration.
 */
function getServiceCredentials(config: AuthleteConfiguration)
{
    return new BasicCredentials(config.serviceApiKey, config.serviceApiSecret);
}


/**
 * Get the base URL of Authlete API.
 */
 function getTimeout(config: AuthleteConfiguration)
 {
    // The timeout in the configuration file.
    const timeout = config.timeout;

    if (!timeout)
    {
        // The 'timeout' property was not set in the configuration.
        throw new Error("The 'timeout' property was not set in the configuration.");
    }

    return timeout;
 }


/**
 * Call an API with the given parameters.
 *
 * When the API response is successful, this method converts the body
 * of the API response to an instance of the target class (specified as
 * `clazz`) and returns it, if `clazz` is specified. Otherwise, this
 * method returns the response body as a `string` value.
 *
 * When the API response is not successful, this method throws an
 * `AuthleteApiException` instance having information about the error
 * response. When it fails to fetch a successful API response due to
 * any other reason (e.g. network connection issue), it also throws an
 * `AuthleteApiException` instance.
 */
async function doCallApi<TResponse>(
    baseUrl: string, path: string, method: HttpMethod, credentials: BasicCredentials,
    timeout: number, params?: QueryParams, requestBody?: any, clazz?: ResponseClass<TResponse>
): Promise<TResponse | string>
{
    // Fetch an HTTP response from the target API.
    const response = await fetchResponse(
        baseUrl, path, method, credentials, timeout, params, requestBody);

    // If the response was not successful.
    if (!response.ok)
    {
        // Throw an exception with the response information.
        throw await createAuthleteApiExceptionWithResponseInfo(response);
    }

    // Build a response.
    return createResponse(response, clazz);
}


/**
 * Fetch a response by calling the API.
 */
async function fetchResponse(
    baseUrl: string, path: string, method: HttpMethod, credentials: BasicCredentials,
    timeout: number, params?: QueryParams, requestBody?: any)
{
    // Create the target url with the parameters.
    const url = createUrl(baseUrl, path, params);

    // Set timeout.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // Create options for the request.
    const init = createRequestInit(method, credentials, controller.signal, requestBody);

    try
    {
        // Fetch the result from the target URL.
        return await fetch(url, init);
    }
    catch(e)
    {
        // Failed to fetch the result. Throw an exception.
        throw createAuthleteApiException(e);
    }
    finally
    {
        // Clear the timeout.
        clearTimeout(timeoutId);
    }
}


/**
 * Create a `URL` object with the given base URL, path and query parameters.
 */
function createUrl(baseUrl: string, path: string, params?: QueryParams)
{
    // Create a URL class instance with the base URL and the path.
    const url = new URL(`${baseUrl}${path}`);

    // Append the query parameters to the URL if necessary.
    if (params)
    {
        url.search = new URLSearchParams(params).toString();
    }

    return url;
}


/**
 * Create a `RequestInit` object.
 */
function createRequestInit(
    method: HttpMethod, credentials: BasicCredentials, signal: AbortSignal,
    requestBody?: any)
{
    // Options for a request.
    const init: RequestInit = {};

    // Set up the HTTP method.
    init.method = HttpMethod[method];

    // Set up the request headers.
    init.headers = {
        'Authorization': 'Basic ' + btoa(credentials.userId + ':' + credentials.password),
        'Accept': 'application/json'
    }

    // Set up the signal for timeout.
    init.signal = signal;

    // Set up additional parameters if necessary.
    if (requestBody)
    {
        init.headers['Content-Type'] = 'application/json';
        init.body = JSON.stringify( classToPlain(requestBody) );
    }

    return init;
}


/**
 * If the target class (= `clazz`) is given, this method converts the
 * response body to an instance of the target class and returns it.
 * Otherwise, the content of the response body (= string) is returned.
 */
async function createResponse<TResponse>(
    response: Response, clazz?: ResponseClass<TResponse>): Promise<TResponse | string>
{
    // Read the response body as text. (The body part is expected to be
    // a JSON value.)
    //
    // NOTE:
    //     If the body of the returned response is empty, response.text()
    //     returns an empty string instead of returning null or undefined.
    //
    const responseBody: string = await response.text().catch((e) => {
        // Something went wrong while reading the response body.
        throw createAuthleteApiException(e);
    });

    if (clazz)
    {
        // If the target class (= 'clazz') is provided, parse the text
        // as JSON and convert it to an instance of the class.
        return plainToClass(clazz, JSON.parse(responseBody)) as TResponse
    }

    // If the target class (= 'clazz') is not provided, just return the
    // response body as a string value.
    return responseBody;
}


/**
 * Create an `AuthleteApiException` instance with the response information.
 */
async function createAuthleteApiExceptionWithResponseInfo(response: Response)
{
    return new AuthleteApiException(
        // The error message.
        'Unsuccessful response returned',

        // HTTP status code.
        response.status,

        // HTTP status message.
        response.statusText,

        // The response body (undefined is returned if reading the response
        // body fails).
        await response.text().catch(() => undefined),

        // The response headers.
        response.headers
    );
}


/**
 * Create an `AuthleteApiException` instance.
 */
function createAuthleteApiException(error: Error)
{
    return new AuthleteApiException(error.message);
}


/**
 * Create a request for `/service/get/list` API.
 */
function buildQueryParamsForServiceGetListApi(start?: number, end?: number): QueryParams
{
    const request: QueryParams = {};

    if (isNotUndefined(start)) request['start'] = start.toString();
    if (isNotUndefined(end)) request['end'] = end.toString();

    return request;
}


/**
 * Create a request for `/client/get/list` API.
 */
function buildQueryParamsForClientGetListApi(
    developer?: string, start?: number, end?: number): QueryParams
{
    const request: QueryParams = {};

    if (isNotUndefined(start)) request['start'] = start.toString();
    if (isNotUndefined(end)) request['end'] = end.toString();
    if (isNotUndefined(developer)) request['developer'] = developer;

    return request;
}


/**
 * An implementation of `AuthleteApi` interface.
 */
export class AuthleteApiImpl implements AuthleteApi
{
    /**
     * The base URL of Authlete API.
     */
    private baseUrl: string;


    /**
     * The service owner credentials.
     */
    private serviceOwnerCredentials: BasicCredentials;


    /**
     * The service credentials.
     */
    private serviceCredentials: BasicCredentials;


    /**
     * The fetch timeout.
     */
    private timeout: number;


    /**
     * The constructor.
     *
     * @param config
     *         Configuration for a new instance of this class.
     */
    public constructor(config: AuthleteConfiguration)
    {
        this.baseUrl                 = getBaseUrl(config);
        this.serviceOwnerCredentials = getServiceOwnerCredentials(config);
        this.serviceCredentials      = getServiceCredentials(config);
        this.timeout                 = getTimeout(config);
    }


    /**
     * Call an Authlete API.
     */
    private async callApi<TResponse>(
        path: string, method: HttpMethod, credentials: BasicCredentials, params?: QueryParams,
        requestBody?: any, clazz?: ResponseClass<TResponse>)
    {
        // Fetch an HTTP response from the target API.
        return doCallApi(
            this.baseUrl, path, method, credentials, this.timeout, params, requestBody, clazz);
    }


    /**
     * Call an Authlete API with HTTP `GET` method.
     */
    private async callGetApi<TResponse>(
        path: string, credentials: any, params?: QueryParams, clazz?: ResponseClass<TResponse>)
    {
        return this.callApi(path, HttpMethod.GET, credentials, params, undefined, clazz);
    }


    /**
     * Call an Authlete API with HTTP `GET` method and the service owner credentials.
     */
    private async callServiceOwnerGetApi<TResponse>(
        path: string, params?: QueryParams, clazz?: ResponseClass<TResponse>)
    {
        return this.callGetApi(path, this.serviceOwnerCredentials, params, clazz);
    }


    /**
     * Call an Authlete API with HTTP `GET` method and the service credentials.
     */
    private async callServiceGetApi<TResponse>(
        path: string, params?: QueryParams, clazz?: ResponseClass<TResponse>)
    {
        return this.callGetApi(path, this.serviceCredentials, params, clazz);
    }


    /**
     * Call an Authlete API with HTTP `POST` method.
     */
    private async callPostApi<TResponse>(
        path: string, credentials: BasicCredentials, requestBody: any, clazz?: ResponseClass<TResponse>)
    {
        return this.callApi(path, HttpMethod.POST, credentials, undefined, requestBody, clazz);
    }


    /**
     * Call an Authlete API with HTTP `POST` method and the service owner credentials.
     */
    private async callServiceOwnerPostApi<TResponse>(
        path: string, requestBody: any, clazz?: ResponseClass<TResponse>)
    {
        return this.callPostApi(path, this.serviceOwnerCredentials, requestBody, clazz);
    }


    /**
     * Call an Authlete API with HTTP `POST` method and the service credentials.
     */
    private async callServicePostApi<TResponse>(
        path: string, requestBody: any, clazz?: ResponseClass<TResponse>)
    {
        return this.callPostApi(path, this.serviceCredentials, requestBody, clazz);
    }


    /**
     * Call an Authlete API with HTTP `DELETE` method.
     */
    private async callDeleteApi(path: string, credentials: BasicCredentials)
    {
        return <Promise<void>>this.callApi(path, HttpMethod.DELETE, credentials);
    }


    /**
     * Call an Authlete API with HTTP `DELETE` method and the service owner credentials.
     */
    private async callServiceOwnerDeleteApi(path: string)
    {
        return this.callDeleteApi(path, this.serviceOwnerCredentials);
    }


    /**
     * Call an Authlete API with HTTP `DELETE` method and the service credentials.
     */
    private async callServiceDeleteApi(path: string)
    {
        return this.callDeleteApi(path, this.serviceCredentials);
    }


    public async authorization(request: AuthorizationRequest)
    {
        return <Promise<AuthorizationResponse>>
            this.callServicePostApi(AUTHORIZATION_API_PATH, request, AuthorizationResponse);
    }


    public async authorizationIssue(request: AuthorizationIssueRequest)
    {
        return <Promise<AuthorizationIssueResponse>>
            this.callServicePostApi(AUTHORIZATION_ISSUE_API_PATH, request, AuthorizationIssueResponse);
    }


    public async authorizationFail(request: AuthorizationFailRequest)
    {
        return <Promise<AuthorizationFailResponse>>
            this.callServicePostApi(AUTHORIZATION_FAIL_API_PATH, request, AuthorizationFailResponse);
    }


    public async token(request: TokenRequest)
    {
        return <Promise<TokenResponse>>
            this.callServicePostApi(TOKEN_API_PATH, request, TokenResponse);
    }


    public async tokenIssue(request: TokenIssueRequest)
    {
        return <Promise<TokenIssueResponse>>
            this.callServicePostApi(TOKEN_ISSUE_API_PATH, request, TokenIssueResponse);
    }


    public async tokenFail(request: TokenFailRequest)
    {
        return <Promise<TokenFailResponse>>
            this.callServicePostApi(TOKEN_FAIL_API_PATH, request, TokenFailResponse);
    }


    public async revocation(request: RevocationRequest)
    {
        return <Promise<RevocationResponse>>
            this.callServicePostApi(REVOCATION_API_PATH, request, RevocationResponse);
    }


    public async userInfo(request: UserInfoRequest)
    {
        return <Promise<UserInfoResponse>>
            this.callServicePostApi(USER_INFO_API_PATH, request, UserInfoResponse);
    }


    public async userInfoIssue(request: UserInfoIssueRequest)
    {
        return <Promise<UserInfoIssueResponse>>
            this.callServicePostApi(USER_INFO_ISSUE_API_PATH, request, UserInfoIssueResponse);
    }


    public async introspection(request: IntrospectionRequest)
    {
        return <Promise<IntrospectionResponse>>
            this.callServicePostApi(INTROSPECTION_API_PATH, request, IntrospectionResponse);
    }


    public async standardIntrospection(request: StandardIntrospectionRequest)
    {
        return <Promise<StandardIntrospectionResponse>>
            this.callServicePostApi(INTROSPECTION_STANDARD_API_PATH, request, StandardIntrospectionResponse);
    }


    public async getService(apiKey: number)
    {
        return <Promise<Service>>this.callServiceOwnerGetApi(
            SERVICE_GET_API_PATH.replace('{apiKey}', apiKey.toString()), undefined, Service);
    }


    public async getServiceJwks(pretty: boolean = false, includePrivateKeys: boolean = false)
    {
        const jwks = <string>await this.callServiceGetApi(
            SERVICE_JWKS_GET_API_PATH, { pretty: `${pretty}`, includePrivateKeys: `${includePrivateKeys}` });

        return jwks || null;
    }


    public async getServiceConfiguration(pretty: boolean = false)
    {
        return <Promise<string>>this.callServiceGetApi(SERVICE_CONFIGURATION_API_PATH, { pretty: `${pretty}` });
    }


    public async getServiceList(start?: number, end?: number)
    {
        return <Promise<ServiceListResponse>>this.callServiceOwnerGetApi(
            SERVICE_GET_LIST_API_PATH, buildQueryParamsForServiceGetListApi(start, end), ServiceListResponse);
    }


    public async createService(service: Service)
    {
        return <Promise<Service>>this.callServiceOwnerPostApi(SERVICE_CREATE_API_PATH, service, Service);
    }


    public async updateService(service: Service)
    {
        return <Promise<Service>>this.callServiceOwnerPostApi(SERVICE_UPDATE_API_PATH, service, Service);
    }


    public async deleteService(apiKey: number)
    {
        return this.callServiceOwnerDeleteApi(SERVICE_DELETE_API_PATH.replace('{apiKey}', apiKey.toString()));
    }


    public async getClient(clientId: number)
    {
        return <Promise<Client>>this.callServiceGetApi(
            CLIENT_GET_API_PATH.replace('{apiKey}', clientId.toString()), undefined, Client);
    }


    public async getClientList(developer?: string, start?: number, end?: number)
    {
        return <Promise<ClientListResponse>>this.callServiceGetApi(
            CLIENT_GET_LIST_API_PATH, buildQueryParamsForClientGetListApi(developer, start, end), ClientListResponse);
    }


    public async createClient(client: Client)
    {
        return <Promise<Client>>this.callServicePostApi(CLIENT_CREATE_API_PATH, client, Client);
    }


    public async updateClient(client: Client)
    {
        return <Promise<Client>>this.callServicePostApi(CLIENT_UPDATE_API_PATH, client, Client);
    }


    public async deleteClient(clientId: number)
    {
        await this.callServiceDeleteApi(CLIENT_DELETE_API_PATH.replace('{clientId}', clientId.toString()));
    }


    public backchannelAuthentication(request: BackchannelAuthenticationRequest)
    {
        return <Promise<BackchannelAuthenticationResponse>>
            this.callServicePostApi(BACKCHANNEL_AUTHENTICATION_API_PATH, request, BackchannelAuthenticationResponse);
    }


    public backchannelAuthenticationIssue(request: BackchannelAuthenticationIssueRequest)
    {
        return <Promise<BackchannelAuthenticationIssueResponse>>
            this.callServicePostApi(BACKCHANNEL_AUTHENTICATION_ISSUE_API_PATH, request, BackchannelAuthenticationIssueResponse);
    }


    public backchannelAuthenticationFail(request: BackchannelAuthenticationFailRequest)
    {
        return <Promise<BackchannelAuthenticationFailResponse>>
            this.callServicePostApi(BACKCHANNEL_AUTHENTICATION_FAIL_API_PATH, request, BackchannelAuthenticationFailResponse);
    }


    public backchannelAuthenticationComplete(request: BackchannelAuthenticationCompleteRequest)
    {
        return <Promise<BackchannelAuthenticationCompleteResponse>>
            this.callServicePostApi(BACKCHANNEL_AUTHENTICATION_COMPLETE_API_PATH, request, BackchannelAuthenticationCompleteResponse);
    }


    public deviceAuthorization(request: DeviceAuthorizationRequest)
    {
        return <Promise<DeviceAuthorizationResponse>>
            this.callServicePostApi(DEVICE_AUTHORIZATION_API_PATH, request, DeviceAuthorizationResponse);
    }


    public deviceVerification(request: DeviceVerificationRequest)
    {
        return <Promise<DeviceVerificationResponse>>
            this.callServicePostApi(DEVICE_VERIFICATION_API_PATH, request, DeviceVerificationResponse);
    }


    public deviceComplete(request: DeviceCompleteRequest)
    {
        return <Promise<DeviceCompleteResponse>>
            this.callServicePostApi(DEVICE_COMPLETE_API_PATH, request, DeviceCompleteResponse);
    }


    public pushedAuthorizationRequest(request: PushedAuthReqRequest)
    {
        return <Promise<PushedAuthReqResponse>>
            this.callServicePostApi(PUSHED_AUTH_REQ_API_PATH, request, PushedAuthReqResponse);
    }
}