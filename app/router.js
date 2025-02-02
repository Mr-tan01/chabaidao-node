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
  // 获取所有商品类目
  router.get('/api/admin/all-category', app.middleware.jwt(), controller.category.getAllCategory);
  // 新增商品
  router.post('/api/admin/add-goods', app.middleware.jwt(), controller.goods.addGoods);
  // 获取商品列表
  router.get('/api/admin/get-goods', app.middleware.jwt(), controller.goods.getGoods);
  // 删除商品
  router.get('/api/admin/delete-goods', app.middleware.jwt(), controller.goods.deleteGoods);
  // 新增推荐商品
  router.post('/api/admin/add-recommend', app.middleware.jwt(), controller.recommendGoods.addRecommend);
  // 获取推荐商品
  router.get('/api/admin/get-recommend', app.middleware.jwt(), controller.recommendGoods.getRecommend);
  // 删除推荐商品
  router.get('/api/admin/delete-recommend', app.middleware.jwt(), controller.recommendGoods.deleteRecommend);

  // -----------------小程序端接口------------------
  // 获取轮播图
  router.get('/api/wx/get-swiper', controller.wxHomepage.getSwiper);
  // 获取商家信息
  router.get('/api/wx/get-merchantinfo', controller.wxChooseAmenu.getMerchantInfo);
  // 计算用户和商家距离
  router.get('/api/wx/distance-calculator', controller.wxChooseAmenu.distanceCalculator);
  // 获取所有分类和商品信息
  router.get('/api/wx/all-goods', controller.wxChooseAmenu.getAllGoods);
  // 获取单个商品sku
  router.get('/api/wx/goods-sku-list', controller.wxChooseAmenu.getGoodsSkuList);
  // 搜索商品
  router.get('/api/wx/search-goods', controller.wxChooseAmenu.searchGoods);
};
