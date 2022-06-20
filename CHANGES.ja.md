CHANGES (日本語)
=======

1.2.7 (2022-06-21)
------------------

- CIBA サポートを追加。

- Device Flow サポートを追加。

- PAR (Pushed Authorization Request) サポートを追加。

- Hsk クラスを追加。

- いくつかの DTO クラスにパラメーターを追加。


1.2.6 (2022-04-05)
------------------

- ハンドラー用 SPI クラス群 (`spi/*.ts`) を削除。


1.2.5 (2022-03-31)
------------------

- ハンドラークラス群 (`handler/*.ts`) を削除。

- いくつかのユーティリティクラス/メソッド群をリファクタリング。


1.2.4 (2022-02-22)
------------------

- API リクエストのタイムアウト機能を追加。

- `AuthleteApiFactory` クラスの `getDefault()` 内のバグを修正。

- その他、いくつかのバグ修正とリファクタリング。


1.2.3 (2022-02-16)
------------------

- 使用している Deno 標準ライブラリのバージョンを v0.125.0 にアップデート。


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