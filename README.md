# [Koa HTML Minifier][repo]

Middleware that minifies your HTML responses using [html-minifier-terser][html-minifier-terser-repo].
It uses `html-minifier-terser`'s default options which are all turned off by default,
so you __have__ to set the options otherwise it's not going to do anything.

[![NPM version][npm-img]][npm-url]
[![NPM Downloads][downloads-image]][npm-url]
[![Build status][travis-img]][travis-url]
[![Test coverage][coveralls-img]][coveralls-url]
[![License][license-img]][license-url]

## Install

```bash
# npm ..
npm i koa-html-minifier
# yarn ..
yarn add koa-html-minifier
```

## API

```js
// do compression stuff first
app.use(require('koa-compress')());

// then use this minifier
app.use(require('koa-html-minifier')({
  collapseWhitespace: true
}));
```

### Options

See: https://github.com/DanielRuf/html-minifier-terser#minification-comparison

## Contributors

| Name              | Website                           |
| ----------------- | --------------------------------- |
| **Jonathan Ong**  | <http://jongleberry.com>          |
| **Imed Jaberi**   | <https://www.3imed-jaberi.com/>   |
| **João Carmona**  |                                   |


[npm-img]: https://img.shields.io/npm/v/@koa/html-minifier.svg?style=flat-square
[npm-url]: https://npmjs.org/package/koa-html-minifier
[travis-img]: https://img.shields.io/travis/koajs/html-minifier.svg?style=flat-square
[travis-url]: https://travis-ci.org/koajs/html-minifier
[coveralls-img]: https://img.shields.io/coveralls/koajs/html-minifier.svg?style=flat-square
[coveralls-url]: https://coveralls.io/r/koajs/html-minifier?branch=master
[license-img]: https://img.shields.io/badge/license-MIT-green.svg?style=flat-square
[license-url]: LICENSE

[github-repo]: https://github.com/koajs/html-minifier
[html-minifier-terser-repo]: https://github.com/DanielRuf/html-minifier-terser
