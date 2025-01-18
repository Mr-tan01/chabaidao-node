// 商品信息
module.exports = app => {
  const mongoose = app.mongoose
  mongoose.pluralize(null) // 去掉复数形式
  const Schema = mongoose.Schema
  const GoodsSchema = new Schema({
    // 关联分类外键
    category_id:{
      // 关联类目表的_id
      type: mongoose.Types.ObjectId,
      // 关联Category表
      ref: 'Category',
      required: true
    },
    // 商品图片
    goods_image: {
      type: String,
      required: true
    },
    // 商品名称
    goods_name: {
      type: String,
      required: true
    },
    // 商品价格
    goods_price: {
      type: Number,
      required: true
    },
    // 商品描述
    goods_describe: {
      type: String,
      required: true
    },
    // 商品库存
    goods_stock: {
      type: Number,
      required: true
    },
    // 商品加购数量,用作小程序的逻辑处理
    quantity: {
      type: Number,
      default: 0
    },
    // 商品销量,用作后台展示
    goods_sales: {
      type: Number,
      default: 0
    },
    // 商品规格，属性
    goods_stats: [
      {
        // 父属性
        name: String,
        // 用作前端选择属性使用
        selected:{
          type: String,
          default: ''
        },
        // 是否禁用
        disabled: {
          type: Boolean,
          default: false
        },
        // 子属性
        subAttributes: [
          {
            name: String,
            statsId: String,
            disabled: {
              type: Boolean,
              default: false
            },
            // 用作前端选择属性使用
            selected:{
              type: String,
              default: ''
            },
          }
        ]
      }
    ]
  }, {
    versionKey: false,
  })
  return mongoose.model('Goods', GoodsSchema)
}