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


import ct from 'https://cdn.pika.dev/class-transformer@^0.2.3';
import 'https://cdn.pika.dev/reflect-metadata@^0.1.13';
import { fromJsonValue, toJsonValue } from '../type/base_extended_enum.ts';
import { ClaimType } from '../type/claim_type.ts';
import { ClientAuthMethod } from '../type/client_auth_method.ts';
import { DeliveryMode } from '../type/delivery_mode.ts';
import { Display } from '../type/display.ts';
import { GrantType } from '../type/grant_type.ts';
import { JWSAlg } from '../type/jws_alg.ts';
import { ResponseType } from '../type/response_type.ts';
import { ServiceProfile } from '../type/service_profile.ts';
import { Sns } from '../type/sns.ts';
import { UserCodeCharset } from '../type/user_code_charset.ts';
import { NamedUri } from './named_uri.ts';
import { Pair } from './pair.ts';
import { Scope } from './scope.ts';
import { SnsCredentials } from './sns_credentials.ts';
const { Transform, Type } = ct;


/**
 * Information about a service.
 *
 * Some properties correspond to the ones listed in [OpenID Provider
 * Metadata](http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata)
 * in [OpenID Connect Discovery 1.0](
 * http://openid.net/specs/openid-connect-discovery-1_0.html).
 */
export class Service
{
    /**
     * The sequential number of the service. The value of this property
     * is assigned by Authlete. Even if the property has a value in a
     * request to Authlete `/service/create` API or `/service/update`
     * API, it is ignored.
     */
    public number?: number;


    /**
     * The sequential number of the service owner of the service. The
     * value of this property is assigned by Authlete. Even if the
     * property has a value in a request to Authlete `/service/create`
     * API or `/service/update` API, it is ignored.
     */
    public serviceOwnerNumber?: number;


    /**
     * The name of the service.
     */
    public serviceName?: string;


    /**
     * The API key. The value of this property is assigned by Authlete.
     * Even if the property has a value in a request to Authlete `/service/create`
     * API or `/service/update` API, it is ignored.
     */
    public apiKey?: number;


    /**
     * The API secret. A random 256-bit value encoded by [base64url](
     * http://tools.ietf.org/html/rfc4648#section-5) (43 letters). The
     * value of this property is assigned by Authlete. Even if the property
     * has a value in a request to Authlete `/service/create` API or
     * `/service/update` API, it is ignored.
     */
    public apiSecret?: string;


    /**
     * The issuer identifier of the service. A URL that starts with
     * `https://` and has no query or fragment component (e.g. `https://example.com`).
     *
     * The value of this property is used as `iss` claim in an [ID token
     * ](http://openid.net/specs/openid-connect-core-1_0.html#IDToken)
     * and `issuer` property in the [OpenID Provider Metadata](
     * http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
     */
    public issuer?: string;


    /**
     * The [authorization endpoint](http://tools.ietf.org/html/rfc6749#section-3.1)
     * of the service. A URL that starts with `https://` and has no
     * fragment component (e.g. `https://example.com/auth/authorization`).
     *
     * The value of this property is used as `authorization_endpoint`
     * property in the [OpenID Provider Metadata](
     * http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
     */
    public authorizationEndpoint?: string;


    /**
     * The [token endpoint](http://tools.ietf.org/html/rfc6749#section-3.2)
     * of the service. A URL that starts with `https://` and has not
     * fragment component (e.g. `https://example.com/auth/token`).
     *
     * The value of this property is used as `token_endpoint` property
     * in the [OpenID Provider Metadata](
     * http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
     */
    public tokenEndpoint?: string;


    /**
     * The [revocation endpoint](http://tools.ietf.org/html/rfc7009) of
     * the service. A URL that starts with `https://` (e.g.
     * `https://example.com/auth/revocation`).
     */
    public revocationEndpoint?: string;


