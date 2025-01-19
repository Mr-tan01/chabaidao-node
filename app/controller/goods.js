'use strict';

const Controller = require('egg').Controller;

class GoodsController extends Controller {
  // 新增商品接口
  async addGoods() {
    const { ctx, service } = this
    const { 
      category_id,
      goods_image,
      goods_name,
      goods_describe,
      goods_stats,
      goods_sku,
    } = ctx.request.body
    // 参数校验
    ctx.validate({
      category_id: { type: 'nullValue', tips: '请选择商品分类' },
      goods_image: { type: 'nullValue', tips: '请上传商品图片' },
      goods_name: { type: 'nullValue', tips: '请输入商品名称' },
      goods_describe: { type: 'nullValue', tips: '请输入商品描述' },
      goods_stats: { type: 'goodsStatsArray' }, // 商品规格数组选填只需要验证数组格式
      goods_sku: { type: 'goodsSkuArray', tips: '请输入商品价格和库存' },
    }, ctx.request.body)
    // 调用service以对象形式传入参数
    await service.goods.addGoods({
      category_id,
      goods_image,
      goods_name,
      goods_describe,
      goods_stats,
      goods_sku,
    })
    ctx.send()
  }
  // 获取商品列表接口,每次10条
  async getGoods() {
    const { ctx, service } = this
    const { page } = ctx.query
    ctx.validate({
      page: { type: 'nullValue', tips: '请输入页码' },
    }, ctx.query)
    const res = await service.goods.getGoods( page )
    ctx.send(res)
  }
  // 删除单个商品接口
  async deleteGoods() {
    const { ctx, service } = this
    const { _id } = ctx.query
    ctx.validate({
      _id: { type: 'nullValue', tips: '请输入商品id' },
    }, ctx.query)
    // 删除商品
    const db = ctx.model.Goods
    await db.findByIdAndDelete({ _id })
    // 删除sku
    const sku = ctx.model.Skulist
    await sku.deleteMany({ goods_id: _id }) // 删除多个sku
    ctx.send()
  }
}

module.exports = GoodsController;
