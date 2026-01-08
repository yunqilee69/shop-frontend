/**
 * 基础布局组件
 */

import React from 'react';
import { Layout, Menu, Breadcrumb, Avatar, Dropdown, theme } from 'antd';
import {
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  DashboardOutlined,
  LogoutOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
  ShoppingOutlined,
  DollarOutlined,
  TrophyOutlined,
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '@/store';
import styles from './BasicLayout.module.less';

const { Header, Sider, Content } = Layout;

const BasicLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    state: { collapsed, user },
    actions: { setCollapsed, logout },
  } = useApp();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
      onClick: () => navigate('/dashboard'),
    },
    {
      key: '/customer-level',
      icon: <TrophyOutlined />,
      label: '会员等级',
      onClick: () => navigate('/customer-level'),
    },
    {
      key: '/customer',
      icon: <TeamOutlined />,
      label: '客户管理',
      onClick: () => navigate('/customer'),
    },
    {
      key: '/product',
      icon: <ShoppingOutlined />,
      label: '商品管理',
      onClick: () => navigate('/product'),
    },
    {
      key: '/price',
      icon: <DollarOutlined />,
      label: '价格管理',
      onClick: () => navigate('/price'),
    },
    {
      key: '/user',
      icon: <UsergroupAddOutlined />,
      label: '用户管理',
      onClick: () => navigate('/user'),
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const dropdownItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人信息',
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
      onClick: handleLogout,
    },
  ];

  return (
    <Layout className={styles.layout}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={styles.sider}
        theme="dark"
        width={200}
        collapsedWidth={80}
      >
        <div className={styles.logo}>
          {collapsed ? '后台' : '后台管理系统'}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Sider>
      <Layout className={collapsed ? styles.siteLayoutCollapsed : styles.siteLayout}>
        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            onClick={() => setCollapsed(!collapsed)}
            style={{ cursor: 'pointer', fontSize: '16px' }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
          <Dropdown menu={{ items: dropdownItems }} placement="bottomRight">
            <div style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Avatar
                size="small"
                icon={<UserOutlined />}
                src={user?.avatar}
              />
              <span>{user?.name || user?.username}</span>
            </div>
          </Dropdown>
        </Header>
        <Content style={{ margin: '16px' }}>
          <Breadcrumb
            style={{ margin: '16px 0' }}
            items={[
              { title: '首页' },
              {
                title: menuItems.find((item) => item.key === location.pathname)?.label || '未知页面',
              },
            ]}
          />
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
