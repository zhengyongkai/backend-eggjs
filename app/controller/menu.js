'use strict';
const Controller = require('egg').Controller;
const moment = require('moment');
const { responseFormat, responseHandleFormat } = require('../utils/utils');
class MenuController extends Controller {
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
        default:
          break;
      }
    }
    try {
      const { total, list } = await ctx.service.menu.query({
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
  async saveMenu() {
    const { ctx } = this;
    const {
      id,
      pid = 0,
      title,
      icon,
      url,
      status,
      menuType,
      buttonRole,
      orders,
    } = ctx.request.body;
    let result = null;
    if (id) {
      //   result = await ctx.service.type.update({ name, id });
      result = await ctx.service.menu.editMenu({
        id,
        pid,
        title,
        icon,
        url,
        status,
        menuType,
        buttonRole,
        orders,
      });
    } else {
      result = await ctx.service.menu.addMenu({
        pid,
        title,
        icon,
        url,
        status,
        menuType,
        buttonRole,
        orders,
        createtime: moment(new Date()).format('YYYY/MM/DD'),
      });
    }
    if (result) {
      ctx.body = responseHandleFormat(true);
    } else {
      ctx.body = responseHandleFormat(false);
    }
  }

  async deleteMenu() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    const result = await ctx.service.menu.delete(id);
    if (result) {
      ctx.body = responseFormat(true, {
        result,
      });
    } else {
      ctx.body = responseHandleFormat(false);
    }
  }
}

module.exports = MenuController;
