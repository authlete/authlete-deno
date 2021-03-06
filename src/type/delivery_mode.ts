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
 * Backchannel token delivery mode defined in the specification of
 * CIBA (Client Initiated Backchannel Authentication).
 */
export class DeliveryMode extends BaseExtendedEnum
{
    /**
     * Poll mode, a backchannel token delivery mode where a client polls
     * the token endpoint until it gets tokens.
     */
    public static readonly POLL = new DeliveryMode(1, 'poll');


    /**
     * Ping mode, a backchannel token delivery mode where a client is
     * notified via its client notification endpoint and then gets tokens
     * from the token endpoint.
     */
    public static readonly PING = new DeliveryMode(2, 'ping');


    /**
     * Push mode, a backchannel token delivery mode where a client receives
     * tokens at its client notification endpoint.
     */
    public static readonly PUSH = new DeliveryMode(3, 'push');
}