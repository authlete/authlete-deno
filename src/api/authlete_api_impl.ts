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

import ct from 'https://cdn.pika.dev/class-transformer@^0.2.3';
import 'https://cdn.pika.dev/reflect-metadata@^0.1.13';
import { AuthleteConfiguration } from '../config/authlete_configuration.ts';
import { AuthorizationFailRequest } from '../dto/authorization_fail_request.ts';
import { AuthorizationFailResponse } from '../dto/authorization_fail_response.ts';
import { AuthorizationIssueRequest } from '../dto/authorization_issue_request.ts';
import { AuthorizationIssueResponse } from '../dto/authorization_issue_response.ts';
import { AuthorizationRequest } from '../dto/authorization_request.ts';
import { AuthorizationResponse } from '../dto/authorization_response.ts';
import { Client } from '../dto/client.ts';
import { ClientListResponse } from '../dto/client_list_response.ts';
import { IntrospectionRequest } from '../dto/introspection_request.ts';
import { IntrospectionResponse } from '../dto/introspection_response.ts';
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
const AUTHORIZATION_API_PATH          = '/auth/authorization';
const AUTHORIZATION_ISSUE_API_PATH    = '/auth/authorization/issue';
const AUTHORIZATION_FAIL_API_PATH     = '/auth/authorization/fail';
const TOKEN_API_PATH                  = '/auth/token';
const TOKEN_ISSUE_API_PATH            = '/auth/token/issue';
const TOKEN_FAIL_API_PATH             = '/auth/token/fail';
const REVOCATION_API_PATH             = '/auth/revocation';
const USER_INFO_API_PATH              = '/auth/userinfo';
const USER_INFO_ISSUE_API_PATH        = '/auth/userinfo/issue';
const INTROSPECTION_API_PATH          = '/auth/introspection';
const INTROSPECTION_STANDARD_API_PATH = '/auth/introspection/standard';
const SERVICE_GET_API_PATH            = '/service/get/{apiKey}';
const SERVICE_GET_LIST_API_PATH       = '/service/get/list';
const SERVICE_CREATE_API_PATH         = '/service/create';
const SERVICE_UPDATE_API_PATH         = '/service/update';
const SERVICE_DELETE_API_PATH         = '/api/service/delete/{apiKey}';
const SERVICE_JWKS_GET_API_PATH       = '/service/jwks/get';
const SERVICE_CONFIGURATION_API_PATH  = '/service/configuration';
const CLIENT_GET_API_PATH             = '/client/get/{clientId}';
const CLIENT_GET_LIST_API_PATH        = '/client/get/list';
const CLIENT_CREATE_API_PATH          = '/client/create';
const CLIENT_UPDATE_API_PATH          = '/client/update';
const CLIENT_DELETE_API_PATH          = '/client/delete/{clientId}';


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
function getBaseUrl(configuration: AuthleteConfiguration)
{
    // The base URL in the configuration file.
    const baseUrl = configuration.baseUrl;

    // Validate the base URL.
    validateBaseUrl(baseUrl);

    // Normalize the bae URL if necessary.
    return normalizeBaseUrl(baseUrl!);
}


/**
 * Validate the given URL.
 */
function validateBaseUrl(url?: string)
{
    if (!url)
    {
        // The base URL was found in the configuration.
        throw new Error('The configuration does not have information about the base URL.');
    }

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
        else
        {
            // Unknown error.
            throw e;
        }
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
    return new BasicCredentials(config.serviceOwnerApiKey || null, config.serviceOwnerApiSecret || null);
}


/**
 * Create a `BasicCredentials` instance based on the service credentials
 * in the configuration.
 */
function getServiceCredentials(config: AuthleteConfiguration)
{
    return new BasicCredentials(config.serviceApiKey || null, config.serviceApiSecret || null);
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
    params?: QueryParams, requestBody?: any, clazz?: ResponseClass<TResponse>
): Promise<TResponse | string>
{
    // Fetch an HTTP response from the target API.
    const response = await fetchResponse(baseUrl, path, method, credentials, params, requestBody);

    // If the response was not successful.
    if (!response.ok)
    {
        // Throw an exception with the response information.
        throw await createAuthleteApiExceptionWithResponseInfo(response);
    }

    // Build a response.
    return await createResponse(response, clazz);
}


/**
 * Fetch a response by calling the API.
 */
