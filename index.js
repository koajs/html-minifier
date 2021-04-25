/*!
 * koa-html-minifier
 *
 * Copyright (c) 2020 Koa.js contributors
 * MIT Licensed
 */

'use strict';

/**
 * Module dependencies.
 */
const { minify } = require('html-minifier-terser');

/**
 * Expose `koaHtmlMinifier()`.
 */
module.exports = koaHtmlMinifier;

/**
 * Middleware that minifies your HTML responses.
 *
 * @api public
 */
function koaHtmlMinifier(options) {
  return async (ctx, next) => {
    await next();
    if (
      !options ||
      !ctx.response.is('html') ||
      !ctx.response.body ||
      typeof ctx.response.body.pipe === 'function'
    )
      return;

    if (Buffer.isBuffer(ctx.response.body))
      ctx.response.body = ctx.response.body.toString('utf8');

    if (typeof ctx.response.body === 'object') return;

    try {
      ctx.response.body = await minify(ctx.response.body, options);
    } catch (err) {
      const originalError = err.toString();
      ctx.status = 500;
      ctx.response.body = { originalError };
    }
  };
}
