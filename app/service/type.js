'use strict';

const Service = require('egg').Service;

class TypeService extends Service {
  async queryCount() {
    const { app } = this;
    try {
      const result = app.mysql.select('type');
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async query(params, limit = 10, offset = 0) {
    const { app } = this;
    try {
      limit = parseInt(limit);
      const result = app.mysql.select('type', {
        where: params,
        limit,
        offset: offset * limit,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = TypeService;
