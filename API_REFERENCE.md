# API 快速参考

## 认证 API (authApi)

| 方法 | 端点 | 说明 | 权限 |
|------|------|------|------|
| `register(data)` | POST /api/v1/auth/register | 用户注册 | 管理员 |
| `login(data)` | POST /api/v1/auth/login | 用户登录 | 公开 |
| `changePassword(data)` | POST /api/v1/auth/change-password | 修改密码 | 需登录 |

## 会员等级 API (customerLevelApi)

| 方法 | 端点 | 说明 | 权限 |
|------|------|------|------|
| `create(data)` | POST /api/v1/customer-levels/create | 创建会员等级 | 管理员 |
| `list()` | GET /api/v1/customer-levels/list | 查询等级列表 | 需登录 |
| `detail(data)` | POST /api/v1/customer-levels/detail | 查询等级详情 | 需登录 |
| `update(data)` | POST /api/v1/customer-levels/update | 更新会员等级 | 管理员 |
| `delete(data)` | POST /api/v1/customer-levels/delete | 删除会员等级 | 管理员 |

## 客户管理 API (customerApi)

| 方法 | 端点 | 说明 | 权限 |
|------|------|------|------|
| `create(data)` | POST /api/v1/customers/create | 创建客户 | 需登录 |
| `list(params)` | GET /api/v1/customers/list | 查询客户列表 | 需登录 |
| `detail(data)` | POST /api/v1/customers/detail | 查询客户详情 | 需登录 |
| `update(data)` | POST /api/v1/customers/update | 更新客户信息 | 管理员 |
| `delete(data)` | POST /api/v1/customers/delete | 删除客户 | 管理员 |

### 客户列表查询参数 (CustomerListParams)

```typescript
interface CustomerListParams {
  pageIndex?: number;   // 页码，默认1
  pageSize?: number;    // 每页数量，默认20，最大100
  search?: string;      // 搜索关键词（客户名称或手机号）
  levelId?: number;     // 会员等级ID筛选
}
```

## 商品管理 API (productApi)

| 方法 | 端点 | 说明 | 权限 |
|------|------|------|------|
| `create(data)` | POST /api/v1/products/create | 创建商品 | 管理员 |
| `list(params)` | GET /api/v1/products/list | 查询商品列表 | 需登录 |
| `detail(data)` | POST /api/v1/products/detail | 查询商品详情 | 需登录 |
| `update(data)` | POST /api/v1/products/update | 更新商品信息 | 管理员 |
| `delete(data)` | POST /api/v1/products/delete | 删除商品 | 管理员 |
| `updateStock(data)` | POST /api/v1/products/stock | 更新库存 | 需登录 |

### 商品列表查询参数 (ProductListParams)

```typescript
interface ProductListParams {
  pageIndex?: number;   // 页码，默认1
  pageSize?: number;    // 每页数量，默认20，最大100
  search?: string;      // 搜索关键词（商品名称、简称或条形码）
  inStock?: boolean;    // 是否有库存
}
```

## 价格管理 API (priceApi)

| 方法 | 端点 | 说明 | 权限 |
|------|------|------|------|
| `set(data)` | POST /api/v1/prices/set | 设置商品等级价格 | 管理员 |
| `batchSet(data)` | POST /api/v1/prices/batch | 批量设置商品价格 | 管理员 |
| `getProductPrices(data)` | POST /api/v1/prices/product-prices | 查询商品价格列表 | 需登录 |
| `delete(data)` | POST /api/v1/prices/delete | 删除价格 | 管理员 |

## 响应格式

所有API响应都遵循统一格式：

```typescript
interface Response<T> {
  code: number;        // 状态码：200成功，其他失败
  msg: string;         // 消息描述
  data: T | null;      // 实际数据
}
```

## 分页响应格式

```typescript
interface PageResponse<T> {
  total: number;       // 总记录数
  items: T[];          // 数据列表
}
```

## 常见状态码

| 状态码 | 说明 |
|--------|------|
| 200 | 成功 |
| 400 | 请求参数错误 |
| 401 | 未授权（token无效或过期） |
| 403 | 禁止访问（无权限） |
| 404 | 资源不存在 |
| 409 | 资源冲突（如唯一性约束冲突） |
| 500 | 服务器内部错误 |

## 导入使用

```typescript
// 导入API
import {
  authApi,
  customerLevelApi,
  customerApi,
  productApi,
  priceApi
} from '@/services';

// 导入类型
import type {
  UserCreate,
  CustomerListParams,
  ProductCreate,
  // ... 其他类型
} from '@/types/api';
```
