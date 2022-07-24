'use strict';

const Service = require('egg').Service;

class UploadService extends Service {
  async query(params) {
    const { app } = this;
    try {
      const result = await app.mysql.get('img', params);
      return result;
    } catch (error) {
      return null;
    }
  }
  async add(params) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('img', params);

      return result.insertId;
    } catch (error) {
      return null;
    }
  }
}

module.exports = UploadService;
