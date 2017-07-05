// 读取目录内容
const fs = require('fs');
const path = require('path');
const walk = require('./walk');

function dir(url, reqPath) {
  let fileList = walk(reqPath);
  let html = `<ul>`;
  fileList.forEach(file => {
    html = `${html}<li><a href="${url === '/' ? '' : url}/${file}">${file}</a>`
  });

  html = `${html}</ul>`;
  return html;
}

module.exports = dir;