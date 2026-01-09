/**
 * 商品管理 API
 */

import Request from '@/utils/request';
import type {
  ProductCreate,
  ProductUpdate,
  ProductDelete,
  ProductById,
  StockUpdate,
  ProductResponse,
  ProductDetailResponse,
  ProductListParams,
  PageResponse,
} from '@/types/api';

/**
 * 商品管理 API
 */
export const productApi = {
  /**
   * 创建商品（仅管理员可用）
   * POST /api/v1/products/create
   */
  create: (data: ProductCreate): Promise<ProductResponse> => {
    return Request.post('/api/v1/products/create', data);
  },

  /**
   * 查询商品列表（所有用户可用）
   * GET /api/v1/products/list
   */
  page: (params: ProductListParams): Promise<PageResponse<ProductResponse>> => {
    return Request.get('/api/v1/products/list', { params });
  },

  /**
   * 查询商品详情（所有用户可用）
   * POST /api/v1/products/detail
   */
  detail: (data: ProductById): Promise<ProductDetailResponse> => {
    return Request.post('/api/v1/products/detail', data);
  },

  /**
   * 更新商品信息（仅管理员可用）
   * POST /api/v1/products/update
   */
  update: (data: ProductUpdate): Promise<ProductResponse> => {
    return Request.post('/api/v1/products/update', data);
  },

  /**
   * 删除商品（仅管理员可用）
   * POST /api/v1/products/delete
   */
  delete: (data: ProductDelete): Promise<void> => {
    return Request.post('/api/v1/products/delete', data);
  },

  /**
   * 更新库存（所有用户可用）
   * POST /api/v1/products/stock
   */
  updateStock: (data: StockUpdate): Promise<void> => {
    return Request.post('/api/v1/products/stock', data);
  },
};
