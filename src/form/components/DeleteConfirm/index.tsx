import React from 'react';
import { AuthA } from '../../../view/index';
import { Popconfirm } from 'antd';
import { useOneDelete } from '../../../utils/oneHooks';

export type DeleteConfirmProps = {
  /** 请求的URL地址 */
  url: string;
  /** 删除时更清晰的提示 */
  text?: string;
  /** 需要删除的ID，这里可以是多个哟 */
  id: string;
  /** 所需要的权限code */
  auth?: string;
  /** 删除成功后，需要再提交查询操作 */
  searchSubmit?: () => void;
};

const DeleteConfirm: React.FC<DeleteConfirmProps> = props => {
  //这样写会更清晰一些
  const { url, children, auth, id, text, searchSubmit, ...restProps } = props;

  //请求服务端
  const { popProps, runDelete, showPopconfirm } = useOneDelete(url, { text, searchSubmit });

  return (
    <>
      <Popconfirm title="确定要删除吗？" {...popProps} onConfirm={() => runDelete(id)} overlayStyle={{ minWidth: 160 }}>
        <AuthA auth={auth} onClick={showPopconfirm}>
          {children}
        </AuthA>
      </Popconfirm>
    </>
  );
};

export default DeleteConfirm;
