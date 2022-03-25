'use strict';

const Service = require('egg').Service;

class newsService extends Service {
  async query(params) {
    const { app } = this;
    const { whereObj, limit, offset } = params;
    try {
      const list = await app.mysql.select('news', {
        where: whereObj,
        limit,
        offset,
      });
      const total = await app.mysql.count('news', whereObj);
      return { list, total };
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async add(params) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('news', params);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async update(params) {
    const { app } = this;
    try {
      const result = await app.mysql.update('news', params, {
        where: {
          id: params.id,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async delete(id) {
    const { app } = this;
    try {
      const result = await app.mysql.update('news', { deleteFlag: 0 }, {
        where: {
          id,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = newsService;
