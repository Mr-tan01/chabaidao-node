'use strict';

const { send } = require('../extend/context');

const Controller = require('egg').Controller;

class RecommendGoodsController extends Controller {
  // 新增推荐商品
  async addRecommend() {
    const { ctx } = this;
    const { carouselImages, categoryId, goodsId } = ctx.request.body
    ctx.validate({
      carouselImages: { type: 'nullValue', tisp: '请上传推荐图' },
      categoryId: { type: 'nullValue', tisp: '请选择关联的商品' },
      goodsId: { type: 'nullValue', tisp: '请选择关联的商品' },
    }, ctx.request.body)
    const db = ctx.model.RecommendGoods
    await db.create({ carouselImages, categoryId, goodsId })
    ctx.send()
  }
  // 获取推荐商品
  async getRecommend() {
    const { ctx, service } = this;
    const res = await service.recommendGoods.getRecommend()
    ctx.send(res)
  }
  // 删除推荐商品
  async deleteRecommend() {
    const { ctx } = this;
    const { _id } = ctx.query
    ctx.validate({
      _id: { type: 'nullValue', tisp: '请选择要删除的推荐商品id' },
    }, ctx.query)
    const db = ctx.model.RecommendGoods
    await db.findByIdAndDelete({ _id })
    ctx.send()
  }
}

module.exports = RecommendGoodsController;
