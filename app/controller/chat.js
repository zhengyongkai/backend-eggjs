'use strict';

const Controller = require('egg').Controller;

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: '',
});
const openai = new OpenAIApi(configuration);

class ChatController extends Controller {
  chat = {
    你好: '你好呀' + '🙂',
    有什么好吃的:
      '请看看以下菜单:<br><ul><li><a>红烧鸡腿饭</a></li><li><a>白切鸡</a></li><li><a>烧鹅</a></li></ul>',
  };
  async index() {
    const { ctx, app } = this;
    const { params } = ctx;
    console.log('join', params, params.token);
    // 服務端
    app.ws.clientsSet.set(params.token, ctx.websocket);
    this.onlineMessage();
    // 客戶端
    ctx.websocket.id = params.token;
    ctx.websocket
      .on('message', (data) => {
        this.onMessageFormat(params.token, data);
      })
      .on('close', (code, reason) => {
        app.ws.clientsSet.delete(params.token);
        this.onlineMessage();
      });
  }
  async onlineMessage() {
    const { app } = this;
    this.onMessageGroup(app.ws.clientsSet, {
      type: 'OnLine',
      msg: Array.from(app.ws.clientsSet.keys()),
    });

    Array.from(app.ws.clientsSet.values()).forEach((user) => {
      user.send(
        JSON.stringify({
          type: 'OnLine',
          msg: Array.from(app.ws.clientsSet.keys()),
        })
      );
    });
  }
  async onMessageGroup(arr, receviewId, formid, msg) {
    const { ctx, app } = this;

    Array.from(arr.values()).forEach((user) => {
      // if(ctx.websocket.id === formid){
      //   return
      // }
      user.send(
        JSON.stringify({
          type: 'OnGroup',
          msg: {
            formid: formid,
            receviewId: receviewId,
            msg: msg,
          },
        })
      );
    });
  }
  async onMessagePerson(receviewId, formid, msg) {
    const { ctx, app } = this;
    let user = app.ws.clientsSet.get(receviewId);
    if (!user) {
      ctx.websocket.send(
        JSON.stringify({
          type: 'OnUndeUser',
          msg: {
            formid: '-1',
            receviewId: ctx.websocket.id,
            msg: '用户不存在',
          },
        })
      );
    } else {
      if (receviewId === '-1') {
        const messages = [{ role: 'user', content: msg }];
        const completion = await openai.createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: messages,
        });
        const completion_text = completion.data.choices[0].message.content;
        ctx.websocket.send(
          JSON.stringify({
            type: 'OnMessage',
            msg: {
              formid: '-1',
              receviewId: ctx.websocket.id,
              msg: completion_text,
            },
          })
        );
      } else {
        console.log('good');
        user.send(
          JSON.stringify({
            type: 'OnMessage',
            msg: {
              formid: formid,
              receviewId: receviewId,
              msg,
            },
          })
        );
      }
    }
  }

  async onMessageFormat(token, data) {
    // 判断是否是 ai 聊天 群聊 或者单聊
    const { ctx, app } = this;
    let message = JSON.parse(data);
    let { msg, receviewId, formid } = message;
    if (message.type === 'OnLine') {
      ctx.websocket.send(this.chat[msg]);
    }
    if (message.type === 'onGroup') {
      this.onMessageGroup(app.ws.clientsSet, receviewId, formid, msg);
    }
    if (message.type === 'onPerson') {
      console.log(typeof formid);
      this.onMessagePerson(receviewId, formid, msg);
    }
  }
}

module.exports = ChatController;
