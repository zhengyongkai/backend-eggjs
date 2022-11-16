"use strict";

module.exports = () => {
  return async function open(ctx, next) {
    if (!ctx.app.ws.clientsSet) {
      ctx.app.ws.clientsSet = new Map().set("-1",ctx.websocket);
    }
    await next()
  };
};
