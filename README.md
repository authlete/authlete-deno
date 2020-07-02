Authlete Common Library for Deno
================================

Overview
--------

This is a Deno library for [Authlete Web APIs][AuthleteAPI].

License
-------

  Apache License, Version 2.0

Source Code
-----------

  `https://github.com/authlete/authlete-deno`

Prerequisites
-------------

The followings are the requirements that must be met before you start
using this library.

- You need to have your own account at Authlete. For more details about
account registration, see [this document][AuthleteGettingStarted].

- The `experimentalDecorators` option and the `emitDecoratorMetadata`
option must be set to `true` in your `tsconfig.json`.

- The `deno run` command must be executed with the `--allow-net` option
and the `--allow-read` option.

Quick Usage
-----------

**Step 1**: Import modules.

```ts
import { AuthleteApiFactory } from 'https://github.com/authlete/authlete-deno/raw/master/mod.ts';
```

**Step 2**: Configure and create an `AuthleteApi` instance.

```ts
// Create a configuration object.
// NOTE: Replace the following credentials with yours.
const config = {
    serviceOwnerApiKey:    'YOUR_SERVICE_OWNER_API_KEY',
    serviceOwnerApiSecret: 'YOUR_SERVICE_OWNER_API_SECRET',
    serviceApiKey:         'YOUR_SERVICE_API_KEY',
    serviceApiSecret:      'YOUR_SERVICE_API_SECRET'
};

// Create an AuthleteApi instance with it.
const api = AuthleteApiFactory.create(config);
```

**Step 3**: Invoke methods of the instance to access Authlete APIs.

**Example 1**: Get list of services.

```ts
// Get list of services.
// This calls Authlete '/service/get' API.
const response: ServiceListResponse = await api.getServiceList();

// Output information about each service.
for (const service of response.services)
{
    console.log(service);
}
```

**Example 2**: Create a new client application.

```ts
// Create an instance of Client class.
const request = new Client();

// Set some properties.
request.clientName  = 'My Client';
request.description = 'This is my client.';

// Register the new client application to Authlete.
// This calls Authlete '/client/create' API.
const response: Client = await api.createClient(request);

// Output the information about the created client application.
console.log(response);
```

Description
-----------

#### How To Get AuthleteApi

All the methods to communicate with Authlete Web APIs are gathered in
`AuthleteApi` interface. As an implementation of `AuthleteApi` interface,
this library provides `AuthleteApiImpl` class. The following explains
how to get an instance of `AuthleteApiImpl` class.

**Option 1**: Use the constructor of `AuthleteApiImpl` class.

```ts
// Create a configuration object.
const config: AuthleteConfiguration = { ... };

// Create an instance of AuthleteApiImpl class.
const authleteApi: AuthleteApi = new AuthleteApiImpl(config);
```

**Option 2**: Use `create()` method of `AuthleteApiFactory` class.

```ts
// Create a configuration object.
const config: AuthleteConfiguration = { ... };

// Create an instance of AuthleteApiImpl class.
const authleteApi = await AuthleteApiFactory.create(config);
```

**Option 3**: Use `getDefault()` method of `AuthleteApiFactory` class.

```ts
// Get the default instance of AuthleteApiImpl class.
const authleteApi = await AuthleteApiFactory.getDefault();
```

_NOTE: When you call `getDefault()` method of `AuthleteApiFactory` class
first, it reads the configuration information from `authlete.json` in
the execution directory using `AuthletePropertyConfiguration` class and
then instantiate `AuthleteApiImpl` class with it. The method caches the
created instance in `AuthleteApiFactory` class. This means subsequent
calls to the method just returns the cached instance._

#### AuthleteConfiguration

There are mainly two ways of configuring an `AuthleteApi` instance as
below.

**Option 1**: Use `AuthleteConfiguration` interface.

