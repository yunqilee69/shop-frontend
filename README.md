# 后台管理系统

基于 **React 19.2.3** + **TypeScript** + **Ant Design 6.1.4** 构建的企业级后台管理系统。

## 技术栈

### 核心框架
- **React 19.2.3** - 最新 UI 框架
  - `useEffectEvent` Hook - 更好的事件处理
  - Activity API - 精细的性能控制
  - 改进的并发渲染和 Suspense
  - Server Components 支持
- **TypeScript 5.7.2** - 类型约束
- **Vite 6.0.7** - 构建工具

### UI & 路由
- **Ant Design 6.1.4** - UI 组件库（Masonry、可调整 Drawer、Tooltip 跟随等新特性）
- **React Router 6.28.1** - 路由管理
- **Axios 1.7.9** - HTTP 请求

## 快速开始

### 安装依赖

```bash
npm install
# 或使用 pnpm
pnpm install
```

### 启动开发服务器

```bash
npm run dev
```

访问 http://localhost:3000

### 构建生产版本

```bash
npm run build
```

## 项目结构

```
shop-frontend/
├── public/                      # 静态资源
├── src/
│   ├── assets/                  # 资源文件（图片、字体等）
│   ├── components/              # 通用组件
│   │   ├── common/             # 基础组件（按钮、表单等）
│   │   └── business/           # 业务组件（用户选择器等）
│   ├── layouts/                # 布局组件
│   │   ├── BasicLayout.tsx     # 主布局（侧边栏 + 顶部栏）
│   │   └── UserLayout.tsx      # 用户布局（登录页等）
│   ├── pages/                  # 页面组件（重要！）
│   │   ├── dashboard/          # 仪表盘
│   │   │   └── index.tsx
│   │   ├── login/              # 登录页
│   │   │   └── index.tsx
│   │   ├── user/               # 用户管理
│   │   │   └── index.tsx
│   │   └── 404.tsx             # 404页面
│   ├── services/               # API 服务
│   │   └── index.ts            # 统一管理所有 API 请求
│   ├── hooks/                  # 自定义 Hooks
│   │   ├── useAsync.ts
│   │   ├── useDebounce.ts
│   │   └── useLocalStorage.ts
│   ├── utils/                  # 工具函数
│   │   ├── request.ts          # Axios 封装
│   │   ├── storage.ts          # 本地存储
│   │   └── index.ts            # 通用工具函数
│   ├── types/                  # TypeScript 类型定义
│   │   ├── index.ts            # 业务类型
│   │   └── global.d.ts         # 全局类型
│   ├── constants/              # 常量定义
│   │   └── index.ts
│   ├── store/                  # 状态管理
│   │   ├── context.tsx         # Context API
│   │   └── index.tsx
│   ├── router/                 # 路由配置
│   │   ├── index.tsx           # 路由配置（重要！）
│   │   ├── guard.tsx           # 路由守卫
│   │   └── AppRouter.tsx       # 路由组件
│   ├── styles/                 # 全局样式
│   │   └── global.css
│   ├── App.tsx                 # 根组件
│   └── main.tsx                # 应用入口
├── .env.development            # 开发环境变量
├── .env.production             # 生产环境变量
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 如何新增页面

### 步骤 1: 创建页面组件

在 `src/pages/` 目录下创建新页面，例如 `product`（商品管理）：

```bash
# 创建商品管理页面目录
mkdir src/pages/product
```

创建页面文件 `src/pages/product/index.tsx`：

```typescript
/**
 * 商品管理页面
 */
