module.exports = () => {
  return async function errorHandler(ctx, next) {
    await next();
    if (ctx.body && ctx.body.success === false) {
      let msg = ctx.body.msg;
      if(ctx.status === 401){
        ctx.status = 401;
      }else{
        ctx.status = 500
      }
      ctx.body = {
        ...ctx.body,
        msg: '服务器错误',
        data: '可能原因：' + msg,
      };
    }
  };
};
