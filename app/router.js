/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 商家注册
  router.post('/api/admin/register', controller.admininfo.adminRegister);
};
