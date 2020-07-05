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


import { noContent, okJson } from '../web/response_util.ts';
import { BaseApiRequestHandler } from './base_api_request_handler.ts';


/**
 * Handler for requests to an endpoint that exposes JSON Web Key Set
 * ([RFC 7517](https://tools.ietf.org/html/rfc7517)) document.
 *
 * An OpenID Provider (OP) is required to expose its JSON Web Key Set
 * document (JWK Set) so that client applications can (1) verify signatures
 * by the OP and (2) encrypt their requests to the OP. The URI of a JWK
 * Set endpoint can be found as the value of `jwks_uri` in [OpenID Provider
 * Metadata](http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata),
 * if the OP supports [OpenID Connect Discovery 1.0](
 * http://openid.net/specs/openid-connect-discovery-1_0.html).
 */
export class JwksRequestHandler extends BaseApiRequestHandler<boolean>
{
    /**
     * Handle a request to a JWK Set document endpoint.
     *
     * @param pretty
     *         `true` to format the JWK Set document in a more human-readable
     *         way.
     *
     * @returns An HTTP response that should be returned from the JWK
     *          Set document endpoint implementation to the client
     *          application.
     */
    public async handle(pretty: boolean)
    {
        // Call Authlete /api/service/configuration API.
        // The API returns a JSON that complies with OpenID Connect
        // Discovery 1.0.
        const json = await this.api.getServiceJwks(pretty);

        // If the fetched JSON string is empty, return a response
        // of '204 No Content'.
        if (!json) return noContent();

        // Return '200 OK' with the JSON.
        return okJson(json);
    }
}