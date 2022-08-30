Authlete Library for Deno
================================

概要
----

[Authlete Web API][AuthleteAPI] のための Deno ライブラリです。

ライセンス
---------

  Apache License, Version 2.0

ソースコード
-----------

  `https://github.com/authlete/authlete-deno`

Deno Land
---------

  `https://deno.land/x/authlete_deno`

前提条件
-------

このライブラリを利用するためには、以下の要件が必須となります。

- Authlete にサインアップ済みであること。詳細は[こちら][AuthleteGettingStarted]をご覧ください。

- `tsconfig.json` ファイル内の `experimentalDecorators` オプションと `emitDecoratorMetadata`
オプションの値を `true` に設定すること。

- `deno run` コマンド実行時に `--allow-net` オプションと `--allow-read` オプションを付与すること。

クイックスタート
---------------

**Step 1**: モジュールをインポート。

```ts
import { AuthleteApiFactory } from 'https://deno.land/x/authlete_deno@v1.2.9/mod.ts';
```

**Step 2**: `AuthleteApi` のインスタンスを初期化。

```ts
// configuration 用のオブジェクトを作成。
// 注意: 以下のクレデンシャルは自身のものに置き換えること。
const config = {
    baseUrl:               'https://api.authlete.com/api',
    serviceOwnerApiKey:    'YOUR_SERVICE_OWNER_API_KEY',
    serviceOwnerApiSecret: 'YOUR_SERVICE_OWNER_API_SECRET',
    serviceApiKey:         'YOUR_SERVICE_API_KEY',
    serviceApiSecret:      'YOUR_SERVICE_API_SECRET',
    timeout:               10000
};

// AuthleteApi のインスタンスを作成。
const api = await AuthleteApiFactory.create(config);
```

**Step 3**: AuthleteApi のメソッドを呼び出して Authlete API にアクセス。

**例 1**: サービス群を取得。

```ts
// サービス群を取得する。
// 以下のコードは Authlete の '/service/get/list' API をコールする。
const response: ServiceListResponse = await api.getServiceList();

// 各サービスの情報を出力。
for (const service of response.services)
{
    console.log(service);
}
```

**例 2**: クライアントアプリケーションを新規作成。

```ts
// Client オブジェクトを新規作成。
const request = new Client();

// いくつかのプロパティを設定。
request.clientName  = 'My Client';
request.description = 'This is my client.';

// 新規クライアントアプリケーションを Authlete 上に登録。
// 以下のコードは Authlete の '/client/create' API をコールする。
const response: Client = await api.createClient(request);

// 作成したクライアントアプリケーションの情報を出力。
console.log(response);
```

説明
----

#### AuthleteApi の取得方法

[Authlete Web API][AuthleteAPI] とやりとりするメソッドは全て `AuthleteApi`
インターフェースに集められています。`AuthleteApi` インターフェースの実装クラスとして、
このライブラリは `AuthleteApiImpl` クラスを提供しています。 `AuthleteApiImpl`
クラスのインスタンスを取得する方法は以下のようになります。

**方法 1**: `AuthleteApiImpl` クラスのコンストラクターを利用する。

```ts
// configuration 用のオブジェクトを作成。
const config: AuthleteConfiguration = { ... };

// AuthleteApiImpl クラスのインスタンスを作成。
const api: AuthleteApi = new AuthleteApiImpl(config);
```

**方法 2**: `AuthleteApiFactory` クラスの `create()` メソッドを利用する。

```ts
// configuration 用のオブジェクトを作成。
const config: AuthleteConfiguration = { ... };

// AuthleteApiImpl クラスのインスタンスを作成。
const api = await AuthleteApiFactory.create(config);
```

**方法 3**: `AuthleteApiFactory` クラスの `getDefault()` メソッドを利用する。

```ts
// AuthleteApiImpl クラスのデフォルトインスタンスを取得。
const api = await AuthleteApiFactory.getDefault();
```

_注意: `AuthleteApiFactory` クラスの `getDefault()` メソッドが初めて呼び出されると、
実行ディレクトリ直下にある設定ファイル (`authlete.json`) がロードされ、その設定内容を用いて
`AuthleteApiImpl` クラスがインスタンス化されます。作成されたインスタンスは内部的にキャッシュされるため、
当該メソッドに対する以降のメソッドコールは、そのキャッシュを返却するのみとなります。_

#### AuthleteConfiguration

`AuthleteApi` インスタンスの設定を行うには、主に二つの方法があります。

**方法 1**: `AuthleteConfiguration` インターフェースを利用する。

```ts
// configuration 用のオブジェクトを作成。
const config: AuthleteConfiguration = {
    baseUrl:               '...',
    serviceOwnerApiKey:    '...',
    serviceOwnerApiSecret: '...',
    serviceApiKey:         '...',
    serviceApiSecret:      '...',
    timeout:               ...
};

// AuthleteApi のインスタンスを作成。
const api = await AuthleteApiFactory.create(config);
```

**方法 2**: `AuthletePropertyConfiguration` クラスを利用する。

外部ファイルを用いて設定を行いたい場合は、`AuthleteConfiguration`
インターフェースの実装クラスである `AuthletePropertyConfiguration`
クラスを利用してください。このクラスの `create()` メソッドは、実行ディレクトリ直下にある設定ファイル
(`authlete.json`) をロードし、その内容に基づいて configuration 用のオブジェクトを作成します。
以下のその例です。

