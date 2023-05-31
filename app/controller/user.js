// controller/user.js
'use strict';

const Controller = require('egg').Controller;
const { responseFormat } = require('../utils/utils');
class UserController extends Controller {
  async register() {
    const { ctx } = this;
    const { username, password, nickname } = ctx.request.body; // 获取注册需要的参数
    const userInfo = await ctx.service.user.getUserByName(username); // 获取用户信息

    // 判断是否已经存在
    if (userInfo && userInfo.id) {
      ctx.body = {
        code: 500,
        msg: '账户名已被注册，请重新输入',
        data: null,
        success: false,
      };
      return;
    }
    const defaultAvatar =
      'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png';
    // 调用 service 方法，将数据存入数据库。
    const result = await ctx.service.user.register({
      username,
      password,
      nickname,
      ctime: new Date().getTime(),
      signature: '世界和平。',
      avatar: defaultAvatar,
    });

    if (result) {
      ctx.body = {
        code: 200,
        msg: '注册成功',
        data: null,
        success: true,
      };
    } else {
      ctx.body = {
        code: 500,
        msg: '注册失败',
        data: null,
        success: false,
      };
    }
  }

  async login() {
    // app 为全局属性，相当于所有的插件方法都植入到了 app 对象。
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    // 根据用户名，在数据库查找相对应的id操作
    const userInfo = await ctx.service.user.getUserByName(username);
    // 没找到说明没有该用户
    if (!userInfo || !userInfo.id) {
      ctx.status = 500;
      ctx.body = {
        code: 500,
        msg: '账号不存在',
        success: false,
        data: null,
      };
      return;
    }
    // 找到用户，并且判断输入密码与数据库中用户密码。
    if (userInfo && password !== userInfo.password) {
      ctx.status = 500;
      ctx.body = {
        code: 500,
        msg: '账号密码错误',
        success: false,
        data: null,
      };
      return;
    }
    const token = app.jwt.sign(
      {
        id: userInfo.id,
        username: userInfo.username,
        exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // token 有效期为 24 小时
      },
      app.config.jwt.secret
    );

    ctx.body = {
      code: 200,
      message: '登录成功',
      success: true,
      data: {
        token,
      },
    };
  }
  async getUserInfo() {
    const { ctx, app } = this;
    const token = ctx.request.header.authorization;
    // 通过 app.jwt.verify 方法，解析出 token 内的用户信息
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    // 通过 getUserByName 方法，以用户名 decode.username 为参数，从数据库获取到该用户名下的相关信息
    const userInfo = await ctx.service.user.getUserByName(decode.username);
    // 获取菜单列表
    const menu = await ctx.service.menu.query({
      deleteFlag: 1,
    });
    // userInfo 中应该有密码信息，所以我们指定下面四项返回给客户端
    const defaultAvatar =
      'http://s.yezgea02.com/1615973940679/WeChat77d6d2ac093e247c361f0b8a7aeb6c2a.png';
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data: {
        id: userInfo.id,
        username: userInfo.username,
        signature: userInfo.signature || '',
        avatar: userInfo.avatar || defaultAvatar,
        nickname: userInfo.nickname || '不知名先生',
        menu,
      },
    };
  }
  async editUserInfo() {
    const { ctx, app } = this;
    // 通过 post 请求，在请求体中获取签名字段 signature
    const { signature = '', avatar = '', nickname = '' } = ctx.request.body;

    try {
      let user_id = null;
      const token = ctx.request.header.authorization;
      // 解密 token 中的用户名称
      const decode = await app.jwt.verify(token, app.config.jwt.secret);
      if (!decode) return;
      user_id = decode.id;
      // 通过 username 查找 userInfo 完整信息
      const userInfo = await ctx.service.user.getUserByName(decode.username);
      // 通过 service 方法 editUserInfo 修改 signature 信息。
      await ctx.service.user.editUserInfo({
        ...userInfo,
        signature,
        avatar,
        nickname,
      });

      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          id: user_id,
          signature,
          username: userInfo.username,
          nickname,
        },
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        message: '请求失败',
        data: {
          error,
        },
      };
    }
  }
  async getUserInfoById() {
    const { ctx } = this;
    const { id } = ctx.query;
    const userInfo = await ctx.service.user.getUserById(id);
    ctx.body = {
      code: 200,
      msg: '请求成功',
      data: {
        id: userInfo.id,
        username: userInfo.username,
        signature: userInfo.signature || '',
        avatar: userInfo.avatar || defaultAvatar,
        nickname: userInfo.nickname || '不知名先生',
      },
    };
  }

  async getUserList() {
    const { ctx } = this;
    const { page = 1, ...filter } = ctx.query;
    const limit = parseInt(ctx.query.limit) || 10;
    // 假删除
    const whereObj = { deleteFlag: 1 };
    for (const x in filter) {
      switch (x) {
        case 'username':
          whereObj.username = filter[x];
          break;
        default:
          break;
      }
    }
    try {
      const { total, list } = await ctx.service.user.getUserList({
        whereObj,
        limit: limit ? limit : null,
        offset: page ? (page - 1) * limit : null,
      });
      ctx.body = responseFormat(true, {
        limit,
        page,
        total,
        pages: Math.ceil(total / limit),
        list,
      });
    } catch ({ message }) {
      ctx.body = responseFormat(false, message);
    }
  }
}

module.exports = UserController;
