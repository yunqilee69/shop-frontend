/**
 * 客户管理 API
 */

import Request from '@/utils/request';
import type {
  CustomerCreate,
  CustomerUpdate,
  CustomerDelete,
  CustomerById,
  CustomerListResponse,
  CustomerListParams,
  PageResponse,
} from '@/types/api';

/**
 * 客户管理 API
 */
export const customerApi = {
  /**
   * 创建客户（所有用户可用）
   * POST /api/v1/customers/create
   */
  create: (data: CustomerCreate): Promise<CustomerListResponse> => {
    return Request.post('/api/v1/customers/create', data);
  },

  /**
   * 查询客户列表（所有用户可用）
   * GET /api/v1/customers/list
   */
  page: (params: CustomerListParams): Promise<PageResponse<CustomerListResponse>> => {
    return Request.get('/api/v1/customers/list', { params });
  },

  /**
   * 查询客户详情（所有用户可用）
   * POST /api/v1/customers/detail
   */
  detail: (data: CustomerById): Promise<CustomerListResponse> => {
    return Request.post('/api/v1/customers/detail', data);
  },

  /**
   * 更新客户信息（仅管理员可用）
   * POST /api/v1/customers/update
   */
  update: (data: CustomerUpdate): Promise<CustomerListResponse> => {
    return Request.post('/api/v1/customers/update', data);
  },

  /**
   * 删除客户（仅管理员可用）
   * POST /api/v1/customers/delete
   */
  delete: (data: CustomerDelete): Promise<void> => {
    return Request.post('/api/v1/customers/delete', data);
  },
};
