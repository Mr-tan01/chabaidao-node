'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  // 新增类目接口
  async addCategory() {
    const { ctx } = this
    const { category, icon } = ctx.request.body
    ctx.validate({
      category:{type: "nullValue",tips: '请输入类目名称'},
      icon:{type: "nullValue",tips: '请上传图标'}
    }, ctx.request.body)
    const db = ctx.model.Category
    // 判断类目是否已存在
    const repeat = await db.find({ categoryName: category })
    if ( repeat.length > 0 ) {
      ctx.send([], 422, '类目已存在')
    }else {
      // 添加类目
      const res = await db.create({ categoryName: category, icon })
      ctx.send(res)
    }
  }
  // 获取类目接口(一次10条)
  async getCategory() {
    const { ctx, service } = this
    const { page } = ctx.query // get请求参数
    ctx.validate({
      page:{type: "nullValue",tips: '分页值不能为空'}
    }, ctx.query)
    const res = await service.category.getCategory(page)
    ctx.send(res)
  }
  // 删除类目接口
  async deleteCategory() {
    const { ctx } = this
    const { _id } = ctx.query // get请求参数
    ctx.validate({
      _id:{ type: "nullValue",tips: '分类id不能为空' }
    }, ctx.query)
    const db = ctx.model.Category
    // 删除类目
    await db.findByIdAndDelete({ _id: _id })
    ctx.send()
  }
  // 获取所有分类类目接口
  async getAllCategory() {
    const { ctx } = this
    const db = ctx.model.Category
    // 获取所有分类类目但不返回icon
    const res = await db.find({},{ icon: false })
    ctx.send(res)
  }
}

module.exports = CategoryController;
