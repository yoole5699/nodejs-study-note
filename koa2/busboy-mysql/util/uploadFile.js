// inspect 将任意对象转换为字符串
const inspect = require('util').inspect;
const fs      = require('fs');
const path    = require('path');
const os      = require('os');
const Busboy  = require('busboy');

/**
 * 同步创建文件目录,不存在则创建，已存在则跳过
 * @param  {string} dirname 地址的绝对路径
 * @return {boolean} 创建目录结果
 */
function mkdirsSync(dirname) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

/**
 * 获取上传文件的后缀名
 * @param  {string}
 * } fileName 上传文件的名字
 * @return {string} 文件后缀名
 */
function getSuffixName(fileName) {
  let nameList = fileName.split('.');
  return nameList[nameList.length - 1];
}

/**
 * 上传文件
 * @param  {obj} ctx     上下文
 * @param  {obj} options 上传文件参数 fileType 文件类型,path 文件路径
 * @return {Promise}
 */
function uploadFile(ctx, options) {
  let busboy = new Busboy({ headers: ctx.req.headers });
  let fileType = options.fileType || 'common';
  let filePath = path.join(options.path, fileType);
  let mkdirResult = mkdirsSync(filePath);
  return new Promise((resolve, reject) => {
    console.log('文件上传中');
    let result = {
      success: false,
      formData: {},
    }

    busboy.on('file', (filedname, file, filename, encoding, mimetype) => {
      let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename);
      let _uploadFilePath = path.join(filePath, fileName);
      // let saveTo = path.join(_uploadFilePath);
      // 文件保存到指定路径
      file.pipe(fs.createWriteStream(_uploadFilePath));

      file.on('end', () => {
        result.success = true;
        result.message = '文件上传成功';
        console.log('文件上传成功');
        resolve(result);
      })
    })

    busboy.on('field', (filedname, val, filednameTruncated, valTruncated, encoding, mimetype) => {
      console.log(`表单字段数据 [ ${filedname} ]: value: ${inspect(val)}` );
      result.formData[filedname] = inspect(val);
    });

    busboy.on('finish', () => {
      console.log('文件上传结束');
      resolve(result);
    });

    busboy.on('error', (err) => {
      console.log('文件上传出错');
      reject(result);
    })

    ctx.req.pipe(busboy);
  })
}

module.exports = uploadFile;
