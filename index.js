
var minify = require('html-minifier').minify

module.exports = function (options) {
  options = options || {}
  return function* minifyHTML(next) {
    yield* next

    if (!this.response.is('html')) return
    var body = this.response.body
    if (!body) return
    // too lazy to handle streams
    if (typeof body.pipe === 'function') return
    if (Buffer.isBuffer(body)) body = body.toString('utf8')
    else if (typeof body === 'object') return // wtf programming
    this.response.body = minify(body, options)
  }
}
