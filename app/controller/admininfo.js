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
  // 更新logo接口
  async updateLogo() {
    const { ctx, service } = this
    const { value } = ctx.request.body
    // logo校验
    ctx.validate({
      value:{type: "nullValue",tips: '请上传图片'},
    }, ctx.request.body)
    // 进行数据库操作存入logo（参数一：更新的值，参数二：查询的值）, 在中间件中ctx的auth属性存储了认证信息
    await ctx.model.Admininfo.findOneAndUpdate({ adminUid: ctx.auth.uid }, { logo: value })
    ctx.send()
  }
  // 更新店铺名称接口
  async updateTradeName() {
    const { ctx, service } = this
    const { value } = ctx.request.body
    ctx.validate({
      value:{type: "nullValue",tips: '请输入店铺名称'},
    }, ctx.request.body)
    await ctx.model.Admininfo.findOneAndUpdate({ adminUid: ctx.auth.uid }, { tradeName: value })
    ctx.send()
  }
  // 更新店铺介绍接口
  async updateShopIntroduction() {
    const { ctx, service } = this
    const { value } = ctx.request.body
    ctx.validate({
      value:{type: "nullValue",tips: '请输入店铺介绍'},
    }, ctx.request.body)
    await ctx.model.Admininfo.findOneAndUpdate({ adminUid: ctx.auth.uid }, { shopIntroduction: value })
    ctx.send()
  }
  // 更新店铺营业时间接口
  async updateBusinessHours() {
    const { ctx, service } = this
    const { time } = ctx.request.body
    console.log(time); //[ '08:30', '18:30' ]
    ctx.validate({
      time:{type: "nullArray",tips: '请设置营业时间'},
    }, ctx.request.body)
    await ctx.model.Admininfo.findOneAndUpdate({ adminUid: ctx.auth.uid }, 
      { $set: { businessHours: time } }) // $set  修改数组
    ctx.send()
  }
  // 更新起送价接口
  async updateInitialPrice() {
    const { ctx, service } = this
    const { value } = ctx.request.body
    ctx.validate({
      value:{type: "nullValue",tips: '请设置起送价'},
    }, ctx.request.body)
    await ctx.model.Admininfo.findOneAndUpdate({ adminUid: ctx.auth.uid }, { initialPrice: value })
    ctx.send()
  }
  // 更新店铺地址接口
  async updateAddress() {
    const { ctx, service } = this
    const { address, location } = ctx.request.body
    ctx.validate({
      address:{type: "nullValue",tips: '请设置店铺地址'},
      location:{type: "nullArray",tips: '请设置店铺地址'}
    }, ctx.request.body)
    await ctx.model.Admininfo.findOneAndUpdate({ adminUid: ctx.auth.uid }, 
      { address: address, $set: { location: location } })
    ctx.send()
  }
}

module.exports = AdmininfoController;
