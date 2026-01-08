/**
 * 路由组件
 */

import React, { Suspense } from 'react';
import { BrowserRouter, useRoutes, Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { routes } from './index';
import RouteGuard from './guard';
import { useApp } from '@/store';

/**
 * 加载中组件
 */
const PageLoading: React.FC = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <Spin size="large" />
  </div>
);

/**
 * 路由内容组件
 */
const RouterContent: React.FC = () => {
  const {
    state: { token },
  } = useApp();

  // 路由配置
  const element = useRoutes(routes);

  // 如果未登录，默认重定向到登录页
  if (!token) {
    return (
      <Suspense fallback={<PageLoading />}>
        <RouteGuard>{element}</RouteGuard>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<PageLoading />}>
      <RouteGuard>{element}</RouteGuard>
    </Suspense>
  );
};

/**
 * 路由组件（包裹 BrowserRouter）
 */
const Router: React.FC = () => (
  <BrowserRouter>
    <RouterContent />
  </BrowserRouter>
);

export default Router;
