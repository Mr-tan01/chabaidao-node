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
      const lastOrder = await db.find({ orderType: '1' }).sort('-takeMealCode').limit(1)
      // 生成+1取餐码
      const newCode = lastOrder[0].takeMealCode + 1
      // 更新订单取餐码
      await db.findByIdAndUpdate({ _id: res._id }, { takeMealCode: newCode })
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
  // 获取我的订单列表
  async allOrderList(page, userOpenid) {
    const db = this.ctx.model.Userorder
    // 使用聚合管道查询数据库
    const res = await db.aggregate([
      // 匹配指定用户openid的记录
      { $match: { userOpenid } },
      // 按时间戳降序排序
      { $sort: { timestamp: -1 } },
      // 跳过指定页数之前的记录，实现分页功能
      { $skip: (page - 1) * 10 },
      // 限制返回的记录数为10条
      { $limit: 10 },
      {
        // 投影操作，指定返回的字段
        $project: {
          orderType: true,
          // 返回productOrder数组中的第一个元素
          productOrder: { $slice: ['$productOrder', 1] },
          paymentPrice: true,
          // 计算productOrder数组的长度，用于显示一个订单的商品数量
          productOrderCount: { $size: "$productOrder" }
        }
      }
    ])
    return res
  }
  // 后台获取订单列表
  async receiveOrderList(page) {
    const db = this.ctx.model.Userorder
    // 使用聚合管道查询数据库
    const res = await db.aggregate([
      // 按时间戳降序排序
      { $sort: { timestamp: -1 } },
      // 跳过指定页数之前的记录，实现分页功能
      { $skip: (page - 1) * 10 },
      // 限制返回的记录数为10条
      { $limit: 10 },
      {
        // 投影操作，指定返回的字段
        $project: {
          _id:true,
          orderType: true,
          orderTime:true,
          paymentPrice: true,
          // 计算productOrder数组的长度，用于显示一个订单的商品数量
          productOrderCount: { $size: "$productOrder" }
        }
      }
    ])
    // 总条数
    const total = await db.countDocuments()
    return {order:res, total}
  }
}

module.exports = UserorderService;
