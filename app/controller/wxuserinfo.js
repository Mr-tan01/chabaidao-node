'use strict';

const Controller = require('egg').Controller;

class WxuserinfoController extends Controller {
  // 小程序用户登录
  async wxLogin() {
    const { ctx, service } = this
    const { code } = ctx.query
    ctx.validate({
        code: { type: 'nullValue', tips: '缺少code参数' }
    }, ctx.query)
    const res = await service.wxuserinfo.wxLogin(code)
    ctx.send(res)
}
}

module.exports = WxuserinfoController;
