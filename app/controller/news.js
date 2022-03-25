'use strict';
const Controller = require('egg').Controller;
const { responseFormat, responseHandleFormat } = require('../utils/utils');
class NewsController extends Controller {
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
        case 'title':
          whereObj.title = filter[x];
          break;
        case 'content':
          whereObj.content = filter[x];
          break;
        default:
          break;
      }
    }
    const { total, list } = await ctx.service.news.query({
      whereObj,
      limit: limit ? limit : null,
      offset: page ? (page - 1) * limit : null,
    });
    for (const chunk of list) {
      chunk.user = await ctx.service.user.getUserInfo({ id: chunk.user_id });
      const type = await ctx.service.type.getTypeInfo({ id: chunk.type_id });
      chunk.type_name = type ? type.name : '';
      chunk.type_id = type ? type.id : '';
      chunk.frontImgList = [];
      for (const file of chunk.frontImg.split(',')) {
        chunk.frontImgList.push(await ctx.service.upload.query({ id: file }));
      }

      delete chunk.user_id;
    }

    ctx.body = responseFormat(true, {
      limit,
      page,
      total,
      pages: Math.ceil(total / limit),
      list,
    });
  }
  async saveNews() {
    const { ctx } = this;
    const { id, title, text_type, type_id, content, user_id, frontImg } = ctx.request.body;
    let result = null;
    if (id) {
      result = await ctx.service.news.update({ id, title, text_type, type_id, content, user_id, frontImg });
    } else {
      result = await ctx.service.news.add({ title, text_type, type_id, content, user_id, frontImg });
    }
    if (result) {
      ctx.body = responseHandleFormat(true);
    } else {
      responseHandleFormat(false);
    }
  }
  async deleteNews() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const result = await ctx.service.news.delete(id);
    if (result) {
      ctx.body = responseHandleFormat(true);
    } else {
      responseHandleFormat(false);
    }
  }
  async publichNews() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    let result = null;
    if (id) {
      result = await ctx.service.news.update({ id, status: 1 });
    }
    if (result) {
      ctx.body = responseHandleFormat(true);
    } else {
      responseHandleFormat(false);
    }
  }
}

module.exports = NewsController;
