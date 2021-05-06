import React from 'react';
import { Modal, Form } from 'antd';
import { useOnePost, useOnePageInit } from '../../../utils/oneHooks';
import request from '../../../utils/request';
import { FormInstance } from 'antd/lib/form';

export type ModalType = 'create' | 'update';

export type FormModalProps = {
  /** 样式属性 */
  style?: React.CSSProperties;
  /** 类名 */
  className?: string;
  /** 请求的URL地址，向服务器请求的是Rest风格的API */
  url: string;
  /** 单独的请求地址 */
  postUrl?: string;
  /** 标题 */
  title: string | React.ReactNode;
  /** Form */
  form: FormInstance;
  /** 类型*/
  modalType: ModalType;

  /** 在修改时，需要用到ID字段 */
  id?: string;

  button: string | React.ReactNode;
  /** 提交成功后的表格查询回调*/
  searchSubmit: () => void;
  /** 叫个这会更好理解一些*/
  onSubmitOk?: () => void;
};

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};

const FormModal: React.FC<FormModalProps> = props => {
  //这样写会更清晰一些
  const { url, id, title, children, button, form, postUrl, modalType, searchSubmit, ...restProps } = props;
  //显示前加载的请求
  const { initData, runInit } = useOnePageInit(url + '/init');
  //post提交逻辑
  const { modalProps, setVisible } = useOnePost(postUrl ? postUrl : url, form, {}, searchSubmit, modalType, id);

  function showModal() {
    // runInit();

    // if (modalType != 'create') {
    //   request.get(`${url}/${id}`).then(res => {
    //     form.setFieldsValue(res.data);
    //   });
    // } else {
    //   //看一下是否有默认值回来
    //   //initData
    //   if (initData?.initData) {
    //     form.setFieldsValue(initData.initData);
    //   }
    // }

    setVisible(true);
  }

  const itemOpts = {
    initData,
    modalType,
    url,
    form,
  };

  const _children = React.Children.map(children, (child: any, i) => {
    // console.log(child);
    if (typeof child.type == 'function') {
      // console.log(child.type.name);
      // 只针对x节点做处理
      // if ('FormItemx' === child.type.name) {
      return {
        ...child,
        props: {
          ...itemOpts,
          ...child.props,
        },
      };
      // } else {
      //   return child;
      //   // 这里还需要考虑多层
      // }
    } else {
      return child;
    }
  });

  return (
    <>
      <span onClick={showModal}>{button}</span>
      <Modal title={title} {...modalProps}>
        <Form {...layout} form={form} name="control-hooks">
          {_children}
        </Form>
      </Modal>
    </>
  );
};

FormModal.displayName = 'FormModal';

export default FormModal;
