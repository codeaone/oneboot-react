import React from 'react';
import { Select } from 'antd';
import { SelectProps } from 'antd/lib/select';
import { OneFieldFC } from '../../typings';

const Option = Select.Option;

export interface OneSelectProps extends SelectProps {
  initData?: any;
  typeName?: string;
  /** 查询场景 */
  search: boolean;
}

/**
 * 输入框
 * @param props
 */
const OneSelect: OneFieldFC<OneSelectProps> = (props, ref) => {
  //这样写会更清晰一些
  const { children, mode, initData = {}, typeName = '', search = false, ...restProps } = props;

  const renderOptionType = () => {
    if (initData[typeName] instanceof Array) {
      let dataType = [];
      if (search) {
        let name = '所有';
        dataType = [
          {
            name: name,
            pinyin: 'all',
            value: 'all',
          },
          ...initData[typeName],
        ];
      } else {
        dataType = initData[typeName];
      }
      // console.log(dataType);

      return dataType.map((type: { value: string; pinyin: string; name: React.ReactNode }) => (
        <Option key={type.value} pinyin={type.pinyin} value={type.value}>
          {type.name}
        </Option>
      ));
    }
  };
  return (
    <Select style={{ width: '100%', minWidth: '120px' }} showSearch optionFilterProp="pinyin" notFoundContent="无法找到" allowClear {...restProps}>
      {renderOptionType()}
    </Select>
  );
};

// OneSelect.defaultProps = {
//   initData: {},
// };

OneSelect.displayName = 'OneSelect';

export default React.forwardRef(OneSelect);
