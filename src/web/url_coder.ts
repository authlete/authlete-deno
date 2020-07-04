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
 * Convert the given object to a string formatted in `'application/x-www-form-urlencoded'`
 *
 * @param parameters
 *         An object representing form parameters on an HTTP `POST` request.
 */
export function formUrlEncode(parameters: { [key: string]: string }): string
{
    // An array for storing encoded elements.
    const encodedElements: string[] = [];

    // For each parameter key.
    Object.keys(parameters).forEach((key) => {
        // Skip if the key is an empty string ('').
        if (key.length === 0) return;

        // Encode the key.
        const encodedKey = encodeURIComponent(key);

        // The value for the key.
        const value: string = parameters[key];

        if (value.length === 0)
        {
            // If the value is empty, push only the encoded key.
            encodedElements.push(encodedKey);
        }
        else
        {
            // Encode the value.
            const encodedValue = encodeURIComponent(value);

            // Combine the encoded key and value with a '='.
            encodedElements.push( encodedKey + '=' + encodedValue );
        }
    });

    // If there is any encoded elements, join the elements by '&'.
    // Otherwise, just return an empty string.
    return encodedElements.length > 0 ? encodedElements.join('&') : '';
}