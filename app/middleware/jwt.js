const auth = require('basic-auth') // 用于接收headers头中的token
const jwt = require('jsonwebtoken') // 用于解析token

module.exports = (options, app) => {
  return async(ctx, next) => {
    const token = auth(ctx.req)
    // console.log(token); //{ name: '', pass: '' }
    
    // 判断是否传入token
    if ( !token || !token.name) {
      return ctx.send( [], 401, '未登录,没有权限')
    }
    try {
      // 解析token
      var authcode = jwt.verify(token.name, ctx.app.config.jwt.secret)
      // console.log(authcode); // { uid: '', iat: '', exp: '' }
    } catch (error) {
      // 如果令牌过期，则引发错误
      if (error.name === 'TokenExpiredError') {
        return ctx.send([], 401, 'token已过期')
      }
      // 如果令牌无效，则引发错误
      return ctx.send([], 401, 'token错误')
    }
    // ctx的auth属性，用于存储认证信息
    ctx.auth = {
      // 从传入的authcode对象中获取uid属性，并将其赋值给ctx.auth对象的uid属性
      uid:authcode.uid
    }
    // 继续执行后续的中间件或请求处理逻辑
    await next()
  }
};