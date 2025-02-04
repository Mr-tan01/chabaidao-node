'use strict';

const { validate } = require('../../config/plugin');

const Controller = require('egg').Controller;

class UserorderController extends Controller {
  // 获取默认收货地址
  async defaultAddress() {
    const {ctx} = this
    const db = ctx.model.Wxuseraddress
    const res = await db.find({ userOpenid: ctx.auth.uid, defaultAddress:true },
      {useOpenid:false, defaultAddress:false})
    ctx.send(res)
  }
  // 自提订单支付
  async selfpickupOrder() {
    const {ctx,service} = this
    const {orderType, userMobile, productOrder} = ctx.request.body
    ctx.validate({
      orderType: { type: 'nullValue', tips: '缺少订单类型' },
      userMobile: { type: 'nullValue', tips: '手机号码不能为空' },
      productOrder: { type: 'goodsStatsArray' }
    },ctx.request.body)
    const orderData = {
      userOpenid: ctx.auth.uid,
      orderType,
      userMobile,
      productOrder
    }
    await service.userorder.submitOrder(orderData)
    ctx.send()
  }
  // 外卖订单支付
  async outdoorOrder() {
    const {ctx,service} = this
    const {orderType, receiverAddress, productOrder} = ctx.request.body
    ctx.validate({
      orderType: { type: 'nullValue', tips: '缺少订单类型' },
      receiverAddress: { type: 'receiverAddressVal', tips:'缺少收货地址' },
      productOrder: { type: 'goodsStatsArray' }
    },ctx.request.body)
    const orderData = {
      userOpenid: ctx.auth.uid,
      orderType,
      receiverAddress,
      productOrder
    }
    // 公用提交
    await service.userorder.submitOrder(orderData)
    ctx.send()
  }
  // 获取我的订单列表
  async allOrderList() {
    const {ctx,service} = this
    const {page} = ctx.query
    ctx.validate({
      page: { type: 'nullValue', tips: '缺少分页参数'}
    }, ctx.query)
    const res = await service.userorder.allOrderList(page, ctx.auth.uid)
    ctx.send(res)
  }
  // 获取订单详情数据
  async orderDatails() {
    const {ctx,service} = this
    const {id} = ctx.query
    ctx.validate({
      id: { type: 'nullValue', tips: '缺少订单ID'}
    }, ctx.query)
    const db = ctx.model.Userorder
    const res = await db.find({_id:id, userOpenid:ctx.auth.uid},{
      userOpenid:false,
      timestamp:false,
      userMobile:false
    })
    ctx.send(res)
  }
  // 后台管理获取用户订单列表
  async receiveOrderList() {
    const {ctx,service} = this
    const {page} = ctx.query
    ctx.validate({
      page: { type: 'nullValue', tips: '缺少分页参数'}
    }, ctx.query)
    const res = await service.userorder.receiveOrderList(page)
    ctx.send(res)
  }
  // 后台管理获取用户订单详情
  async receiveOrderDetails() {
    const {ctx} = this
    const {id} = ctx.query
    ctx.validate({
      id: { type: 'nullValue', tips: '缺少订单ID'}
    }, ctx.query)
    const db = ctx.model.Userorder
    const res = await db.find({_id:id},{
      timestamp:false
    })
    ctx.send(res)
  }
}

module.exports = UserorderController;
