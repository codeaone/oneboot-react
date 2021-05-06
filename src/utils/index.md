---
title: util - 工具集
nav:
  title: 组件
  path: /components
group:
  path: /
---

# ProCard 标准卡片

标准容器卡片，提供标准卡片样式，以及栅格布局能力。

## 何时使用

- 需要一个标准卡片容纳内容时。
- 需要多个卡片栅格，gutter 布局时。
- 需要进行卡片内切分布局时。
- 需要卡片可折叠时。

## 代码演示

### 基础卡片

当单独使用时 `ProCard` 就是一个普通的卡片。

<code src="../../demos/basic.tsx" background="#f0f2f5" />


## API

| 参数 | 说明 | 类型 | 默认值 |
| :-- | :-- | :-- | :-- |
|  title | 标题 | `React.ReactNode` | - |
|  tip | 标题右侧图标 hover 提示信息 | `string` | - |
|  extra | 右上角自定义区域 | `React.ReactNode` | - |
|  layout | 内容布局，支持垂直居中 | `default` \| `center`  | default |
|  loading | 加载中，支持自定义 loading 样式 | `boolean` \| `ReactNode` | false |
| colSpan | 栅格布局宽度，24 栅格，支持指定宽度 px 或百分比, 支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | `number` \| `string` | 24 |
|  gutter | 数字或使用数组形式同时设置 [水平间距, 垂直间距], 支持响应式的对象写法 `{ xs: 8, sm: 16, md: 24}` | `number` \| `array` | 0 |
|  split | 拆分卡片的方向 | `vertical` \| `horizontal`  | - |
| bordered | 是否有边框 | `boolean` | false |
| headerBordered | 页头是否有分割线 | `boolean` | false |
| collapsed | 受控属性，是否折叠 | `boolean` | false |
| collapsible | 配置是否可折叠，受控时无效 | `boolean` | false |
| defaultCollapsed | 默认折叠, 受控时无效 | `boolean` | false |
| onCollapse | 收起卡片的事件，受控时无效 | `(collapsed: boolean) => void;` | - |
