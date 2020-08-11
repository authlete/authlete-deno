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


/**
 * HTTP status code.
 */
export class Status
{
    public static readonly OK                    = 200;
    public static readonly CREATED               = 201;
    public static readonly NO_CONTENT            = 204;
    public static readonly FOUND                 = 302;
    public static readonly BAD_REQUEST           = 400;
    public static readonly UNAUTHORIZED          = 401;
    public static readonly FORBIDDEN             = 403;
    public static readonly NOT_FOUND             = 404;
    public static readonly INTERNAL_SERVER_ERROR = 500;
}


/**
 * Header properties.
 */
export class Header
{
    public static readonly CONTENT_TYPE     = 'Content-Type';
    public static readonly CACHE_CONTROL    = 'Cache-Control';
    public static readonly PRAGMA           = 'Pragma';
    public static readonly LOCATION         = 'Location';
    public static readonly WWW_AUTHENTICATE = 'WWW-Authenticate';
}


/**
 * `'Content-Type'` header values.
 */
export class ContentType
{
    public static readonly APPLICATION_FORM_URLENCODED = 'application/x-www-form-urlencoded';
    public static readonly APPLICATION_JAVASCRIPT_UTF8 = 'application/javascript; charset=utf-8';
    public static readonly APPLICATION_JSON_UTF8       = 'application/json; charset=utf-8';
    public static readonly APPLICATION_JWT             = 'application/jwt';
    public static readonly TEXT_HTML_UTF8              = 'text/html; charset=utf-8';
}


/**
 * `'Cache-Control'` header values.
 */
export class CacheControl
{
    public static readonly NO_STORE = 'no-store';
}


/**
 * `'Pragma'` header values.
 */
export class Pragma
{
    public static readonly NO_CACHE = 'no-cache';
}


/**
 * Create a response of `'200 OK'` with the given content formatted in
 * the given type. The `type` parameter defaults to `ContentType.APPLICATION_JSON_UTF8`
 * (= `application/javascript; charset=utf-8`).
 */
export function ok(type: string, content: string)
{
    return buildResponse(Status.OK, buildHeaders(type), content);
}


/**
 * Create a response of `'200 OK'` with the given content formatted in
 * `'application/json; charset=utf-8'`.
 */
export function okJson(content: string)
{
    return ok(ContentType.APPLICATION_JSON_UTF8, content);
}


/**
 * Create a response of `'200 OK'` with the given content formatted in
 * `'text/html; charset=utf-8'`.
 */
export function okHtml(content: string)
{
    return ok(ContentType.TEXT_HTML_UTF8, content);
}


/**
 * Create a response of `'200 OK'` with the given content formatted in
 * `'application/javascript; charset=utf-8'`.
 */
export function okJavascript(content: string)
{
    return ok(ContentType.APPLICATION_JAVASCRIPT_UTF8, content);
}


/**
 * Create a response of `'200 OK'` with the given content formatted in
 * `'application/jwt'`.
 */
export function okJwt(content: string)
{
    return ok(ContentType.APPLICATION_JWT, content);
}


/**
 * Create a response of `'201 Created'` with the given content formatted
 * in `'application/json; charset=utf-8'`.
 */
export function created(content: string)
{
    return buildResponse(Status.CREATED, buildHeadersOfApplicationJsonUtf8(), content);
}


/**
 * Create a response of `'204 No Content'`.
 */
export function noContent()
{
    return buildResponse(Status.OK, buildHeaders());
}


/**
 * Create a response of `'302 Found'` with the given location.
 */
export function location(location: string)
{
    const headers = buildHeaders();
    headers.set(Header.LOCATION, location);
    return buildResponse(Status.FOUND, headers);
}


/**
 * Create a response of `'400 Bad Request'` formatted in `'application/json; charset=utf-8'`.
 */
export function badRequest(content: string)
{
    return buildResponse(Status.BAD_REQUEST, buildHeadersOfApplicationJsonUtf8(), content);
}


/**
 * Create a response of `'401 Unauthorized'` formatted in `'application/json; charset=utf-8'`.
 */
export function unauthorized(challenge: string, content?: string)
{
    const headers = buildHeadersOfApplicationJsonUtf8();
    headers.set(Header.WWW_AUTHENTICATE, challenge);
    return buildResponse(Status.UNAUTHORIZED, headers, content);
}


/**
 * Create a response of `'403 Forbidden'` formatted in `'application/json; charset=utf-8'`.
 */
export function forbidden(content: string)
{
    return buildResponse(Status.FORBIDDEN, buildHeadersOfApplicationJsonUtf8(), content);
}


/**
 * Create a response of `'404 Not Found'` formatted in `'application/json; charset=utf-8'`.
 */
export function notFound(content: string)
{
    return buildResponse(Status.NOT_FOUND, buildHeadersOfApplicationJsonUtf8(), content);
}


/**
 * Create a response of `'500 Internal Server Error'` formatted in the
 * given type. The `type` parameter defaults to `ContentType.APPLICATION_JSON_UTF8`
 * (= `application/javascript; charset=utf-8`).
 */
export function internalServerError(
    content: string, type: string = ContentType.APPLICATION_JSON_UTF8)
{
    return buildResponse(Status.INTERNAL_SERVER_ERROR, buildHeaders(type), content);
}


/**
 * Create a response with the given status and `WWW-Authenticate` header
 * having the given challenge as its value.
 */
export function wwwAuthenticate(status: number, challenge: string)
{
    const headers = buildHeaders();
    headers.set(Header.WWW_AUTHENTICATE, challenge);
    return buildResponse(status, headers);
}


/**
 * Build a `Response` object.
 */
export function buildResponse(status: number, headers?: Headers, body?: string)
{
    return { status: status, headers: headers, body: body } as Response;
}


function buildHeadersOfApplicationJsonUtf8()
{
    return buildHeaders(ContentType.APPLICATION_JSON_UTF8);
}


function buildHeaders(type?: string)
{
    const headers = new Headers();

    // 'Cache-Control: no-store'.
    headers.set(Header.CACHE_CONTROL, CacheControl.NO_STORE);

    // 'Pragma: no-cache'.
    headers.set(Header.PRAGMA, Pragma.NO_CACHE);

    // 'Content-Type: xxx'.
    if (type) { headers.set(Header.CONTENT_TYPE, type); }

    return headers;
}