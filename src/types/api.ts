/**
 * API 类型定义
 * 基于后端 API 文档
 */

// ==================== 基础类型 ====================

/**
 * 统一返回格式
 */
export interface ApiResult<T = any> {
  code: string
  message: string
  data: T | null
}

/**
 * 分页响应
 */
export interface PageResponse<T> {
  data: T[]
  total: number
}

/**
 * 分页参数
 */
export interface PageParams {
  pageNum?: number
  pageSize?: number
}

// ==================== 认证相关类型 ====================

/**
 * 用户创建
 */
export interface UserCreate {
  username: string
  name: string
  password: string
  admin_flag?: boolean
  phone?: string | null
}

/**
 * 用户登录
 */
export interface UserLogin {
  username: string
  password: string
}

/**
 * 用户响应
 */
export interface UserResponse {
  id: number
  username: string
  name: string
  adminFlag: boolean
  phone: string | null
}

/**
 * Token 响应
 */
export interface TokenResponse {
  accessToken: string
  tokenType?: string
  user: UserResponse
}

/**
 * 修改密码
 */
export interface ChangePassword {
  old_password: string
  new_password: string
}

// ==================== 商品相关类型 ====================

/**
 * 商品创建
 */
export interface ProductCreate {
  name: string
  spec?: string | null
  stock: number
  storageLocation?: string | null
  purchasePrice: number
  defaultPrice: number
  barcode: string
}

/**
 * 商品更新
 */
export interface ProductUpdate {
  id: number
  name?: string | null
  spec?: string | null
  stock?: number | null
  storageLocation?: string | null
  purchasePrice?: number | null
  defaultPrice?: number | null
  barcode?: string | null
}

/**
 * 商品响应
 */
export interface ProductResponse {
  id: number
  name: string
  spec: string | null
  stock: number
  storageLocation: string | null
  purchasePrice: number
  defaultPrice: number
  barcode: string
  createTime: string
  updateTime: string
}

/**
 * 商品列表查询参数
 */
export interface ProductListParams extends PageParams {
  name?: string | null
  barcode?: string | null
}

// ==================== 商品价格相关类型 ====================

/**
 * 价格创建
 */
export interface PriceCreate {
  productId: number
  customerLevelId: number
  price: number
}

/**
 * 价格更新
 */
export interface PriceUpdate {
  id: number
  price: number
}

/**
 * 价格响应
 */
export interface PriceResponse {
  id: number
  productId: number
  productName: string
  customerLevelId: number
  customerLevelName: string
  price: number
}

/**
 * 批量价格更新项
 */
export interface BatchPriceUpdateItem {
  id: number
  price: number
}

/**
 * 批量价格更新
 */
export interface BatchPriceUpdate {
  items: BatchPriceUpdateItem[]
}

// ==================== 客户相关类型 ====================

/**
 * 性别枚举
 */
export enum GenderEnum {
  UNKNOWN = 0,
  MALE = 1,
  FEMALE = 2,
}

/**
 * 客户创建
 */
export interface CustomerCreate {
  name: string
  gender?: number
  address?: string | null
  phone: string
  customerLevelId?: number | null
}

/**
 * 客户更新
 */
export interface CustomerUpdate {
  id: number
  name?: string | null
  gender?: number | null
  address?: string | null
  phone?: string | null
  customerLevelId?: number | null
}

/**
 * 客户响应
 */
export interface CustomerResponse {
  id: number
  name: string
  gender: number
  address: string | null
  phone: string
  customerLevelId: number | null
  customerLevelName: string | null
  createTime: string
  updateTime: string
}

/**
 * 客户列表查询参数
 */
export interface CustomerListParams extends PageParams {
  name?: string | null
  phone?: string | null
  customerLevelId?: number | null
}

// ==================== 客户等级相关类型 ====================

/**
 * 客户等级创建
 */
export interface CustomerLevelCreate {
  name: string
  levelCode: string
  priority?: number
  description?: string | null
}

/**
 * 客户等级更新
 */
export interface CustomerLevelUpdate {
  id: number
  name?: string | null
  levelCode?: string | null
  priority?: number | null
  description?: string | null
}

/**
 * 客户等级响应
 */
export interface CustomerLevelResponse {
  id: number
  name: string
  levelCode: string
  priority: number
  description: string | null
  createTime: string
  updateTime: string
}

/**
 * 客户等级列表查询参数
 */
export interface CustomerLevelListParams extends PageParams {
  name?: string | null
  levelCode?: string | null
}

// ==================== 订单相关类型 ====================

/**
 * 订单明细创建
 */
export interface OrderItemCreate {
  productId: number
  quantity: number
}

/**
 * 订单创建
 */
export interface OrderCreate {
  customerId: number
  items: OrderItemCreate[]
}

/**
 * 订单明细响应
 */
export interface OrderItemResponse {
  id: number
  productId: number
  productName: string
  quantity: number
  price: number
  subtotal: number
}

/**
 * 订单响应
 */
export interface OrderResponse {
  id: number
  orderNo: string
  customerId: number
  customerName: string
  totalPrice: number
  orderTime: string
  createTime?: string
  updateTime?: string
  items: OrderItemResponse[]
}

/**
 * 订单列表查询参数
 */
export interface OrderListParams extends PageParams {
  orderNo?: string | null
  customerId?: number | null
}
