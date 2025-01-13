'use strict';

const Service = require('egg').Service;
// 引入Node.js的crypto模块，该模块提供了加密功能，包括哈希、HMAC、加密和解密等
const crypto = require('crypto')

class AdmininfoService extends Service {
  // 注册商家账号数据库操作
  async adminRegister(account, password) {
    const db = this.ctx.model.Admininfo
    // 查询数据库中是否存在该手机号
    const res = await db.find({account})
    // 如果存在，则返回错误信息
    if (res.length > 0) {
      return {
        code: 202,
        msg: '该手机号已被注册'
      }
    }else {
      // 如果不存在,将密码加密
      // 创建哈希对象
      const hash = crypto.createHash('sha256').update(password)
      // 生成哈希值
      const passwordHash = hash.digest('hex')
      // 将账号和加密后的密码存入数据库
      await db.create({
        account,
        password: passwordHash
      })
      return {
        code: 200,
        msg: '注册成功'
      }
    }
  }
}

module.exports = AdmininfoService;
