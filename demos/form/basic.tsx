import React from 'react';
import { Table, Form, Button, Card, Divider, Input } from 'antd';
import { FormModal, FormItem } from '../../src/index';
import 'index.less';

const restUrl = '/api/system/dept';

const CreactModal = (props: any) => {
  const { children, modalType, id, searchSubmit } = props;
  const [form] = Form.useForm();

  // 在这里需要发起请求init ?

  return (
    <>
      <FormModal title="系统用户" searchSubmit={searchSubmit} id={id} form={form} modalType={modalType} url={restUrl} button={children}>
        <FormItem label="登录名称" name="name" type="input" />
        <FormItem label="用户状态" name="state" type="select" />
        <FormItem label="用户姓名" name="realName" type="input" />
      </FormModal>
    </>
  );
};

export default () => {
  const submit = () => {
    console.log('sumbit');
  };
  return (
      <Button>新加1</Button>
  );
};
