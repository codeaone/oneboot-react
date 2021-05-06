import React from 'react';
import { Radio } from 'antd';
import { RadioProps } from 'antd/lib/radio';
import { OneFieldFC } from '../../typings';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

export interface OneRadioProps extends RadioProps {
  initData?: any;
  typeName: string;

  /** 查询场景 */
  search?: boolean;

  style?: any;
}

/**
 * 输入框
 * @param props
 */
const OneRadio: OneFieldFC<OneRadioProps> = (props, ref) => {
  //这样写会更清晰一些
  const { children, mode, initData = {}, typeName = '', style, ...restProps } = props;

  const renderRadio = () => {
    let options = [];
    if (initData[typeName] instanceof Array) {
      options = initData[typeName];
    }
    if (style === 'button') {
      return options.map((opt: { value: string | number | null | undefined; name: any }) => (
        <RadioButton key={opt.value} value={opt.value}>
          {opt.name}
        </RadioButton>
      ));
    }
    return options.map((opt: { value: string | number | null | undefined; name: any }) => (
      <Radio key={opt.value} value={opt.value}>
        {opt.name}
      </Radio>
    ));
  };

  return <RadioGroup {...restProps}>{renderRadio()}</RadioGroup>;
};

// OneRadio.defaultProps = {
//   initData: {},
// };

OneRadio.displayName = 'OneRadio';

export default React.forwardRef(OneRadio);
