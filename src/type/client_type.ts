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

import { BaseExtendedEnum } from './base_extended_enum.ts';


/**
 * Client types of OAuth 2.0 client applications.
 *
 * For more details, see [RFC 6749 (OAuth 2.0), 2.1. Client Types](
 * http://tools.ietf.org/html/rfc6749#section-2.1).
 */
export class ClientType extends BaseExtendedEnum
{
    /**
     * `public` (1).
     *
     * Clients incapable of maintaining the confidentiality of their
     * credentials (e.g. clients executing on the device used by the
     * resource owner, such as an installed native application or a web
     * browser-based application), and incapable of secure client
     * authentication via any other means.
     */
    public static readonly PUBLIC = new ClientType(1, 'public');


    /**
     * `confidential` (2).
     *
     * Clients capable of maintaining the confidentiality of their
     * credentials (e.g. client implemented on a secure server with
     * restricted access to the client credentials), or capable of secure
     * client authentication using other means.
     */
    public static readonly CONFIDENTIAL = new ClientType(2, 'confidential');
}