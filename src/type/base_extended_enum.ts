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

import { isUndefinedOrNull } from '../util/util.ts';


/**
 * Base class for 'extended enum' classes, which are classes that simulate
 * `enums` with additional parameters. This class is supposed to be used
 * as the base class for an 'extended enum' class as below.
 *
 * ```ts
 * class MyExtendedEnum extends BaseExtendedEnum
 * {
 *     static readonly MY_ENUM_1 = new MyEnum(1, 'first enum');
 *     static readonly MY_ENUM_2 = new MyEnum(2, 'second enum');
 *     ...
 * }
 * ```
 */
export class BaseExtendedEnum
{
    /**
     * The number representing this enum.
     */
    public value: number;


    /**
     * The string representing this enum.
     */
    public string: string;


    /**
     * The constructor.
     */
    public constructor(value: number, string: string)
    {
        this.value  = value;
        this.string = string;
    }
}


/**
 * Convert JSON value(s) to the corresponding `TExtendedEnum` class(es).
 * For example, if you pass `'CODE'` (a `string` value) to this method,
 * the method returns `ResponseType.CODE` (an instance of `ResponseType`
 * class).
 *
 * NOTE: this method is supposed to be used by [class-transformer](
 * https://github.com/typestack/class-transformer) (the object mapper
 * we internally use). Manual use of this method is not recommended.
 *
 * @param source - A string or string array to convert to the corresponding
 *                 `TExtendedEnum` class or an array of the `TExtendedEnum`
 *                 class (e.g. `'CODE'`).
 *
 * @param target - A target class to which the `source` is converted to.
 *                 Must be a class that extends `BaseExtendedEnum` class
 *                 (e.g. `ResponseType`).
 *
 * @returns An instance of the `TExtendedEnum` class or an array of the
 *          `TExtendedEnum` class. `undefined` is returned if the the
 *          `source` can't be converted to the class.
 */
export function fromJsonValue<TExtendedEnum extends BaseExtendedEnum>(
    source: string | string[], target: { new(...args: any[]): TExtendedEnum }): undefined | TExtendedEnum | TExtendedEnum[]
{
    if (isUndefinedOrNull(source))
    {
        // Even if type guard is enabled, 'source' can be null or undefined
        // at runtime. Then, check if it's null or undefined first.
        return undefined;
    }

    if (Array.isArray(source))
    {
        // If 'source' is an array, convert each element in the target
        // by calling this method recursively.
        return source
            .map(s => fromJsonValue(s, target))
            .filter(x => typeof x !== 'undefined') as TExtendedEnum[];
    }

    if (target.hasOwnProperty(source))
    {
        // The specified property was found in the target.
        // TODO: It is assumed that the type of the property should be
        // 'T', but this is a naive assumption. This probably needs to
        // be modified later.
        return target[source as keyof typeof target] as TExtendedEnum;
    }

    // No such property is defined in the target.
    return undefined;
}


/**
 * Convert instance(s) of `TExtendedEnum` class to the corresponding
 * JSON value(s). For example, if you pass `ResponseCode.CODE` (an
 * instance of `ResponseType` class) to this method, the method returns
 * `'CODE'` (a `string` value).
 *
 * NOTE: this method is supposed to be used by [class-transformer](
 * https://github.com/typestack/class-transformer) (the object mapper
 * we internally use). Manual use of this method is not recommended.
 *
 * @param target - An instance of an 'extended enum' class (a class that
 *                 extends `BaseExtendedEnum` class) or an array of the
 *                 'extended enum' class. The 'extended enum' class must
 *                 have a property pointing to the instance.
 *
 * @returns A string or array of string that corresponds to the
 *          `TExtendedEnum` class.
 */
export function toJsonValue<TExtendedEnum extends BaseExtendedEnum>(
    target: TExtendedEnum | TExtendedEnum[]
): undefined | string | string[]
{
    // If the target is an array.
    if (Array.isArray(target))
    {
        // Convert each element in the target by calling this method
        // recursively.
        return target
                .map(toJsonValue)
                .filter(x => typeof x !== 'undefined') as string[];
    }

    // The class of the object (e.g. ResponseType).
    const clazz: any = target.constructor;

    // Loop over the keys of the properties in the class.
    for (const key of Object.keys(clazz))
    {
        // The property for the key.
        const property = clazz[key];

        // If the property equals the target object.
        if (property === target)
        {
            // Return the key. (e.g. 'CODE')
            return key;
        }
    }

    // No such object is defined in the class.
    return undefined;
}