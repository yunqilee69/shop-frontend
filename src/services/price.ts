/**
 * 价格管理 API
 */

import Request from '@/utils/request';
import type {
  PriceCreate,
  PriceDelete,
  PriceByProduct,
  BatchPriceCreate,
  PriceResponse,
  ProductPriceListResponse,
  BatchPriceResponse,
} from '@/types/api';

/**
 * 价格管理 API
 */
export const priceApi = {
  /**
   * 设置商品等级价格（仅管理员可用）
   * POST /api/v1/prices/set
   */
  set: (data: PriceCreate): Promise<PriceResponse> => {
    return Request.post('/api/v1/prices/set', data);
  },

  /**
   * 批量设置商品价格（仅管理员可用）
   * POST /api/v1/prices/batch
   */
  batchSet: (data: BatchPriceCreate): Promise<BatchPriceResponse> => {
    return Request.post('/api/v1/prices/batch', data);
  },

  /**
   * 查询商品价格列表（所有用户可用）
   * POST /api/v1/prices/product-prices
   */
  getProductPrices: (data: PriceByProduct): Promise<ProductPriceListResponse> => {
    return Request.post('/api/v1/prices/product-prices', data);
  },

  /**
   * 删除价格（仅管理员可用）
   * POST /api/v1/prices/delete
   */
  delete: (data: PriceDelete): Promise<void> => {
    return Request.post('/api/v1/prices/delete', data);
  },
};
