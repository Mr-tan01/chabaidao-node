'use strict';

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
}

module.exports = WxChooseAmenuController;
