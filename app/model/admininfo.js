// 管理员商家信息
module.exports = app =>{
  const mongoose = app.mongoose
  mongoose.pluralize(null) // 去掉复数形式
  const Schema = mongoose.Schema
  const AdminSchema = new Schema({
    logo:{
      type:String,
      default:''
    },
    // 店铺名
    tradeName:{
      type:String,
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
      default:''
    },
    // 商家经纬度地址
    address:{
      type:[Number], // 数组数字类型
      default:[]
    },
    // 商家唯一id
    adminUid:{
      type:String,
      unique:true,
      default:()=>new Date().getTime()
    },
    // 商家介绍
    shopIntroduction:{
      type:String,
      default:''
    },
    // 起送价
    initialPrice:{
      type:Number,
      default:0
    },
    // 营业时间
    businessHours:{
      type:[String],
      default:[]
    },
  },{
    versionKey:false // 不显示__v
  })
  return mongoose.model('AdminInfo',AdminSchema)
}