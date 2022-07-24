'use strict';
const Controller = require('egg').Controller;
const { responseFormat, responseHandleFormat } = require('../utils/utils');
class TypeController extends Controller {
  async query() {
    const { ctx } = this;
    const { page = 1, ...filter } = ctx.query;
    const limit = parseInt(ctx.query.limit) || 10;
    // 假删除
    const whereObj = { deleteFlag: 1 };
    for (const x in filter) {
      switch (x) {
        case 'id':
          whereObj.id = filter[x];
          break;
        case 'name':
          whereObj.name = filter[x];
          break;
        default:
          break;
      }
    }
    try {
      const { total, list } = await ctx.service.type.query({
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
  async saveType() {
    const { ctx } = this;
    const { name, id } = ctx.request.body;
    let result = null;
    if (id) {
      result = await ctx.service.type.update({ name, id });
    } else {
      result = await ctx.service.type.add({ name });
    }
    if (result) {
      ctx.body = responseHandleFormat(true);
    } else {
      ctx.body = responseHandleFormat(false);
    }
  }
  async deleteType() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const result = await ctx.service.type.delete(id);
    if (result) {
      ctx.body = responseHandleFormat(true);
    } else {
      ctx.body = responseHandleFormat(false);
    }
  }
}

module.exports = TypeController;
