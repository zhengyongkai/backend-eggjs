module.exports = app => {
  return async (ctx, next) => {
    ctx.socket.emit('online', 'connected!');
    console.log('server socket connected');
    await next();
  };
};