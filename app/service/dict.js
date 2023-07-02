'use strict';

const Service = require('egg').Service;

class dictService extends Service {
  async query(params) {
    const { app } = this;
    const { whereObj, limit, offset } = params;
    try {
      const list = await app.mysql.select('dict', {
        where: whereObj,
        limit,
        offset,
      });
      const total = await app.mysql.count('dict', whereObj);
      return { list, total };
    } catch (error) {
      throw Error(error);
    }
  }

  async queryByParams(dictParams) {}
}
module.exports = dictService;
