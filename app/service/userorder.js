'use strict';

const Service = require('egg').Service;

class UserorderService extends Service {
  // 提交订单到数据库
  async submitOrder(orderData) {
    const db = this.app.model.Userorder
    const res = await db.create(orderData)
    // 生成取餐码
    if(orderData.orderType === '1'){ // 自提订单才能生成取餐码
      // .sort('-takeMealCode') 方法用于对查询结果进行排序，'-' 表示按 takeMealCode 字段降序排列
      // .limit(1) 方法用于限制查询结果的数量，这里只返回一个文档
      const lastOrder = await db.findOne({orderType: '1'}).sort('-takeMealCode').limit(1)
      // 生成+1取餐码
      const newCode = lastOrder[0].takeMealCode + 1
      // 更新订单取餐码
      await db.findByIdAndUpdate({_id:res._id}, {takeMealCode:newCode})
    }
    // 库存自减，销量自增
    const Skulist = this.ctx.model.Skulist
    const Goods = this.ctx.model.Goods
    // 遍历订单中的商品列表
    for(const item of orderData.productOrder){
      // 对有规格的商品进行自减
      if(item.sku.length > 0){
        await Skulist.updateOne({_id:item.sku_id},{$inc:{stock:-item.goodsQuantity}}) // $inc操作字段的值
      }
      // 对商品总库存自减
      await Goods.updateOne({_id:item.goods_id},{$inc:{goods_stock:-item.goodsQuantity}})
      // 对商品销量自增
      await Goods.updateOne({_id:item.goods_id},{$inc:{goods_sales:item.goodsQuantity}})
    }
    return
  }
}

module.exports = UserorderService;
