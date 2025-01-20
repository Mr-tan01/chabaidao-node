// 推荐商品信息
module.exports = app => {
  const mongoose = app.mongoose
  mongoose.pluralize(null) // 去掉复数形式
  const Schema = mongoose.Schema
  const RecommendGoodsSchema = new Schema({
    // 关联商品id
    goodsId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref : 'Goods',
      required: true 
    },
    // 关联商品类目id
    categoryId: {
      type: mongoose.Schema.Types.ObjectId, 
      ref : 'Category',
      required: true
    },
    // 推荐封面图
    carouselImages: {
      type: String,
      required: true
    }
  }, {
    versionKey: false,
  })
  return mongoose.model('RecommendGoods', RecommendGoodsSchema)
}