'use strict';

const Controller = require('egg').Controller;

class WxHomepageController extends Controller {
  // 小程序获取轮播图接口
  async getSwiper() {
    const { ctx } = this
    const db = ctx.model.RecommendGoods
    const res = await db.find({})
    ctx.send(res)
  }
}

module.exports = WxHomepageController;
