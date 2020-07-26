CHANGES (日本語)
=======

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