    /**
     * Client authentication methods supported at the revocation endpoint.
     */
    @Transform((value: any) => fromJsonValue(value, ClientAuthMethod), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public supportedRevocationAuthMethods?: ClientAuthMethod[];


    /**
     * The [user info endpoint](
     * http://openid.net/specs/openid-connect-core-1_0.html#UserInfo)
     * of the service. A URL that starts with `https://` (e.g.
     * `https://example.com/auth/userinfo`).
     *
     * The value of this property is used as `userinfo_endpoint` property
     * in the [OpenID Provider Metadata](
     * http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
     */
    public userInfoEndpoint?: string;


    /**
     * The URL of the service's [JSON Web Key Set](
     * http://tools.ietf.org/html/draft-ietf-jose-json-web-key) document
     * (e.g. `http://example.com/auth/jwks`).
     *
     * Client applications accesses this URL (1) to get the public key
     * of the service to validate the signature of an ID token issued
     * by the service and (2) to get the public key of the service to
     * encrypt an request object of the client application. See [OpenID
     * Connect Core 1.0, 10\. Signatures and Encryption](
     * http://openid.net/specs/openid-connect-core-1_0.html#SigEnc) for
     * details.
     *
     * The value of this property is used as `jwks_uri` property in the
     * [OpenID Provider Metadata](
     * http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
     */
    public jwksUri?: string;


    /**
     * The content of the service's [JSON Web Key Set](
     * http://tools.ietf.org/html/draft-ietf-jose-json-web-key) document.
     *
     * If this property is set in a request to Authlete `/service/create`
     * API or `/service/update` API, Authlete hosts the content in the
     * database.
     *
     * See [OpenID Connect Core 1.0, 10\. Signatures and Encryption](
     * http://openid.net/specs/openid-connect-core-1_0.html#SigEnc) for
     * details.
     */
    public jwks?: string;


    /**
     * The [registration endpoint](
     * http://openid.net/specs/openid-connect-registration-1_0.html#ClientRegistration)
     * of the service. A URL that starts with `https://` (e.g. `https://example.com/auth/registration`).
     *
     * The value of this property is used as `registration_endpoint`
     * property in the [OpenID Provider Metadata](
     * http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
     */
    public registrationEndpoint?: string;


    /**
     * The URI of the registration management endpoint. If dynamic client
     * registration is supported, and this is set, this URI will be used
     * as the basis of the client's management endpoint by appending
     * `/clientid/` to it as a path element. If this is unset, the value
     * of `registrationEndpoint` will be used as the URI base instead.
     */
    public registrationManagementEndpoint?: string;


    /**
     * Scopes supported by the service. Authlete strongly recommends
     * that the service register at least the following scopes.
     *
     * The value of this property is used as `scopes_supported` property
     * in the [OpenID Provider Metadata](
     * http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
     */
    @Type(() => Scope)
    public supportedScopes?: Scope[];


    /**
     * Values of `response_type` request parameter that the service
     * supports.
     *
     * The value of this property is used as `response_types_supported`
     * property in the [OpenID Provider Metadata](
     * http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
     */
    @Transform((value: any) => fromJsonValue(value, ResponseType), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public supportedResponseTypes?: ResponseType[];


    /**
     * Values of `grant_type` request parameter that the service supports.
     *
     * The value of this property is used as `grant_types_supported`
     * property in the [OpenID Provider Metadata](
     * http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
     */
    @Transform((value: any) => fromJsonValue(value, GrantType), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public supportedGrantTypes?: GrantType[];


    /**
     * Values of Authentication Context Class References that the service
     * supports.
     *
     * The value of this property is used as `acr_values_supported`
     * property in the [OpenID Provider Metadata](
     * http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
     */
    public supportedAcrs?: string[];


    /**
     * Client authentication methods supported by the token endpoint of
     * the service.
     *
     * The value of this property is used as `token_endpoint_auth_methods_supports`
     * property in the [OpenID Provider Metadata](
     * http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
     */
    @Transform((value: any) => fromJsonValue(value, ClientAuthMethod), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public supportedTokenAuthMethods?: ClientAuthMethod[];


    /**
     * Values of `display` request parameter that service supports.
     *
     * The value of this property is used as `display_values_supported`
     * property in the [OpenID Provider Metadata](
     * http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
     */
    @Transform((value: any) => fromJsonValue(value, Display), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public supportedDisplays?: Display[];


    /**
     * Claim types supported by the service.
     *
     * The value of this property is used as `claim_types_supported`
     * property in the [OpenID Provider Metadata](
     * http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
     */
    @Transform((value: any) => fromJsonValue(value, ClaimType), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public supportedClaimTypes?: ClaimType[];


    /**
     * Claim names that the service supports. The standard claim names
     * listed in [OpenID Connect Core 1.0, 5.1. Standard Claim](
     * http://openid.net/specs/openid-connect-core-1_0.html#StandardClaims)
     * should be supported.
     *
     * The value of this property is used as `claims_supported` property
     * in the [OpenID Provider Metadata](
     * http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
     *
     * The service may support its original claim names. See [OpenID
     * Connect Core 1.0, 5.1.2\. Additional Claims](
     * http://openid.net/specs/openid-connect-core-1_0.html#AdditionalClaims).
     */
    public supportedClaims?: string[];


    /**
     * The URL of a page where documents for developers can be found.
     *
     * The value of this property is used as `service_documentation`
     * property in the [OpenID Provider Metadata](
     * http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
     */
    public serviceDocumentation?: string;


    /**
     * Claim locales that the service supports. Each element is a language
     * tag defined in [RFC 5646](http://tools.ietf.org/html/rfc5646)
     * (e.g. 'en-US' and 'ja-JP').
     *
     * See [OpenID Connect Core 1.0, 5.2. Languages and Scripts](
     * http://openid.net/specs/openid-connect-core-1_0.html#ClaimsLanguagesAndScripts
     * ) for details.
     *
     * The value of this property is used as `claims_locales_supported`
     * property in the [OpenID Provider Metadata](
     * http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
     */
    public supportedClaimLocales?: string[];


    /**
     * UI locales that the service supports. Each element is a language
     * tag defined in [RFC 5646](http://tools.ietf.org/html/rfc5646)
     * (e.g. 'en-US' and 'ja-JP').
     *
     * The value of this property is used as `ui_locales_supported`
     * property in the [OpenID Provider Metadata](
     * http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
     */
    public supportedUiLocales?: string[];


    /**
     * The URL of the "Policy" of the service.
     *
     * The value of this property is used as `op_policy_uri` property
     * in the [OpenID Provider Metadata](
     * http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
     */
    public policyUri?: string;


    /**
     * The URL of the 'Terms Of Service' of the service.
     *
     * The value of this property is used as `op_tos_uri` property in
     * the [OpenID Provider Metadata](
     * http://openid.net/specs/openid-connect-discovery-1_0.html#ProviderMetadata).
     */
    public tosUri?: string;


    /**
     * A Web API endpoint for user authentication which is to be prepared
     * on the service side.
     *
     * The endpoint must be implemented if you do not implement the UI
     * at the authorization endpoint but use the one provided by Authlete.
     * The user authentication at the authorization endpoint provided
     * by Authlete is performed by making a `POST` request to this endpoint.
     *
     * See '[Authentication Callback](
     * https://www.authlete.com/developers/definitive_guide/authentication_callback/)'
     * for details.
     */
    public authenticationCallbackEndpoint?: string;


    /**
     * API key for Basic authentication at the authentication callback
     * endpoint.
     *
     * If the value is not empty, Authlete generates `Authorization`
     * header for Basic authentication when making a request to the
     * authentication callback endpoint.
     */
    public authenticationCallbackApiKey?: string;


    /**
     * API secret for Basic authentication at the authentication callback
     * endpoint.
     */
    public authenticationCallbackApiSecret?: string;


    /**
     * SNSes you want to support 'social login' in the UI at the authorization
     * endpoint provided by Authlete. You need to register a client
     * application in each SNS that is set to this parameter and set
     * Authlete server's `/api/sns/redirection` as the redirection
     * endpoint of the client application.
     */
    @Transform((value: any) => fromJsonValue(value, Sns), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public supportedSnses?: Sns[];


    /**
     * SNS credentials which Authlete uses to make requests to SNSes.
     * The format is JSON.
     */
    @Type(() => SnsCredentials)
    public snsCredentials?: SnsCredentials[];


    /**
     * The time at which this service was created. The value is represented
     * as milliseconds since the UNIX epoch (1970-01-01).
     */
    public createdAt?: number;


    /**
     * The time at which this service was last modified. The value is
     * represented as milliseconds since the UNIX epoch (1970-01-01).
     */
    public modifiedAt?: number;


    /**
     * A Web API endpoint for developer authentication which is to be
     * prepared on the server side.
     *
     * The endpoint must be implemented if you use Developer Console.
     * The developer authentication at the login page of Developer
     * Console is performed by making a POST request to this endpoint.
     */
    public developerAuthenticationCallbackEndpoint?: string;


    /**
     * API key for Basic authentication at the developer authentication
     * callback endpoint.
     *
     * If the property is set, Authlete generates `Authorization`
     * header for Basic authentication when making a request to the
     * developer authentication callback endpoint.
     */
    public developerAuthenticationCallbackApiKey?: string;


    /**
     * API secret for Basic authentication at the developer authentication
     * callback endpoint.
     */
    public developerAuthenticationCallbackApiSecret?: string;


    /**
     * SNSes you want to support 'social login' in the login page of
     * Developer Console provided by Authlete. You need to register a
     * client application in each SNS checked here and set Authlete
     * server's `/api/developer/sns/redirection` as the redirection
     * endpoint of the client application.
     */
    @Transform((value: any) => fromJsonValue(value, Sns), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public supportedDeveloperSnses?: Sns[];


    /**
     * SNS credentials which Authlete uses to make requests to SNSes.
     * The format is JSON.
     */
    @Type(() => SnsCredentials)
    public developerSnsCredentials?: SnsCredentials[];


    /**
     * The maximum number of client applications that a developer is
     * allowed to create. 0 means no limit.
     */
    public clientsPerDeveloper?: number;


    /**
     * The flag to indicate whether the direct authorization endpoint
     * is enabled or not.
     *
     * If `true`, the default implementation of the authorization endpoint
     * of this service works. The path of the endpoint is
     * `/api/auth/authorization/direct/service-api-key`.
     *
     * If `false`, the endpoint returns `'404 Not Found'`. In this case,
     * you have to implement the authorization endpoint by yourself
     * using Authlete Web APIs such as `/api/auth/authorization`,
     * `/api/auth/authorization/issue` and `/api/auth/authorization/fail`.
     */
    public directAuthorizationEndpointEnabled?: boolean;


    /**
     * The flag to indicate whether the direct token endpoint is enabled
     * or not.
     *
     * If `true`, the default implementation of the token endpoint of
     * this service works. The path of the endpoint is
     * `/api/auth/token/direct/service-api-key`.
     *
     * If `false`, the endpoint returns `'404 Not Found'`. In this case,
     * you have to implement the token endpoint by yourself using Authlete
     * Web APIs such as `/api/auth/token`, `/api/auth/token/issue` and
     * `/api/auth/token/fail`.
     */
    public directTokenEndpointEnabled?: boolean;


    /**
     * The flag to indicate whether the direct revocation endpoint is
     * enabled or not.
     *
     * If `true`, the default implementation of the revocation endpoint
     * ([RFC 7009](http://tools.ietf.org/html/rfc7009)) of this service
     * works. The path of the endpoint is `/api/auth/revocation/direct/service-api-key`.
     *
     * If `false`, the endpoint returns `'404 Not Found'`. In this case,
     * if you want to provide a revocation endpoint to client applications,
     * you have to implement the endpoint by yourself using Authlete
     * `/api/auth/revocation` API.
     */
    public directRevocationEndpointEnabled?: boolean;


    /**
     * The flag to indicate whether the direct userinfo endpoint is
     * enabled or not.
     *
     * If `true`, the default implementation of the userinfo endpoint
     * of this service works. The path of the endpoint is
     * `/api/auth/userinfo/direct/service-api-key`.
     *
     * If `false`, the endpoint returns 404 Not Found. In this case,
     * if you want to provide a userinfo endpoint to client applications,
     * you have to implement the endpoint by yourself using Authlete
     * `/api/auth/userinfo` API.
     */
    public directUserInfoEndpointEnabled?: boolean;


    /**
     * The flag to indicate whether the direct jwks endpoint is enabled
     * or not.
     *
     * If `true`, the default implementation of the jwk set endpoint
     * of this service works. The path of the endpoint is
     * `/api/service/jwks/get/direct/service-api-key`.
     *
     * If `false`, the endpoint returns `'404 Not Found'`. In this case,
     * if you want to provide a JWK Set endpoint to client applications,
     * you have to implement the endpoint by yourself using Authlete
     * `/api/service/jwks/get` API.
     */
    public directJwksEndpointEnabled?: boolean;


    /**
     * The flag to indicate whether the direct introspection endpoint is
     * enabled or not.
     *
     * If `true`, the default implementation of the userinfo endpoint
     * of this service works. The path of the endpoint is
     * `/api/auth/introspection/direct/{serviceApiKey}`.
     *
     * If `false`, the endpoint returns `'404 Not Found'`. In this case,
     * if you want to provide a userinfo endpoint to client applications,
     * you have to implement the endpoint by yourself using Authlete
     * `/api/auth/introspection` API or `/api/auth/introspection/standard`
     * API.
     *
     * This feature is not implemented yet.
     */
    public directIntrospectionEndpointEnabled?: boolean;


    /**
     * The flag to indicate whether the number of access tokens per
     * subject (and per client) is at most one or can be more.
     *
     * If `true`, an attempt to issue a new access token invalidates
     * existing access tokens that are associated with the same subject
     * and the same client.
     *
     * Note that, however, attempts by Client Credentials Flow](
     * https://tools.ietf.org/html/rfc6749#section-4.4)  do not invalidate
     * existing access tokens because access tokens issued by Client
     * Credentials Flow are not associated with any end-user's subject.
     * Also note that an attempt by [Refresh Token Flow](
     * https://tools.ietf.org/html/rfc6749#section-6) invalidates the
     * coupled access token only and this invalidation is always performed
     * regardless of whether the property is set to `true` or `false`.
     */
    public singleAccessTokenPerSubject?: boolean;


    /**
     * The flag to indicate whether the use of Proof Key for Code Exchange
     * (PKCE) is always required for authorization requests by [Authorization
     * Code Flow](https://tools.ietf.org/html/rfc6749#section-4.1).
     *
     * If `true`, code_challenge request parameter is always required
     * for authorization requests using Authorization Code Flow.
     *
     * See [RFC 7636](https://tools.ietf.org/html/rfc7636) (Proof Key
     * for Code Exchange by OAuth Public Clients) for details about
     * `code_challenge` request parameter.
     */
    public pkceRequired?: boolean;


    /**
     * The flag which indicates whether `S256` is always required
     * as the code challenge method whenever [PKCE](
     * https://tools.ietf.org/html/rfc7636) is used.
     *
     * If `true` is set, `code_challenge_method=S256` must be included
     * in the authorization request whenever it includes the `code_challenge`
     * request parameter. Neither omission of the `code_challenge_method`
     * request parameter nor use of `plain` (`code_challenge_method=plain`)
     * is allowed.
     */
    public pkceS256Required?: boolean;


    /**
     * The flag to indicate whether a refresh token remains unchanged
     * or gets renewed after its use.
     *
     * If `true`, a refresh token used to get a new access token remains
     * valid after its use. Otherwise, if `false`, a refresh token is
     * invalidated after its use and a new refresh token is issued.
     *
     * See RFC 6749 [6. Refreshing an Access Token](
     * https://tools.ietf.org/html/rfc6749#section-6), as to how to get
     * a new access token using a refresh token.
     */
    public refreshTokenKept?: boolean;


    /**
     * The flag to indicate whether the `error_description` response
     * parameter is omitted.
     *
     * According to [RFC 6749](https://tools.ietf.org/html/rfc6749), an
     * authorization server may include the `error_description` response
     * parameter in error responses.
     *
     * If `true`, Authlete does not embed the `error_description` response
     * parameter in error responses.
     */
    public errorDescriptionOmitted?: boolean;


    /**
     * The flag to indicate whether the `error_uri` response parameter
     * is omitted.
     *
     * According to [RFC 6749](https://tools.ietf.org/html/rfc6749), an
     * authorization server may include the `error_uri` response parameter
     * in error responses.
     *
     * If `true`, Authlete does not embed the `error_uri` response
     * parameter in error responses.
     */
    public errorUriOmitted?: boolean;


    /**
     * The flag to indicate whether the 'Client ID Alias' feature is enabled
     * or not.
     *
     * When a new client is created, Authlete generates a numeric value
     * and assigns it as a client ID to the newly created client. In
     * addition to the client ID, each client can have a client ID alias.
     * The client ID alias is, however, recognized only when this property
     * (`clientIdAliasEnabled`) is set to `true`.
     */
    public clientIdAliasEnabled?: boolean;


    /**
     * The profiles that this service supports.
     */
    @Transform((value: any) => fromJsonValue(value, ServiceProfile), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public supportedServiceProfiles?: ServiceProfile[];


    /**
     * The boolean flag which indicates whether this service supports
     * issuing TLS client certificate bound access tokens.
     */
    public tlsClientCertificateBoundAccessTokens?: boolean;


    /**
     * The URI of the introspection endpoint.
     */
    public introspectionEndpoint?: string;


    /**
     * Client authentication methods supported at the introspection
     * endpoint.
     */
    @Transform((value: any) => fromJsonValue(value, ClientAuthMethod), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public supportedIntrospectionAuthMethods?: ClientAuthMethod[];


    /**
     * The flag to indicate whether this service validates certificate
     * chains during PKI-based client mutual TLS authentication.
     */
    public mutualTlsValidatePkiCertChain?: boolean;


    /**
     * The list of root certificates trusted by this service for PKI-based
     * client mutual TLS authentication.
     */
    public trustedRootCertificates?: string[];


    /**
     * The boolean to indicate whether the dynamic client registration
     * is supported.
     */
    public dynamicRegistrationSupported?: boolean;


    /**
     * The description about the service.
     */
    public description?: string;


    /**
     * The access token type. This value is used as the value of `token_type`
     * property in access token responses. If this service complies with
     * <a herf="https://tools.ietf.org/html/rfc6750">RFC 6750</a>, the
     * value of this property should be `Bearer`.
     *
     * See [RFC 6749 (OAuth 2.0), 7.1. Access Token Types](
     * http://tools.ietf.org/html/rfc6749#section-7.1) for details.
     */
    public accessTokenType?: string;


    /**
     * The signature algorithm of access tokens.
     *
     * Symmetric algorithms (`JWSAlg.HS256`, `JWSAlg.HS384` and
     * `JWSAlg.HS512`) cannot be used for this property. When this property
     * is not set, access tokens issued by this service are just random
     * strings. On the other hand, when it is set, access tokens issued
     * by this service are JWTs and the value set by this method is used
     * as the signature algorithm of the JWTs.
     *
     * This parameter is available since Authlete 2.1. Access tokens
     * generated by older Authlete versions are always random strings.
     */
    @Transform((value: any) => fromJsonValue(value, JWSAlg), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public accessTokenSignAlg?: JWSAlg;


    /**
     * The duration of access tokens in seconds.
     *
     * This value is used as the value of `expires_in` property in access
     * token responses. `expires_in` is defined [RFC 6749, 5.1. Successful
     * Response](http://tools.ietf.org/html/rfc6749#section-5.1).
     */
    public accessTokenDuration?: number;


    /**
     * The duration of refresh tokens in seconds. The related specifications
     * have no requirements on refresh token duration, but Authlete sets
     * expiration for refresh tokens.
     */
    public refreshTokenDuration?: number;


    /**
     * The duration of ID tokens in seconds. This value is used to
     * calculate the value of `exp` claim in an [ID token](
     * http://openid.net/specs/openid-connect-core-1_0.html#IDToken).
     */
    public idTokenDuration?: number;


    /**
     * The duration of authorization response JWTs.
     *
     * [Financial-grade API: JWT Secured Authorization Response Mode
     * for OAuth 2.0 (JARM)](https://openid.net/specs/openid-financial-api-jarm.html)
     * defines new values for the `response_mode` request parameter.
     * They are `query.jwt`, `fragment.jwt`, `form_post.jwt` and `jwt`.
     * If one of them is specified as the response mode, response parameters
     * from the authorization endpoint will be packed into a JWT. This
     * property is used to compute the value of the `exp` claim of the
     * JWT.
     */
    public authorizationResponseDuration?: number;


    /**
     * The duration of pushed authorization requests.
     *
     * "OAuth 2.0 Pushed Authorization Requests" defines an endpoint
     * (called "pushed authorization request endpoint") which client
     * applications can register authorization requests into and get
     * corresponding URIs (called "request URIs") from. The issued URIs
     * represent the registered authorization requests. The client
     * applications can use the URIs as the value of the `request_uri`
     * request parameter in an authorization request.
     *
     * The value returned from this method represents the duration of
     * registered authorization requests and is used as the value of
     * the `expires_in` parameter in responses from the pushed authorization
     * request endpoint.
     */
    public pushedAuthReqDuration?: number;


    /**
     * The metadata of the service. The content of the returned array
     * depends on contexts.
     */
    @Type(() => Pair)
    public metadata?: Pair[];


    /**
     * The duration of access tokens in seconds; the value of `expires_in`
     * in access token responses.
     */
    public accessTokenSignatureKeyId?: string;


    /**
     * The key ID to identify a JWK used for signing authorization
     * responses using an asymmetric key.
     *
     * [Financial-grade API: JWT Secured Authorization Response Mode
     * for OAuth 2.0 (JARM)](https://openid.net/specs/openid-financial-api-jarm.html)
     * defines new values for the `response_mode` request parameter.
     * They are `query.jwt`, `fragment.jwt`, `form_post.jwt` and `jwt`.
     * If one of them is specified as the response mode, response parameters
     * from the authorization endpoint will be packed into a JWT. This
     * property is used to compute the value of the exp claim of the JWT.
     *
     * Authlete Server searches the JWK Set for a JWK which satisfies
     * conditions for authorization response signature. If the number
     * of JWK candidates which satisfy the conditions is 1, there is
     * no problem. On the other hand, if there exist multiple candidates,
     * a Key ID is needed to be specified so that Authlete Server can
     * pick up one JWK from among the JWK candidates. This property
     * exists to specify the key ID.
     */
    public authorizationSignatureKeyId?: string;


    /**
     * The key ID to identify a JWK used for ID token signature using
     * an asymmetric key.
     *
     * A JWK Set can be registered as a property of a Service. A JWK
     * Set can contain 0 or more JWKs (See [RFC 7517](
     * https://tools.ietf.org/html/rfc7517) for details about JWK).
     * Authlete Server has to pick up one JWK for signature from the
     * JWK Set when it generates an ID token and signature using an
     * asymmetric key is required. Authlete Server searches the registered
     * JWK Set for a JWK which satisfies conditions for ID token signature.
     * If the number of JWK candidates which satisfy the conditions is
     * 1, there is no problem. On the other hand, if there exist multiple
     * candidates, a [Key ID](https://tools.ietf.org/html/rfc7517#section-4.5)
     * is needed to be specified so that Authlete Server can pick up
     * one JWK from among the JWK candidates.
     *
     * This `idTokenSignatureKeyId` property exists for the purpose
     * described above. For key rotation (OpenID Connect Core 1.0,
     * [10.1.1. Rotation of Asymmetric Signing Keys](
     * http://openid.net/specs/openid-connect-core-1_0.html#RotateSigKeys)),
     * this mechanism is needed.
     */
    public idTokenSignatureKeyId?: string;


    /**
     * The key ID to identify a JWK used for user info signature using
     * an asymmetric key.
     *
     * A JWK Set can be registered as a property of a Service. A JWK Set
     * can contain 0 or more JWKs (See [RFC 7517](https://tools.ietf.org/html/rfc7517)
     * for details about JWK). Authlete Server has to pick up one JWK
     * for signature from the JWK Set when it is required to sign user
     * info (which is returned from [userinfo endpoint](
     * http://openid.net/specs/openid-connect-core-1_0.html#UserInfo))
     * using an asymmetric key. Authlete Server searches the registered
     * JWK Set for a JWK which satisfies conditions for user info signature.
     * If the number of JWK candidates which satisfy the conditions is
     * 1, there is no problem. On the other hand, if there exist multiple
     * candidates, a [Key ID](https://tools.ietf.org/html/rfc7517#section-4.5)
     * is needed to be specified so that Authlete Server can pick up one
     * JWK from among the JWK candidates.
     *
     * This `userInfoSignatureKeyId` property exists for the purpose
     * described above. For key rotation (OpenID Connect Core 1.0, [
     * 10.1.1. Rotation of Asymmetric Signing Keys](
     * http://openid.net/specs/openid-connect-core-1_0.html#RotateSigKeys)),
     * this mechanism is needed.
     */
    public userInfoSignatureKeyId?: string;


    /**
     * The supported backchannel token delivery modes. This property
     * corresponds to the `backchannel_token_delivery_modes_supported`
     * metadata.
     *
     * Backchannel token delivery modes are defined in the specification
     * of CIBA (Client Initiated Backchannel Authentication).
     */
    @Transform((value: any) => fromJsonValue(value, DeliveryMode), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public supportedBackchannelTokenDeliveryModes?: DeliveryMode[];


    /**
     * The URI of the backchannel authentication endpoint.
     *
     * Backchannel token delivery modes are defined in the specification
     * of CIBA (Client Initiated Backchannel Authentication).
     */
    public backchannelAuthenticationEndpoint?: string;


    /**
     * The boolean flag which indicates whether the `user_code` request
     * parameter is supported at the backchannel authentication endpoint.
     *
     * This property corresponds to the `backchannel_user_code_parameter_supported`
     * metadata.
     */
    public backchannelUserCodeParameterSupported?: boolean;


    /**
     * The duration of backchannel authentication request IDs issued
     * from the backchannel authentication endpoint in seconds.
     *
     * This is used as the value of the `expires_in` property in responses
     * from the backchannel authentication endpoint.
     */
    public backchannelAuthReqIdDuration?: number;


    /**
     * The minimum interval between polling requests to the token endpoint
     * from client applications in seconds. This is used as the value
     * of the interval property in responses from the backchannel
     * authentication endpoint.
     */
    public backchannelPollingInterval?: number;


    /**
     * The boolean flag which indicates whether the `binding_message`
     * request parameter is always required whenever a backchannel
     * authentication request is judged as a request for Financial-grade
     * API.
     *
     * The FAPI-CIBA profile requires that the authorization server _"shall
     * ensure unique authorization context exists in the authorization
     * request or require a `binding_message` in the authorization request"_
     * (FAPI-CIBA, 5.2.2, 2). The simplest way to fulfill this requirement
     * is to set `true` to this property.
     *
     * If `false` is set to this property, the `binding_message` request
     * parameter remains optional even in FAPI context, but in exchange,
     * your authorization server must implement a custom mechanism that
     * ensures each backchannel authentication request has unique context.
     */
    public backchannelBindingMessageRequiredInFapi?: boolean;


    /**
     * The allowable clock skew between the server and clients in seconds.
     *
     * The clock skew is taken into consideration when time-related
     * claims in a JWT (e.g. `"exp"`, `"iat"`, `"nbf"`) are verified.
     */
    public allowableClockSkew?: number;


    /**
     * The URI of the device authorization endpoint.
     *
     * Device authorization endpoint is defined in the specification of
     * OAuth 2.0 Device Authorization Grant.
     */
    public deviceAuthorizationEndpoint?: string;


    /**
     * The verification URI for the device flow.
     *
     * This URI is used as the value of the `verification_uri` parameter
     * in responses from the device authorization endpoint.
     */
    public deviceVerificationUri?: string;


    /**
     * The verification URI for the device flow with a placeholder
     * for a user code.
     *
     * This URI is used to build the value of the `verification_uri_complete`
     * parameter in responses from the device authorization endpoint.
     */
    public deviceVerificationUriComplete?: string;


    /**
     * The duration of device verification codes and end-user verification
     * codes issued from the device authorization endpoint in seconds.
     *
     * This is used as the value of the `expires_in` property in responses
     * from the device authorization endpoint.
     */
    public deviceFlowCodeDuration?: number;


    /**
     * The minimum interval between polling requests to the token
     * endpoint from client applications in seconds in device flow.
     *
     * This is used as the value of the `interval` property in responses
     * from the device authorization endpoint. Must be in between 0 and
     * 65,535.
     */
    public deviceFlowPollingInterval?: number;


    /**
     * The character set for end-user verification codes (`user_code`)
     * for Device Flow.
     */
    @Transform((value: any) => fromJsonValue(value, UserCodeCharset), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public userCodeCharset?: UserCodeCharset;


    /**
     * The length of end-user verification codes (`user_code`) for
     * Device Flow.
     */
    public userCodeLength?: number;


    /**
     * The URI of the pushed authorization request endpoint.
     *
     * This property corresponds to the `pushed_authorization_request_endpoint`
     * metadata defined in [5. Authorization Server Metadata of OAuth
     * 2.0 Pushed Authorization Requests](
     * https://tools.ietf.org/html/draft-lodderstedt-oauth-par-00).
     */
    public pushedAuthReqEndpoint?: string;


    /**
     * The MTLS endpoint aliases.
     *
     * This property corresponds to the `mtls_endpoint_aliases` metadata
     * defined in "5. Metadata for Mutual TLS Endpoint Aliases" of [OAuth
     * 2.0 Mutual TLS Client Authentication and Certificate-Bound Access
     * Tokens](https://datatracker.ietf.org/doc/draft-ietf-oauth-mtls/?include_text=1).
     *
     * The aliases will be embedded in the response from the discovery
     * endpoint like the following.
     *
     * ```json
     * {
     *     ......,
     *     "mtls_endpoint_aliases": {
     *         "token_endpoint":         "https://mtls.example.com/token",
     *         "revocation_endpoint":    "https://mtls.example.com/revo",
     *         "introspection_endpoint": "https://mtls.example.com/introspect"
     *     }
     * }
     * ```
     */
    @Type(() => NamedUri)
    public mtlsEndpointAliases?: NamedUri[];


    /**
     * The supported data types that can be used as values of the "`type`"
     * field in `"authorization_details"`.
     *
     * This property corresponds to the `authorization_data_types_supported`
     * metadata. See "OAuth 2.0 Rich Authorization Requests" (RAR) for
     * details.
     */
    public supportedAuthorizationDataTypes?: string[];


    /**
     * Trust frameworks supported by this service.
     *
     * This corresponds to the `trust_frameworks_supported` [metadata](
     * https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#rfc.section.7).
     */
    public supportedTrustFrameworks?: string[];


    /**
     * Evidence supported by this service.
     *
     * This corresponds to the `evidence_supported` [metadata](
     * https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#rfc.section.7).
     */
    public supportedEvidence?: string[];


    /**
     * Identity documents supported by this service.
     *
     * This corresponds to the `id_documents_supported` [metadata](
     * https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#rfc.section.7).
     */
    public supportedIdentityDocuments?: string[];


    /**
     * Verification methods supported by this service.
     *
     * This corresponds to the `id_documents_verification_methods_supported`
     * [metadata](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#rfc.section.7).
     */
    public supportedVerificationMethods?: string[];


    /**
     * Verified claims supported by this service.
     *
     * This corresponds to the `claims_in_verified_claims_supported`
     * [metadata](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#rfc.section.7).
     */
    public supportedVerifiedClaims?: string[];


    /**
     * The flag indicating whether token requests from public clients
     * without the `client_id` request parameter are allowed when the
     * client can be guessed from `authorization_code` or `refresh_token`.
     *
     * This flag should not be set unless you have special reasons.
     */
    public missingClientIdAllowed?: boolean;
}