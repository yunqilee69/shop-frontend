/**
 * API 类型定义
 * 基于 OpenAPI 规范自动生成
 */

// ==================== 基础类型 ====================

/**
 * 响应状态码枚举
 */
export enum ResponseCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  INTERNAL_SERVER_ERROR = 500,
}

/**
 * 统一响应格式
 */
export interface Response<T = any> {
  code: ResponseCode;
  msg: string;
  data: T | null;
}

/**
 * HTTP 验证错误
 */
export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

/**
 * HTTP 验证错误响应
 */
export interface HTTPValidationError {
  detail: ValidationError[];
}

/**
 * 分页响应
 */
export interface PageResponse<T> {
  total: number;
  list: T[];
}

// ==================== 认证相关类型 ====================

/**
 * 用户创建
 */
export interface UserCreate {
  username: string;
  name: string;
  password: string;
  admin_flag?: boolean;
  phone?: string | null;
}

/**
 * 用户登录
 */
export interface UserLogin {
  username: string;
  password: string;
}

/**
 * 用户响应
 */
export interface UserResponse {
  id: number;
  username: string;
  name: string;
  adminFlag: boolean;
  phone: string | null;
}

/**
 * Token 响应
 */
export interface TokenResponse {
  accessToken: string;
  tokenType?: string;
  user: UserResponse;
}

/**
 * 修改密码
 */
export interface ChangePassword {
  old_password: string;
  new_password: string;
}

// ==================== 会员等级相关类型 ====================

/**
 * 会员等级创建
 */
export interface CustomerLevelCreate {
  level_name: string;
}

/**
 * 会员等级更新
 */
export interface CustomerLevelUpdate {
  id: number;
  level_name: string;
}

/**
 * 会员等级删除
 */
export interface CustomerLevelDelete {
  id: number;
}

/**
 * 根据ID查询会员等级
 */
export interface CustomerLevelById {
  id: number;
}

/**
 * 会员等级响应
 */
export interface CustomerLevelResponse {
  id: number;
  levelName: string;
  createdAt: string;
}

// ==================== 客户相关类型 ====================

/**
 * 客户创建
 */
export interface CustomerCreate {
  level_id: number;
  name: string;
  phone: string;
  contact_person?: string | null;
  address: string;
}

/**
 * 客户更新
 */
export interface CustomerUpdate {
  id: number;
  level_id?: number | null;
  name?: string | null;
  phone?: string | null;
  contact_person?: string | null;
  address?: string | null;
}

/**
 * 客户删除
 */
export interface CustomerDelete {
  id: number;
}

/**
 * 根据ID查询客户
 */
export interface CustomerById {
  id: number;
}

/**
 * 客户列表响应
 */
export interface CustomerListResponse {
  id: number;
  levelId: number;
  levelName: string | null;
  name: string;
  phone: string;
  contactPerson: string | null;
  address: string;
  createdAt: string;
}

/**
 * 客户列表查询参数
 */
export interface CustomerListParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string | null;
  levelId?: number | null;
}

// ==================== 商品相关类型 ====================

/**
 * 商品创建
 */
export interface ProductCreate {
  name: string;
  short_name: string;
  spec?: string | null;
  barcode?: string | null;
  image_url?: string | null;
  purchase_price: string | number;
  stock_qty?: number;
}

/**
 * 商品更新
 */
export interface ProductUpdate {
  id: number;
  name?: string | null;
  short_name?: string | null;
  spec?: string | null;
  barcode?: string | null;
  image_url?: string | null;
  purchase_price?: string | number | null;
  stock_qty?: number | null;
}

/**
 * 商品删除
 */
export interface ProductDelete {
  id: number;
}

/**
 * 根据ID查询商品
 */
export interface ProductById {
  id: number;
}

/**
 * 商品响应
 */
export interface ProductResponse {
  id: number;
  name: string;
  shortName: string;
  spec: string | null;
  barcode: string | null;
  imageUrl: string | null;
  purchasePrice: string;
  stockQty: number;
  createdAt: string;
}

/**
 * 商品详情响应
 */
export interface ProductDetailResponse {
  id: number;
  name: string;
  shortName: string;
  spec: string | null;
  barcode: string | null;
  imageUrl: string | null;
  purchasePrice: string;
  stockQty: number;
  createdAt: string;
  prices: ProductPriceInDetail[];
}

/**
 * 商品详情中的价格信息
 */
export interface ProductPriceInDetail {
  levelId: number;
  levelName: string | null;
  salePrice: string;
}

/**
 * 商品列表查询参数
 */
export interface ProductListParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string | null;
  inStock?: boolean | null;
}

/**
 * 库存更新
 */
export interface StockUpdate {
  id: number;
  delta: number;
  reason?: string | null;
}

// ==================== 价格相关类型 ====================

/**
 * 价格创建
 */
export interface PriceCreate {
  product_id: number;
  level_id: number;
  sale_price: string | number;
}

/**
 * 价格项
 */
export interface PriceItem {
  level_id: number;
  sale_price: string | number;
}

/**
 * 批量价格创建
 */
export interface BatchPriceCreate {
  product_id: number;
  prices: PriceItem[];
}

/**
 * 价格删除
 */
export interface PriceDelete {
  id: number;
}

/**
 * 根据商品ID查询价格
 */
export interface PriceByProduct {
  product_id: number;
}

/**
 * 价格响应
 */
export interface PriceResponse {
  id: number;
  productId: number;
  levelId: number;
  salePrice: string;
  createdAt: string;
}

/**
 * 价格项响应
 */
export interface PriceItemResponse {
  id: number;
  levelId: number;
  levelName: string | null;
  salePrice: string;
  updatedAt: string;
}

/**
 * 批量价格响应
 */
export interface BatchPriceResponse {
  productId: number;
  createdCount: number;
  updatedCount: number;
}

/**
 * 商品价格列表响应
 */
export interface ProductPriceListResponse {
  productId: number;
  productName: string;
  prices: PriceItemResponse[];
}

// ==================== 便捷类型别名 ====================

/**
 * 会员等级实体（用于页面显示）
 */
export type CustomerLevel = CustomerLevelResponse;

/**
 * 客户实体（用于页面显示）
 */
export type Customer = CustomerListResponse;

/**
 * 商品实体（用于页面显示）
 */
export type Product = ProductResponse;

/**
 * 商品价格实体（用于页面显示）
 */
export type ProductPrice = PriceItemResponse;

/**
 * 设置价格输入
 */
export type PriceSetInput = PriceCreate;
