const minify = require('html-minifier-terser').minify;

module.exports = (options = {}) => {
	return async (ctx, next) => {
		await next();
		if (!ctx.response.is('html')) return;
		let { body } = ctx.response;
		if (!body) return;
		if (typeof body.pipe === 'function') return;
		if (Buffer.isBuffer(body)) body = body.toString('utf8');
		else if (typeof body === 'object') return;
		ctx.response.body = await minify(body, options);
	};
};
