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
 * Request to Authlete `/auth/introspection/standard` API.
 */
export class StandardIntrospectionRequest
{
    /**
     * The value of `parameters` that represents the request parameters
     * which the introspection endpoint of the authorization server received.
     * The value of this property is supposed to comply with [RFC 7662](
     * https://tools.ietf.org/html/rfc7662) (e.g.
     * `"token=pNj1h24a4geA_YHilxrshkRkxJDsyXBZWKp3hZ5ND7A"`).
     */
    public parameters?: string;
}