import { useState, useEffect } from 'react';
import Nprogress from 'nprogress';
import request from './request';
import { message, Modal } from 'antd';
import { useAntdTable, useRequest } from 'ahooks';
import { PaginatedParams } from 'ahooks/lib/useAntdTable';
import qs from 'qs';
import { filterQueryData } from './queryTool';
import { ColumnsType } from 'antd/lib/table';

type Antd4ValidateFields = (fieldNames?: string[]) => Promise<any>;

export interface Store {
  [name: string]: any;
}

export interface UseAntdTableFormUtils {
  getFieldInstance?: (name: string) => {}; // antd 3
  setFieldsValue: (value: Store) => void;
  getFieldsValue: (...args: any) => Store;
  resetFields: (...args: any) => void;
  validateFields: Antd4ValidateFields;
  [key: string]: any;
}

const key = 'updatableEditModal';

function formatResult(res: { data: { result: any; totalCount: any } }) {
  console.log(res);

  let list = res.data ? res.data.result : null;
  if (!list) {
    list = res.data || [];
  }

  const data = {
    list: list,
    total: res.data ? res.data.totalCount : list.length,
  };
  return data;
}
/**
 * 在页面初始化时，向服务端获取初始表单值
 *
 * @param url 请求URL
 * @param params 请求参数
 */
function useOnePageInit(url: string) {
  const { data, run } = useRequest(
    (args?: any) => {
      if (args) {
        return request(`${url}?${qs.stringify(args)}`);
      } else {
        return request(url);
      }
    },
    {
      manual: true,
      formatResult: res => {
        console.log(res);

        const { success, message, data, ...restdata } = res;

        return data;
      },
    },
  );
  return { initData: data, runInit: run };
}

function useOneDelete(url: string, params: any) {
  const [visible, setVisible] = useState(false);
  const { text = '', searchSubmit } = params;

  const { loading, run } = useRequest(
    (id: any) => {
      console.log(id);
      return request(`${url}/${id}`, {
        method: 'DELETE',
      });
    },
    {
      manual: true,
      onSuccess: (data, params) => {
        console.log('================onSuccess===================');
        console.log(data);
        console.log(params);
        const { success = false } = data;
        if (success) {
          setVisible(false);
          message.success({ content: '操作成功！', key, duration: 1 });
          if (searchSubmit) {
            searchSubmit();
          }
        } else {
          Modal.error({
            title: '操作失败',
            content: data.message,
            okText: '知道了',
          });
          message.destroy(key);
        }
      },
      onError: (error, params) => {
        console.log(error);
        console.log(params);
        console.log('================onError===================');
        setVisible(false);
        // Modal.error({
        //   title: '操作失败',
        //   content: d.resultView,
        //   okText: '知道了',
        // });
        // 这个时候，要再次发起查询才行呀
        message.destroy(key);
        // setConfirmLoading(false);
      },
    },
  );
  function runDelete(id: string) {
    console.log('runDelete' + id);

    message.loading({ content: `正在删除 ${text} 数据...`, key });
    run(id);
  }
  function showPopconfirm() {
    setVisible(true);
  }

  function handleOk() {
    setTimeout(() => {
      setVisible(false);
    }, 2000);
  }

  function handleCancel() {
    console.log('Clicked cancel button');
    setVisible(false);
  }

  const popProps = {
    visible,
    okButtonProps: { loading },
    onCancel: handleCancel,
  };

  return { showPopconfirm, runDelete, popProps };
}

/**
 * 向服务端发起POST请求，主要使用在表单提交，此处会做数据幂等异常提示处理
 *
 * @param url 请求URL
 * @param params 请求参数
 */
function useOnePost(url: string, form: UseAntdTableFormUtils, params: any, searchSubmit?: () => void, modalType?: string, id?: string) {
  const [visible, setVisible] = useState(false);
  let method = 'POST';
  let useUrl = url;
  if (modalType != 'create') {
    method = 'PATCH';
    useUrl = `${url}/${id}`;
  }
  const { loading, run } = useRequest(
    (args: any) => {
      return request(useUrl, {
        method: method,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: qs.stringify(args),
      });
    },
    {
      manual: true,
      onSuccess: (data, params) => {
        console.log('================onSuccess===================');
        console.log(data);
        console.log(params);
        const { success = false } = data;
        if (success) {
          setVisible(false);
          message.success({ content: '操作成功！', key, duration: 1 });
          form.resetFields();
          if (searchSubmit) {
            searchSubmit();
          }
        } else {
          Modal.error({
            title: '操作失败',
            content: data.message,
            okText: '知道了',
          });
          message.destroy(key);
        }
      },
      onError: (error, params) => {
        console.log(error);
        console.log(params);
        console.log('================onError===================');
        // Modal.error({
        //   title: '操作失败',
        //   content: d.resultView,
        //   okText: '知道了',
        // });
        message.destroy(key);
        // setConfirmLoading(false);
      },
    },
  );

  function runSubmit() {
    console.log(form);

    form
      .validateFields()
      .then(values => {
        const data = {
          ...values,
        };
        message.loading({ content: '正在提交数据...', key });
        console.log(data);
        run(data);
      })
      .catch(info => {
        console.log('Validate Failed:', info);
      });
  }

  function showModal() {
    setVisible(true);
  }

  function handleOk() {
    runSubmit();
  }

  function handleCancel() {
    setVisible(false);
  }

  const modalProps = {
    visible,
    setVisible,
    onOk: handleOk,
    showModal,
    onCancel: handleCancel,
    confirmLoading: loading,
  };

  return { loading, runSubmit, modalProps, setVisible };
}