async function fetchResponse(
    baseUrl: string, path: string, method: HttpMethod, credentials: BasicCredentials,
    params?: QueryParams, requestBody?: any)
{
    // Create the target url with the parameters.
    const url = createUrl(baseUrl, path, params);

    // Create options for the request.
    const init = createRequestInit(method, credentials, requestBody);

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
function createRequestInit(method: HttpMethod, credentials: BasicCredentials, requestBody?: any)
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
        // If the target class (= 'clazz') is provided, parse the
        // text as JSON and convert it to an instance of the class.
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

        // The response body.
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
function buildQueryParamsForServiceGetListApi(start?: number, end?: number)
{
    const request: QueryParams = {};

    if (isNotUndefined(start)) request['start'] = start!.toString();
    if (isNotUndefined(end)) request['end'] = end!.toString();

    return request;
}


/**
 * Create a request for `/client/get/list` API.
 */
function buildQueryParamsForClientGetListApi(developer?: string, start?: number, end?: number)
{
    const request: QueryParams = {};

    if (isNotUndefined(start)) request['start'] = start!.toString();
    if (isNotUndefined(end)) request['end'] = end!.toString();
    if (isNotUndefined(developer)) request['developer'] = developer!;

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
     * The constructor.
     *
     * @param configuration
     *         Configuration for a new instance of this class.
     */
    public constructor(configuration: AuthleteConfiguration)
    {
        this.baseUrl                 = getBaseUrl(configuration);
        this.serviceOwnerCredentials = getServiceOwnerCredentials(configuration);
        this.serviceCredentials      = getServiceCredentials(configuration);
    }


    /**
     * Call an Authlete API.
     */
    private async callApi<TResponse>(
        path: string, method: HttpMethod, credentials: BasicCredentials, params?: QueryParams,
        requestBody?: any, clazz?: ResponseClass<TResponse>)
    {
        // Fetch an HTTP response from the target API.
        return await doCallApi(this.baseUrl, path, method, credentials, params, requestBody, clazz);
    }


    /**
     * Call an Authlete API with HTTP `GET` method.
     */
    private async callGetApi<TResponse>(
        path: string, credentials: any, params?: QueryParams, clazz?: ResponseClass<TResponse>)
    {
        return await this.callApi(path, HttpMethod.GET, credentials, params, undefined, clazz);
    }


    /**
     * Call an Authlete API with HTTP `GET` method and the service owner credentials.
     */
    private async callServiceOwnerGetApi<TResponse>(path: string, params?: QueryParams, clazz?: ResponseClass<TResponse>)
    {
        return await this.callGetApi(path, this.serviceOwnerCredentials, params, clazz);
    }


    /**
     * Call an Authlete API with HTTP `GET` method and the service credentials.
     */
    private async callServiceGetApi<TResponse>(path: string, params?: QueryParams, clazz?: ResponseClass<TResponse>)
    {
        return await this.callGetApi(path, this.serviceCredentials, params, clazz);
    }


    /**
     * Call an Authlete API with HTTP `POST` method.
     */
    private async callPostApi<TResponse>(
        path: string, credentials: BasicCredentials, requestBody: any, clazz?: ResponseClass<TResponse>)
    {
        return await this.callApi(path, HttpMethod.POST, credentials, undefined, requestBody, clazz);
    }


    /**
     * Call an Authlete API with HTTP `POST` method and the service owner credentials.
     */
    private async callServiceOwnerPostApi<TResponse>(
        path: string, requestBody: any, clazz?: ResponseClass<TResponse>)
    {
        return await this.callPostApi(path, this.serviceOwnerCredentials, requestBody, clazz);
    }


    /**
     * Call an Authlete API with HTTP `POST` method and the service credentials.
     */
    private async callServicePostApi<TResponse>(
        path: string, requestBody: any, clazz?: ResponseClass<TResponse>)
    {
        return await this.callPostApi(path, this.serviceCredentials, requestBody, clazz);
    }


    /**
     * Call an Authlete API with HTTP `DELETE` method.
     */
    private async callDeleteApi(path: string, credentials: BasicCredentials)
    {
        await this.callApi(path, HttpMethod.DELETE, credentials);
    }


    /**
     * Call an Authlete API with HTTP `DELETE` method and the service owner credentials.
     */
    private async callServiceOwnerDeleteApi(path: string)
    {
        await this.callDeleteApi(path, this.serviceOwnerCredentials);
    }


    /**
     * Call an Authlete API with HTTP `DELETE` method and the service credentials.
     */
    private async callServiceDeleteApi(path: string)
    {
        await this.callDeleteApi(path, this.serviceCredentials);
    }


    public async authorization(request: AuthorizationRequest)
    {
        return <AuthorizationResponse>
            await this.callServicePostApi(AUTHORIZATION_API_PATH, request, AuthorizationResponse);
    }


    public async authorizationIssue(request: AuthorizationIssueRequest)
    {
        return <AuthorizationIssueResponse>
            await this.callServicePostApi(AUTHORIZATION_ISSUE_API_PATH, request, AuthorizationIssueResponse);
    }


    public async authorizationFail(request: AuthorizationFailRequest)
    {
        return <AuthorizationFailResponse>
            await this.callServicePostApi(AUTHORIZATION_FAIL_API_PATH, request, AuthorizationFailResponse);
    }


    public async token(request: TokenRequest)
    {
        return <TokenResponse>await this.callServicePostApi(TOKEN_API_PATH, request, TokenResponse);
    }


    public async tokenIssue(request: TokenIssueRequest)
    {
        return <TokenIssueResponse>
            await this.callServicePostApi(TOKEN_ISSUE_API_PATH, request, TokenIssueResponse);
    }


    public async tokenFail(request: TokenFailRequest)
    {
        return <TokenFailResponse>await this.callServicePostApi(TOKEN_FAIL_API_PATH, request, TokenFailResponse);
    }


    public async revocation(request: RevocationRequest)
    {
        return <RevocationResponse>
            await this.callServicePostApi(REVOCATION_API_PATH, request, RevocationResponse);
    }


    public async userInfo(request: UserInfoRequest)
    {
        return <UserInfoResponse>
            await this.callServicePostApi(USER_INFO_API_PATH, request, UserInfoResponse);
    }


    public async userInfoIssue(request: UserInfoIssueRequest)
    {
        return <UserInfoIssueResponse>
            await this.callServicePostApi(USER_INFO_ISSUE_API_PATH, request, UserInfoIssueResponse);
    }


    public async introspection(request: IntrospectionRequest)
    {
        return <IntrospectionResponse>
            await this.callServicePostApi(INTROSPECTION_API_PATH, request, IntrospectionResponse);
    }


    public async standardIntrospection(request: StandardIntrospectionRequest)
    {
        return <StandardIntrospectionResponse>
            await this.callServicePostApi(INTROSPECTION_STANDARD_API_PATH, request, StandardIntrospectionResponse);
    }


    public async getService(apiKey: number)
    {
        return <Service>await this.callServiceOwnerGetApi(
            SERVICE_GET_API_PATH.replace('{apiKey}', apiKey.toString()), undefined, Service);
    }


    public async getServiceJwks(pretty: boolean = false, includePrivateKeys: boolean = false)
    {
        return (<string>await this.callServiceGetApi(
            SERVICE_JWKS_GET_API_PATH, { pretty: `${pretty}`, includePrivateKeys: `${includePrivateKeys}` })) || null;
    }


    public async getServiceConfiguration(pretty: boolean = false)
    {
        return <string>await this.callServiceGetApi(SERVICE_CONFIGURATION_API_PATH, { pretty: `${pretty}` });
    }


    public async getServiceList(start?: number, end?: number)
    {
        return <ServiceListResponse>await this.callServiceOwnerGetApi(
            SERVICE_GET_LIST_API_PATH, buildQueryParamsForServiceGetListApi(start, end), ServiceListResponse);
    }


    public async createService(service: Service)
    {
        return <Service>await this.callServiceOwnerPostApi(SERVICE_CREATE_API_PATH, service, Service);
    }


    public async updateService(service: Service)
    {
        return <Service>await this.callServiceOwnerPostApi(SERVICE_UPDATE_API_PATH, service, Service);
    }


    public async deleteService(apiKey: number)
    {
        await this.callServiceOwnerDeleteApi(SERVICE_DELETE_API_PATH.replace('{apiKey}', apiKey.toString()));
    }


    public async getClient(clientId: number)
    {
        return <Client>await this.callServiceGetApi(
            CLIENT_GET_API_PATH.replace('{apiKey}', clientId.toString()), undefined, Client);
    }


    public async getClientList(developer?: string, start?: number, end?: number)
    {
        return <ClientListResponse>await this.callServiceGetApi(
            CLIENT_GET_LIST_API_PATH, buildQueryParamsForClientGetListApi(developer, start, end), ClientListResponse);
    }


    public async createClient(client: Client)
    {
        return <Client>await this.callServicePostApi(CLIENT_CREATE_API_PATH, client, Client);
    }


    public async updateClient(client: Client)
    {
        return <Client>await this.callServicePostApi(CLIENT_UPDATE_API_PATH, client, Client);
    }


    public async deleteClient(clientId: number)
    {
        await this.callServiceDeleteApi(CLIENT_DELETE_API_PATH.replace('{clientId}', clientId.toString()));
    }
}