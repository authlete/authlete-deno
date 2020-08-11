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


import { AuthorizationResponse } from '../dto/authorization_response.ts';
import { AuthzDetails } from '../dto/authz_details.ts';
import { Client } from '../dto/client.ts';
import { Scope } from '../dto/scope.ts';
import { User } from '../type/user.ts';


function computeLoginId(info: AuthorizationResponse)
{
    // Use 'subject' as login ID if possible.
    if (info.subject)
    {
        return info.subject;
    }

    // Use 'loginHint' as login ID if possible.
    return info.loginHint;
}


/**
 * The data object to be used when rendering the authorization page.
 */
export class AuthorizationPageModel
{
    /**
     * The service name.
     */
    public serviceName!: string;


    /**
     * The client name.
     */
    public clientName!: string;


    /**
     * The description of the client application.
     */
    public description?: string;


    /**
     * The URL of the logo image of the client application.
     */
    public logoUri?: string;


    /**
     * The URL of the homepage of the client application.
     */
    public clientUri?: string;


    /**
     * The URL of the policy page of the client application.
     */
    public policyUri?: string;


    /**
     * The URL of "Terms of Service" page of the client application.
     */
    public tosUri?: string;


    /**
     * Get the list of scopes requested by the authorization request.
     */
    public scopes?: Scope[];


    /**
     * Get the login ID which should be set to the login ID field in the
     * the authorization page as the initial value.
     */
    public loginId?: string;


    /**
     * The content of the `authorization_details` request parameter in
     * JSON format. See "OAuth 2.0 Rich Authorization Requests" for details.
     */
    public authorizationDetails?: AuthzDetails;


    /**
     * The user.
     */
    public user?: User;


    /**
     * A constructor with an `AuthorizationResponse` instance and a
     * `User` object.
     *
     * @param info
     *         A response returned from Authlete `/auth/authorization`
     *         API.
     *
     * @param user
     *         A user that the client application is asking for authorization.
     */
    public constructor(info: AuthorizationResponse, user?: User)
    {
        const client: Client = info.client;

        this.serviceName          = info.service.serviceName!;
        this.clientName           = client.clientName!;
        this.description          = client.description;
        this.logoUri              = client.logoUri;
        this.clientUri            = client.clientUri;
        this.policyUri            = client.policyUri;
        this.tosUri               = client.tosUri;
        this.scopes               = info.scopes;
        this.loginId              = computeLoginId(info);
        this.authorizationDetails = info.authorizationDetails;
        this.user                 = user;
    }
}