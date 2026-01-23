/**
 * 商品价格管理 API
 */

import Request from '@/utils/request'
import type { PriceCreate, PriceUpdate, PriceResponse, BatchPriceUpdate } from '@/types/api'

/**
 * 商品价格管理 API
 */
export const priceApi = {
  /**
   * 创建商品价格
   * POST /api/product-prices
   */
  create: (data: PriceCreate): Promise<PriceResponse> => {
    return Request.post('/api/product-prices', data)
  },

  /**
   * 更新商品价格
   * PUT /api/product-prices/{id}
   */
  update: (id: number, data: PriceUpdate): Promise<PriceResponse> => {
    return Request.put(`/api/product-prices/${id}`, data)
  },

  /**
   * 删除商品价格
   * DELETE /api/product-prices/{id}
   */
  delete: (id: number): Promise<void> => {
    return Request.delete(`/api/product-prices/${id}`)
  },

  /**
   * 查询商品价格详情
   * GET /api/product-prices/{id}
   */
  getById: (id: number): Promise<PriceResponse> => {
    return Request.get(`/api/product-prices/${id}`)
  },

  /**
   * 查询商品的所有价格
   * GET /api/product-prices/product/{productId}
   */
  getByProductId: (productId: number): Promise<PriceResponse[]> => {
    return Request.get(`/api/product-prices/product/${productId}`)
  },

  /**
   * 批量更新商品价格
   * PUT /api/product-prices/batch
   */
  batchUpdate: (data: BatchPriceUpdate): Promise<void> => {
    return Request.put('/api/product-prices/batch', data)
  },
}
