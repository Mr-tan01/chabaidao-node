var jwt = require('jsonwebtoken');
module.exports = {
  // 定义一个 getter 方法 ctx，用于返回当前对象实例
  get ctx() {
    // 返回当前对象实例
    return this
  },
  // 自定义返回前端接口数据结构
  send(data = [], status = 200, msg = 'success', error = null) {
    // 将响应数据赋值给当前对象的 body 属性
    // 响应数据包括消息、数据和错误信息
    this.body = { msg, data, error }
    // 将响应状态码赋值给当前对象的 status 属性
    this.status = status
  },
  // 加密生成token
  generateToken(uid) {
    const { secret, expiresIn } = this.app.config.jwt
    // 使用 jwt.sign 方法生成 token，传入用户 ID、密钥和过期时间
    return jwt.sign({ uid }, secret, { expiresIn })
  }
}