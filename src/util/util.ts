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

/**
 * Check if the given value is `undefined`.
 */
export function isUndefined(value: any)
{
    return typeof(value) === 'undefined';
}


/**
 * Check if the given value is `undefined`.
 */
export function isNotUndefined(value: any)
{
    return !isUndefined(value);
}


/**
 * Check if the given value is `undefined` or `null`.
 */
export function isUndefinedOrNull(value: any)
{
    return isUndefined(value) || value === null;
}


/**
 * Check if the given value is empty.
 */
export function isEmpty(value: undefined | null | string | any[])
{
    return isUndefinedOrNull(value) || value!.length === 0;
}


/**
 * Check if the given value is not empty.
 */
export function isNotEmpty(value: undefined | null | string | any[])
{
    return !isEmpty(value);
}


/**
 * Check if the given value is an object.
 */
export function isObject(value: any)
{
    return Object.prototype.toString.call(value) === '[object Object]';
}


/**
 * Parse the given JSON string into a plain object. `null` is returned
 * if failed to parse it.
 *
 * @json A JSON string.
 */
export function parseJson(json: string | null): any
{
    if (json === null)
    {
        return null;
    }

    try
    {
        return JSON.parse(json);
    }
    catch(e)
    {
        return null;
    }
}