// Copyright (C) 2020-2022 Authlete, Inc.
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
import { ApplicationType } from '../type/application_type.ts';
import { fromJsonValue, toJsonValue } from '../type/base_extended_enum.ts';
import { ClientAuthMethod } from '../type/client_auth_method.ts';
import { ClientType } from '../type/client_type.ts';
import { DeliveryMode } from '../type/delivery_mode.ts';
import { GrantType } from '../type/grant_type.ts';
import { JWEAlg } from '../type/jwe_alg.ts';
import { JWEEnc } from '../type/jwe_enc.ts';
import { JWSAlg } from '../type/jws_alg.ts';
import { ResponseType } from '../type/response_type.ts';
import { SubjectType } from '../type/subject_type.ts';
import { ClientExtension } from './client_extension.ts';
import { Pair } from './pair.ts';
import { TaggedValue } from './tagged_value.ts';
const { Type, Transform } = ct;


/**
 * Information about a client application.
 *
 * Some properties correspond to the ones listed in [Client Metadata](
 * https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata)
 * in [OpenID Connect Dynamic Client Registration 1.0](
 * https://openid.net/specs/openid-connect-registration-1_0.html).
 */
export class Client
{
    /**
     * Client number. The sequential number of the client application.
     * The value of this property is assigned by Authlete. Even if the
     * property has a value in a request to Authlete `/client/create`
     * API or `/client/update` API, it is ignored.
     */
    public number!: number;


    /**
     * The sequential number of the service of the client application.
     * The value of this property is assigned by Authlete. Even if the
     * property has a value in a request to Authlete `/client/create`
     * API or `/client/update` API, it is ignored.
     */
    public serviceNumber!: number;


    /**
     * The developer of the client application. It consists of at most
     * 100 ASCII letters.
     */
    public developer?: string;


    /**
     * Client ID. The value of this property is assigned by Authlete.
     * The value of this property is assigned by Authlete. Even if the
     * property has a value in a request to Authlete `/client/create`
     * API or `/client/update` API, it is ignored.
     */
    public clientId!: number;


    /**
     * The alias of the client ID. Note that the client ID alias feature
     * works only when this client's `clientIdAliasEnabled` property
     * is `true` AND the service's `clientIdAliasEnabled` property is
     * also `true`.
     */
    public clientIdAlias?: string;


    /**
     * The flag to indicate whether the client ID alias is enabled or
     * not. `Service` object also has `clientIdAliasEnabled` property.
     * If the service's `clientIdAliasEnabled` property is `false`, the
     * client ID alias feature does not work even if this client's
     * `clientIdAliasEnabled` property is `true`.
     */
    public clientIdAliasEnabled!: boolean;


    /**
     * The client secret. A random 512-bit value encoded by [base64url](
     * http://tools.ietf.org/html/rfc4648#section-5) (86 letters). The
     * value of this property is assigned by Authlete. Even if the property
     * has a value in a request to Authlete `/client/create`
     * API or `/client/update` API, it is ignored.
     *
     * Note that Authlete issues a client secret even to a `public` client
     * application, but the client application should not use the client
     * secret unless it changes its client type to `confidential`. That
     * is, a public client application should behave as if it had not
     * been issued a client secret. To be specific, a token request from
     * a public client of Authlete should not come along with a client
     * secret although [RFC 6749, 3.2.1. Client Authentication](
     * https://tools.ietf.org/html/rfc6749#section-3.2.1) says as follows.
     *
     * > Confidential clients or other clients issued client credentials
     * MUST authenticate with the authorization server as described in
     * Section 2.3 when making requests to the token endpoint.
     */
    public clientSecret?: string;


