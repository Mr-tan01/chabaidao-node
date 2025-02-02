'use strict';

const Service = require('egg').Service;
const axios = require('axios')

class WxChooseAmenuService extends Service {
  // 距离计算
  async distanceCalculator(latitube,longitude) { 
    const { ctx, app } = this
    const db = ctx.model.Admininfo
    const locationRes = await db.find({}).select('location')
    const url = 'https://apis.map.qq.com/ws/distance/v1/matrix?'
    const params = {
      'key': app.config.wxkey.key,
      'from': `${latitube},${longitude}`,
      'to': `${locationRes[0].location[1]},${locationRes[0].location[0]}`,
      'mode': 'driving'
    }
    // 遍历对象的属性将属性收集到一个数组中,通过map来创建一个新数组再进行拼接
    const queryString = Object.keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&')
    // 调用腾讯云地图距离计算api
    const res = await axios.get(url + queryString)
    // 判断返回状态
    if(res.data.status === 0) {
      const distance = res.data.result.rows[0].elements[0].distance
      // 米转公里
      var km = '0米'
      if(distance > 1000) {
        km = (distance / 1000).toFixed(1) + 'km'
      }else{
        km = distance + 'm'
      }
      return { distance:km, status:200, msg:'获取成功', error:null }
    }else{
      return { distance:[], status:500, msg:'获取失败', error:res.data.message }
    }
  }
  // 获取所有分类和商品信息操作
  async getAllGoods(){ 
    const { ctx, app } = this
    // 分类表关联了商品表
    const db = ctx.model.Category
    const res = await db.aggregate([
      {
        $lookup: {
          from: 'Goods',
          localField: '_id',
          foreignField: 'category_id',
          as:'category'
        }
      },
      // 过滤没有被分类的商品
      {
        $match: {
          'category': { $ne: [] }
        }
      }
    ])
    return res
  }
  // 搜索商品
  async searchGoods(keyword,page){
    const { ctx } = this
    const db = ctx.model.Goods
    // 模糊查询
    const query = { $regex: keyword, $options: 'i' } // i表示不区分大小写
    const res = await db.find({ 
      $or: [{ goods_name: query }, { goods_describe: query }] 
    }).skip((page - 1) * 10).limit(10)
    return res
  }
}

module.exports = WxChooseAmenuService;
