'use strict';

const { send } = require('../extend/context');

const Controller = require('egg').Controller;

class WxChooseAmenuController extends Controller {
  // 小程序获取商家信息接口
  async getMerchantInfo() {
    const { ctx } = this
    const db = ctx.model.Admininfo
    const res = await db.find({}).select('tradeName address initialPrice businessHours location')
    ctx.send(res)
  }
  // 计算用户和商家的距离接口
  async distanceCalculator() {
    const { ctx, service } = this
    const {latitube,longitude} = ctx.query
    ctx.validate({
      latitube: { type: 'nullValue', tips:'纬度不能为空' },
      longitude: { type: 'nullValue', tips:'经度不能为空' },
    },ctx.query)
    const { distance, staatus, msg, error } = await service.wxChooseAmenu.distanceCalculator(latitube, longitude)
    ctx.send( {distance}, staatus, msg, error)
  }
  // 获取所有分类和商品信息接口
  async getAllGoods(){
    const { ctx, service} = this
   const res = await service.wxChooseAmenu.getAllGoods()
   ctx.send(res)
  }
  // 获取单个商品的sku列表
  async getGoodsSkuList(){
    const {ctx,select}=this
    const {_id} = ctx.query
    ctx.validate({
      _id: { type: 'nullValue', tips:'商品id不能为空' },
    },ctx.query)
    const db = ctx.model.Skulist
    const res = db.find({goods_id:_id})
  }
}

module.exports = WxChooseAmenuController;
