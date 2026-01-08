/**
 * 通用响应结构
 */
export interface ApiResponse<T = any> {
  code: number;
  message: string;
  data: T;
  timestamp?: number;
}

/**
 * 分页请求参数
 */
export interface PageParams {
  page: number;
  pageSize: number;
}

/**
 * 分页响应数据
 */
export interface PageResponse<T = any> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}

/**
 * 用户信息
 */
export interface UserInfo {
  id: number;
  username: string;
  name: string;
  adminFlag: boolean;
  phone: string | null;
}

/**
 * 登录请求参数
 */
export interface LoginParams {
  username: string;
  password: string;
  captcha?: string;
}

/**
 * 登录响应数据
 */
export interface LoginResult {
  token: string;
  refreshToken?: string;
  userInfo: UserInfo;
}

/**
 * 菜单项
 */
export interface MenuItem {
  id: string;
  key: string;
  label: string;
  icon?: string;
  path: string;
  parentId?: string;
  sort: number;
  visible: boolean;
  children?: MenuItem[];
  meta?: {
    title?: string;
    keepAlive?: boolean;
    hidden?: boolean;
  };
}

/**
 * 路由项
 */
export interface RouteItem {
  path: string;
  element?: React.ComponentType;
  meta?: {
    title?: string;
    icon?: string;
    hidden?: boolean;
    keepAlive?: boolean;
    requiresAuth?: boolean;
    roles?: string[];
    permissions?: string[];
  };
  children?: RouteItem[];
}

/**
 * 导出常量
 */
export { StatusCode } from '@/constants';
