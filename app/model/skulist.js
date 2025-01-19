// 商品sku信息
module.exports = app => {
  const mongoose = app.mongoose
  mongoose.pluralize(null) // 去掉复数形式
  const Schema = mongoose.Schema
  const SkulistSchema = new Schema({
    // 关联商品id
    goods_id:{
      type: mongoose.Types.ObjectId,
      ref: 'Goods',
      required: true,
    },
    // sku价格
    price: {
      type: Number,
      required: true,
    },
    // sku库存
    stock: {
      type: Number,
      required: true,
    },
    // sku规格组合名称
    specs: {
      type: [String],
      required: true,
    },
     // sku规格组合id
     skuId: {
      type: [String],
      required: true,
    }
  }, {
    versionKey: false,
  })
  return mongoose.model('Skulist', SkulistSchema)
}