import React from 'react';
import { Table, Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const Product: React.FC = () => {
  const columns = [
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '价格',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: '库存',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: '操作',
      key: 'action',
      render: () => (
        <Space>
          <Button type="link">编辑</Button>
          <Button type="link" danger>删除</Button>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: '1',
      name: '示例商品',
      price: '99.00',
      stock: 100,
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />}>
          新增商品
        </Button>
      </div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default Product;
```

### 步骤 2: 添加路由配置

编辑 `src/router/index.tsx`，在路由配置中添加新页面：

```typescript
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from '@/layouts/BasicLayout';

// 懒加载页面组件
const Dashboard = lazy(() => import('@/pages/dashboard'));
const Login = lazy(() => import('@/pages/login'));
const User = lazy(() => import('@/pages/user'));
const Product = lazy(() => import('@/pages/product')); // 新增
const NotFound = lazy(() => import('@/pages/404'));

export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'user',
        element: <User />,
      },
      {
        path: 'product',  // 新增商品管理路由
        element: <Product />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];
```

### 步骤 3: 添加侧边栏菜单（可选）

如果需要在侧边栏显示菜单项，编辑 `src/layouts/BasicLayout.tsx`：

```typescript
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  LogoutOutlined,
  ShoppingOutlined,  // 新增
} from '@ant-design/icons';

const menuItems = [
  {
    key: '/dashboard',
    icon: <DashboardOutlined />,
    label: '仪表盘',
    onClick: () => navigate('/dashboard'),
  },
  {
    key: '/user',
    icon: <UserOutlined />,
    label: '用户管理',
    onClick: () => navigate('/user'),
  },
  {
    key: '/product',  // 新增
    icon: <ShoppingOutlined />,
    label: '商品管理',
    onClick: () => navigate('/product'),
  },
];
```

### 步骤 4: 添加 API 服务（可选）

如果页面需要调用后端 API，在 `src/services/index.ts` 中添加：

```typescript
/**
 * 商品相关 API
 */
export const productApi = {
  /**
   * 获取商品列表
   */
  getProductList: (params: { page: number; pageSize: number }) => {
    return Request.get('/product/list', { params });
  },

  /**
   * 获取商品详情
   */
  getProductDetail: (id: string) => {
    return Request.get(`/product/\${id}`);
  },

  /**
   * 创建商品
   */
  createProduct: (data: any) => {
    return Request.post('/product/create', data);
  },

  /**
   * 更新商品
   */
  updateProduct: (id: string, data: any) => {
    return Request.put(`/product/\${id}`, data);
  },

  /**
   * 删除商品
   */
  deleteProduct: (id: string) => {
    return Request.delete(`/product/\${id}`);
  },
};
```

### 步骤 5: 在页面中使用 API

```typescript
import { useEffect, useState } from 'react';
import { productApi } from '@/services';

const Product: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await productApi.getProductList({
        page: 1,
        pageSize: 10,
      });
      setData(result);
    } catch (error) {
      console.error('获取商品列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Table loading={loading} columns={columns} dataSource={data} />
    </div>
  );
};
```

## 核心功能使用

### 1. 网络请求

```typescript
import Request from '@/utils/request';

// GET 请求
const data = await Request.get('/api/user');

// POST 请求
const result = await Request.post('/api/login', { username, password });
```

### 2. 状态管理

```typescript
import { useApp } from '@/store';

const { state, actions } = useApp();

// 访问状态
console.log(state.user);
console.log(state.token);

// 调用方法
actions.setUser(userInfo);
actions.logout();
```

### 3. 自定义 Hooks

```typescript
import { useAsync, useDebounce, useLocalStorage } from '@/hooks';

// 异步操作管理
const { data, loading, error } = useAsync(() => fetchData());

// 防抖值
const debouncedValue = useDebounce(searchValue, 300);

// 本地存储
const [value, setValue] = useLocalStorage('key', defaultValue);
```

## 开发规范

### 文件命名
- **组件文件**: PascalCase (例：UserProfile.tsx)
- **工具文件**: camelCase (例：request.ts)
- **样式文件**: *.module.less (CSS Modules)

### 代码风格
- 使用 TypeScript 严格模式
- 函数组件 + Hooks
- 组件命名采用 PascalCase
- 使用 ESLint + Prettier 保证代码风格统一

### 目录结构规范
- `pages/` - 所有页面组件，每个页面一个文件夹
- `components/common/` - 可复用的基础组件
- `components/business/` - 业务相关的组件
- `services/` - 所有 API 请求统一管理

## 环境变量

### 开发环境 (.env.development)
```
VITE_APP_TITLE=后台管理系统
VITE_APP_BASE_API=/api
VITE_APP_UPLOAD_URL=/api/upload
```

### 生产环境 (.env.production)
```
VITE_APP_TITLE=后台管理系统
VITE_APP_BASE_API=https://api.example.com
VITE_APP_UPLOAD_URL=https://api.example.com/upload
```

## 常用命令

```bash
# 开发模式
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview

# 代码检查
npm run lint

# 代码格式化
npm run format

# 类型检查
npm run type-check
```

## 浏览器支持

- Chrome (推荐)
- Edge
- Firefox
- Safari (最新版)

## 技术文档

- [React 19 官方文档](https://react.dev/)
- [Ant Design 6.1.4 文档](https://ant.design/)
- [React Router 6 文档](https://reactrouter.com/)
- [Vite 文档](https://vitejs.dev/)

## 快速参考

### 添加新页面
1. 在 `src/pages/` 创建页面目录和文件
2. 在 `src/router/index.tsx` 添加路由配置
3. （可选）在 `src/layouts/BasicLayout.tsx` 添加菜单项
4. （可选）在 `src/services/index.ts` 添加 API

### 代码位置
- 页面组件 → `src/pages/`
- 可复用组件 → `src/components/`
- API 请求 → `src/services/`
- 工具函数 → `src/utils/`
- 类型定义 → `src/types/`
- 路由配置 → `src/router/`

## 问题排查

### 端口被占用
修改 `vite.config.ts` 中的端口配置：
```typescript
server: {
  port: 3001, // 改为其他端口
}
```

### API 请求跨域
开发环境已配置代理，确保后端服务在 http://localhost:8080

### 类型错误
```bash
npm run type-check
```

---

**更新时间**: 2026-01-08
**技术栈**: React 19.2.3 + TypeScript 5.7.2 + Ant Design 6.1.4 + Vite 6.0.7
