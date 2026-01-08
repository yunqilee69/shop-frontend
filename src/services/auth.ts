/**
 * 认证相关 API
 */

import Request from '@/utils/request';
import type {
  UserCreate,
  UserLogin,
  ChangePassword,
  UserResponse,
  TokenResponse,
} from '@/types/api';

/**
 * 认证 API
 */
export const authApi = {
  /**
   * 用户注册（仅管理员可用）
   * POST /api/v1/auth/register
   */
  register: (data: UserCreate): Promise<UserResponse> => {
    return Request.post('/api/v1/auth/register', data);
  },

  /**
   * 用户登录
   * POST /api/v1/auth/login
   */
  login: (data: UserLogin): Promise<TokenResponse> => {
    return Request.post('/api/v1/auth/login', data);
  },

  /**
   * 修改密码
   * POST /api/v1/auth/change-password
   */
  changePassword: (data: ChangePassword): Promise<void> => {
    return Request.post('/api/v1/auth/change-password', data);
  },
};
