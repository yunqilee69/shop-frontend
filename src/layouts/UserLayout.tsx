/**
 * 用户布局组件（登录页等）
 */

import React from 'react';
import { Layout } from 'antd';
import styles from './UserLayout.module.less';

const { Content } = Layout;

const UserLayout: React.FC = () => {
  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <h1>后台管理系统</h1>
          </div>
        </div>
        <div className={styles.children}>
          <div className={styles.mask} />
          <div className={styles.contentWrapper}>
            <div className={styles.container}>{/* 子内容 */}</div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default UserLayout;
