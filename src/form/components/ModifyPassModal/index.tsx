import React, { useState } from 'react';
import { Form, Input, Modal, message, Alert, Popover, Progress } from 'antd';
import { request } from '@/utils';
import qs from 'qs';
import styles from './style.less';

export type ModifyPassModalProps = {
  /** 样式属性 */
  style?: React.CSSProperties;
  /** 类名 */
  className?: string;
  /** 点击事件 */
  onClick: () => void;
  /** test */
  test?: string;
};

const ModifyPassModal: React.FC<ModifyPassModalProps> = props => {
  //这样写会更清晰一些
  const { children, style, onClick, ...restProps } = props;

  // 如果没有权限，需要不同的提示方式
  return (
    <a style={style} onClick={onClick}>
      {children}
    </a>
  );
};

export default ModifyPassModal;
