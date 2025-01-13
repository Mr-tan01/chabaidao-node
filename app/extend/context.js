module.exports = {
  // 定义一个 getter 方法 ctx，用于返回当前对象实例
  get ctx() {
    // 返回当前对象实例
    return this
  },
  // 定义一个 send 方法，用于发送响应数据
  send(data = [], status = 200, msg = 'success', error = null) {
    // 将响应数据赋值给当前对象的 body 属性
    // 响应数据包括消息、数据和错误信息
    this.body = { msg, data, error }
    // 将响应状态码赋值给当前对象的 status 属性
    this.status = status
  }
}