'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret); // 传入加密字符串
  router.get('/', controller.home.index);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/get_userinfo', _jwt, controller.user.getUserInfo); // 获取用户信息
  router.post('/api/user/edit_userinfo', _jwt, controller.user.editUserInfo); // 修改用户个性签名
  router.post('/api/upload/upload', controller.upload.upload); // 修改用户个性签名
  router.get('/api/type/list', controller.type.query); // 获取类型
  router.post('/api/type/save', controller.type.saveType); // 获取类型
  router.post('/api/type/delete', controller.type.deleteType); // 获取类型
};
