'use strict';

const Controller = require('egg').Controller;

class WxHomepageController extends Controller {
  // 获取小程序轮播图接口
  async getSwiper() {
    const { ctx } = this
    const db = ctx.model.RecommendGoods
    const res = await db.find({})
    ctx.send(res)
  }
}

module.exports = WxHomepageController;
