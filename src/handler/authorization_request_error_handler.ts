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
import { badRequest, internalServerError, location, okHtml } from '../web/response_util.ts';
import { BaseHandler, invalidAction, unknownAction } from './base_handler.ts';
import Action = AuthorizationResponse.Action;


export class AuthorizationRequestErrorHandler extends BaseHandler<AuthorizationResponse>
{
    public async handle(response: AuthorizationResponse)
    {
        // Dispatch according to the action.
        switch (response.action)
        {
            case Action.INTERNAL_SERVER_ERROR:
                // 500 Internal Server Error.
                return internalServerError(response.responseContent!);

            case Action.BAD_REQUEST:
                // 400 Bad Request.
                return badRequest(response.responseContent!);

            case Action.LOCATION:
                // 302 Found.
                return location(response.responseContent!);

            case Action.FORM:
                // 200 OK.
                return okHtml(response.responseContent!);

            case Action.INTERACTION:
                // This is not an error case. The implementation
                // of the authorization endpoint should show an
                // authorization page to the end-user.
                return invalidAction(Action[Action.INTERACTION]);

            case Action.NO_INTERACTION:
                // This is not an error case. The implementation
                // of the authorization endpoint should handle the
                // authorization request without user interaction.
                return invalidAction(Action[Action.INTERACTION]);

            default:
                // This never happens.
                return unknownAction('/api/auth/authorization');
        }
    }
}