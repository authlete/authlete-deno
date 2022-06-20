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
 * Property that consists of a string key and a string value.
 *
 * This class is used mainly to represent an extra property that is
 * associated with an access token. Some Authlete APIs (such as
 * `/auth/token` API) accept an array of properties via `properties`
 * request parameter and associate the properties with an access token.
 */
export class Property
{
    /**
     * The key.
     */
    public key?: string;


    /**
     * The value.
     */
    public value?: string;


    /**
     * The flag to indicate whether this property is hidden from client
     * applications.
     *
     * If a property is not hidden, the property will come along with
     * an access token. For example, if you set the `properties` request
     * parameter as follows when you call Authlete `/auth/token` API,
     *
     * ```json
     * [
     *     {
     *         "key":"example_parameter",
     *         "value":"example_value",
     *         "hidden":false
     *     }
     * ]
     * ```
     *
     * The value of `responseContent` in the response from the API will
     * contain the pair of `example_parameter` and `example_value` like
     * below,
     *
     * ```json
     * {
     *   ...
     *   "responseContent": "{\"access_token\":\"(abbrev)\",\"example_parameter\":\"example_value\",...}"
     * }
     * ```
     *
     * and this will result in that the client application will receive
     * a JSON which contains the pair like the following.
     *
     * ```json
     * {
     *   "access_token":"(abbrev)",
     *   "example_parameter":"example_value",
     *   ...
     * }
     * ```
     *
     * On the other hand, if you mark a property as <i>hidden</i> like
     * below,
     *
     * ```json
     * [
     *   {
     *     "key":"hidden_parameter",
     *     "value":"hidden_value",
     *     "hidden":true
     *   }
     * ]
     * ```
     *
     * The client application will never see the property in any response
     * from your authorization server. However, of course, the property
     * is still associated with the access token and it can be confirmed
     * by calling Authlete `/auth/introspection` API (which is an
     * API to get information about an access token). A response from
     * the API contains all properties associated with the given access
     * token regardless of whether they are hidden or visible. The
     * following is an example from Authlete introspection API.
     *
     * ```json
     * {
     *   "type":"introspectionResponse",
     *   "resultCode":"A056001",
     *   "resultMessage":"[A056001] The access token is valid.",
     *   "action":"OK",
     *   "clientId":5008706718,
     *   "existent":true,
     *   "expiresAt":1463310477000,
     *   "properties":[
     *     {
     *       "hidden":false,
     *       "key":"example_parameter",
     *       "value":"example_value"
     *     },
     *     {
     *       "hidden":true,
     *       "key":"hidden_parameter",
     *       "value":"hidden_value"
     *     }
     *   ],
     *   "refreshable":true,
     *   "responseContent":"Bearer error=\"invalid_request\"",
     *   "subject":"user123",
     *   "sufficient":true,
     *   "usable":true
     * }
     * ```
     */
    public hidden!: boolean;
}