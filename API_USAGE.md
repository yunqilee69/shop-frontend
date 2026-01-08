# API 使用说明

## 概述

本项目已根据 OpenAPI 规范创建了完整的 TypeScript 类型定义和 API 接口函数。

## 文件结构

```
src/
├── types/
│   ├── api.ts          # API 相关的 TypeScript 类型定义
│   └── index.ts        # 通用类型定义
└── services/
    ├── auth.ts         # 认证相关 API
    ├── customerLevel.ts # 会员等级管理 API
    ├── customer.ts     # 客户管理 API
    ├── product.ts      # 商品管理 API
    ├── price.ts        # 价格管理 API
    └── index.ts        # 统一导出
```

## API 模块

### 1. 认证 API (authApi)

```typescript
import { authApi } from '@/services';

// 用户注册
await authApi.register({
  username: 'admin',
  name: '管理员',
  password: '123456',
  admin_flag: true,
  phone: '13800138000'
});

// 用户登录
const result = await authApi.login({
  username: 'admin',
  password: '123456'
});

// 修改密码
await authApi.changePassword({
  old_password: '123456',
  new_password: '654321'
});
```

### 2. 会员等级 API (customerLevelApi)

```typescript
import { customerLevelApi } from '@/services';

// 创建会员等级
await customerLevelApi.create({
  level_name: '普通会员'
});

// 查询等级列表
const levels = await customerLevelApi.list();

// 查询等级详情
await customerLevelApi.detail({ id: 1 });

// 更新会员等级
await customerLevelApi.update({
  id: 1,
  level_name: 'VIP会员'
});

// 删除会员等级
await customerLevelApi.delete({ id: 1 });
```

### 3. 客户管理 API (customerApi)

```typescript
import { customerApi } from '@/services';

// 创建客户
await customerApi.create({
  level_id: 1,
  name: '张三',
  phone: '13800138000',
  contact_person: '李四',
  address: '北京市朝阳区'
});

// 查询客户列表（支持分页和搜索）
const customers = await customerApi.list({
  pageIndex: 1,
  pageSize: 20,
  search: '张三',
  levelId: 1
});

// 查询客户详情
await customerApi.detail({ id: 1 });

// 更新客户信息
await customerApi.update({
  id: 1,
  name: '张三丰',
  phone: '13900139000'
});

// 删除客户
await customerApi.delete({ id: 1 });
```

### 4. 商品管理 API (productApi)

```typescript
import { productApi } from '@/services';

// 创建商品
await productApi.create({
  name: '可口可乐 500ml',
  short_name: '可口可乐',
  spec: '500ml/瓶',
  barcode: '6901234567890',
  image_url: 'https://example.com/image.jpg',
  purchase_price: '2.50',
  stock_qty: 100
});

// 查询商品列表（支持分页和搜索）
const products = await productApi.list({
  pageIndex: 1,
  pageSize: 20,
  search: '可乐',
  inStock: true
});

// 查询商品详情（包含价格列表）
const productDetail = await productApi.detail({ id: 1 });

// 更新商品信息
await productApi.update({
  id: 1,
  name: '可口可乐 500ml',
  stock_qty: 150
});

// 删除商品
await productApi.delete({ id: 1 });

// 更新库存
await productApi.updateStock({
  id: 1,
  delta: 10,
  reason: '进货'
});
```

### 5. 价格管理 API (priceApi)

```typescript
import { priceApi } from '@/services';

// 设置商品等级价格
await priceApi.set({
  product_id: 1,
  level_id: 1,
  sale_price: '3.50'
});

// 批量设置商品价格
await priceApi.batchSet({
  product_id: 1,
  prices: [
    { level_id: 1, sale_price: '3.50' },
    { level_id: 2, sale_price: '3.30' },
    { level_id: 3, sale_price: '3.00' }
  ]
});

// 查询商品价格列表
const prices = await priceApi.getProductPrices({
  product_id: 1
});

// 删除价格
await priceApi.delete({ id: 1 });
```

## 类型定义

所有 API 相关的类型定义都在 `src/types/api.ts` 中，主要包括：

- **基础类型**: Response, PageResponse, ValidationError 等
- **认证类型**: UserCreate, UserLogin, UserResponse, TokenResponse 等
- **会员等级类型**: CustomerLevelCreate, CustomerLevelResponse 等
- **客户类型**: CustomerCreate, CustomerUpdate, CustomerListResponse 等
- **商品类型**: ProductCreate, ProductUpdate, ProductResponse 等
- **价格类型**: PriceCreate, PriceResponse, ProductPriceListResponse 等

## 使用示例

### 在 React 组件中使用

```typescript
import React, { useEffect, useState } from 'react';
import { customerApi, customerLevelApi } from '@/services';
import type { CustomerListResponse } from '@/types/api';

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<CustomerListResponse[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const result = await customerApi.list({
        pageIndex: 1,
        pageSize: 20
      });
      setCustomers(result.data?.items || []);
    } catch (error) {
      console.error('获取客户列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div>
      {/* 渲染客户列表 */}
    </div>
  );
};

export default CustomerList;
```

### 错误处理

```typescript
import { message } from 'antd';
import { authApi } from '@/services';

const handleLogin = async () => {
  try {
    const result = await authApi.login({
      username: 'admin',
      password: '123456'
    });
    message.success('登录成功');
    // 处理登录成功逻辑
  } catch (error) {
    // 错误已经在 request.ts 中统一处理并显示
    console.error('登录失败:', error);
  }
};
```

## 注意事项

1. **认证**: 大多数 API 需要Bearer Token认证，token会自动从localStorage中读取并添加到请求头
2. **错误处理**: 所有API错误都会在request.ts中统一处理并显示错误消息
3. **类型安全**: 所有API都有完整的TypeScript类型定义，享受类型提示和检查
4. **分页参数**: pageIndex从1开始，pageSize最大100
5. **权限标识**: 部分API标注为"仅管理员可用"，需要在后端配合权限验证

## API 端点说明

所有API端点都以 `/api/v1` 开头，例如：
- 认证: `/api/v1/auth/*`
- 会员等级: `/api/v1/customer-levels/*`
- 客户管理: `/api/v1/customers/*`
- 商品管理: `/api/v1/products/*`
- 价格管理: `/api/v1/prices/*`
