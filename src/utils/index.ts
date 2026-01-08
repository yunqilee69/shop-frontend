/**
 * 工具函数集合
 */

/**
 * 格式化日期
 */
export const formatDate = (date: string | Date, format = 'YYYY-MM-DD HH:mm:ss'): string => {
  // 这里可以使用 dayjs 或其他日期库
  // 简单实现
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds);
};

/**
 * 防抖
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return function (this: any, ...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

/**
 * 节流
 */
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  let previous = 0;

  return function (this: any, ...args: Parameters<T>) {
    const now = Date.now();
    const remaining = wait - (now - previous);

    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      func.apply(this, args);
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        func.apply(this, args);
      }, remaining);
    }
  };
};

/**
 * 深拷贝
 */
export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as any;
  if (obj instanceof Array) return obj.map((item) => deepClone(item)) as any;
  if (obj instanceof Object) {
    const clonedObj: any = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  }
  return obj;
};

/**
 * 生成随机字符串
 */
export const randomString = (length = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

/**
 * 格式化文件大小
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return (bytes / Math.pow(k, i)).toFixed(2) + ' ' + sizes[i];
};

/**
 * 下载文件
 */
export const downloadFile = (blob: Blob, filename: string) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * 复制到剪贴板
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // 兼容方案
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textarea);
      return success;
    }
  } catch (error) {
    console.error('复制失败:', error);
    return false;
  }
};

/**
 * 获取查询参数
 */
export const getQueryParam = (name: string): string | null => {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
};

/**
 * 对象转查询参数
 */
export const objectToQuery = (obj: Record<string, any>): string => {
  const params = new URLSearchParams();
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });
  return params.toString();
};

/**
 * 树形数据转数组
 */
export const treeToArray = <T extends { children?: T[] }>(tree: T[]): T[] => {
  const result: T[] = [];
  const stack = [...tree];

  while (stack.length) {
    const node = stack.pop()!;
    result.push(node);
    if (node.children && node.children.length) {
      stack.push(...node.children);
    }
  }

  return result;
};

/**
 * 数组转树形数据
 */
export const arrayToTree = <T extends { id: string | number; parentId?: string | number }>(
  items: T[],
  idKey = 'id',
  parentIdKey = 'parentId'
): T[] => {
  const result: T[] = [];
  const itemMap: Record<string, T> = {};

  // 先转成 map 存储
  items.forEach((item) => {
    itemMap[String(item[idKey])] = { ...item, children: [] };
  });

  items.forEach((item) => {
    const id = String(item[idKey]);
    const parentId = item[parentIdKey];

    if (parentId && itemMap[String(parentId)]) {
      if (!itemMap[String(parentId)].children) {
        itemMap[String(parentId)].children = [];
      }
      itemMap[String(parentId)].children!.push(itemMap[id]);
    } else {
      result.push(itemMap[id]);
    }
  });

  return result;
};
