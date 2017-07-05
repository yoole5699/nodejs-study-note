const router = require('koa-router')();
const path = require('path');
const content = require('../util/content');
const mimes = require('../util/mimes');
const staticPath = '../public';

function parseMime(url) {
  let extName = path.extname(url);
  extName = extName ? extName.slice(1) : 'unknown';
  return mimes[extName] || 'text/html';
}

router.get('*', async (ctx, next) => {
  const fullStaticPath = path.join(__dirname, staticPath);
  console.log('url', ctx.url);
  const _content = await content(ctx, fullStaticPath);
  const _mime = parseMime(ctx.url);
  ctx.type = _mime;

  if (_mime.indexOf('image') >= 0) {
    ctx.res.writeHead(200);
    ctx.res.write(_content, "binary");
    ctx.res.send();
  } else if (_mime.indexOf('text/html') >= 0) {
    await ctx.render('index', {
      title: 'Hello Koa 2!',
      _content: _content,
    })
  } else {
    ctx.body = _content;
  }
});

router.post('/', async (ctx, next) => {
  ctx.body = ctx.request.body;
});

module.exports = router
