'use strict';

const Service = require('egg').Service;

class taskService extends Service {
  async query(params) {
    const { app, ctx } = this;
    const token = ctx.request.header.authorization;
    const decode = await app.jwt.verify(token, app.config.jwt.secret);
    if (!decode) return;
    const userid = decode.id;
    const { whereObj, limit, offset } = params;
    let deleteFlag = 'deleteFlag = 1';
    let whereParams = 'where 1 and ' + deleteFlag;
    console.log(whereObj);
    for (let i in whereObj) {
      if (i !== 'pointer') {
        whereParams += ' and ' + i + ' like "%' + whereObj[i] + '%"';
      }
    }
    whereParams +=
      ' and B.dictQuery = "任务状态" and  B.dictParams = "任务状态" ';
    if (whereObj.pointer === '0') {
      whereParams += ' and taskPointerId = ' + userid;
    } else {
      whereParams += ' and taskPointerToId = ' + userid;
    }
    try {
      const list = await app.mysql.query(
        'select A.*,B.dictLabel as statusName  from task A  LEFT JOIN dict B  ON  A.status=B.dictValue ' +
          whereParams +
          ' limit ' +
          offset +
          ',' +
          limit
      );
      const total = await app.mysql.query(
        'select A.*,B.dictLabel as statusName  from task A  LEFT JOIN dict B  ON  A.status=B.dictValue ' +
          whereParams
      );
      return { list, total: total.length };
    } catch (error) {
      throw Error(error);
    }
  }
  async add(params) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('task', params);
      return result;
    } catch (error) {
      return null;
    }
  }
  async queryByDate(date) {
    const { app } = this;
    try {
      const sql =
        'select count(*) as statusCount  from task  where taskPointerTime like date and deleteFlag = 1';
      const result = await app.mysql.query(sql);
      return result;
    } catch (error) {
      return null;
    }
  }
  async queryByStatus(date, status) {
    const { app } = this;
    try {
      const sql =
        "select count(*) as statusCount  from task  where taskPointerTime like '" +
        date +
        "%' and status = " +
        status +
        ' group by status;';
      const result = await app.mysql.query(sql);

      return result[0];
    } catch (error) {
      return null;
    }
  }
  async queryByLikePointerTime() {
    const { app } = this;
    try {
      const sql =
        "select date_format(taskPointerTime,'%Y-%m-%d') as taskPointerTime ,count(*) as count  from task where deleteFlag = 1 group by date_format(taskPointerTime,'%Y-%m-%d') ";
      const result = await app.mysql.query(sql);

      return result;
    } catch (error) {
      return null;
    }
  }

  async addTask(params) {
    const { app } = this;
    try {
      const result = await app.mysql.insert('task', params);
      return result;
    } catch (error) {
      return null;
    }
  }
  async updTask(params) {
    const { app } = this;
    try {
      const result = await app.mysql.update('task', params, {
        where: {
          taskId: params.taskId,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async delTask(id) {
    const { app } = this;
    try {
      const result = await app.mysql.update(
        'task',
        { deleteFlag: 0 },
        {
          where: {
            taskId: id,
          },
        }
      );
      return result;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  async finishTask(params) {
    const { app } = this;
    try {
      const result = await app.mysql.update(
        'task',
        {
          status: 1,
        },
        {
          where: {
            taskId: params.taskId,
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

module.exports = taskService;
