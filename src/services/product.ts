/**
 * 商品管理 API
 */

import Request from '@/utils/request'
import type {
  ProductCreate,
  ProductUpdate,
  ProductResponse,
  ProductListParams,
  PageResponse,
} from '@/types/api'

/**
 * 商品管理 API
 */
export const productApi = {
  /**
   * 创建商品
   * POST /api/products
   */
  create: (data: ProductCreate): Promise<ProductResponse> => {
    return Request.post('/api/products', data)
  },

  /**
   * 更新商品
   * PUT /api/products/{id}
   */
  update: (id: number, data: ProductUpdate): Promise<ProductResponse> => {
    return Request.put(`/api/products/${id}`, data)
  },

  /**
   * 删除商品
   * DELETE /api/products/{id}
   */
  delete: (id: number): Promise<void> => {
    return Request.delete(`/api/products/${id}`)
  },

  /**
   * 查询商品详情
   * GET /api/products/{id}
   */
  getById: (id: number): Promise<ProductResponse> => {
    return Request.get(`/api/products/${id}`)
  },

  /**
   * 根据条形码查询商品
   * GET /api/products/barcode/{barcode}
   */
  getByBarcode: (barcode: string): Promise<ProductResponse> => {
    return Request.get(`/api/products/barcode/${barcode}`)
  },

  /**
   * 查询商品列表
   * GET /api/products
   */
  list: (params?: ProductListParams): Promise<ProductResponse[]> => {
    return Request.get('/api/products', { params })
  },

  /**
   * 分页查询商品
   * GET /api/products/page
   */
  page: (params: ProductListParams): Promise<PageResponse<ProductResponse>> => {
    return Request.get('/api/products/page', { params })
  },
}