```ts
// Create a configuration object.
const config: AuthleteConfiguration = {
    baseUrl:               '...',
    serviceOwnerApiKey:    '...',
    serviceOwnerApiSecret: '...',
    serviceApiKey:         '...',
    serviceApiSecret:      '...'
};

// Create an AuthleteApi instance with it.
const api = new AuthleteApiFactory.create(config);
```

**Option 2**: Use `AuthletePropertyConfiguration` class.

If you would like to use a property file to externalize configuration,
you can use `AuthletePropertyConfiguration` class (which is an implementation
of `AuthleteConfiguration` interface). This class provides `create()`
method, which internally reads a property file named `authlete.json` in
the execution directory and create a configuration object based on that.
Here's a usage example.

```ts
// Create a configuration object by reading 'authlete.json'.
const config = await AuthletePropertyConfiguration.create();

// Create an AuthleteApi instance with it.
const api = new AuthleteApiFactory.create(config);
```

Valid keys in the property file (`authlete.json`) are as follows.

| Property Key            | Description                                                       |
|:------------------------|:------------------------------------------------------------------|
| `baseUrl`               | URL of Authlete server (Defaults to https://api.authlete.com/api) |
| `serviceApiKey`         | API key of a service                                              |
| `serviceApiSecret`      | API secret of a service                                           |
| `serviceOwnerApiKey`    | API key of your account                                           |
| `serviceOwnerApiSecret` | API secret of your account                                        |

#### AuthleteApi Method Categories

Methods in `AuthleteApi` interface can be divided into some categories.

  1. Methods for Authorization Endpoint Implementation

  - `authorization(request: AuthorizationRequest)`
  - `authorizationFail(request: AuthorizationFailRequest)`
  - `authorizationIssue(request: AuthorizationIssueRequest)`

  2. Methods for Token Endpoint Implementation

  - `token(request: TokenRequest)`
  - `tokenFail(request: TokenFailRequest)`
  - `tokenIssue(request: TokenIssueRequest)`

  3. Methods for Service Management

  - `createService(service: Service)`
  - `deleteService(serviceApiKey: number)`
  - `getService(serviceApiKey: number)`
  - `getServiceList(start?: number, end?: number)`
  - `updateService(service: Service)`

  4. Methods for Client Application Management

  - `createClient(client: Client)`
  - `deleteClient(clientId: number)`
  - `getClient(clientId: number)`
  - `getClientList(developer?: string, start?: number, end?: number)`
  - `updateClient(client: Client)`

  5. Methods for Access Token Introspection

  - `introspection(request: IntrospectionRequest)`
  - `standardIntrospection(request: StandardIntrospectionRequest)`

  6. Methods for Revocation Endpoint Implementation

  - `revocation(request: RevocationRequest)`

  7. Methods for User Info Endpoint Implementation

  - `userInfo(request: UserInfoRequest)`
  - `userInfoIssue(request: UserInfoIssueRequest)`

  8. Methods for JWK Set Endpoint Implementation

  - `getServiceJwks(pretty: boolean, includePrivateKeys: boolean)`

  9. Methods for OpenID Connect Discovery

  - `getServiceConfiguration(pretty: boolean)`

See Also
--------

- [Authlete][Authlete] - Authlete Home Page
- [deno-fen-oauth-server][AuthleteDenoFenOauthServer] - Authorization Server Implementation

Contact
-------

| Purpose   | Email Address        |
|:----------|:---------------------|
| General   | info@authlete.com    |
| Sales     | sales@authlete.com   |
| PR        | pr@authlete.com      |
| Technical | support@authlete.com |

[Authlete]:                   https://www.authlete.com/
[AuthleteAPI]:                https://docs.authlete.com/
[AuthleteDenoFenOauthServer]: https://github.com/authlete/deno-fen-oauth-server
[AuthleteGettingStarted]:     https://www.authlete.com/developers/getting_started/
[AuthleteOverview]:           https://www.authlete.com/documents/overview
[Fen]:                        https://github.com/fen-land/deno-fen
[OIDC]:                       https://openid.net/connect/
[RFC6749]:                    https://tools.ietf.org/html/rfc6749
