const router = require('koa-router')();
const upload = require('../util/uploadFile');
const path = require('path');
const uploadFilePath = path.join(__dirname, '../upload');
const uploadFile = require('../util/uploadFile');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.post('/upload.json', async(ctx, next) => {
  let result = await uploadFile(ctx, {
    fileType: 'common',
    path: uploadFilePath,
  });
  ctx.body = result;
})

module.exports = router
