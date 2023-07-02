async function getList(app, dataSource, whereParams, limit, offset) {
  const list = await app.mysql.query(
    'select *  from ' +
      dataSource +
      ' ' +
      whereParams +
      ' limit ' +
      offset +
      ',' +
      limit
  );
  const total = await app.mysql.query('select *  from task ' + whereParams);
  return { list, total: total.length };
}

module.exports = {
  getList,
};
