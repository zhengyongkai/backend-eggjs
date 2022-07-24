'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret); // 传入加密字符串
  router.get('/', controller.home.index);
  router.post('/api/user/register', controller.user.register);
  router.post('/api/user/login', controller.user.login);
  router.get('/api/user/get_userinfo', _jwt, controller.user.getUserInfo); // 获取用户信息
  router.post('/api/user/edit_userinfo', _jwt, controller.user.editUserInfo); // 修改用户个性签名
  router.post('/api/upload/upload', _jwt, controller.upload.upload); // 修改用户个性签名
  router.get('/api/type/list', _jwt, controller.type.query); // 获取类型
  router.post('/api/type/save', _jwt, controller.type.saveType); // 获取类型
  router.post('/api/type/delete', _jwt, controller.type.deleteType); // 获取类型
  router.get('/api/news/list', _jwt, controller.news.query); // 获取类型
  router.post('/api/news/saveNews', _jwt, controller.news.saveNews); // 获取类型
  router.post('/api/news/delete', _jwt, controller.news.deleteNews); // 获取类型
  router.post('/api/news/publichNews', _jwt, controller.news.publichNews); // 获取类型
  router.get('/api/menus/role/query', _jwt, controller.menu.query); // 获取类型
  router.post('/api/menus/role/save', _jwt, controller.menu.saveMenu); // 获取类型
  router.post('/api/menus/role/delete', _jwt, controller.menu.deleteMenu); // 获取类型
};
