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

  // 登录商家账号数据库操作
  async adminLogin(account, password) {
      // 创建哈希对象
    const hash = crypto.createHash('sha256').update(password)
    // 生成哈希值
    const passwordHash = hash.digest('hex')
    const db = this.ctx.model.Admininfo
    // 查询数据库该账号的相关信息赋值给res
    const res = await db.find({account, password: passwordHash},
      // 第二个参数指定不返回的字段
      {account:false, location:false}
    ).lean()  //将mongoose的文档对象转换为普通的JavaScript对象,不然会携带多余其他自带信息
    // 判断是否存在该账号
    if (res.length > 0) {
      // 调用生成token的方法
      const token = { admin_Token: this.ctx.generateToken(res[0].adminUid)}
      console.log(token);
      return {
        // 数组合并
        data: {...res[0], ...token},
        code: 200,
        msg: '登录成功'
      }
    }else {
      // 如果不存在,则返回错误信息
      return {
        data: [],
        code: 422,
        msg: '账号或密码错误'
      }
    }
    
  }
}

module.exports = AdmininfoService;
