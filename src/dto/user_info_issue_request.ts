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
 * Request to Authlete `/auth/userinfo/issue` API
 */
export class UserInfoIssueRequest
{
    /**
     * The access token which has been issued by Authlete. The access
     * token is the one that has come along with the [userinfo request](
     * http://openid.net/specs/openid-connect-core-1_0.html#UserInfoRequest)
     * from the client application.
     */
    public token?: string;


    /**
     * The claims in JSON format.
     */
    public claims?: string;


    /**
     * The value of the `"sub"` claim. If a non-empty value is given,
     * it is used as the value of the `"sub"` claim. Otherwise, the value
     * of the subject associated with the access token is used.
     */
    public sub?: string;


    /**
     * Set the `claims` property.
     *
     * A value passed to this method as `value` parameter must be a JavaScript
     * value, usually an object or array, into which claims of the subject
     * (= information about the end-user) are put.
     *
     * Also, note that the value of `value` parameter must be a value
     * that can be converted to a JSON string value by `JSON.stringify()`.
     *
     * The below is an example value of `value` parameter if `given_name`
     * claim, `family_name` claim and `email` claim are requested:
     *
     * ```ts
     * {
     *     given_name: "Hideki",
     *     family_name: "Ikeda",
     *     email: "hideki.ikeda@example.com"
     * }
     * ```
     *
     * See [OpenID Connect Core 1.0, 5.1. Standard Claims](
     * http://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)
     * for more details.
     *
     * @param value
     *         The claims of the subject. Keys are claim names.
     */
    public setClaims(value: any): void
    {
        try
        {
            // Store the claim object as a JSON string.
            this.claims = JSON.stringify(value);
        }
        catch(e)
        {
            // Do nothing if the conversion fails.
        }
    }
}