import low from 'lowdb';
import Memory from 'lowdb/adapters/Memory';
import Mock from 'mockjs';
import { Request, Response } from 'express';

//创建一个内存DB
const adapter = new Memory('systelocl');
const db = low(adapter);

//增加手机号生成
Mock.Random.extend({
  mobile: function(date) {
    return Mock.mock(/[1][3-9][0-9]{9}/);
  },
});

export function post(res: Response, body: any, tableName: string) {
  db.get(tableName)
    .push(body)
    .write();
  setTimeout(() => {
    res.send({
      success: true,
      message: '操作成功',
      data: body,
    });
  }, 1200);
}
export function deleteObj(res: Response, params: any, tableName: string) {
  db.get(tableName)
    .remove(params)
    .write();
  setTimeout(() => {
    res.send({
      success: true,
      message: '操作成功',
    });
  }, 1000);
}
export function get(res: Response, params: any, tableName: string) {
  res.send({
    success: true,
    message: '操作成功',
    data: db
      .get(tableName)
      .find(params)
      .value(),
  });
}
export function getList(req: Request, res: Response, tableName: string) {
  const { current = 1, pageSize = 10, sortField = 'gmtCreate', sortOrder = 'desc', ...rest } = req.query;
  // console.log(req);
  // const params = req.params;

  let order = 'desc';
  if ('ascend' === sortOrder) {
    order = 'asc';
  }

  let dataSource = db
    .get(tableName)
    .filter(rest)
    .orderBy([sortField], [order])
    .value();

  //拿到分页数据
  let ds = [...dataSource].slice(((current as number) - 1) * (pageSize as number), (current as number) * (pageSize as number));

  const dataList = {
    data: {
      pageNo: parseInt(`${current}`, 10) || 1,
      pageSize: parseInt(`${pageSize}`, 10) || 20,
      result: ds,
      totalCount: dataSource.length,
    },
    success: true,
    message: '操作成功',
  };

  setTimeout(() => {
    res.send(dataList);
  }, 200);
}
export function patch(res: Response, params: any, body: any, tableName: string) {
  db.get(tableName)
    .find(params)
    .assign(body)
    .write();
  setTimeout(() => {
    res.send({
      success: true,
      message: '操作成功',
    });
  }, 1600);
}

export default db;
