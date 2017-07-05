const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const views = require('koa-views');
const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

router
  .get('/', ctx => {
    ctx.body = 'Home Page'
  })
  .get('/user', ctx => {
    ctx.body = 'User Page'
  })
  .get('/ejs', async (ctx) => {
    let title = 'Hello Koa2'
    await ctx.render('index', { title })
  })
  .post('/query', ctx => {
    ctx.body = ctx.request.body
  })

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);