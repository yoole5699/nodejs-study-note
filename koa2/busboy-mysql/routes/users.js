const router = require('koa-router')();
const query = require('../util/asyncDb');
const getSqlContentMap = require('../util/getSql');
let sqlContentMap = getSqlContentMap();

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/mysql', async (ctx, next) => {
  const sql = 'select * from test';
  const datalist = await query(sql);
  ctx.body = datalist;
})

router.get('/init', async (ctx, next) => {
  let output = [];
  for (let key in sqlContentMap) {
    const sqlShell = sqlContentMap[key];
    const sqlShellList = sqlShell.split(';');
    console.log('shell', sqlShellList, sqlShellList.length);
    for (let [index, shell] of sqlShellList.entries()) {
      if (shell.trim()) {
        let result = await query(shell);
        if (result.serverStatus * 1 !== 2) {
          output.push(`[ERROR]sql脚本文件: ${shell} 第${index}条脚本执行失败 T T`)
        } else {
          output.push(`[SUCCESS] sql脚本文件: ${shell} 第${index}条脚本执行成功啦~`)
        }
      }
    }
  }
  ctx.body = output.toString();
})

module.exports = router