```ts
// 'authlete.json' をロードして、configuration 用のオブジェクトを作成。
const config = await AuthletePropertyConfiguration.create();

// AuthleteApi のインスタンスを作成。
const api = await AuthleteApiFactory.create(config);
```

設定ファイル (`authlete.json`) 内で有効なプロパティーキーとその意味は次のとおりです。

| プロパティーキー         | 説明                                                                   |
|:------------------------|:----------------------------------------------------------------------|
| `baseUrl`               | Authlete サーバーの URL。デフォルト値は `https://api.authlete.com/api`。|
| `serviceApiKey`         | サービスの API キー。                                                  |
| `serviceApiSecret`      | サービスの API シークレット。                                           |
| `serviceOwnerApiKey`    | あなたのアカウントの API キー。                                         |
| `serviceOwnerApiSecret` | あなたのアカウントの API シークレット。                                  |
| `timeout`               | API リクエストのタイムアウト値（ミリ秒）。デフォルト値は `5000`。          |

#### AuthleteApi メソッドのカテゴリー

`AuthleteApi` インターフェースのメソッド群は幾つかのカテゴリーに分けることができます。

  1. 認可エンドポイント実装のためのメソッド群

  - `authorization(AuthorizationRequest request)`
  - `authorizationFail(AuthorizationFailRequest request)`
  - `authorizationIssue(AuthorizationIssueRequest request)`

  2. トークンエンドポイント実装のためのメソッド群

  - `token(TokenRequest request)`
  - `tokenFail(TokenFailRequest request)`
  - `tokenIssue(TokenIssueRequest request)`

  3. サービス管理のためのメソッド群

  - `createService(service: Service)`
  - `deleteService(serviceApiKey: number)`
  - `getService(serviceApiKey: number)`
  - `getServiceList(start?: number, end?: number)`
  - `updateService(service: Service)`

  4. クライアントアプリケーション管理のためのメソッド群

  - `createClient(client: Client)`
  - `deleteClient(clientId: number)`
  - `getClient(clientId: number)`
  - `getClientList(developer?: string, start?: number, end?: number)`
  - `updateClient(client: Client)`

  5. アクセストークンの情報取得のためのメソッド群

  - `introspection(request: IntrospectionRequest)`
  - `standardIntrospection(request: StandardIntrospectionRequest)`

  6. アクセストークン取り消しエンドポイント実装のためのメソッド群

  - `revocation(request: RevocationRequest)`

  7. ユーザー情報エンドポイント実装のためのメソッド群

  - `userInfo(request: UserInfoRequest)`
  - `userInfoIssue(request: UserInfoIssueRequest)`

  8. JWK セットエンドポイント実装のためのメソッド群

  - `getServiceJwks(pretty: boolean, includePrivateKeys: boolean)`

  9. OpenID Connect Discovery のためのメソッド群

  - `getServiceConfiguration(pretty: boolean)`

  10. CIBA (Client Initiated Backchannel Authentication) のためのメソッド群

  - `backchannelAuthentication(request)`
  - `backchannelAuthenticationIssue(request)`
  - `backchannelAuthenticationFail(request)`
  - `backchannelAuthenticationComplete(request)`

  11. Device Flow のためのメソッド群

  - `deviceAuthorization(request)`
  - `deviceComplete(request)`
  - `deviceVerification(request)`

  12. PAR (Pushed Authorization Request) のためのメソッド群

  - `pushAuthorizationRequest(request)`

リリース手順
--------

#### 1. ドキュメント更新

`README.md` と `README.md.ja`、`CHANGE.md` と `CHANGE.md.ja` を適宜更新します。

#### 2. ライブラリ公開

[Github のリリースページ][GithubReleasePage] 上で新しいバージョンのライブラリを
リリースします。（Github のリリース機能の詳細については、[こちらのページ][GithubManagingRelease]
ご覧ください。）

Github 上でリリースを行うことにより webhook がトリガーされ、自動的に新規バージョンのライブラリが
[deno.land/x][DenoLandX] へと公開されます。

その他の情報
------------

- [Authlete][Authlete] - Authlete ホームページ
- [authlete-deno-oak][AuthleteDenoOak] - oak 用 Authlete Deno ライブラリ
- [deno-oak-oauth-server][DenoOakOauthServer] - 認可サーバー実装
- [deno-oak-resource-server][DenoOakResourceServer] - リソースサーバー実装

コンタクト
----------

| 目的 | メールアドレス       |
|:-----|:---------------------|
| 一般 | info@authlete.com    |
| 営業 | sales@authlete.com   |
| 広報 | pr@authlete.com      |
| 技術 | support@authlete.com |

[Authlete]:               https://www.authlete.com/
[AuthleteAPI]:            https://docs.authlete.com/
[AuthleteDenoOak]:        https://github.com/authlete/authlete-deno-oak
[AuthleteGettingStarted]: https://www.authlete.com/developers/getting_started/
[AuthleteOverview]:       https://www.authlete.com/documents/overview
[DenoLandX]:              https://deno.land/x
[DenoOakOauthServer]:     https://github.com/authlete/deno-oak-oauth-server
[DenoOakResourceServer]:  https://github.com/authlete/deno-oak-resource-server
[GithubManagingRelease]:  https://docs.github.com/en/github/administering-a-repository/managing-releases-in-a-repository
[GithubReleasePage]:      https://github.com/authlete/authlete-deno/releases
[Oak]:                    https://github.com/oakserver/oak
[OIDC]:                   https://openid.net/connect/
[RFC6749]:                https://tools.ietf.org/html/rfc6749