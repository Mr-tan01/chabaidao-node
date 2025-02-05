const basicAuth = require('basic-auth') // 用于接收headers头中的token
const jwt = require('jsonwebtoken') // 用于解析token

module.exports = (app) => {
  return async (ctx, next) => {
    // 获取token
    const { socket } = ctx
    const socketQuery = socket.handshake.query
    // 验证
    const token = basicAuth({headers:{authorization: socketQuery.authorization}})
    // 判断是否传入token
    if (!token) {
      throw new Error(401)
    }
    try {
      // 解析token
      jwt.verify(token.name, ctx.app.config.jwt.secret)
    } catch (error) {
      // 如果令牌过期，则引发错误
      if (error.name == 'TokenExpiredError') {
        throw new Error(401)
    }
      throw new Error(401)
    }
    // 连接成功给每个用户返回一段文本
    if(socketQuery.clientType === 'USER'){ //用户
      const db = ctx.model.Admininfo
      const res = await db.find().lean()
      const msg = {
        message: "请问有什么可以帮助你的",
        messagetype: '001',//001代表后台管理员，002表示用户
        avatar: res[0].logo,
        nickname: '',
        userid: ''//每个成员的唯一id
    }
      // emit向客户端发送消息
      socket.emit('wxchat', msg)
    }
    // 根据角色加入不同的房间
    if (socketQuery.clientType === 'ADMIN') {
      // 管理员房间名称
      socket.join('adminRoom')
    } else {
      // 用户房间名称，用户是多个用户所以根据用户自己的id命名
      socket.join(socketQuery.userid)
    }
    await next()
  }
}