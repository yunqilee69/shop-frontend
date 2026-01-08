/**
 * 本地存储工具
 */

import { StoragePrefix } from '@/constants';

class Storage {
  private getPrefix(key: string): string {
    return `${StoragePrefix.SETTINGS}${key}`;
  }

  /**
   * 设置 localStorage
   */
  setLocal(key: string, value: any): void {
    const prefixKey = this.getPrefix(key);
    const data = JSON.stringify(value);
    localStorage.setItem(prefixKey, data);
  }

  /**
   * 获取 localStorage
   */
  getLocal<T>(key: string): T | null {
    const prefixKey = this.getPrefix(key);
    const data = localStorage.getItem(prefixKey);
    if (!data) return null;
    try {
      return JSON.parse(data) as T;
    } catch {
      return data as T;
    }
  }

  /**
   * 删除 localStorage
   */
  removeLocal(key: string): void {
    const prefixKey = this.getPrefix(key);
    localStorage.removeItem(prefixKey);
  }

  /**
   * 清空 localStorage
   */
  clearLocal(): void {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(StoragePrefix.SETTINGS)) {
        localStorage.removeItem(key);
      }
    });
  }

  /**
   * 设置 sessionStorage
   */
  setSession(key: string, value: any): void {
    const prefixKey = this.getPrefix(key);
    const data = JSON.stringify(value);
    sessionStorage.setItem(prefixKey, data);
  }

  /**
   * 获取 sessionStorage
   */
  getSession<T>(key: string): T | null {
    const prefixKey = this.getPrefix(key);
    const data = sessionStorage.getItem(prefixKey);
    if (!data) return null;
    try {
      return JSON.parse(data) as T;
    } catch {
      return data as T;
    }
  }

  /**
   * 删除 sessionStorage
   */
  removeSession(key: string): void {
    const prefixKey = this.getPrefix(key);
    sessionStorage.removeItem(prefixKey);
  }

  /**
   * 清空 sessionStorage
   */
  clearSession(): void {
    const keys = Object.keys(sessionStorage);
    keys.forEach((key) => {
      if (key.startsWith(StoragePrefix.SETTINGS)) {
        sessionStorage.removeItem(key);
      }
    });
  }
}

export default new Storage();
