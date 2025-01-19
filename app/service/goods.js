'use strict';

const goods = require('../model/goods');

const Service = require('egg').Service;

class GoodsService extends Service {
  // 新增商品数据库操作
  async addGoods( obj ) {
    // 计算总库存
    const totalStock = obj.goods_sku.reduce(( total, sku ) => total + Number(sku.stock), 0)
    // 取出最小的价格来存储
    const minPrice = Math.min(...obj.goods_sku.map( sku => Number(sku.price) ))
    const db = this.ctx.model.Goods
    // 存储一个商品到数据库
    // create返回对象 find返回数组
    const goodsId = await db.create({
      category_id : obj.category_id,
      goods_image : obj.goods_image,
      goods_name : obj.goods_name,
      goods_describe : obj.goods_describe,
      goods_price : minPrice,
      goods_stock : totalStock,
      goods_stats : obj.goods_stats
    })
    // 存储sku列表
    // 判断商品是否有sku列表(选填选项)
    if ( obj.goods_stats.length <= 0 ) {
      return
    }
    const dbSku = this.ctx.model.Skulist
    // map返回一个新数组存入
    const newskuArray = obj.goods_sku.map( sku => (
      {
        goods_id : goodsId._id,
        price : sku.price,
        stock : sku.stock,
        specs : sku.specs,
        skuId : sku.skuId
      }
    ))
    // 批量存入sku列表
    await dbSku.insertMany(newskuArray)
  }
  // 获取商品列表数据库操作
  async getGoods( page ) {
    const db = this.ctx.model.Goods
    // 连表查询
    const res = await db.aggregate([
      { $skip : (page - 1) * 10 },
      { $limit : 10 },
      // 连接类目表
      {
         $lookup : {
        from : 'Category',
        localField : 'category_id',
        foreignField : '_id',
        as : 'category'
        }
      },
      // 展开数组成一个对象
      { $unwind : '$category' },
      {
        $project : {
          '_id' : 1,
          'goods_image' : 1,
          'goods_name' : 1,
          'goods_price' : 1,
          'goods_stock' : 1,
          'goods_sales' : 1,
          'category_id' : 1,
          'goods_category' : '$category.categoryName'
        }
      }
    ])
    // 获取商品总条数
    const total = await db.countDocuments()
    return { goodsData : res, total }
  }
}

module.exports = GoodsService;
