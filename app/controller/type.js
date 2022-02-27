'use strict';

const Controller = require('egg').Controller;

class TypeController extends Controller {
  async query() {
    const { ctx } = this;
    const params = ctx.query;
    // 账单的相关参数，这里注意要把账单的 id 也传进来
    const limit = params.limit ? params.limit : 10;
    const page = params.page ? params.page : 1;
    delete params.limit;
    delete params.page;
    try {
      const pageList = await ctx.service.type.queryCount();
      const result = await ctx.service.type.query(params, limit, page - 1);
      ctx.body = {
        code: 200,
        msg: '请求成功',
        data: {
          list: result,
          total: pageList.length,
          page,
          pages: Math.ceil(pageList.length / limit),
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
