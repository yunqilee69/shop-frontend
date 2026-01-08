/**
 * Axios 请求封装
 */

import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { message } from 'antd';
import { StatusCode } from '@/types';
import Storage from './storage';
import { TokenKey } from '@/constants';

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
  },
});

/**
 * 请求拦截器
 */
service.interceptors.request.use(
  (config) => {
    // 添加 token
    const token = Storage.getLocal<string>(TokenKey.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 添加时间戳防止缓存
    if (config.method === 'get') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      };
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * 响应拦截器
 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;

    // 如果是文件下载等特殊响应，直接返回完整响应
    if (response.config.responseType === 'blob') {
      return response;
    }

    // 检查响应结构
    // 假设后端返回格式为: { code: number, msg: string, data: any }
    // 如果 code === 200，直接返回 data 字段
    if (data && data.code === StatusCode.SUCCESS) {
      return data.data;
    }

    // 业务失败，显示错误消息
    const errorMsg = data?.msg || data?.message || '请求失败';
    message.error(errorMsg);
    return Promise.reject(new Error(errorMsg));
  },
  (error: AxiosError) => {
    const { response } = error;

    // 网络错误
    if (!response) {
      message.error('网络连接失败，请检查网络');
      return Promise.reject(error);
    }

    const { status, data } = response as any;

    // HTTP 状态码错误处理
    switch (status) {
      case StatusCode.UNAUTHORIZED:
        message.error('登录已过期，请重新登录');
        // 清除 token
        Storage.removeLocal(TokenKey.ACCESS_TOKEN);
        Storage.removeLocal(TokenKey.USER_INFO);
        // 跳转到登录页
        window.location.href = '/login';
        break;
      case StatusCode.FORBIDDEN:
        message.error('没有权限访问');
        break;
      case StatusCode.NOT_FOUND:
        message.error('请求的资源不存在');
        break;
      case StatusCode.INTERNAL_SERVER_ERROR:
        message.error(data?.msg || data?.message || '服务器错误');
        break;
      default:
        message.error(data?.msg || data?.message || `请求失败 (${status})`);
    }

    return Promise.reject(error);
  }
);

/**
 * 通用请求方法
 */
class Request {
  /**
   * GET 请求
   */
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.get(url, config);
  }

  /**
   * POST 请求
   */
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, data, config);
  }

  /**
   * PUT 请求
   */
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return service.put(url, data, config);
  }

  /**
   * DELETE 请求
   */
  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return service.delete(url, config);
  }

  /**
   * 文件上传
   */
  upload<T = any>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> {
    return service.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * 文件下载
   */
  download(url: string, config?: AxiosRequestConfig): Promise<Blob> {
    return service.get(url, {
      ...config,
      responseType: 'blob',
    });
  }
}

export default new Request();
