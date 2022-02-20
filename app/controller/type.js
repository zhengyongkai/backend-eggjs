'use strict';


const Controller = require('egg').Controller;

class TypeController extends Controller {
  async query() {
    const { ctx, app } = this;
    // 账单的相关参数，这里注意要把账单的 id 也传进来
    try {
      const result = await ctx.service.type.query();
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          list: result,
        },
      };
    } catch (error) {
      ctx.body = {
        code: 500,
        msg: '系统错误',
        data: null,
      };
    }
  }

}

module.exports = TypeController;
