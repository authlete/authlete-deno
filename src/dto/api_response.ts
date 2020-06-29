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
 * The base class of an API response from an Authlete API.
 */
export class ApiResponse
{
    /**
     * The result code for an Authlete API call (e.g. `'A004001'`).
     */
    public resultCode!: string;


    /**
     * The result message for an Authlete API call (e.g. `'[A001202]
     * /client/get/list, Authorization header is missing.'`).
     */
    public resultMessage!: string;
}