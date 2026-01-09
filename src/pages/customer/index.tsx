import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  Select,
  message,
  Popconfirm,
  Tag,
  Row,
  Col,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { customerApi, customerLevelApi } from '@/services';
import type {
  Customer,
  CustomerCreate,
  CustomerUpdate,
  CustomerLevelResponse,
  PageResponse,
} from '@/types/api';
import type { FilterValue } from 'antd/es/table/interface';

const { Option } = Select;

const CustomerPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<Customer[]>([]);
  const [levelList, setLevelList] = useState<CustomerLevelResponse[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Customer | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchKeyword, setSearchKeyword] = useState('');
  const [levelFilter, setLevelFilter] = useState<number | undefined>();
  const [form] = Form.useForm();

  // 获取等级列表
  const fetchLevelList = async () => {
    try {
      const data = await customerLevelApi.list();
      setLevelList(data.list || []);
    } catch (error) {
      // 错误已经在axios拦截器中处理
    }
  };

  // 获取客户列表
  const fetchList = async (
    page = pagination.current,
    pageSize = pagination.pageSize
  ) => {
    setLoading(true);
    try {
      const params: any = {
        pageIndex: page,
        pageSize,
      };

      if (searchKeyword) {
        params.search = searchKeyword;
      }

      if (levelFilter) {
        params.levelId = levelFilter;
      }

      const data: PageResponse<Customer> = await customerApi.list(params);
      setDataSource(data.list || []);
      setPagination({
        current: page,
        pageSize,
        total: data.total || 0,
      });
    } catch (error) {
      // 错误已经在axios拦截器中处理
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLevelList();
    fetchList();
  }, []);

  // 搜索
  const handleSearch = () => {
    fetchList(1, pagination.pageSize);
  };

  // 重置搜索
  const handleReset = () => {
    setSearchKeyword('');
    setLevelFilter(undefined);
    fetchList(1, pagination.pageSize);
  };

  // 打开新增对话框
  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 打开编辑对话框
  const handleEdit = (record: Customer) => {
    setEditingRecord(record);
    form.setFieldsValue({
      level_id: record.levelId,
      name: record.name,
      phone: record.phone,
      contact_person: record.contactPerson,
      address: record.address,
    });
    setModalVisible(true);
  };

  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingRecord) {
        // 更新
        const params: CustomerUpdate = {
          id: editingRecord.id,
          level_id: values.level_id,
          name: values.name,
          phone: values.phone,
          contact_person: values.contact_person,
          address: values.address,
        };
        await customerApi.update(params);
        message.success('更新成功');
        setModalVisible(false);
        fetchList();
      } else {
        // 新增
        const params: CustomerCreate = {
          level_id: values.level_id,
          name: values.name,
          phone: values.phone,
          contact_person: values.contact_person,
          address: values.address,
        };
        await customerApi.create(params);
        message.success('创建成功');
        setModalVisible(false);
        fetchList();
      }
    } catch (error) {
      // 错误已经在axios拦截器中处理
    }
  };

  // 删除客户
  const handleDelete = async (record: Customer) => {
    try {
      await customerApi.delete({ id: record.id });
      message.success('删除成功');
      fetchList();
    } catch (error) {
      // 错误已经在axios拦截器中处理
    }
  };

  // 表格变化
  const handleTableChange = (
    paginationInfo: any,
    filters: Record<string, FilterValue | null>
  ) => {
    const levelId = filters.levelId?.[0] as number | undefined;
    setLevelFilter(levelId);
    fetchList(paginationInfo.current, paginationInfo.pageSize);
  };

  const columns = [
    {
      title: '客户名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: '联系人',
      dataIndex: 'contactPerson',
      key: 'contactPerson',
      render: (value: string | null) => value || '-',
    },
    {
      title: '会员等级',
      dataIndex: 'levelName',
      key: 'levelName',
      filters: Array.isArray(levelList) ? levelList.map((level) => ({
        text: level.levelName,
        value: level.id,
      })) : [],
      render: (value: string | null) =>
        value ? <Tag color="blue">{value}</Tag> : '-',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      width: 300,
      ellipsis: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
      render: (value: string) => (value ? new Date(value).toLocaleString('zh-CN') : '-'),
    },
    {
      title: '操作',
      key: 'action',
      width: 150,
      fixed: 'right' as const,
      render: (_: unknown, record: Customer) => (
        <Space>
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个客户吗？"
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
      title="客户管理"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增客户
        </Button>
      }
    >
      <div style={{ marginBottom: 16 }}>
        <Row gutter={16}>
          <Col span={8}>
            <Input.Search
              placeholder="搜索客户名称、电话"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onSearch={handleSearch}
              enterButton={<SearchOutlined />}
            />
          </Col>
          <Col span={8}>
            <Select
              style={{ width: '100%' }}
              placeholder="筛选会员等级"
              value={levelFilter}
              onChange={(value) => {
                setLevelFilter(value);
                fetchList(1, pagination.pageSize);
              }}
              allowClear
            >
              {levelList.map((level) => (
                <Option key={level.id} value={level.id}>
                  {level.levelName}
                </Option>
              ))}
            </Select>
          </Col>
          <Col span={8}>
            <Button onClick={handleReset}>重置</Button>
          </Col>
        </Row>
      </div>

      <Table
        rowKey="id"
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        scroll={{ x: 1200 }}
        onChange={handleTableChange}
      />

      <Modal
        title={editingRecord ? '编辑客户' : '新增客户'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={600}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item
            label="客户名称"
            name="name"
            rules={[
              { required: true, message: '请输入客户名称' },
              { max: 100, message: '客户名称不能超过100个字符' },
            ]}
          >
            <Input placeholder="请输入客户名称" />
          </Form.Item>

          <Form.Item
            label="联系电话"
            name="phone"
            rules={[
              { required: true, message: '请输入联系电话' },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '请输入有效的手机号码',
              },
            ]}
          >
            <Input placeholder="请输入联系电话" />
          </Form.Item>

          <Form.Item
            label="联系人"
            name="contact_person"
            rules={[{ max: 50, message: '联系人不能超过50个字符' }]}
          >
            <Input placeholder="请输入联系人" />
          </Form.Item>

          <Form.Item
            label="会员等级"
            name="level_id"
            rules={[{ required: true, message: '请选择会员等级' }]}
          >
            <Select placeholder="请选择会员等级" allowClear>
              {levelList.map((level) => (
                <Option key={level.id} value={level.id}>
                  {level.levelName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="地址"
            name="address"
            rules={[{ required: true, message: '请输入地址' }]}
          >
            <Input.TextArea placeholder="请输入地址" rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default CustomerPage;
