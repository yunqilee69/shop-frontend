/**
 * 客户等级管理 API
 */

import Request from '@/utils/request'
import type {
  CustomerLevelCreate,
  CustomerLevelUpdate,
  CustomerLevelResponse,
  CustomerLevelListParams,
  PageResponse,
} from '@/types/api'

/**
 * 客户等级管理 API
 */
export const customerLevelApi = {
  /**
   * 创建客户等级
   * POST /api/customer-levels
   */
  create: (data: CustomerLevelCreate): Promise<CustomerLevelResponse> => {
    return Request.post('/api/customer-levels', data)
  },

  /**
   * 更新客户等级
   * PUT /api/customer-levels/{id}
   */
  update: (id: number, data: CustomerLevelUpdate): Promise<CustomerLevelResponse> => {
    return Request.put(`/api/customer-levels/${id}`, data)
  },

  /**
   * 删除客户等级
   * DELETE /api/customer-levels/{id}
   */
  delete: (id: number): Promise<void> => {
    return Request.delete(`/api/customer-levels/${id}`)
  },

  /**
   * 查询客户等级详情
   * GET /api/customer-levels/{id}
   */
  getById: (id: number): Promise<CustomerLevelResponse> => {
    return Request.get(`/api/customer-levels/${id}`)
  },

  /**
   * 查询客户等级列表
   * GET /api/customer-levels
   */
  list: (params?: CustomerLevelListParams): Promise<CustomerLevelResponse[]> => {
    return Request.get('/api/customer-levels', { params })
  },

  /**
   * 分页查询客户等级
   * GET /api/customer-levels/page
   */
  page: (params?: CustomerLevelListParams): Promise<PageResponse<CustomerLevelResponse>> => {
    return Request.get('/api/customer-levels/page', { params })
  },
}
