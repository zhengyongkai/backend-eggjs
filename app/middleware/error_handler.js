
module.exports = () => {
  return async function errorHandler(ctx, next) {
    const method = ctx.request.method;
    console.log(ctx.status)
    // 当请求方法为OPTIONS，通常为axios做验证请求，直接响应httpStatus204 no content即可
    if (method === 'OPTIONS') {
      ctx.status = 204;
      return;
    }

    try { // 在这里捕获程序中的异常
        console.log('sss')
     let data = await next();
      console.log('sss' , ctx)
    } catch (err) {
        console.log(err)
      // 最后其他异常统一处理
      ctx.status = 500;
      ctx.body = {
        code: 50000,
        msg: err.message || '服务器异常',
        data: null,
      };
    }
  };
};
