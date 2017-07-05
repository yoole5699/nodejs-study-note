const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

// 可直接使用koa-jsonp中间件
router.get('/getData.jsonp', async (ctx, next) => {
  let callbackName = ctx.query.callback || 'callback';
  let outputObj = {
    success: true,
    data: {
      text: 'this is a jsonp api',
      time: new Date().toLocaleString()
    }
  };
  let output = `;${callbackName}(${JSON.stringify(outputObj)})`;

  //用text/javascript使请求支持跨域
  ctx.type = 'text/javascript'
  ctx.body = output;
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
