// 商品分类信息
module.exports = app => {
  const mongoose = app.mongoose
  mongoose.pluralize(null) // 去掉复数形式
  const Schema = mongoose.Schema
  const CategorySchema = new Schema({
    // 分类名
    categoryName:{
      type: String,
      required: true,
    },
    // 分类图标
    icon:{
      type: String,
      required: true,
    }
  }, {
    versionKey: false,
  })
  return mongoose.model('Category', CategorySchema)
}