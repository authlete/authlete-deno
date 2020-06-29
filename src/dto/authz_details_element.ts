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
 * A class that represents an element in `authorization_details` which
 * is defined in _"OAuth 2.0 Rich Authorization Requests"_.
 */
export class AuthzDetailsElement
{
    /**
     * The type of this element.
     *
     * From _"OAuth 2.0 Rich Authorization Requests"_:
     *
     * > _"The type of resource request as a string. This field MAY
     * define which other elements are allowed in the request. This
     * element is REQUIRED."_
     */
    public type?: string;


    /**
     * The resources and/or resource servers.
     *
     * From _"OAuth 2.0 Rich Authorization Requests"_:
     *
     * > _"An array of strings representing the location of the resource
     * or resource server. This is typically composed of URIs."_
     */
    public locations?: string[];


    /**
     * The actions.
     *
     * From _"OAuth 2.0 Rich Authorization Requests"_:
     *
     * > _"An array of strings representing the kinds of actions to be
     * taken at the resource. The values of the strings are determined
     * by the API being protected."_
     */
    public actions?: string[];


    /**
     * The identifier of a specific resource.
     *
     * From <i>"OAuth 2.0 Rich Authorization Requests"</i>:
     *
     * > _"A string identifier indicating a specific resource available
     * at the API."_
     */
    public identifier?: string;


    /**
     * The other fields (than `type`, `locations`, `actions` and `identifier`)
     * as a string in the JSON format.
     *
     * The content varies depending on the `type` field.
     */
    public otherFields?: string[];
}