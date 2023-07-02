'use strict';
const Controller = require('egg').Controller;
const { responseFormat, responseHandleFormat } = require('../utils/utils');
class dictController extends Controller {
  async query() {
    const { ctx } = this;
    const { page = 1, ...filter } = ctx.query;
    const limit = parseInt(ctx.query.limit) || 10;
    // 假删除
    const whereObj = {};
    for (const x in filter) {
      switch (x) {
        case 'dictParams':
          whereObj.dictParams = filter[x];
          break;
        case 'dictQuery':
          whereObj.dictQuery = filter[x];
          break;
        default:
          break;
      }
    }
    try {
      const { total, list } = await ctx.service.dict.query({
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
module.exports = dictController;
