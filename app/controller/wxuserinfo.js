'use strict';

const Controller = require('egg').Controller;

class WxuserinfoController extends Controller {
  // 小程序用户登录
  async wxLogin() {
    const { ctx, service } = this
    const { code } = ctx.query
    ctx.validate({
        code: { type: 'nullValue', tips: '缺少code参数' }
    }, ctx.query)
    const res = await service.wxuserinfo.wxLogin(code)
    ctx.send(res)
  }
  // 修改头像昵称
  async uploadWxUser() {
    const { ctx, service } = this
    const { avatar, nickname } = ctx.request.body
    ctx.validate({
        avatar: { type: 'nullValue', tips: '请上传头像' },
        nickname: { type: 'nullValue', tips: '请填写昵称' }
    }, ctx.request.body)
    const db = ctx.model.Wxuserinfo
    await db.findOneAndUpdate({ openid: ctx.auth.uid }, { avatar, nickname })
    ctx.send()
  }
  // 新增收货地址
  async uploadAddress() {
    const { ctx } = this
    const { name, mobile, address, detailedAddress } = ctx.request.body
    ctx.validate({
      name: { type: 'nullValue', tips: '请填写姓名' },
      mobile: { type: 'adminPhone', tips: '手机号码格式不正确' },
      address: { type: 'nullValue', tips: '请选择地址' },
      detailedAddress: { type: 'nullValue', tips: '请填写详细地址' }
    }, ctx.request.body)
    const db = ctx.model.Wxuseraddress
    await db.create({ userOpenid: ctx.auth.uid, name, mobile, address, detailedAddress })
    ctx.send()
  }
  // 设置默认收货地址
  async setDefaultAddress() {
    const { ctx } = this
    const { _id } = ctx.query
    ctx.validate({
      _id: { type: 'nullValue', tips: '缺少_id字段' }
    }, ctx.query)
    const db = ctx.model.Wxuseraddress
    // 在设置默认地址前，将之前的默认地址取消
    await db.updateMany({}, {$set:{ defaultAddress: false }}) // updateMany 更新符合特定条件的多个文档
    // 设置新默认地址
    await db.findByIdAndUpdate({ _id }, { defaultAddress: true }) // findByIdAndUpdate 根据文档ID查找并更新该文档
    ctx.send()
  }
  // 删除收货地址
  async deleteUserAddress() {
    const { ctx } = this
    const { _id } = ctx.query
    ctx.validate({
      _id: { type: 'nullValue', tips: '缺少_id字段' }
    }, ctx.query)
    const db = ctx.model.Wxuseraddress
    await db.findByIdAndDelete({ _id }) // findByIdAndDelete 根据_id 字段查找并删除该文档
    ctx.send()
  }
  // 获取收货地址列表
  async getUserAddress() {
    const { ctx } = this
    const db = ctx.model.Wxuseraddress
    const res = await db.find({ userOpenid: ctx.auth.uid },{userOpenid:false})
    ctx.send(res)
  }
}

module.exports = WxuserinfoController;
