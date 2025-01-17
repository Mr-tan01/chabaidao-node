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
};
