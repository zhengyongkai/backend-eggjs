'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  async index() {
    await this.ctx.service.cache.set('hi', "redis");
    var redis = await this.ctx.service.cache.get('hi');
    this.ctx.body = 'hi,' + redis;
  }
}

module.exports = IndexController;
