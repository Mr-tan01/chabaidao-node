'use strict';

const Service = require('egg').Service;

class CategoryService extends Service {
  // 获取类目，表查询分类下的商品数量
  async getCategory( page ) {
    const db = this.ctx.model.Category
    // 连表查询
    const res = await db.aggregate([
      // 使用 $skip 操作符跳过指定数量的文档
      // 计算跳过的文档数量：当前页码减一乘以每页显示的文档数量（10）
      { $skip: (page - 1) * 10 },
      // 使用 $limit 操作符限制返回的文档数量
      // 每页显示10个文档
      { $limit: 10 },
      // 连接商品集合
      {
        // 使用 $lookup 操作符进行集合间的连接查询
        $lookup: {
          // 指定要连接的集合名称，这里是 'Goods' 集合
          from: 'Goods',
          // 指定当前集合Category中用于连接的字段，这里是 '_id' 字段
          localField: '_id',
          // 指定目标集合Goods中用于连接的字段，这里是 'category_id' 字段
          foreignField: 'category_id',
          // 指定连接结果存储在当前文档中的字段名称，这里是 'quantity' 字段
          as: 'quantity'
        }
      },
      // 自定义返回的字段
      {
        $project: {
          '_id': 1,
          'categoryName': 1,
          'icon': 1,
          // 使用 $size 操作符获取 'quantity' 数组的长度
          'quantity': { $size: '$quantity' }
        }
      }
    ])
    // 获取数据库里分类有多少条数据
    const total = await db.countDocuments()
    return { categoryDate: res, total }
  }
}

module.exports = CategoryService;
