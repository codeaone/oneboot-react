declare module '*.css';
declare module '*.less';

interface Window {
  appid: string;
  key: string;
  token: string;
  gateway: string;
  isDev: boolean;
  user: any;
  viewAuth: string;
  authlist: string[];
  cloumnsAuth: any;
}
