CHANGES (日本語)
=======

1.2.2 (2020-08-27)
------------------

- いくつかの DTO クラスから不要なインポートを削除。

- readme の更新。


1.2.1 (2020-08-27)
------------------

- readme の修正及び更新。


1.2.0 (2020-08-11)
------------------

- `AccessTokenValidator` クラスを追加。

- DTO クラス群のバグを修正。

- インポートされている依存関係にバージョンを明記するよう修正。


1.1.2 (2020-07-26)
------------------

- `authlete_configuration_property.ts` 内で利用していた `readFileStr()`
が https://github.com/denoland/deno/pull/6848 により廃止されたため、
`Deno.readTextFile()` で代替。


1.1.1 (2020-07-05)
------------------

- ハンドラー群 (`/handler/*.ts`) をリファクタリング。


1.1.0 (2020-07-02)
------------------

- 下記の API へのサポートを追加。

  - /api/auth/introspection API
  - /api/auth/introspection/standard API
  - /api/auth/revocation API
  - /api/auth/userinfo API
  - /api/auth/userinfo/issue API
  - /api/service/configuration API
  - /api/service/jwks API


1.0.0 (2020-06-28)
------------------

- 最初のリリース。