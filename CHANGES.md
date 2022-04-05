CHANGES
=======

1.2.6 (2022-04-05)
------------------

- Remove handler spi classes (`spi/*.ts`).


1.2.5 (2022-03-31)
------------------

- Remove handler classes (`handler/*.ts`).

- Some refactorings for utility classes/methods.


1.2.4 (2022-02-22)
------------------

- Add support for API request timeout.

- Fix a bug in `getDefault()` in `AuthleteApiFactory` class.

- Some other bug fixes and refactorings.


1.2.3 (2022-02-16)
------------------

- Update Deno standard library dependency to v0.125.0.


1.2.2 (2020-08-27)
------------------

- Remove unnecessary `import`s from some DTO classes.

- Update readme.


1.2.1 (2020-08-27)
------------------

- Fix & update readme.


1.2.0 (2020-08-11)
------------------

- Add `AccessTokenValidator` class.

- Fix some bugs in DTO classes.

- Add version to imported dependencies.


1.1.2 (2020-07-26)
------------------

- Replace `readFileStr()` with `Deno.readTextFile()` in `authlete_configuration_property.ts`
since `readFileStr()` was removed by https://github.com/denoland/deno/pull/6848.


1.1.1 (2020-07-05)
------------------

- Refactor handlers (`/handler/*.ts`).


1.1.0 (2020-07-02)
------------------

- Add support for the following APIs.

  - /api/auth/introspection API
  - /api/auth/introspection/standard API
  - /api/auth/revocation API
  - /api/auth/userinfo API
  - /api/auth/userinfo/issue API
  - /api/service/configuration API
  - /api/service/jwks API


1.0.0 (2020-06-28)
------------------

- First release.