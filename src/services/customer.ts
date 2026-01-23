/**
 * 客户管理 API
 */

import Request from '@/utils/request'
import type {
  CustomerCreate,
  CustomerUpdate,
  CustomerResponse,
  CustomerListParams,
  PageResponse,
} from '@/types/api'

/**
 * 客户管理 API
 */
export const customerApi = {
  /**
   * 创建客户
   * POST /api/customers
   */
  create: (data: CustomerCreate): Promise<CustomerResponse> => {
    return Request.post('/api/customers', data)
  },

  /**
   * 更新客户
   * PUT /api/customers/{id}
   */
  update: (id: number, data: CustomerUpdate): Promise<CustomerResponse> => {
    return Request.put(`/api/customers/${id}`, data)
  },

  /**
   * 删除客户
   * DELETE /api/customers/{id}
   */
  delete: (id: number): Promise<void> => {
    return Request.delete(`/api/customers/${id}`)
  },

  /**
   * 查询客户详情
   * GET /api/customers/{id}
   */
  getById: (id: number): Promise<CustomerResponse> => {
    return Request.get(`/api/customers/${id}`)
  },

  /**
   * 根据手机号查询客户
   * GET /api/customers/phone/{phone}
   */
  getByPhone: (phone: string): Promise<CustomerResponse> => {
    return Request.get(`/api/customers/phone/${phone}`)
  },

  /**
   * 查询客户列表
   * GET /api/customers
   */
  list: (params?: CustomerListParams): Promise<CustomerResponse[]> => {
    return Request.get('/api/customers', { params })
  },

  /**
   * 分页查询客户
   * GET /api/customers/page
   */
  page: (params: CustomerListParams): Promise<PageResponse<CustomerResponse>> => {
    return Request.get('/api/customers/page', { params })
  },
}
