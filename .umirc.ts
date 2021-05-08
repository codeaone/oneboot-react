import { defineConfig } from 'dumi';

const repo = 'oboot';

export default defineConfig({
  title: repo,
  favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  hash: true,
  // Because of using GitHub Pages
  //base: `/${repo}/`,
  //publicPath: `/${repo}/`,
  exportStatic: {}, // 将所有路由输出为 HTML 目录结构，以免刷新页面时 404
  scripts:['https://hm.baidu.com/hm.js?cf0f93db26a2fc4826a9869ce2decb05'],
  navs: [
    null,
    {
      title: 'GitHub',
      path: 'https://github.com/codeaone/oneboot-react',
    },
  ],
  // more config: https://d.umijs.org/config
});
