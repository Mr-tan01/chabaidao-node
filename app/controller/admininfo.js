'use strict';

const Controller = require('egg').Controller;

class AdmininfoController extends Controller {
  // 注册商家账号接口
  async adminRegister() {
    const { ctx, service } = this
    const { phone, password } = ctx.request.body
    // console.log(phone, password)
    // 注册校验
    ctx.validate({
      phone:{type: "adminPhone",tips: '手机号码格式不正确'},
      password:{type: "adminPassword",tips: '密码格式不正确,6-10位数字字母组合'},
    }, ctx.request.body)
    // 调用service层进行数据库操作将操作结果赋值给res
    const res = await service.admininfo.adminRegister(phone, password)
    // 返回结果给前端
    // ctx.body = res
    ctx.send([], res.code, res.msg)
  }
  // 登录商家接口
  async adminLogin() {
    const { ctx, service } = this
    const { phone, password } = ctx.request.body
    // console.log(phone, password)
    // 登录校验
    ctx.validate({
      phone:{type: "adminPhone",tips: '手机号码格式不正确'},
      password:{type: "adminPassword",tips: '密码格式不正确,6-10位数字字母组合'},
    }, ctx.request.body)
    // 调用service层进行数据库操作
    const { data, code, msg } = await service.admininfo.adminLogin(phone, password)
    // 将操作结果返回结果给前端
    ctx.send( data, code, msg )
  }
}

module.exports = AdmininfoController;
