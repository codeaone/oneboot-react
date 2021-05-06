import React from 'react';
import { getAuth } from '../../../utils';

export type AuthAProps = {
  children: React.ReactNode;

  /** 所需要的权限code */
  auth?: string;
  /** 样式属性 */
  style?: React.CSSProperties;
  /** 类名 */
  className?: string;
  /** 点击事件 */
  onClick: () => void;
};

const AuthA = ({ children, auth, style, onClick }: AuthAProps) => {
  // 如果没有权限，需要不同的提示方式
  if (getAuth(auth)) {
    return (
      <a style={style} onClick={onClick}>
        {children}
      </a>
    );
  } else {
    return null;
  }
};

export default AuthA;
