import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxProps } from 'antd/lib/checkbox';
import { OneFieldFC } from '../../typings';

export interface OneCheckboxProps extends CheckboxProps {
  initData?: any;

  typeName?: string;

  /** 是否不显示标签 */
  group?: boolean;
}

/**
 * 输入框
 * @param props
 */
const OneCheckbox: OneFieldFC<OneCheckboxProps> = (props, ref) => {
  //这样写会更清晰一些
  const { children, mode, typeName = '', initData = {}, group = false, value, onChange, ...restProps } = props;

  let options = [];
  if (initData[typeName] instanceof Array) {
    options = initData[typeName];
  }

  return (
    <>
      {group ? (
        <Checkbox.Group options={options} onChange={onChange} {...restProps} />
      ) : (
        <Checkbox style={{ paddingRight: 30 }} checked={value} onChange={onChange} {...restProps}>
          {children}
        </Checkbox>
      )}
    </>
  );
};

// OneCheckbox.defaultProps = {
//   initData: {},
// };

OneCheckbox.displayName = 'OneCheckbox';

export default React.forwardRef(OneCheckbox);
