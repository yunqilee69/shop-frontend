/**
 * 路由守卫
 */

import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Spin } from 'antd';
import { useApp } from '@/store';

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    state: { token },
  } = useApp();

  useEffect(() => {
    // 不需要认证的路径
    const publicPaths = ['/login', '/404'];
    const isPublicPath = publicPaths.some((path) => location.pathname.startsWith(path));

    // 如果未登录且访问受保护路径，跳转到登录页
    if (!token && !isPublicPath) {
      navigate('/login', { replace: true });
    }

    // 如果已登录且访问登录页，跳转到首页
    if (token && location.pathname === '/login') {
      navigate('/', { replace: true });
    }
  }, [token, location.pathname, navigate]);

  // 如果未登录且访问受保护路径，显示加载状态
  if (!token && location.pathname !== '/login') {
    return (
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
  }

  return <>{children}</>;
};

export default RouteGuard;
