import React from 'react';

export type FormItemProps = {
  /** 样式属性 */
  style?: React.CSSProperties;
  /** 类名 */
  className?: string;
  /** 点击事件 */
  onClick: () => void;
  /** test */
  test?: string;
};

const FormItem: React.FC<FormItemProps> = props => {
  //这样写会更清晰一些
  const { children, style, onClick, ...restProps } = props;

  // 如果没有权限，需要不同的提示方式
  return (
    <a style={style} onClick={onClick}>
      {children}
    </a>
  );
};

FormItem.displayName = 'FormItem';

export default FormItem;
