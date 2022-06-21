// Copyright (C) 2022 Authlete, Inc.
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
 * Values for `attachments_supported`.
 *
 * For more details, see [OpenID Connect for Identity Assurance 1.0](
 * https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html).
 */
export class AttachmentType extends BaseExtendedEnum
{
    /**
     * `embedded` (1).
     */
    public static readonly EMBEDDED = new AttachmentType(1, 'embedded');


    /**
     * `external` (2).
     */
    public static readonly EXTERNAL = new AttachmentType(2, 'external');
}