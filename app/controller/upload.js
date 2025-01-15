'use strict';

const Controller = require('egg').Controller;
const OSS = require('ali-oss');

class UploadController extends Controller {
  // 文件上传接口
  async uploadFile() {
    const { ctx, app } = this
    // 判断上传的文件是否为空
    if ( ctx.request.files <= 0 ) {
      ctx.send([], 422, '上传文件不能为空')
      return
    }
    // 对文件重新命名
    const fileFormat = ctx.request.files[0].filename.split('.') // 获取文件后缀名
    const timestamp = new Date().getTime()  // 获取时间戳
    const randomNum = Math.floor(Math.random() * 1000)  // 获取随机数
    // 文件名
    const uploadKey = `${app.config.oss.folder}${timestamp}${randomNum}.${fileFormat[1]}`

    // oss对象存储初始化
    const client = new OSS({
      accessKeyId: app.config.oss.accessKeyId,
      accessKeySecret: app.config.oss.accessKeySecret,
      // Bucket所在地域
      region: app.config.oss.region,
      authorizationV4: true,
      // Bucket名称。
      bucket: app.config.oss.bucket,
      // 是否开启图片处理功能
      secure: true
    })
    // 设置文件上传的headers
    const headers = {
      'Content-Disposition': 'inline',
      'Content-Type': 'image/jpg'
    }
    try {
      // oss对象存储上传文件
      const result = await client.put(uploadKey, ctx.request.files[0].filepath, { headers })
      // console.log(result);
      if( result.res.status === 200 ){
        ctx.send(result.url, 200, '上传成功')
      }else{
        throw result
      }
    } catch (error) {
      // console.log(error);
      ctx.send([], 500, '上传失败', error)
    }
  }
}

module.exports = UploadController;
