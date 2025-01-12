'use strict';

const Controller = require('egg').Controller;

class AdmininfoController extends Controller {
  // 注册商家账号
  async adminRegister() {
    const { ctx } = this
    const { phone, password } = ctx.request.body
    console.log(phone, password);
    
  }
}

module.exports = AdmininfoController;
