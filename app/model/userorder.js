// 下单信息
const moment = require('moment')
moment.locale('zh-cn')
const Decimal = require('decimal.js')
module.exports = app => {
  const mongoose = app.mongoose
  mongoose.pluralize(null) // 去掉复数形式
  const Schema = mongoose.Schema
  const UserorderSchema = new Schema({
    // 关联wx用户openid
    userOpenid:{
    type:String,
    required:true,
    // 关联目标集合
    ref:'Wxuserinfo',
    // 关联当前字段
    locaField:'userOpenid',
    // 关联目标字段
    foreignField:'openid',
    // 私密字段
    select:false
    },
    // 订单时间
    orderTime:{
    type:String,
    required:true,
    default:()=> moment().utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
    },
    // 下单时间戳
    timestamp: {
      type: Number,
      default: () => moment().unix()
    },
    // 取餐码
    takeMealCode:{
      type:Number,
      default:1000
    },
    // 订单号
    orderNumber:{
      type:String
    },
    // 订单类型
    orderType:{
      type:String,
      required:true
    },
    // 收货地址
    receiverAddress:[
      {
        name:{
          type:String,
          required:true
        },
        mobile:{
          type:String,
          required:true
        },
        address:{
          type:String,
          required:true
        },
        detailedAddress:{
          type:String,
          required:true
        }
      }
    ],
    // 到店取餐手机号
    userMobile:{
      type:String,
      default:''
    },
    // 提交的商品订单
    productOrder:[
      {
        fatherId:{
          type:String,
          required:true
        },
        sonId:{
          type:String,
          required:true
        },
        goods_name:{
          type:String,
          required:true
        },
        goods_image:{
          type:String,
          required:true
        },
        goods_id:{
          type:String,
          required:true
        },
        goodsPrice:{
          type:Number,
          required:true
        },
        goodsQuantity:{
          type:Number,
          required:true
        },
        totalPrice:{
          type:Number,
          required:true
        },
        sku:{
          type:[String],
          default:[]
        },
        skuIdArr:{
          type:[String],
          default:[]
        },
        sku_id:{
          type:String,
          default:''
        }
      }
    ],
    // 总支付价
    paymentPrice: Number
  }, {
    versionKey: false,
  })
  // 在保存UserorderSchema之前执行的操作
  UserorderSchema.pre('save',function(next){
    // 获取当前日期
    const currentDate = moment().format('YYYYMMDD')
    // 获取当前时间
    const currentTime = moment().format('HHmmssSSS')
    // 生成一个0到999之间的随机数，并转换为字符串，不足4位前面补0
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(4,'0')
    // 生成20位订单号，由当前日期、当前时间和随机数组成
    this.orderNumber = currentDate + currentTime + randomNum
    // 计算支付总价，遍历productOrder数组，累加每个商品的总价
    const res = this.productOrder.reduce((subtotal, goodsItem) => subtotal + goodsItem.totalPrice,0)
    // 使用Decimal库确保计算精度，并将结果保留两位小数，转换为数字类型
    this.paymentPrice = Number(new Decimal(res).toFixed(2))
    // 调用 next() 函数
    // next() 通常用于控制代码的执行流程，特别是在异步编程或中间件中使用
    // 在异步编程中，next() 可以用来继续执行下一个异步操作
    // 在中间件中，next() 用于将控制权传递给下一个中间件函数
    next()
  })
  return mongoose.model('Userorder', UserorderSchema)
}