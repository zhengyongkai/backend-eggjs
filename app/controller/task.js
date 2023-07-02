'use strict';
const Controller = require('egg').Controller;
const { responseFormat, responseHandleFormat } = require('../utils/utils');
class taskController extends Controller {
  async query() {
    const { ctx } = this;
    const { page = 1, ...filter } = ctx.query;
    const limit = parseInt(ctx.query.limit) || 10;
    // 假删除
    const whereObj = {};
    for (const x in filter) {
      switch (x) {
        case 'taskName':
          whereObj.taskName = filter[x];
          break;
        case 'taskContent':
          whereObj.taskContent = filter[x];
          break;
        case 'taskPointerTime':
          whereObj.taskPointerTime = filter[x];
          break;
        case 'pointer':
          whereObj.pointer = filter[x];

          break;
        case 'status':
          whereObj.status = filter[x];

          break;
        default:
          break;
      }
    }
    try {
      const { total, list } = await ctx.service.task.query({
        whereObj,
        limit: limit ? limit : null,
        offset: page ? (page - 1) * limit : null,
      });
      for (let i of list) {
        // 获取用户ID
        const result = await ctx.service.user.getUserById(i.taskPointerId);
        i.taskPointer = result;
        i.taskPointerName = result?.nickname;
        const pointerTo = await ctx.service.user.getUserById(i.taskPointerToId);
        i.taskPointerTo = pointerTo;
        i.taskPointerToName = pointerTo?.nickname;
        // 获取状态名称
      }
      ctx.body = responseFormat(true, {
        limit,
        page: Number(page),
        total,
        pages: Math.ceil(total / limit),
        list,
      });
    } catch ({ message }) {
      ctx.body = responseFormat(false, message);
    }
  }

  async queryDate() {
    const { ctx } = this;
    try {
      const result = await this.service.task.queryByLikePointerTime();
      for (let data of result) {
        let { taskPointerTime } = data;
        let { statusCount } = await this.service.task.queryByStatus(
          taskPointerTime,
          0
        );
        data.statusCount = statusCount;
      }
      ctx.body = responseFormat(true, result);
    } catch ({ message }) {
      ctx.body = responseFormat(false, message);
    }
  }

  async saveTask() {
    const { ctx } = this;
    const {
      taskId,
      taskName,
      taskPointerId,
      taskFinishTime,
      taskPointerTime,
      taskPointerToId,
      taskContent,
      status,
    } = ctx.request.body;
    let result = null;
    if (taskId) {
      result = await ctx.service.task.updTask({
        taskName,
        taskPointerId,
        taskFinishTime,
        taskPointerTime,
        taskPointerToId,
        taskContent,
        status,
        taskId,
      });
    } else {
      result = await ctx.service.task.addTask({
        taskName,
        taskPointerId,
        taskFinishTime,
        taskPointerTime,
        taskPointerToId,
        taskContent,
        status,
      });
    }
    if (result) {
      ctx.body = responseHandleFormat(true);
    } else {
      ctx.body = responseHandleFormat(false);
    }
  }
  async delTask() {
    const { ctx } = this;
    const { taskId } = ctx.request.body;
    const result = await ctx.service.task.delTask(taskId);
    if (result) {
      ctx.body = responseHandleFormat(true);
    } else {
      ctx.body = responseHandleFormat(false);
    }
  }

  async finishTask() {
    try {
      const { ctx } = this;
      const { taskId } = ctx.request.body;
      const result = await ctx.service.task.finishTask({
        taskId,
      });
      if (result) {
        ctx.body = responseHandleFormat(true);
      } else {
        ctx.body = responseHandleFormat(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = taskController;
