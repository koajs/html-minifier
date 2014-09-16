
var koa = require('koa')
var request = require('supertest')
var PassThrough = require('stream').PassThrough

var minifier = require('..')

var options = {
  collapseWhitespace: true
}

describe('Koa HTML Minifier', function () {
  describe('when the response is HTML', function () {
    var input = '<div> <p>    foo </p>    </div>'
    var output = '<div><p>foo</p></div>'

    describe('and the body is empty', function () {
      it('should not crash', function (done) {
        var app = koa()
        app.use(minifier(options))
        app.use(function* () {
          this.body = null
        })

        request(app.listen())
        .get('/')
        .expect(204, done)
      })
    })

    describe('and the body is a string', function () {
      it('should minify', function (done) {
        var app = koa()
        app.use(minifier(options))
        app.use(function* () {
          this.body = input
        })

        request(app.listen())
        .get('/')
        .expect(200)
        .expect('Content-Type', /text\/html/)
        .expect(output, done)
      })
    })

    describe('and the body is a buffer', function () {
      it('should minify', function (done) {
        var app = koa()
        app.use(minifier(options))
        app.use(function* () {
          this.response.type = 'html'
          this.body = new Buffer(input, 'utf8')
        })

        request(app.listen())
        .get('/')
        .expect(200)
        .expect(output, done)
      })
    })

    describe('and the body is an object', function () {
      it('should not crash', function (done) {
        var app = koa()
        app.use(minifier(options))
        app.use(function* () {
          this.body = {}
          this.response.type = 'html'
        })

        request(app.listen())
        .get('/')
        .expect(200, done)
      })
    })

    describe('and the body is a stream', function () {
      it('should not minify', function (done) {
        var app = koa()
        app.use(minifier(options))
        app.use(function* () {
          this.response.type = 'html'
          var stream = this.body = new PassThrough()
          stream.end(input)
        })

        request(app.listen())
        .get('/')
        .expect(200)
        .expect(input, done)
      })
    })
  })

  describe('when the response is not HTML', function () {
    it('should do nothing', function (done) {
      var text = 'lol     < > <3'
      var app = koa()
      app.use(minifier(options))
      app.use(function* () {
        this.body = text
      })

      request(app.listen())
      .get('/')
      .expect(200)
      .expect(text, done)
    })
  })
})
