'use strict';

const Service = require('egg').Service;

class TypeService extends Service {
  async query() {
    const { ctx, app } = this;
    const QUERY_STR = '*';
    const sql = `select ${QUERY_STR} from type `;
    try {
      const result = await app.mysql.query(sql);
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = TypeService;
