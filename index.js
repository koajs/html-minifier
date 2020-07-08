const { minify } = require('html-minifier-terser');

module.exports = function koaHtmlMinifier(options) {
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

    ctx.response.body = await minify(ctx.response.body, options);
  };
};
