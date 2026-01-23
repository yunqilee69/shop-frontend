/**
 * 订单管理 API
 */

import Request from '@/utils/request'
import type { OrderCreate, OrderResponse, OrderListParams, PageResponse } from '@/types/api'

/**
 * 订单管理 API
 */
export const orderApi = {
  /**
   * 创建订单
   * POST /api/orders
   */
  create: (data: OrderCreate): Promise<OrderResponse> => {
    return Request.post('/api/orders', data)
  },

  /**
   * 更新订单
   * PUT /api/orders/{id}
   */
  update: (id: number, data: OrderCreate): Promise<OrderResponse> => {
    return Request.put(`/api/orders/${id}`, data)
  },

  /**
   * 删除订单
   * DELETE /api/orders/{id}
   */
  delete: (id: number): Promise<void> => {
    return Request.delete(`/api/orders/${id}`)
  },

  /**
   * 查询订单详情
   * GET /api/orders/{id}
   */
  getById: (id: number): Promise<OrderResponse> => {
    return Request.get(`/api/orders/${id}`)
  },

  /**
   * 根据订单号查询订单
   * GET /api/orders/order-no/{orderNo}
   */
  getByOrderNo: (orderNo: string): Promise<OrderResponse> => {
    return Request.get(`/api/orders/order-no/${orderNo}`)
  },

  /**
   * 查询订单列表
   * GET /api/orders
   */
  list: (params?: OrderListParams): Promise<OrderResponse[]> => {
    return Request.get('/api/orders', { params })
  },

  /**
   * 分页查询订单
   * GET /api/orders/page
   */
  page: (params?: OrderListParams): Promise<PageResponse<OrderResponse>> => {
    return Request.get('/api/orders/page', { params })
  },
}
