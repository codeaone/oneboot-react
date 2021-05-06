/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification, Modal } from 'antd';
import qs from 'qs';

//这里可以做为配置，由服务端下发证书
const publicKey = `-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDlOJu6TyygqxfWT7eLtGDwajtN
FOb9I5XRb6khyfD1Yt3YiCgQWMNW649887VGJiGr/L5i2osbl8C9+WJTeucF+S76
xFxdU6jE0NQ+Z+zEdhUTooNRaY5nZiu5PgDB0ED/ZKBUSLKL7eibMxZtMlUDHjm4
gwQco1KRMDSmXSMkDwIDAQAB
-----END PUBLIC KEY-----`;

var isErrorModal = false;

type codeType = {
  [propName: string]: any; //表示还有更多的属性
};

const codeMessage: codeType = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};
/**
 * 异常处理程序
 */

const errorHandler = (error: any) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return {success: false, resultView:'网络异常'};
  // return response;
};

/**
 * 用于接口传输加密使用
 * @param password
 */
const encryptData = (password: string) => {
  var encrypt = new JSEncrypt();
  encrypt.setPublicKey(publicKey);
  return encrypt.encrypt(password);
};

/**
 * 配置request请求时的默认参数
 */
const headers = {
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  'x-requested-with': 'XMLHttpRequest',
};

const request = extend({
  //mock
  prefix: window.path,
  errorHandler,
  headers,
  // 默认错误处理
  credentials: 'include', // 默认请求是否带上cookie
});

request.use(async (ctx, next) => {
  // console.log(ctx);
  ///api/login/account
  // if('/api/login/account' === )
  if (window.passwordEncrypt) {
    if (ctx.req.url.indexOf('account') > 0) {
      const body = qs.parse(<string>ctx.req.options.body || '');
      let { password } = body;
      const timestamp = new Date().getTime().toString();
      if (password) {
        password = encryptData(`${password}|${timestamp}`);
      }
      body.password = password;
      body.timestamp = timestamp;
      ctx.req.options.body = qs.stringify(body);
    }
  }

  await next();
  const { res } = ctx;
  // console.log(res);

  const { success = false } = res;

  if (!success) {
    // 对异常情况做对应处理
    if ('401' === res.resultCode) {
      if (!isErrorModal) {
        isErrorModal = true;

        Modal.error({
          title: '访问失败',
          content: '您的会话已过期，需要重新登录',
          onOk() {
            //window.location = response.url;
            window.location.reload();
            return new Promise(resolve => {
              setTimeout(resolve, 1);
            });
          },
        });
      }
    }
  }
});

export default request;

/**
 * 提交增加的数据
 */
export async function post(module: string, params: any) {
  return request.post(module, {
    body: qs.stringify(params),
  });
}
