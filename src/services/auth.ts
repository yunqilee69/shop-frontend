/**
 * 认证相关 API
 */

import Request from '@/utils/request'
import type {
  UserCreate,
  UserLogin,
  ChangePassword,
  UserResponse,
  TokenResponse,
} from '@/types/api'

/**
 * 认证 API
 */
export const authApi = {
  /**
   * 用户注册（仅管理员可用）
   * POST /api/v1/auth/register
   */
  register: (data: UserCreate): Promise<UserResponse> => {
    return Request.post('/api/v1/auth/register', data)
  },

  /**
   * 用户登录（前端模拟）
   * 校验规则：admin / 123456
   */
  login: (data: UserLogin): Promise<TokenResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const { username, password } = data

        if (username === 'admin' && password === '123456') {
          const mockTokenResponse: TokenResponse = {
            accessToken: `mock-token-${Date.now()}`,
            tokenType: 'Bearer',
            user: {
              id: 1,
              username: 'admin',
              name: '管理员',
              adminFlag: true,
              phone: null,
            },
          }
          resolve(mockTokenResponse)
        } else {
          reject(new Error('用户名或密码错误'))
        }
      }, 500) // 模拟网络延迟
    })
  },

  /**
   * 修改密码
   * POST /api/v1/auth/change-password
   */
  changePassword: (data: ChangePassword): Promise<void> => {
    return Request.post('/api/v1/auth/change-password', data)
  },
}
