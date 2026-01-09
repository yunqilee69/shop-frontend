/**
 * 会员等级管理 API
 */

import Request from '@/utils/request';
import type {
  CustomerLevelCreate,
  CustomerLevelUpdate,
  CustomerLevelDelete,
  CustomerLevelById,
  CustomerLevelResponse,
  PageResponse,
} from '@/types/api';

/**
 * 会员等级 API
 */
export const customerLevelApi = {
  /**
   * 创建会员等级（仅管理员可用）
   * POST /api/v1/customer-levels/create
   */
  create: (data: CustomerLevelCreate): Promise<CustomerLevelResponse> => {
    return Request.post('/api/v1/customer-levels/create', data);
  },

  /**
   * 查询等级列表（所有用户可用）
   * GET /api/v1/customer-levels/list
   */
  list: (): Promise<PageResponse<CustomerLevelResponse>> => {
    return Request.get('/api/v1/customer-levels/list');
  },

  /**
   * 查询等级详情（所有用户可用）
   * POST /api/v1/customer-levels/detail
   */
  detail: (data: CustomerLevelById): Promise<CustomerLevelResponse> => {
    return Request.post('/api/v1/customer-levels/detail', data);
  },

  /**
   * 更新会员等级（仅管理员可用）
   * POST /api/v1/customer-levels/update
   */
  update: (data: CustomerLevelUpdate): Promise<CustomerLevelResponse> => {
    return Request.post('/api/v1/customer-levels/update', data);
  },

  /**
   * 删除会员等级（仅管理员可用）
   * POST /api/v1/customer-levels/delete
   */
  delete: (data: CustomerLevelDelete): Promise<void> => {
    return Request.post('/api/v1/customer-levels/delete', data);
  },
};
