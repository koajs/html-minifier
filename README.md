
# Koa HTML Minifier

Middleware that minifies your HTML responses using [html-minifier](https://github.com/kangax/html-minifier).
It uses `html-minifier`'s default options which are all turned off by default,
so you __have__ to set the options otherwise it's not going to do anything.

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

See: https://github.com/kangax/html-minifier#options-quick-reference
