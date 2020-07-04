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
 * Values for `application_type`.
 *
 * For more details, see [OpenID Connect Dynamic Client Registration
 * 1.0, 2. Client Metadata](http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
 */
export class ApplicationType extends BaseExtendedEnum
{
    /**
     * `web` (1).
     */
    public static readonly WEB = new ApplicationType(1, 'web');


    /**
     * `native` (2).
     */
    public static readonly NATIVE = new ApplicationType(2, 'native');
}