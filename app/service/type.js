'use strict';

const Service = require('egg').Service;

class TypeService extends Service {
  async getTypeInfo(params) {
    const { app } = this;
    try {
      const result = await app.mysql.get('type', params);
      return result;
    } catch (error) {
      return null;
    }
  }
  async query(params) {
    const { app } = this;
    const { whereObj, limit, offset } = params;
    try {
      const list = await app.mysql.select('type', {
        where: whereObj,
        limit,
        offset,
      });
      const total = await app.mysql.count('type', whereObj);
      return { list, total };
    } catch (error) {
      throw Error(error);
    }
  }
  async add(params) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('type', params);
      return result;
    } catch (error) {
      return null;
    }
  }
  async update(params) {
    const { app } = this;
    try {
      const result = await app.mysql.update('type', params, {
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
      const result = await app.mysql.update(
        'type',
        { deleteFlag: 0 },
        {
          where: {
            id,
          },
        }
      );
      return result;
    } catch (error) {
      return null;
    }
  }
}

module.exports = TypeService;
