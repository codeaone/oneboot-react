import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Select, Checkbox, Tag, Row, Col, Space } from 'antd';
import { FormInstance } from 'antd/lib/form';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
import EditableCell from './EditableCall';
import _ from 'lodash';
const Option = Select.Option;
const { TextArea } = Input;
const CheckboxGroup = Checkbox.Group;

export const EditableContext = React.createContext<FormInstance<any> | null>(null);

export type FormItemType =
  | 'datepicker'
  | 'input'
  | 'text'
  | 'select'
  | 'multiselect'
  | 'cascader'
  | 'number'
  | 'checkbox'
  | 'radio'
  | 'textarea'
  | 'treeselect';

export interface EditableProps {
  initData?: any;
  typeName?: any;
}

interface EditableRowProps {
  index: number;
}

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

type EditableTableProps = Parameters<typeof Table>[0] & { initData: any };

interface EditableTableState {
  dataSource: any[];
  count: number;
}

type ColumnTypes = Exclude<EditableTableProps['columns'], undefined>;

class EditableTable extends React.Component<EditableTableProps, EditableTableState> {
  columns: (ColumnTypes[number] & { required?: boolean; type?: FormItemType; editable?: boolean; dataIndex: string })[];

  constructor(props: EditableTableProps) {
    super(props);

    this.columns = this.props.columns;

    this.state = {
      dataSource: this.props.dataSource,
      count: 2,
    };
  }

  handleSave = (row: any) => {
    console.log(row);

    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  };

  render() {
    const { dataSource } = this.state;
    const { initData = {} } = this.props;
    const components = {
      body: {
        row: EditableRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: any) => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          option: initData[col.dataIndex],
          type: col.type,
          required: col.required,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Table components={components} rowClassName={() => 'editable-row'} bordered dataSource={dataSource} columns={columns as ColumnTypes} />
      </div>
    );
  }
}

// EditableTable.displayName = 'EditableTable';

export default EditableTable;
