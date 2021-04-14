const { minify } = require('html-minifier-terser');

module.exports = function koaHtmlMinifier(options) {
  return async (ctx, next) => {
    await next();
    let { body: rowBody } = ctx.response;
    if (
      !options ||
      !ctx.response.is('html') ||
      !rowBody ||
      typeof rowBody.pipe === 'function'
    )
      return;

    if (Buffer.isBuffer(rowBody)) {
      rowBody = rowBody.toString('utf8');
    }

    if (typeof rowBody === 'object') return;

    try {
      rowBody = await minify(rowBody, options);
    } catch (err) {
      console.error(err);
    }

    ctx.response.body = rowBody;
  };
};