export type SearchItemType = {
  label: string;
  name: string;
  value: any;
};

/**
 * 基于表单的查询列表
 *
 * @param url 请求URL
 * @param params 请求参数
 * @param form Form.useForm();
 * @param formatForm 格式化表单数据值，主要是需要处理一些日期类型的转换操作
 */
function useOneTable(url: string, params: any, form: any, _columns?: ColumnsType<any>, formatForm?: (arg0: any) => any) {
  const [searchItem, setSearchItem] = useState<SearchItemType[]>([]);
  const [filteredInfo, setFilteredInfo] = useState(null);
  const [sortedInfo, setSortedInfo] = useState(null);
  const [columns, setColumns] = useState(_columns);

  const setSortedInfoKey = (sorter: any) => {
    // console.log(sorter);

    setSortedInfo(sorter);
    columns?.map(col => {
      if (col.sorter && sorter?.field === col.dataIndex && sorter.order) {
        col.sortOrder = true;
        // console.log(col);
      }
    });

    // setColumns([...columns]);
  };

  // console.log(sortedInfo);

  const { tableProps, search } = useAntdTable(
    ({ current, pageSize, filters, sorter }: PaginatedParams[0], formData: Object) => {
      // console.info("========useAntdTable========");
      // console.info(formData);
      // console.info(form.getFieldsValue());

      const fdata = form.getFieldsValue();

      let data = formatForm ? formatForm(fdata) : fdata;
      data = filterQueryData(data);
      setFilteredInfo(filters);
      setSortedInfo(sorter);
      if (sorter) {
        // 排序的目前只支持一个

        let sorterCol: ColumnType[] = _columns.filter(col => col.dataIndex === sorter.field);
        let searchCol: SearchItemType[] = searchItem.filter(col => col.name === sorter.field);
        // if (searchCol.length === 1) {
        //   // 直接更新
        //   searchCol[0].value = sorter.order === 'ascend' ? '升序' : '降序';
        //   setSearchItem(searchItem);
        // }

        if (sorterCol.length === 1) {
          const itemCol: SearchItemType = {
            label: sorterCol[0].title,
            name: sorterCol[0].dataIndex,
            value: sorter.order === 'ascend' ? '升序' : '降序',
          };

          setSearchItem([itemCol]);
        }
      }
      return request.get(url, {
        params: {
          ...params,
          sortField: sorter?.field,
          sortOrder: sorter?.order,
          current,
          pageSize,
          ...filters,
          ...data,
        },
      });
    },
    {
      manual: true,
      defaultPageSize: 20,
      form,
      formatResult,
    },
  );

  const closeSearchTag = (name: string) => {
    console.log('======closeSearchTag=====' + name);
    let sorterCol = searchItem.filter(col => col.name != name);
    console.log(sorterCol);

    setSearchItem(sorterCol);
    columns.map(col => {
      if (col.sorter && sortedInfo?.field === col.dataIndex) {
        col.sortOrder = false;
      }
    });

    setColumns([...columns]);
    setSortedInfo(null);
    //这里要加条件的吧
    // 条件要在state中维护起来

    // search.submit({});
  };

  const { loading, pagination, ...resProps } = tableProps;
  //   console.log(resProps);

  let page = pagination;
  page.showTotal = total => ` 共 ${total} 条`;
  page.hideOnSinglePage = true;

  if (loading) {
    Nprogress.start();
  } else {
    Nprogress.done(true);
  }

  return { tableProps: { pagination: page, ...resProps, searchItem, closeSearchTag, filteredInfo, sortedInfo, setSortedInfo, columns }, search, setColumns };
}

export { useOnePost, useOneTable, key, useOneDelete, useOnePageInit };
