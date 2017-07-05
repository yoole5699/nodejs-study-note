// walk.js # 遍历目录内容
const fs = require('fs');
const mimes = require('./mimes')

function walk( reqPath ) {
  let files = fs.readdirSync(reqPath);
  let dirList = [];
  let fileList = [];
  for ( let i = 0, len = files.length; i < len; i++) {
    const file = files[i];
    const fileAttr = file.split(".");
    const fileMime = fileAttr.length > 1 ? fileAttr[fileAttr.length - 1] : undefined;
    if (mimes[fileMime]) {
      dirList.push(file);
    } else {
      fileList.push(file);
    }
  }

  return dirList.concat(fileList);
}

module.exports = walk;