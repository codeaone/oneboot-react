import React from 'react';
import { Input } from 'antd';
import { InputProps } from 'antd/lib/input';
import { OneFieldFC } from '../../typings';

export interface OneInputProps extends InputProps {
  initData?: any;
  typeName?: any;
}

/**
 * 输入框
 * @param props
 */
const OneInput: OneFieldFC<OneInputProps> = (props, ref) => {
  //这样写会更清晰一些
  const { children, mode, initData, typeName, onChange, ...restProps } = props;

  return <Input {...restProps} onChange={onChange} />;
};

// OneInput.defaultProps = {
//   initData: {},
// };

OneInput.displayName = 'OneInput';

export default React.forwardRef(OneInput);
