import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Select, Checkbox, Tag, Row, Col, Space } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import _ from 'lodash';
const Option = Select.Option;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;
import { FormItemType,EditableContext } from './index';
import EditableBox from './EditableBox';

// const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  required?: boolean;
  children: React.ReactNode;
  dataIndex: string;
  record: any;
  option?: any[];
  type: FormItemType;
  handleSave: (record: any) => void;
  onChange?: () => void;
}

/**
 * 输入框
 * @param props
 */
const EditableCell: React.FC<EditableCellProps> = props => {
  const { title, editable, children, dataIndex, record, type, required = false, option = [], onChange, handleSave, ...restProps } = props;
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState();
  const inputRef = useRef<Input>(null);
  const form = useContext(EditableContext)!;

  // useEffect(() => {
  //   if (editing && inputRef) {
  //     inputRef.current!.focus();
  //   }
  // }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    // console.log(form);
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      // console.log(values);

      const value = form.getFieldValue(dataIndex);
      // console.log('===========' + value);
      setValue(value);

      toggleEdit();
      handleSave({ ...record, ...values });
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  const renderSelectOption = () => {
    if (option instanceof Array) {
      return option.map(type => (
        <Option key={type.value} value={type.value}>
          {type.label}
        </Option>
      ));
    }
  };

  const cancel = () => {
    setEditing(false);
  };

  const renderInputItem = () => {
    // console.log(onChange);

    switch (type) {
      case 'select':
        return (
          <Select ref={inputRef} onBlur={save} style={{ width: '100%' }}>
            {renderSelectOption()}
          </Select>
        );
      case 'multiselect':
        return (
          <Select ref={inputRef} mode="multiple" onBlur={save} autoFocus style={{ width: '100%', minWidth: '80px' }}>
            {renderSelectOption()}
          </Select>
        );
      case 'checkbox':
        // return <Checkbox.Group options={option} onBlur={save} />;
        return <EditableBox options={option} check={save} cancel={cancel} {...restProps}/>;
      default:
        return <Input ref={inputRef} autoFocus onPressEnter={save} onBlur={save} />;
    }
  };

  const renderLabel = () => {
    switch (type) {
      case 'checkbox':
        var _arr: any[] = value || [];
        // console.log(_arr);

        const oo = option.map(opt => {
          const i = _.findIndex(_arr, function(o) {
            return o === opt.value;
          });
          // console.log(i);

          return (
            <span key={i}>
              {opt.label}
              {i === -1 ? <CloseCircleOutlined style={{ color: 'red' }} /> : <CheckCircleOutlined style={{ color: 'green' }} />}
            </span>
          );
        });
        return <Space>{oo}</Space>;
      case 'select':
        var _str = value;
        if (_str) {
          var _obj = _.find(option, e => e.value === value) || {};
          // console.log(_obj);

          _str = _obj.label;
        }
        return _str;
      case 'multiselect':
        var _arr: any[] = value || [];
        return _arr.map(_m => {
          var _obj = _.find(option, e => e.value === _m) || {};
          return (
            <Tag key={_obj.value} color="blue">
              {_obj.label}
            </Tag>
          );
        });
      default:
        return children;
    }
  };

  const itemRules = () => {
    let rules = [];
    if (required) {
      rules.push({
        required: true,
        message: `请输入${title}.`,
      });
    }
    return rules;
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item style={{ margin: 0 }} name={dataIndex} rules={itemRules()}>
        {renderInputItem()}
      </Form.Item>
    ) : (
      <div className="editable-cell-value-wrap" style={{ paddingRight: 24 }} onClick={toggleEdit}>
        {renderLabel()}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

EditableCell.displayName = 'EditableCell';

export default EditableCell;
