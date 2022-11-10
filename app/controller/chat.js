"use strict";

const Controller = require("egg").Controller;

class ChatController extends Controller {
  async index() {
    const { ctx, app } = this;
    const { params } = ctx;
    // 服務端
    app.ws.clientsSet.set(params.token, ctx.websocket);
    // 客戶端
    ctx.websocket.id = params.token;
    ctx.websocket
      .on("message", (msg) => {
        this.onMessage(params.token, msg);
      })
      .on("close", (code, reason) => {
        console.log("websocket closed", code, reason);
      });
  }
  async onMessage(token, msg) {
    const { ctx, app } = this;

    let message = JSON.parse(msg);
    console.log(message.receiverID,this.app.ws.clientsSet.get(message.receiverID))
    if (!this.app.ws.clientsSet.get(message.receiverID)) {
      return ctx.websocket.send("用戶不在線");
    }
    // 群聊
    // this.app.ws.clients.forEach((client) => {
    //   if (client.websocket.id === message.receiverID) {
    //     client.websocket.send(message.msg);
    //   }
    // });
    let client = app.ws.clientsSet.get(message.receiverID);
    // console.log(client)
    client.send(message.msg);
  }
}

module.exports = ChatController;
