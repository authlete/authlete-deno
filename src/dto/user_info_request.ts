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
 * Request to Authlete `/auth/userinfo` API
 */
export class UserInfoRequest
{
    /**
     * The access token which has been issued by Authlete. The access
     * token is the one that has come along with the [userinfo request](
     * http://openid.net/specs/openid-connect-core-1_0.html#UserInfoRequest)
     * from the client application.
     */
    public token?: string;


    /**
     * The client certificate used in the TLS connection established
     * between the client application and the userinfo endpoint.
     *
     * The value of this request parameter is referred to when the access
     * token given to the userinfo endpoint was bound to a client certificate
     * when it was issued. See _"[OAuth 2.0 Mutual TLS Client Authentication
     * and Certificate-Bound Access Tokens](
     * https://datatracker.ietf.org/doc/draft-ietf-oauth-mtls/?include_text=1)"_
     * for details about the specification of certificate-bound access
     * tokens.
     */
    public clientCertificate?: string;
}