'use strict';

const Service = require('egg').Service;

class UploadService extends Service {
  async add(params) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('img', params);
      return result;
    } catch (error) {
      return null;
    }
  }
}

module.exports = UploadService;
