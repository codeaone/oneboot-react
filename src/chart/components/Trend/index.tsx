import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';
import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

export type TrendProps = {
  /** 样式属性 */
  style?: React.CSSProperties;
  /** 类名 */
  className?: string;
  colorful?: boolean;
  flag: 'up' | 'down';
  reverseColor?: boolean;
};

const Trend: React.FC<TrendProps> = props => {
  //这样写会更清晰一些
  const { colorful = true, reverseColor = false, flag, children, className, ...restProps } = props;

  const classString = classNames(
    styles.trendItem,
    {
      [styles.trendItemGrey]: !colorful,
      [styles.reverseColor]: reverseColor && colorful,
    },
    className,
  );

  // 如果没有权限，需要不同的提示方式
  return (
    <div {...restProps} className={classString} title={typeof children === 'string' ? children : ''}>
      <span>{children}</span>
      {flag && <span className={styles[flag]}>{flag === 'up' ? <CaretUpOutlined /> : <CaretDownOutlined />}</span>}
    </div>
  );
};

export default Trend;
