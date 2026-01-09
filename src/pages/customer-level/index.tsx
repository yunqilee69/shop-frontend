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
  Popconfirm,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { customerLevelApi } from '@/services';
import type {
  CustomerLevel,
  CustomerLevelCreate,
  CustomerLevelUpdate,
} from '@/types/api';

const CustomerLevelPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<CustomerLevel[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<CustomerLevel | null>(null);
  const [form] = Form.useForm();

  // 获取等级列表
  const fetchList = async () => {
    setLoading(true);
    try {
      const data = await customerLevelApi.list();
      setDataSource(data.list || []);
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
  const handleEdit = (record: CustomerLevel) => {
    setEditingRecord(record);
    form.setFieldsValue({
      level_name: record.levelName,
    });
    setModalVisible(true);
  };

  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingRecord) {
        // 更新
        const params: CustomerLevelUpdate = {
          id: editingRecord.id,
          level_name: values.level_name,
        };
        await customerLevelApi.update(params);
        message.success('更新成功');
        setModalVisible(false);
        fetchList();
      } else {
        // 新增
        const params: CustomerLevelCreate = {
          level_name: values.level_name,
        };
        await customerLevelApi.create(params);
        message.success('创建成功');
        setModalVisible(false);
        fetchList();
      }
    } catch (error) {
      // 错误已经在axios拦截器中处理
    }
  };

  // 删除等级
  const handleDelete = async (record: CustomerLevel) => {
    try {
      await customerLevelApi.delete({ id: record.id });
      message.success('删除成功');
      fetchList();
    } catch (error) {
      // 错误已经在axios拦截器中处理
    }
  };

  const columns = [
    {
      title: '等级名称',
      dataIndex: 'levelName',
      key: 'levelName',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: string) => (value ? new Date(value).toLocaleString('zh-CN') : '-'),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      render: (_: unknown, record: CustomerLevel) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个等级吗？"
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
      title="会员等级管理"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增等级
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
        title={editingRecord ? '编辑等级' : '新增等级'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={600}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item
            label="等级名称"
            name="level_name"
            rules={[
              { required: true, message: '请输入等级名称' },
              { max: 50, message: '等级名称不能超过50个字符' },
            ]}
          >
            <Input placeholder="请输入等级名称，如：普通会员、黄金会员" />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default CustomerLevelPage;
