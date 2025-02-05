'use strict';

const Controller = require('egg').Controller;

class ChatController extends Controller {
  // 接收用户端发送的消息
  async userMessage() {
    const { ctx, app } = this
    // 获取用户发的消息
    const message = ctx.args[0]
    console.log('用户发来消息' + JSON.stringify(message));
    // 发送给后台管理
    app.io.to('adminRoom').emit('adminchat', message)
  }
  // 接收后台管理发送的消息
  async adminMessage() {
    const { ctx, app } = this
    // 获取后台管理发的消息
    const message = ctx.args[0]
    console.log('后台管理发来消息' + JSON.stringify(message));
    // 发送给用户端
    app.io.to(message.userid).emit('wxchat', message) // 房间名为用户id
  }
}

module.exports = ChatController;
