export type OneFieldTextType = React.ReactNode | React.ReactNode[];

export type OneFieldEmptyText = string | false;

export type OneFieldFCMode = 'read' | 'edit' | 'update';

type BaseOneFieldFC = {
  /**
   * 值的类型
   */
  text: React.ReactNode;

  fieldProps?: any;
  /**
   * 模式类型
   */
  mode: OneFieldFCMode;
  /**
   * 简约模式
   */
  plain?: boolean;
  /**
   * 轻量模式
   */
  light?: boolean;
  /**
   * label
   */
  label?: React.ReactNode;

  oneFieldKey?: React.Key;
};

/**
 * render 第二个参数，里面包含了一些常用的参数
 */
export type OneFieldFCRenderProps = {
  mode?: OneFieldFCMode;
  value?: any;
  onChange?: (value: any) => void;
} & BaseOneFieldFC;

export type OneRenderFieldProps = {
  render?: ((text: any, props: Omit<OneFieldFCRenderProps, 'value' | 'onChange'>, dom: JSX.Element) => JSX.Element) | undefined;
  renderFormItem?: ((text: any, props: OneFieldFCRenderProps, dom: JSX.Element) => JSX.Element) | undefined;
};

/**
 * 默认的 Field 需要实现的功能
 */
export type OneFieldFC<T> = React.ForwardRefRenderFunction<any, BaseOneFieldFC & OneRenderFieldProps & T>;
