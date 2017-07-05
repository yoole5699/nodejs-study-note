// 读取请求内容

const fs = require('fs');
const path = require('path');
const dir = require('./dir');
const file = require('./file');

async function content(ctx, fullStaticPath) {
  let reqPath = path.join(fullStaticPath, ctx.url);
  let result = '';
  if (fs.existsSync(reqPath)) {
    let stats = fs.statSync(reqPath);
    if (stats.isDirectory()) {
      result = dir(ctx.url, reqPath);
    } else {
      result = file(reqPath);
    }
  } else {
    result = '404,没找到哦';
  }
  return result;
}

module.exports = content;