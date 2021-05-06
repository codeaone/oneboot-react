import React from 'react';
import { Checkbox } from 'antd';
import { CheckboxProps } from 'antd/lib/checkbox';

export interface EditableBoxProps extends CheckboxProps {
  initData?: any;
  typeName?: any;
  options?: any;
  check?: () => void;
  cancel?: () => void;
}

/**
 * 输入框
 * @param props
 */
const EditableBox: React.FC<EditableBoxProps> = props => {
  // console.log(props);

  //这样写会更清晰一些
  const { children, initData, typeName, options, check, cancel, ...restProps } = props;
  return (
    <>
      <Checkbox.Group options={options} {...restProps} />
      <a onClick={check}>保存</a>
      &nbsp;&nbsp;
      <a onClick={cancel}>取消</a>
    </>
  );
};

// OneInput.defaultProps = {
//   initData: {},
// };

EditableBox.displayName = 'EditableBox';

export default EditableBox;
