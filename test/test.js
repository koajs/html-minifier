const Koa = require('koa');
const request = require('supertest');
const { PassThrough } = require('stream');

const minifier = require('..');

const options = {
	collapseWhitespace: true
};

describe('Koa HTML Minifier', function () {
	describe('when the response is HTML', function () {
		const input = '<div> <p>    foo </p>    </div>';
		const output = '<div><p>foo</p></div>';

		describe('and the body is empty', function () {
			it('should not crash', function (done) {
				const app = new Koa();
				app.use(minifier(options));
				app.use(ctx => ctx.body = null);

				request(app.listen()).get('/').expect(204, done);
			});
		});

		describe('and the body is a string', function () {
			it('should minify', function (done) {
				const app = new Koa();
				app.use(minifier(options));
				app.use(ctx => ctx.body = input);
				request(app.listen())
					.get('/')
					.expect(200)
					.expect('Content-Type', /text\/html/)
					.expect(output, done);
			});
		});

		describe('and the body is a buffer', function () {
			it('should minify', function (done) {
				const app = new Koa();
				app.use(minifier(options));
				app.use(ctx => {
					ctx.response.type = 'html';
					ctx.body = Buffer.from(input, 'utf8');
				});

				request(app.listen()).get('/').expect(200).expect(output, done);
			});
		});

		describe('and the body is an object', function () {
			it('should not crash', function (done) {
				const app = new Koa();
				app.use(minifier(options));
				app.use(ctx => {
					ctx.body = {};
					ctx.response.type = 'html';
				});

				request(app.listen()).get('/').expect(200, done);
			});
		});

		describe('and the body is a stream', function () {
			it('should not minify', function (done) {
				const app = new Koa();
				app.use(minifier(options));
				app.use(ctx => {
					ctx.response.type = 'html';
					const stream = (ctx.body = new PassThrough());
					stream.end(input);
				});

				request(app.listen()).get('/').expect(200).expect(input, done);
			});
		});
	});

	describe('when the response is not HTML', function () {
		it('should do nothing', function (done) {
			const text = 'lol     < > <3';
			const app = new Koa();
			app.use(minifier(options));
			app.use(ctx => {
				ctx.body = text;
			});

			request(app.listen()).get('/').expect(200).expect(text, done);
		});
	});

	describe('when the html-minifier-terser throw', function () {
		it('should not crash and respond', function (done) {
			const app = new Koa();
			app.use(minifier(options));
			app.use(ctx => {
				ctx.response.type = 'html';
				// invalid html.
				ctx.body = '<p>111<222</p>';
			});

			request(app.listen()).get('/').expect(500).expect(/Parse Error/, done);
		});
	});
});
