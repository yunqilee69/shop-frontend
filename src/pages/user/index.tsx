/**
 * 用户管理页面
 */

import React from 'react';
import { Table } from 'antd';

const User: React.FC = () => {
  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  const data = [
    {
      key: '1',
      username: 'admin',
      nickname: '管理员',
      email: 'admin@example.com',
      status: '正常',
      createdAt: '2024-01-01 12:00:00',
    },
  ];

  return (
    <div>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default User;
