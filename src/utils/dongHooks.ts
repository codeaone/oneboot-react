import Nprogress from 'nprogress';
import request from './request';
import { useRequest } from 'ahooks';

/**
 * 发起Get请求
 *
 * @param url 请求URL
 * @param params 请求参数
 */
function useOneGet(url: string, params: any) {
  const { loading, data, run } = useRequest(
    (args: any) => {
      return request(url, {
        params: args,
      });
    },
    { ...params },
  );

  return { loading, data, run };
}

function useOneGetList(url: string, params: any) {
  const { loading, data, run } = useRequest(
    (args: any) => {
      return request(url, {
        params: args,
      });
    },
    { ...params },
  );

  let list = [];
  if (data && data.success) {
    list = data.data;
  }

  return { loading, list, run };
}

export { useOneGet, useOneGetList };
