/**
 * 常量定义
 */

/**
 * 响应状态码
 */
export const StatusCode = {
  SUCCESS: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

/**
 * Token 相关
 */
export const TokenKey = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_INFO: 'user_info',
} as const;

/**
 * 存储前缀
 */
export const StoragePrefix = {
  TOKEN: 'shop_token_',
  USER: 'shop_user_',
  SETTINGS: 'shop_settings_',
} as const;

/**
 * 分页默认配置
 */
export const PageConfig = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: ['10', '20', '50', '100'],
} as const;

/**
 * 文件上传配置
 */
export const UploadConfig = {
  MAX_FILE_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  ALLOWED_DOCUMENT_TYPES: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ],
} as const;

/**
 * 用户状态
 */
export const UserStatus = {
  ACTIVE: 1,
  INACTIVE: 0,
  BANNED: -1,
} as const;

/**
 * 用户状态映射
 */
export const UserStatusMap: Record<number, string> = {
  [UserStatus.ACTIVE]: '正常',
  [UserStatus.INACTIVE]: '停用',
  [UserStatus.BANNED]: '封禁',
};

/**
 * 日期格式
 */
export const DateFormat = {
  DATE: 'YYYY-MM-DD',
  TIME: 'HH:mm:ss',
  DATETIME: 'YYYY-MM-DD HH:mm:ss',
  DATETIME_MINUTE: 'YYYY-MM-DD HH:mm',
  MONTH: 'YYYY-MM',
  YEAR: 'YYYY',
} as const;
