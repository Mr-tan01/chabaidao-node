// 管理员商家信息
module.exports = app =>{
  const mongoose = app.mongoose
  mongoose.pluralize(null) // 去掉复数形式
  const Schema = mongoose.Schema
  const AdminSchema = new Schema({
    logo:{
      type:String,
      required:true,
      default:''
    },
    // 店铺名
    tradeName:{
      type:String,
      required:true,
      default:''
    },
    // 账号
    account:{
      type:String,
      required:true,
      trim:true // 去掉空格
    },
    // 密码
    password:{
      type:String,
      required:true,
      select:false // 不显示
    },
    // 商家详细地址
    address:{
      type:String,
      required:true,
      default:''
    },
    // 商家经纬度地址
    address:{
      type:[Number], // 数组数字类型
      required:true
    },
    // 商家唯一id
    adminUid:{
      type:String,
      required:true,
      default:()=>new Date().getTime()
    },
    // 商家介绍
    shopIntroduction:{
      type:String,
      required:true,
      default:''
    },
    // 起送价
    shopIntroduction:{
      type:Number,
      required:true,
      default:0
    },
    // 营业时间
    shopIntroduction:{
      type:[String],
      required:true,
      default:0
    },
  },{
    versionKey:false // 不显示__v
  })
  return mongoose.model('AdminInfo',AdminSchema)
}