    /**
     * The client type. See [RFC 6749, 2.1. Client Types](
     * https://tools.ietf.org/html/rfc6749#section-2.1) for details.
     *
     * If `clientType` is not set in a request to Authlete `/client/create`
     * API or `/client/update` API, it is set to `ClientType.PUBLIC`.
     */
    @Transform((value: any) => fromJsonValue(value, ClientType), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public clientType?: ClientType;


    /**
     * Redirect URIs that the client application uses to receive a response
     * from the authorization endpoint. Requirements for a redirect URI
     * are as follows.
     *
     * **Requirements by RFC 6749**
     *
     * (From [RFC 6749, 3.1.2. Redirection Endpoint](https://tools.ietf.org/html/rfc6749#section-3.1.2))
     *
     * - Must be an absolute URI.
     * - Must not have a fragment component.
     *
     * **Requirements by OpenID Connect**
     *
     * (From [OpenID Connect Dynamic Client Registration 1.0, 2. Client
     * Metadata, application_type](
     * https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata))
     *
     * - The scheme of the redirect URI used for Implicit Grant by a
     * client application whose application type is "web" must be `https`.
     * This is checked at runtime by Authlete.
     *
     * - The hostname of the redirect URI used for Implicit Grant by a
     * client application whose application type is "web" must not be
     * `localhost`. This is checked at runtime by Authlete.
     *
     * - The scheme of the redirect URI used by a client application
     * whose application type is "native" must be either (1) a custom
     * scheme or (2) http, which is allowed only when the hostname part
     * is `localhost`. This is checked at runtime by Authlete.
     *
     * **Requirements by Authlete**
     *
     * - Must consist of printable ASCII letters only.
     * - Must not exceed 200 letters.
     *
     * Note that Authlete allows the application type not to be set.
     * In other words, a client application does not have to choose
     * `ApplicationType.WEB` or `ApplicationType.NATIVE` as its `applicationType`.
     * If the `applicationType` is not set, the requirements by OpenID
     * Connect are not checked at runtime.
     *
     * An authorization request from a client application which has not
     * registered any redirect URI fails unless at least all the following
     * conditions are satisfied.
     *
     * - The `clientType` of the client application is `ClientType.CONFIDENTIAL`.
     * - The value of response_type request parameter is `code`.
     * - The authorization request has the `redirect_uri` request parameter.
     * - The value of `scope` request parameter does not contain `openid`.
     *
     * RFC 6749 allows partial match of redirect URI under some conditions
     * (see RFC 6749, 3.1.2.2. Registration Requirements for details),
     * but OpenID Connect requires exact match.
     */
    public redirectUris?: string[];


    /**
     * A string array of response types which the client application
     * declares that it will restrict itself to using.
     *
     * This property corresponds to `response_types` in [OpenID Connect
     * Dynamic Client Registration 1.0, 2. Client Metadata](
     * https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     *
     * If `responseTypes` in a request to Authlete `/client/create` API
     * or `/client/update` API is not set, it is set to an array containing
     * just `ResponseType.CODE`.
     */
    @Transform((value: any) => fromJsonValue(value, ResponseType), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public responseTypes?: ResponseType[];


    /**
     * A string array of grant types which the client application declares
     * that it will restrict itself to using.
     *
     * This property corresponds to `grant_types` in [OpenID Connect
     * Dynamic Client Registration 1.0, 2. Client Metadata](
     * https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     *
     * If `grantTypes` in a request to Authlete `/client/create` API
     * or `/client/update` API is not set, it is set to an array containing
     * just `GrantType.AUTHORIZATION_CODE`.
     */
    @Transform((value: any) => fromJsonValue(value, GrantType), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public grantTypes?: GrantType[];


    /**
     * The application type. The value of this property affects the
     * validation steps for a redirect URI. See the description about
     * `redirectUris` property above.
     *
     * This property corresponds to `application_type` in [OpenID Connect
     * Dynamic Client Registration 1.0, 2. Client Metadata](
     * https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    @Transform((value: any) => fromJsonValue(value, ApplicationType), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public applicationType?: ApplicationType;


    /**
     * An array of email addresses of people responsible for the client
     * application.
     *
     * This property corresponds to `contacts` in [OpenID Connect Dynamic
     * Client Registration 1.0, 2. Client Metadata](
     * https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    public contacts?: string[];


    /**
     * The name of the client application. This property corresponds to
     * `client_name` in [OpenID Connect Dynamic Client Registration 1.0,
     * 2\. Client Metadata](
     * https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     *
     * If `clientName` in a request to Authlete `/client/create` API or
     * `/client/update` API is not set, this property is set to the value
     * of `clientId`.
     */
    public clientName?: string;


    /**
     * Client names with language tags. If the client application has
     * different names for different languages, this property can be
     * used to register the names.
     */
    @Type(() => TaggedValue)
    public clientNames?: TaggedValue[];


    /**
     * The URL pointing to the logo image of the client application.
     *
     * This property corresponds to `logo_uri` in [OpenID Connect
     * Dynamic Client Registration 1.0, 2. Client Metadata](
     * https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    public logoUri?: string;


    /**
     * Logo image URLs with language tags. If the client application has
     * different logo images for different languages, this property can
     * be used to register URLs of the images.
     */
    @Type(() => TaggedValue)
    public logoUris?: TaggedValue[];


    /**
     * The URL pointing to the home page of the client application.
     *
     * This property corresponds to `client_uri` in [OpenID Connect
     * Dynamic Client Registration 1.0, 2. Client Metadata](
     * https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    public clientUri?: string;


    /**
     * Home page URLs with language tags. If the client application has
     * different home pages for different languages, this property can
     * be used to register the URLs.
     */
    @Type(() => TaggedValue)
    public clientUris?: TaggedValue[];


    /**
     * The URL pointing to the page which describes the policy as to
     * how end-users' profile data are used. The URL must consist of
     * printable ASCII letters only and its length must not exceed 200.
     *
     * This property corresponds to `policy_uri` in [OpenID Connect
     * Dynamic Client Registration 1.0, 2. Client Metadata](
     * https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    public policyUri?: string;


    /**
     * URLs of policy pages with language tags. If the client application
     * has different policy pages for different languages, this property
     * can be used to register the URLs.
     */
    @Type(() => TaggedValue)
    public policyUris?: TaggedValue[];


    /**
     * The URL pointing to the 'Terms Of Service' page.
     *
     * This property corresponds to `tos_uri` in [OpenID Connect Dynamic
     * Client Registration 1.0, 2. Client Metadata](
     * https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).s
     */
    public tosUri?: string;


    /**
     * URLs of 'Terms Of Service' pages with language tags. If the client
     * application has different 'Terms Of Service' pages for different
     * languages, this property can be used to register the URLs.
     */
    @Type(() => TaggedValue)
    public tosUris?: TaggedValue[];


    /**
     * The URL pointing to the JWK Set of the client application. The
     * format of the content pointed to by the URL is described in '[JSON
     * Web Key (JWK)](http://tools.ietf.org/html/draft-ietf-jose-json-web-key
     * ), 5. JSON Web Key Set (JWK Set) Format'.
     *
     * If the client application requests encryption for ID tokens (from
     * the `authorization/token/userinfo` endpoints) and/or signs request
     * objects, it must make available its JWK Set containing public keys
     * for the encryption and/or the signature at the URL of `jwksUri`.
     * The service (Authlete) fetches the JWK Set from the URL as necessary.
     *
     * OpenID Connect Dynamic Client Registration 1.0 says that `jwks`
     * must not be used when the client can use `jwks_uri`, but Authlete
     * allows both properties to be registered at the same time. However,
     * Authlete does not use the content of `jwks` when `jwksUri` is registered.
     *
     * This property corresponds to `jwks_uri` in [OpenID Connect Dynamic
     * Client Registration 1.0, 2. Client Metadata](
     * https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    public jwksUri?: string;


    /**
     * JSON Web Key Set. The content of the JWK Set of the client application.
     * The format is described in '[JSON Web Key (JWK)](
     * http://tools.ietf.org/html/draft-ietf-jose-json-web-key), 5. JSON
     * Web Key Set (JWK Set) Format'.
     *
     * OpenID Connect Dynamic Client Registration 1.0 says that `jwks`
     * must not be used when the client can use `jwks_uri`, but Authlete
     * allows both properties to be registered at the same time. However,
     * Authlete does not use the content of `jwks` when `jwksUri` is
     * registered.
     *
     * This property corresponds to `jwks` in [OpenID Connect Dynamic
     * Client Registration 1.0, 2. Client Metadata](
     * https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    public jwks?: string;


    /**
     * The sector identifier host component as derived from either the
     * `sector_identifier_uri` or the registered `redirect_uri`. If no
     * `sector_identifier_uri` is registered and multiple `redirect_uri`s
     * are also registered, the property is not set.
     */
    public derivedSectorIdentifier?: string;


    /**
     * The sector identifier which is a URL starting with https. This
     * URL is used by the service to calculate pairwise subject values.
     * See [OpenID Connect Core 1.0, 8.1. Pairwise Identifier Algorithm](
     * https://openid.net/specs/openid-connect-core-1_0.html#PairwiseAlg).
     *
     * This property corresponds to `sector_identifier_uri` in [OpenID
     * Connect Dynamic Client Registration 1.0, 2. Client Metadata](
     * https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    public sectorIdentifierUri?: string;


    /**
     * The subject type that the client application requests. Details
     * about the subject type are described in [OpenID Connect Core 1.0
     * , 8. Subject Identifier Types](
     * https://openid.net/specs/openid-connect-core-1_0.html#SubjectIDTypes).
     *
     * This property corresponds to `subject_type` in [OpenID Connect
     * Dynamic Client Registration 1.0, 2. Client Metadata](
     * https://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    @Transform((value: any) => fromJsonValue(value, SubjectType), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public subjectType?: SubjectType;


    /**
     * The value of `alg` header parameter of JWS that the client application
     * requires the service to use for signing an [ID token](
     * http://openid.net/specs/openid-connect-core-1_0.html#IDToken).
     *
     * When `JWSAlg.NONE` may be specified, the client application cannot
     * obtain an ID token from the service.
     *
     * This property corresponds to `id_token_signed_response_alg` in
     * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](
     * http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    @Transform((value: any) => fromJsonValue(value, JWSAlg), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public idTokenSignAlg?: JWSAlg;


    /**
     * The value of `alg` header parameter of JWE that the client application
     * requires the service to use for encrypting an [ID token](
     * http://openid.net/specs/openid-connect-core-1_0.html#IDToken).
     *
     * This property corresponds to `id_token_encrypted_response_alg`
     * in [OpenID Connect Dynamic Client Registration 1.0, 2. Client
     * Metadata](http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    @Transform((value: any) => fromJsonValue(value, JWEAlg), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public idTokenEncryptionAlg?: JWEAlg;


    /**
     * The value of `enc` header parameter of JWE that the client application
     * requires the service to use for encrypting an [ID token](
     * http://openid.net/specs/openid-connect-core-1_0.html#IDToken).
     *
     * This property corresponds to `id_token_encrypted_response_enc`
     * in [OpenID Connect Dynamic Client Registration 1.0, 2. Client
     * Metadata](http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    @Transform((value: any) => fromJsonValue(value, JWEEnc), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public idTokenEncryptionEnc?: JWEEnc;


    /**
     * The value of `alg` header parameter of JWS that the client application
     * requires the service to use for signing the [JWT](
     * http://tools.ietf.org/html/draft-ietf-oauth-json-web-token) returned
     * from the [user info endpoint](http://openid.net/specs/openid-connect-core-1_0.html#UserInfo).
     *
     * If both `userInfoSignAlg` and `userInfoEncryptionAlg` are not set,
     * the format of the response from the user info endpoint is a plain
     * JSON (not JWT). Note that "not setting this property" and "setting
     * this property to `JWSAlg.NONE`" are different.
     *
     * This property corresponds to `userinfo_signed_response_alg` in
     * [OpenID Connect Dynamic Client Registration 1.0, 2. Client
     * Metadata](http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    @Transform((value: any) => fromJsonValue(value, JWSAlg), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public userInfoSignAlg?: JWSAlg;


    /**
     * The value of `alg` header parameter of JWE that the client application
     * requires the service to use for encrypting the [JWT](
     * http://tools.ietf.org/html/draft-ietf-oauth-json-web-token) returned
     * from the [user info endpoint](http://openid.net/specs/openid-connect-core-1_0.html#UserInfo).
     *
     * If the value of this property indicates an asymmetric encryption
     * algorithm, the client application must make available its JWK Set
     * which contains a public key for encryption at the URL referred
     * to by its `jwksUri` configuration property.
     *
     * If both `userInfoSignAlg` and `userInfoEncryptionAlg` are set,
     * the format of the response from the user info endpoint is a plain
     * JSON (not JWT).
     *
     * This property corresponds to `userinfo_encrypted_response_alg`
     * in [OpenID Connect Dynamic Client Registration 1.0, 2. Client
     * Metadata](http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    @Transform((value: any) => fromJsonValue(value, JWEAlg), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public userInfoEncryptionAlg?: JWEAlg;


    /**
     * The value of `enc` header parameter of JWE that the client application
     * requires the service to use for encrypting the [JWT](
     * http://tools.ietf.org/html/draft-ietf-oauth-json-web-token) returned
     * from the [user info endpoint](http://openid.net/specs/openid-connect-core-1_0.html#UserInfo).
     *
     * This property corresponds to `userinfo_encrypted_response_enc`
     * in [OpenID Connect Dynamic Client Registration 1.0, 2. Client
     * Metadata](http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    @Transform((value: any) => fromJsonValue(value, JWEEnc), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public userInfoEncryptionEnc?: JWEEnc;


    /**
     * The value of `alg` header parameter of JWS that the client application
     * uses for signing a [request object](http://openid.net/specs/openid-connect-core-1_0.html#JWTRequests).
     *
     * If this property is set, request objects sent from the client
     * application must be signed using the algorithm. Request objects
     * signed by other algorithms are rejected. Note that "not setting
     * this property" and "setting this property to `JWSAlg.NONE`" are
     * different.
     *
     * If the value of this property indicates an asymmetric signing
     * algorithm, the client application must make available its JWK Set
     * which contains a public key for the service to verify the signature
     * of the request object at the URL referred to by its `jwksUri`
     * configuration property.
     *
     * This property corresponds to `request_object_signing_alg` in
     * [OpenID Connect Dynamic Client Registration 1.0, 2. Client Metadata](
     * http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    @Transform((value: any) => fromJsonValue(value, JWSAlg), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public requestSignAlg?: JWSAlg;


    /**
     * The value of `alg` header parameter of JWE that the client application
     * uses for encrypting a [request object](
     * http://openid.net/specs/openid-connect-core-1_0.html#JWTRequests).
     *
     * Regardless of whether this property is set or not, the client
     * application may and may not encrypt a request object. Furthermore,
     * the client application may use other supported encryption algorithms.
     *
     * This property corresponds to `request_object_encryption_alg` in
     * [OpenID Connect Dynamic Client Registration 1.0, 2. Client
     * Metadata](http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    @Transform((value: any) => fromJsonValue(value, JWEAlg), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public requestEncryptionAlg?: JWEAlg;


    /**
     * The value of `enc` header parameter of JWE that the client application
     * uses for encrypting a [request object](
     * http://openid.net/specs/openid-connect-core-1_0.html#JWTRequests).
     *
     * This property corresponds to `request_object_encryption_enc` in
     * [OpenID Connect Dynamic Client Registration 1.0, 2. Client
     * Metadata](http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    @Transform((value: any) => fromJsonValue(value, JWEEnc), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public requestEncryptionEnc?: JWEEnc;


    /**
     * The client authentication method that the client application
     * declares that it uses at the token endpoint.
     *
     * This property corresponds to `token_endpoint_auth_method` in
     * [OpenID Connect Dynamic Client Registration 1.0, 2. Client
     * Metadata](http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    @Transform((value: any) => fromJsonValue(value, ClientAuthMethod), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public tokenAuthMethod?: ClientAuthMethod;


    /**
     * The value of `alg` header parameter of JWS which is used for
     * client authentication at the token endpoint. If this property
     * is set, the client application must use the algorithm.
     *
     * This property is used only for the two JWT-based client authentication,
     * namely, `ClientAuthMethod.PRIVATE_KEY_JWT` and `ClientAuthMethod.CLIENT_SECRET_JWT`
     * (see the description of the `tokenAuthMethod` property).
     *
     * This property corresponds to `token_endpoint_auth_signing_alg`
     * in [OpenID Connect Dynamic Client Registration 1.0, 2. Client
     * Metadata](http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    @Transform((value: any) => fromJsonValue(value, JWSAlg), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public tokenAuthSignAlg?: JWSAlg;


    /**
     * The default maximum authentication age in seconds. This value is
     * used when an authorization request from the client application
     * does not have `max_age` request parameter.
     *
     * This property corresponds to `default_max_age` in [OpenID Connect
     * Dynamic Client Registration 1.0, 2. Client Metadata](
     * http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    public defaultMaxAge!: number;


    /**
     * The default ACRs (Authentication Context Class References). This
     * value is used when an authorization request from the client application
     * has neither `acr_values` request parameter nor `acr` claim in
     * `claims` request parameter.
     */
    public defaultAcrs?: string[];


    /**
     * `true` if the client application requires the `auth_time` claim
     * to be in an ID token. Regardless of the value of this property,
     * Authlete embeds the `auth_time` claim when `authTime` parameter
     * in the `/auth/authorization/issue` request is not 0 and does not
     * do it when `authTime` is `0`.
     *
     * This property corresponds to `require_auth_time` in [OpenID Connect
     * Dynamic Client Registration 1.0, 2. Client Metadata](
     * http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    public authTimeRequired!: boolean;


    /**
     * The URL which a third party can use to initiate a login by the
     * client application. The URL must start with `https` and consist
     * of ASCII letters only. Its length must not exceed 200.
     *
     * This property corresponds to `initiate_login_uri` in [OpenID Connect
     * Dynamic Client Registration 1.0, 2. Client Metadata](
     * http://openid.net/specs/openid-connect-registration-1_0.html#ClientMetadata).
     */
    public loginUri?: string;


    /**
     * An array of URLs each of which points to a [request object](
     * http://openid.net/specs/openid-connect-core-1_0.html#JWTRequests).
     *
     * Authlete requires that URLs used as values for `request_uri` request
     * parameter be pre-registered. This `requestUris` property is used
     * for the pre-registration. See [OpenID Connect Core 1.0, 6.2. Passing
     * a Request Object by Reference](
     * http://openid.net/specs/openid-connect-core-1_0.html#RequestUriParameter) for details.
     */
    public requestUris?: string[];


    /**
     * The description about the client application.
     */
    public description?: string;


    /**
     * Descriptions about the client application with language tags.
     */
    @Type(() => TaggedValue)
    public descriptions?: TaggedValue[];


    /**
     * The time at which this client was created. The value is represented
     * as milliseconds since the UNIX epoch (1970-01-01).
     */
    public createdAt!: number;


    /**
     * The time at which this client was last modified. The value is
     * represented as milliseconds since the UNIX epoch (1970-01-01).
     */
    public modifiedAt!: number;


    /**
     * The extended information about this client.
     */
    @Type(() => ClientExtension)
    public extension?: ClientExtension;


    /**
     * The string representation of the expected subject distinguished
     * name of the certificate this client will use in mutual TLS
     * authentication.
     *
     * See `tls_client_auth_subject_dn` in _"2.3. Dynamic Client Registration"_
     * in _"Mutual TLS Profiles for OAuth Clients"_ for details.
     */
    public tlsClientAuthSubjectDn?: string;


    /**
     * The string representation of the expected DNS subject alternative
     * name of the certificate this client will use in mutual TLS
     * authentication.
     *
     * See `tls_client_auth_san_dns` in _"2.3. Dynamic Client Registration"_
     * in _"Mutual TLS Profiles for OAuth Clients"_ for details.
     */
    public tlsClientAuthSanDns?: string;


    /**
     * The string representation of the expected URI subject alternative
     * name of the certificate this client will use in mutual TLS
     * authentication.
     *
     * See `tls_client_auth_san_uri` in _"2.3. Dynamic Client Registration"_
     * in _"Mutual TLS Profiles for OAuth Clients"_ for details.
     */
    public tlsClientAuthSanUri?: string;


    /**
     * The string representation of the expected IP address subject
     * alternative name of the certificate this client will use in
     * mutual TLS authentication.
     *
     * See `tls_client_auth_san_ip` in _"2.3. Dynamic Client Registration"_
     * in _"Mutual TLS Profiles for OAuth Clients"_ for details.
     */
    public tlsClientAuthSanIp?: string;


    /**
     * The string representation of the expected email address subject
     * alternative name of the certificate this client will use in mutual
     * TLS authentication.
     *
     * See `tls_client_auth_san_email` in _"2.3. Dynamic Client Registration"_
     * in _"Mutual TLS Profiles for OAuth Clients"_ for details.
     */
    public tlsClientAuthSanEmail?: string;


    /**
     * The flag which indicates whether this client use TLS client
     * certificate bound access tokens.
     */
    public tlsClientCertificateBoundAccessTokens!: boolean;


    /**
     * The key ID of a JWK containing a self-signed certificate of this
     * client.
     */
    public selfSignedCertificateKeyId?: string;


    /**
     * The unique identifier string assigned by the client developer or
     * software publisher used by registration endpoints to identify
     * the client software to be dynamically registered.
     *
     * This property corresponds to the `software_id` metadata defined
     * in [2. Client Metadata](https://tools.ietf.org/html/rfc7591#section-2)
     * of [RFC 7591](https://tools.ietf.org/html/rfc7591) (OAuth 2.0
     * Dynamic Client Registration Protocol).
     */
    public softwareId?: string;


    /**
     * The version identifier string for the client software identified
     * by the software ID.
     *
     * This property corresponds to the `software_version` metadata
     * defined in [2. Client Metadata](https://tools.ietf.org/html/rfc7591#section-2)
     * of [RFC 7591](https://tools.ietf.org/html/rfc7591) (OAuth 2.0
     * Dynamic Client Registration Protocol).
     */
    public softwareVersion?: string;


    /**
     * The JWS `alg` algorithm for signing authorization responses.
     *
     * This property corresponds to `authorization_signed_response_alg`
     * in [5. Client Metadata](
     * https://openid.net/specs/openid-financial-api-jarm.html#client-metadata)
     * of [Financial-grade API: JWT Secured Authorization Response Mode
     * for OAuth 2.0 (JARM)](https://openid.net/specs/openid-financial-api-jarm.html).
     */
    @Transform((value: any) => fromJsonValue(value, JWSAlg), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public authorizationSignAlg?: JWSAlg;


    /**
     * The JWE `alg` algorithm for encrypting authorization responses.
     * When `authorizationEncryptionEnc` is set, this property also must
     * be set.
     *
     * This property corresponds to `authorization_encrypted_response_alg`
     * in [5. Client Metadata](https://openid.net/specs/openid-financial-api-jarm.html#client-metadata)
     * of [Financial-grade API: JWT Secured Authorization Response Mode
     * for OAuth 2.0 (JARM)](https://openid.net/specs/openid-financial-api-jarm.html).
     */
    @Transform((value: any) => fromJsonValue(value, JWEAlg), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public authorizationEncryptionAlg?: JWEAlg;


    /**
     * The JWE `enc` algorithm for encrypting authorization responses.
     *
     * This property corresponds to `authorization_encrypted_response_enc`
     * in [5. Client Metadata](https://openid.net/specs/openid-financial-api-jarm.html#client-metadata)
     * of [Financial-grade API: JWT Secured Authorization Response Mode
     * for OAuth 2.0 (JARM)](https://openid.net/specs/openid-financial-api-jarm.html).
     */
    @Transform((value: any) => fromJsonValue(value, JWEEnc), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public authorizationEncryptionEnc?: JWEEnc;


    /**
     * The backchannel token delivery mode.
     *
     * This property corresponds to the `backchannel_token_delivery_mode`
     * metadata. The backchannel token delivery mode is defined in the
     * specification of the CIBA (Client Initiated Backchannel Authentication).
     */
    @Transform((value: any) => fromJsonValue(value, DeliveryMode), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public bcDeliveryMode?: DeliveryMode;


    /**
     * The backchannel client notification endpoint.
     *
     * This property corresponds to the `backchannel_client_notification_endpoint`
     * metadata. The backchannel token delivery mode is defined in the
     * specification of the CIBA (Client Initiated Backchannel Authentication).
     */
    public bcNotificationEndpoint?: string;


    /**
     * The signature algorithm of the request to the backchannel authentication
     * endpoint.
     *
     * This property corresponds to the `backchannel_authentication_request_signing_alg`
     * metadata. The backchannel token delivery mode is defined in the
     * specification of the CIBA (Client Initiated Backchannel Authentication).
     */
    @Transform((value: any) => fromJsonValue(value, JWSAlg), { toClassOnly: true })
    @Transform(toJsonValue, { toPlainOnly: true })
    public bcRequestSignAlg?: JWSAlg;


    /**
     * The boolean flag which indicates whether a user code is required
     * when this client makes a backchannel authentication request.
     *
     * This property corresponds to the `backchannel_user_code_parameter
     * metadata`.
     */
    public bcUserCodeRequired!: boolean;


    /**
     * The flag which indicates whether this client has been registered
     * dynamically.
     */
    public dynamicallyRegistered!: boolean;


    /**
     * The hash of the registration access token for this client.
     */
    public registrationAccessTokenHash?: string;


    /**
     * Authorization details types that this client may use as values
     * of the `type` field in `authorization_details`.
     *
     * This property corresponds to the `authorization_details_types`
     * metadata. See "OAuth 2.0 Rich Authorization Requests" (RAR) for
     * details.
     *
     * Note that the property name was renamed from `authorizationDataTypes`
     * to `authorizationDetailsTypes` to align with the change made by
     * the 5th draft of the RAR specification. The data types that this
     * client may use as values of the `type` field in `authorization_details`.
     */
    public authorizationDetailsTypes?: string[];


    /**
     * The flag indicating whether this client is required to use the
     * pushed authorization request endpoint.
     *
     * This property corresponds to the `require_pushed_authorization_requests`
     * client metadata defined in "OAuth 2.0 Pushed Authorization Requests".
     */
    public parRequired!: boolean;


    /**
     * The flag indicating whether authorization requests from this client
     * are always required to utilize a request object by using either
     * `request` or `request_uri` request parameter.
     *
     * If this flag is `true` and the service's `isTraditionalRequestObjectProcessingApplied`
     * is `false`, authorization requests from this client are processed
     * as if `require_signed_request_object` client metadata of this client
     * is `true`. The metadata is defined in JAR (JWT Secured Authorization
     * Request).
     */
    public requestObjectRequired!: boolean;


    /**
     * Attributes.
     */
    @Type(() => Pair)
    public attributes?: Pair[];


    /**
     * The custom client metadata in JSON format.
     *
     * Standard specifications define client metadata as necessary.
     * The following are such examples.
     *
     * - [OpenID Connect Dynamic Client Registration 1.0](https://openid.net/specs/openid-connect-registration-1_0.html)
     * - [RFC 7591 OAuth 2.0 Dynamic Client Registration Protocol](https://www.rfc-editor.org/rfc/rfc7591.html)
     * - [RFC 8705 OAuth 2.0 Mutual-TLS Client Authentication and Certificate-Bound Access Tokens](https://www.rfc-editor.org/rfc/rfc8705.html)
     * - [OpenID Connect Client-Initiated Backchannel Authentication Flow - Core 1.0<](https://openid.net/specs/openid-client-initiated-backchannel-authentication-core-1_0.html)
     * - [The OAuth 2.0 Authorization Framework: JWT Secured Authorization Request (JAR)](https://datatracker.ietf.org/doc/draft-ietf-oauth-jwsreq/)
     * - [Financial-grade API: JWT Secured Authorization Response Mode for OAuth 2.0 (JARM)](https://openid.net/specs/openid-financial-api-jarm.html)
     * - [OAuth 2.0 Pushed Authorization Requests (PAR)](https://datatracker.ietf.org/doc/draft-ietf-oauth-par/)
     * - [OAuth 2.0 Rich Authorization Requests (RAR)](https://datatracker.ietf.org/doc/draft-ietf-oauth-rar/)
     *
     * Standard client metadata included in Client Registration Request
     * and Client Update Request (cf. [OIDC DynReg](https://openid.net/specs/openid-connect-registration-1_0.html),
     * [RFC 7591](https://www.rfc-editor.org/rfc/rfc7591.html) and [RFC
     * 7592](https://www.rfc-editor.org/rfc/rfc7592.html)) are, if supported
     * by Authlete, set to corresponding properties of the client application.
     * For example, the value of the `client_name` client metadata in
     * Client Registration/Update Request is set to the `clientName` property.
     * On the other hand, unrecognized client metadata are discarded.
     *
     * By listing up custom client metadata in advance by using the
     * `supportedCustomClientMetadata` property of `Service`, Authlete
     * can recognize them and stores their values into the database.
     * The stored custom client metadata values can be referenced by this
     * method.
     */
    public customMetadata?: string;


    /**
     * The flag indicating whether encryption of request object is required
     * when the request object is passed through the front channel.
     *
     * This flag does not affect the processing of request objects at the
     * Pushed Authorization Request Endpoint, which is defined in [OAuth
     * 2.0 Pushed Authorization Requests](https://datatracker.ietf.org/doc/draft-ietf-oauth-par/).
     * Unecrypted request objects are accepted at the endpoint even if
     * this flag is `true`.
     *
     * This flag does not indicate whether a request object is always
     * required. There is a different flag, `requestObjectRequired`, for
     * the purpose. See the description of `isRequestObjectRequired` for
     * details.
     *
     * Even if this flag is `false`, encryption of request object is
     * required if the `Service.frontChannelRequestObjectEncryptionRequired`
     * flag is `true`.
     */
    public frontChannelRequestObjectEncryptionRequired!: boolean;


    /**
     * The flag indicating whether the JWE `alg` of encrypted request
     * object must match the `request_object_encryption_alg` client metadata.
     *
     * The `request_object_encryption_alg` client metadata itself is defined
     * in [OpenID Connect Dynamic Client Registration 1.0](https://openid.net/specs/openid-connect-registration-1_0.html)
     * as follows.
     *
     * > `request_object_encryption_alg`
     *
     * > OPTIONAL. JWE [JWE] `alg` algorithm [JWA] the RP is declaring that
     * it may use for encrypting Request Objects sent to the OP. This
     * parameter SHOULD be included when symmetric encryption will be
     * used, since this signals to the OP that a `client_secret` value
     * needs to be returned from which the symmetric key will be derived,
     * that might not otherwise be returned. The RP MAY still use other
     * supported encryption algorithms or send unencrypted Request Objects,
     * even when this parameter is present. If both signing and encryption
     * are requested, the Request Object will be signed then encrypted,
     * with the result being a Nested JWT, as defined in [JWT]. The default,
     * if omitted, is that the RP is not declaring whether it might encrypt
     * any Request Objects.
     *
     * The point here is _"The RP MAY still use other supported encryption
     * algorithms or send unencrypted Request Objects, even when this parameter
     * is present."_
     *
     * The property that represents the client metadata is `requestEncryptionAlg`.
     * See the description of r`equestEncryptionAlg` for details.
     *
     * Even if this flag is `false`, the match is required if the
     * `Service.requestObjectEncryptionAlgMatchRequired` flag is `true`.
     */
    public requestObjectEncryptionAlgMatchRequired!: boolean;


    /**
     * The flag indicating whether the JWE `enc` of encrypted request
     * object must match the `request_object_encryption_enc` client metadata.
     *
     * The `request_object_encryption_enc` client metadata itself is defined
     * in [OpenID Connect Dynamic Client Registration 1.0](https://openid.net/specs/openid-connect-registration-1_0.html)
     * as follows.
     *
     * > `request_object_encryption_enc`
     *
     * > OPTIONAL. JWE `enc` algorithm [JWA] the RP is declaring that it may
     * use for encrypting Request Objects sent to the OP. If `request_object_encryption_alg`
     * is specified, the default for this value is `A128CBC-HS256`. When
     * `request_object_encryption_enc` is included, `request_object_encryption_alg`
     * MUST also be provided.
     *
     * The property that represents the client metadata is `requestEncryptionEnc`.
     * See the description of `requestEncryptionEnc` for details.
     *
     * Even if this flag is `false`, the match is required if the `Service.requestObjectEncryptionEncMatchRequired`
     * flag is `true`.
     */
    public requestObjectEncryptionEncMatchRequired!: boolean;


    /**
     * The digest algorithm that this client requests the server to use
     * when it computes digest values of [external attachments](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html#name-external-attachments),
     * which may be referenced from within ID tokens or userinfo responses
     * (or any place that can have the `verified_claims` claim).
     *
     * Possible values are listed in the [Hash Algorithm Registry](https://www.iana.org/assignments/named-information/named-information.xhtml#hash-alg)
     * of IANA (Internet Assigned Numbers Authority), but the server does
     * not necessarily support all the values there. When this property
     * is omitted, `sha-256` is used as the default algorithm.
     *
     * This property corresponds to the `digest_algorithm` client metadata
     * which was defined by the third implementer's draft of [OpenID Connect
     * for Identity Assurance 1.0](https://openid.net/specs/openid-connect-4-identity-assurance-1_0.html)</a>&quot;.
     *
     * This property is recognized by Authlete 2.3 and newer versions.
     */
    public digestAlgorithm?: string;
}