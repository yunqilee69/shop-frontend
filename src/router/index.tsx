/**
 * 路由配置
 */

import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import Layout from '@/layouts/BasicLayout';

// 懒加载页面组件
const Dashboard = lazy(() => import('@/pages/dashboard'));
const Login = lazy(() => import('@/pages/login'));
const NotFound = lazy(() => import('@/pages/404'));
const CustomerLevel = lazy(() => import('@/pages/customer-level'));
const Customer = lazy(() => import('@/pages/customer'));
const Product = lazy(() => import('@/pages/product'));
const Price = lazy(() => import('@/pages/price'));

/**
 * 路由配置
 */
export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'user',
        // 懒加载
        lazy: () => import('@/pages/user'),
      },
      {
        path: 'customer-level',
        element: <CustomerLevel />,
      },
      {
        path: 'customer',
        element: <Customer />,
      },
      {
        path: 'product',
        element: <Product />,
      },
      {
        path: 'price',
        element: <Price />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

/**
 * 扩展路由元信息
 */
export interface RouteMeta {
  title?: string;
  icon?: string;
  hidden?: boolean;
  keepAlive?: boolean;
  requiresAuth?: boolean;
  roles?: string[];
  permissions?: string[];
}
