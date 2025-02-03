module.exports = app => {
  const mongoose = app.mongoose
  mongoose.pluralize(null) // 去掉复数形式
  const Schema = mongoose.Schema
  const WxuseraddressSchema = new Schema({
    // 关联wx用户openid
    userOpenid:{
      type:String,
      required:true,
      // 关联目标集合
      ref:'Wxuserinfo',
      // 关联当前字段
      locaField:'userOpenid',
      // 关联目标字段
      foreignField:'openid'
    },
    // 收货人姓名
    name:{
      type:String,
      required:true
    },
    // 收货人电话
    mobile:{
      type:String,
      required:true
    },
    // 收货人省市地址
    address:{
      type:String,
      required:true
    },
    // 收货人详细地址
    detailedAddress:{
      type:String,
      required:true
    },
    // 是否为默认地址
    defaultAddress:{
      type:Boolean,
      default:false
    }
  }, {
    versionKey: false,
  })
  return mongoose.model('Wxuseraddress', WxuseraddressSchema)
}