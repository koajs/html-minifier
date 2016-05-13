
var minify = require('html-minifier').minify

module.exports = function (options) {
  options = options || {}

  return function minifyHTML(ctx, next) {
    return next().then(() => {
      if (!ctx.response.is('html')) return
      var body = ctx.body
      if (!body) return
      // too lazy to handle streams
      if (typeof body.pipe === 'function') return
      if (Buffer.isBuffer(body)) body = body.toString('utf8')
      else if (typeof body === 'object') return // wtf programming
      ctx.body = minify(body, options)
    })
  }
}
