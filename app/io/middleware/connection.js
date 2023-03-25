module.exports = app => {
  return async (ctx, next) => {
    ctx.socket.emit('online', 'connected!');
    await next();
  };
};