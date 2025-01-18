/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 商家注册
  router.post('/api/admin/register', controller.admininfo.adminRegister);
  // 商家登录
  router.post('/api/admin/login', controller.admininfo.adminLogin);
  //文件上传
  router.post('/api/admin/uploadFile', controller.upload.uploadFile);
  // 更新logo
  router.post('/api/admin/upload-logo', app.middleware.jwt(), controller.admininfo.updateLogo);
  // 更新店铺名称
  router.post('/api/admin/upload-tradeName', app.middleware.jwt(), controller.admininfo.updateTradeName);
  // 更新店铺介绍
  router.post('/api/admin/upload-shopintroduction', app.middleware.jwt(), controller.admininfo.updateShopIntroduction);
  // 更新店铺营业时间
  router.post('/api/admin/upload-businesshours', app.middleware.jwt(), controller.admininfo.updateBusinessHours);
  // 更新起送价
  router.post('/api/admin/upload-initialprice', app.middleware.jwt(), controller.admininfo.updateInitialPrice);
  // 更新店铺地址
  router.post('/api/admin/upload-address', app.middleware.jwt(), controller.admininfo.updateAddress);
  // 新增商品类目
  router.post('/api/admin/add-category', app.middleware.jwt(), controller.category.addCategory);
  // 获取商品类目
  router.get('/api/admin/get-category', app.middleware.jwt(), controller.category.getCategory);
  // 删除商品类目
  router.get('/api/admin/delete-category', app.middleware.jwt(), controller.category.deleteCategory);
};
