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
 * Values for `display`.
 *
 * For more details, see [OpenID Connect Core 1.0, 3.1.2.1. Authentication
 * Request](http://openid.net/specs/openid-connect-core-1_0.html#AuthRequest).
 */
export class Display extends BaseExtendedEnum
{
    /**
     * `page` (1).
     *
     * The Authorization Server SHOULD display the authentication and
     * consent UI consistent with a full User Agent page view. If the
     * `display` parameter is not specified, this is the default display
     * mode.
     */
    public static readonly PAGE = new Display(1, 'page');


    /**
     * `popup` (2).
     *
     * The Authorization Server SHOULD display the authentication and
     * consent UI consistent with a popup User Agent window. The popup
     * User Agent window should be of an appropriate size for a
     * login-focused dialog and should not obscure the entire window
     * that it is popping up over.
     */
    public static readonly POPUP = new Display(2, 'popup');


    /**
     * `touch` (3).
     *
     * The Authorization Server SHOULD display the authentication and
     * consent UI consistent with a device that leverages a touch
     * interface.
     */
    public static readonly TOUCH = new Display(3, 'touch');


    /**
     * `wap` (4).
     *
     * The Authorization Server SHOULD display the authentication and
     * consent UI consistent with a 'feature phone' type display.
     */
    public static readonly WAP = new Display(4, 'wap');
}