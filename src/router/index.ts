/**
 * 路由统一导出
 */

export { default as Router } from './AppRouter';
export { default as RouteGuard } from './guard';
export { routes } from './index.tsx';

// 默认导出 Router 供 main.tsx 使用
export { default } from './AppRouter';
