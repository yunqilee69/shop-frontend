/**
 * 用户管理页面
 */

import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
  Switch,
  Popconfirm,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { authApi } from '@/services';
import type { UserCreate, UserResponse } from '@/types/api';

const UserPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<UserResponse[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<UserResponse | null>(null);
  const [form] = Form.useForm();

  // 获取用户列表
  const fetchList = async () => {
    setLoading(true);
    try {
      // 注意：这里假设有一个获取用户列表的接口
      // 如果后端没有提供这个接口，需要添加
      // const data = await authApi.list();
      // setDataSource(data || []);

      // 临时方案：显示当前登录用户
      // 实际使用时需要从后端获取用户列表
      const currentUserStr = localStorage.getItem('user');
      if (currentUserStr) {
        const currentUser = JSON.parse(currentUserStr);
        setDataSource([currentUser]);
      }
    } catch (error) {
      // 错误已经在axios拦截器中处理
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  // 打开新增对话框
  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 打开编辑对话框
  const handleEdit = (record: UserResponse) => {
    setEditingRecord(record);
    form.setFieldsValue({
      username: record.username,
      name: record.name,
      admin_flag: record.adminFlag,
      phone: record.phone,
    });
    setModalVisible(true);
  };

  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingRecord) {
        // 更新 - 注意：注册接口不支持更新，这里需要根据实际API调整
        message.warning('编辑功能暂未实现，请联系管理员');
        // const params: UserUpdate = {
        //   id: editingRecord.id,
        //   ...values,
        // };
        // await authApi.update(params);
        // message.success('更新成功');
        // setModalVisible(false);
        // fetchList();
      } else {
        // 新增 - 使用注册接口
        const params: UserCreate = {
          username: values.username,
          name: values.name,
          password: values.password,
          admin_flag: values.admin_flag || false,
          phone: values.phone,
        };
        await authApi.register(params);
        message.success('创建成功');
        setModalVisible(false);
        fetchList();
      }
    } catch (error) {
      // 错误已经在axios拦截器中处理
    }
  };

  // 删除用户
  const handleDelete = async (record: UserResponse) => {
    try {
      // 注意：这里假设有一个删除用户的接口
      // 如果后端没有提供这个接口，需要添加
      message.warning('删除功能暂未实现');
      // await authApi.delete({ id: record.id });
      // message.success('删除成功');
      // fetchList();
    } catch (error) {
      // 错误已经在axios拦截器中处理
    }
  };

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      key: 'phone',
      render: (value: string) => value || '-',
    },
    {
      title: '管理员',
      dataIndex: 'adminFlag',
      key: 'adminFlag',
      render: (value: boolean) => (value ? '是' : '否'),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: unknown, record: UserResponse) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个用户吗？"
            onConfirm={() => handleDelete(record)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="用户管理"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增用户
        </Button>
      }
    >
      <Table
        rowKey="id"
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条`,
        }}
      />

      <Modal
        title={editingRecord ? '编辑用户' : '新增用户'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={600}
        destroyOnClose
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              { min: 3, max: 50, message: '用户名长度为3-50个字符' },
              { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含字母、数字和下划线' },
            ]}
          >
            <Input placeholder="请输入用户名" disabled={!!editingRecord} />
          </Form.Item>

          <Form.Item
            label="姓名"
            name="name"
            rules={[
              { required: true, message: '请输入姓名' },
              { max: 50, message: '姓名不能超过50个字符' },
            ]}
          >
            <Input placeholder="请输入姓名" />
          </Form.Item>

          <Form.Item
            label="密码"
            name="password"
            rules={
              editingRecord
                ? []
                : [
                    { required: true, message: '请输入密码' },
                    { min: 6, message: '密码至少6个字符' },
                  ]
            }
          >
            <Input.Password placeholder={editingRecord ? '不修改请留空' : '请输入密码'} />
          </Form.Item>

          <Form.Item
            label="手机号"
            name="phone"
            rules={[
              { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号' },
            ]}
          >
            <Input placeholder="请输入手机号（可选）" />
          </Form.Item>

          <Form.Item
            label="管理员权限"
            name="admin_flag"
            valuePropName="checked"
            initialValue={false}
          >
            <Switch checkedChildren="是" unCheckedChildren="否" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default UserPage;
