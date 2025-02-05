/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, io } = app;
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
  // 获取用户订单列表
  router.get('/api/admin/receive-order-list', app.middleware.jwt(), controller.userorder.receiveOrderList);
  // 获取订单详情
  router.get('/api/admin/receive-order-details', app.middleware.jwt(), controller.userorder.receiveOrderDetails);

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
  // 用户登录
  router.get('/api/wx/wxlogin', controller.wxuserinfo.wxLogin);
  // 用户信息修改
  router.post('/api/wx/uploadWxUser',app.middleware.jwt(), controller.wxuserinfo.uploadWxUser);
  // 用户新增地址
  router.post('/api/wx/upload-address',app.middleware.jwt(), controller.wxuserinfo.uploadAddress);
  // 用户设置默认地址
  router.get('/api/wx/set-default-address',app.middleware.jwt(), controller.wxuserinfo.setDefaultAddress);
  // 用户删除地址
  router.get('/api/wx/delete-user-address',app.middleware.jwt(), controller.wxuserinfo.deleteUserAddress);
  // 获取用户地址列表
  router.get('/api/wx/get-user-address',app.middleware.jwt(), controller.wxuserinfo.getUserAddress);
  // 获取默认地址
  router.get('/api/wx/default-address',app.middleware.jwt(), controller.userorder.defaultAddress);
  // 自提订单支付
  router.post('/api/wx/selfpickup-order',app.middleware.jwt(), controller.userorder.selfpickupOrder);
  // 外卖订单支付
  router.post('/api/wx/outdoor-order',app.middleware.jwt(), controller.userorder.outdoorOrder);
  // 获取我的订单列表
  router.get('/api/wx/all-order-list',app.middleware.jwt(), controller.userorder.allOrderList);
  // 获取订单详情
  router.get('/api/wx/order-datails',app.middleware.jwt(), controller.userorder.orderDatails);

  // -----------------即时通讯接口------------------
  // 用户消息
  io.route('userMessage',io.controller.chat.userMessage)
  // 后台管理消息
  io.route('adminMessage',io.controller.chat.adminMessage)
};
