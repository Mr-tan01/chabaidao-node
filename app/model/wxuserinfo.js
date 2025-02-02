// 微信用户信息
module.exports = app => {
  const mongoose = app.mongoose
  mongoose.pluralize(null) // 去掉复数形式
  const Schema = mongoose.Schema
  const WxuserinfoSchema = new Schema({
    // 头像
    avatar:{
      type:String,
      default:'https://personal-project.oss-cn-shenzhen.aliyuncs.com/chabaidao/logo.png'
    },
    // 昵称
    nickname:{
      type:String,
      default:'茶百道用户'
    },
    // 用户唯一标识
    openid:{
      type:String,
      required:true
    }
  }, {
    versionKey: false,
  })
  return mongoose.model('Wxuserinfo', WxuserinfoSchema)
}