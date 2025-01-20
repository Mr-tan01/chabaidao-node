'use strict';

const Service = require('egg').Service;

class RecommendGoodsService extends Service {
  async getRecommend() {
    const db = this.ctx.model.RecommendGoods
    const res = await db.aggregate([
      // 连接商品表
      {
        $lookup: {
          from: 'Goods',
          localField: 'goodsId',
          foreignField: '_id',
          as: 'goodsData'
        }
      },
      // 拆分数组
      {
        $unwind: '$goodsData'
      },
      // 
      {
        $project: {
          '_id': 1,
          'carouselImages': 1,
          'goods_name': '$goodsData.goods_name',
          'goods_price': '$goodsData.goods_price',
          'goods_stock': '$goodsData.goods_stock',
          'goods_sales': '$goodsData.goods_sales'
        }
      }
    ])
    return res
  }
}

module.exports = RecommendGoodsService;
