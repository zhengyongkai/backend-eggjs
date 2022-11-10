'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, middleware } = app;
  const _jwt = middleware.jwtErr(app.config.jwt.secret); // 传入加密字符串
  app.ws.use(async (ctx, next) => {
    // 生成一個 用戶列表
    if(!app.ws.clientsSet){
      app.ws.clientsSet = new Map();
    }
    await next();
  });
  router.get('/', controller.home.index);
  app.ws.route('/chat/:token', app.controller.chat.index);
};
