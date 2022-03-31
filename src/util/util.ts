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
export function isUndefined(value: any): value is undefined
{
    return typeof value === 'undefined';
}


/**
 * All the types other than `undefined`.
 */
type NonUndefined<T> = T extends undefined ? never : T;


/**
 * Check if the given value is `undefined`.
 */
export function isNotUndefined<T>(
    value: undefined | NonUndefined<T>): value is NonUndefined<T>
{
    return !isUndefined(value);
}


/**
 * Check if the given value is `undefined` or `null`.
 */
export function isUndefinedOrNull(value: any): value is undefined | null
{
    return isUndefined(value) || value === null;
}


/**
 * Check if the given value is an object.
 */
export function isString(value: any): value is string
{
    return typeof value === 'string';
}


/**
 * Check if the given value is an object.
 */
export function isObject(value: any): value is object
{
    return Object.prototype.toString.call(value) === '[object Object]';
}


/**
 * Conditional type that defines bottom types for string, array and object.
 */
type Bottom<T> =
    T extends string ? '' : T extends any[] ? [] : T extends object ? {} : never;


/**
 * Check if the given value is empty.
 */
export function isEmpty<T extends string | any[] | object>(
    value: undefined | null | Bottom<T> | T): value is undefined | null | Bottom<T>
{
    // Check if the value is undefined or null.
    if (isUndefinedOrNull(value)) return true;

    // If the value is a string, check its length.
    if (isString(value)) return value.length === 0;

    // If the value is an array, check its length.
    if (Array.isArray(value)) return value.length === 0;

    // The other cases. Assume the value as an object that is not a string
    // or an array.
    return Object.keys(value).length === 0;
}


/**
 * Check if the given value is not empty.
 */
export function isNotEmpty<T extends string | any[] | object>(
    value: undefined | null | T): value is T
{
    return !isEmpty(value);
}


/**
 * Convert a JavaScript value to a JSON string. `null` is returned if
 * failed to stringfy the value.
 *
 * Note: this method is a wrapper method for `JSON.stringify()`.
 *
 * @params value
 *          A value, typically an object or array, to be converted.
 *
 * @returns A string the given value is converted to.
 */
export function stringfyJson(value: any): string | null
{
    if (isUndefinedOrNull(value))
    {
        return null;
    }

    try
    {
        return JSON.stringify(value);
    }
    catch(e)
    {
        return null;
    }
}