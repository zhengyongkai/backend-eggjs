'use strict';

const Service = require('egg').Service;

class MenuService extends Service {
  //   async queryAll(params) {
  //     const { app } = this;
  //     try {
  //       const list = await app.mysql.select("menu", {
  //         where: params,
  //       });
  //       return { list };
  //     } catch (error) {
  //       return null;
  //     }
  //   }

  async query(params) {
    const { app } = this;
    const { whereObj = {} } = params;
    console.log(whereObj);
    try {
      const list = await app.mysql.select('menu', {
        where: whereObj,
      });
      const total = await app.mysql.count('menu', whereObj);
      return { list, total };
    } catch (error) {
      return null;
    }
  }

  async addMenu(params) {
    const { app } = this;
    const { pid, icon, url, status, title, menuType, buttonRole, orders } =
      params;
    try {
      const result = await app.mysql.insert('menu', {
        pid,
        icon,
        url,
        status,
        title,
        menuType,
        buttonRole,
        orders,
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async editMenu(params) {
    const { app } = this;
    const { pid, icon, url, status, title, menuType, buttonRole, orders } =
      params;
    try {
      const result = await app.mysql.update(
        'menu',
        {
          pid,
          icon,
          url,
          status,
          title,
          menuType,
          buttonRole,
          orders,
        },
        {
          where: {
            id: params.id,
          },
        }
      );
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
        'menu',
        { deleteFlag: 0 },
        {
          where: {
            id: id,
          },
        }
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}

module.exports = MenuService;
