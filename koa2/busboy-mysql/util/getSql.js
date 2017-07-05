const fs = require('fs');
let sqlContentMap = {};

/**
 * 遍历目录下的文件
 * @param  {string} pathResolve   需进行遍历的目录路径
 * @param  {string} mime          文件后缀名
 * @return {obj} 遍历后的文件目录
 */
function walk(pathResolve, mime) {
  const files = fs.readdirSync(pathResolve);
  let fileList = {};
  files.forEach(value => {
    const fileArr = value.split('\.');
    const itemMime = fileArr.length > 1 ? fileArr[fileArr.length - 1] : undefined;
    if (mime === itemMime) {
      fileList[value] = pathResolve + value;
    }
  })
  return fileList;
}

/**
 * 获取SQL目录下的文件目录
 * @return {obj}
 */
function getSqlMap() {
  const basePath = __dirname.replace(/\\/g, '\/');
  let pathArr = basePath.split('\/');
  pathArr = pathArr.splice(0, pathArr.length - 1);
  return walk(pathArr.join('/') + '/sql/', 'sql');
}

/**
 * 获取sql文件内容
 * @param  {string} fileName      文件名
 * @param  {string} path          文件绝对路径
 * @return {string} 脚本文件内容
 */
function getSqlContent(fileName, path) {
  sqlContentMap[fileName] = fs.readFileSync(path, 'binary');
}

/**
 * 封装sql内容
 * @return {obj} [description]
 */
function getSqlContentMap() {
  let sqlMap = getSqlMap();
  Object.keys(sqlMap).forEach(key => getSqlContent(key, sqlMap[key]));
  return sqlContentMap;
}

module.exports = getSqlContentMap;