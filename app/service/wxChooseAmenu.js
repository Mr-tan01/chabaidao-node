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
}

module.exports = WxChooseAmenuService;
