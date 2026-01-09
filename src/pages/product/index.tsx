import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Popconfirm,
  Switch,
  Image,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import { productApi } from '@/services';
import type { Product, ProductCreate, ProductUpdate, PageResponse } from '@/types/api';

const ProductPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState<Product[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [stockModalVisible, setStockModalVisible] = useState(false);
  const [editingRecord, setEditingRecord] = useState<Product | null>(null);
  const [stockRecord, setStockRecord] = useState<Product | null>(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [searchKeyword, setSearchKeyword] = useState('');
  const [inStockFilter, setInStockFilter] = useState<boolean | undefined>();
  const [form] = Form.useForm();
  const [stockForm] = Form.useForm();

  // 获取商品列表
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

      if (inStockFilter !== undefined) {
        params.inStock = inStockFilter;
      }

      const data: PageResponse<Product> = await productApi.page(params);
      setDataSource(data.items || []);
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
    fetchList();
  }, []);

  // 搜索
  const handleSearch = () => {
    fetchList(1, pagination.pageSize);
  };

  // 重置搜索
  const handleReset = () => {
    setSearchKeyword('');
    setInStockFilter(undefined);
    fetchList(1, pagination.pageSize);
  };

  // 打开新增对话框
  const handleAdd = () => {
    setEditingRecord(null);
    form.resetFields();
    setModalVisible(true);
  };

  // 打开编辑对话框
  const handleEdit = (record: Product) => {
    setEditingRecord(record);
    form.setFieldsValue({
      name: record.name,
      short_name: record.shortName,
      spec: record.spec,
      barcode: record.barcode,
      image_url: record.imageUrl,
      purchase_price: record.purchasePrice,
      stock_qty: record.stockQty,
    });
    setModalVisible(true);
  };

  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      if (editingRecord) {
        // 更新
        const params: ProductUpdate = {
          id: editingRecord.id,
          name: values.name,
          short_name: values.short_name,
          spec: values.spec,
          barcode: values.barcode,
          image_url: values.image_url,
          purchase_price: values.purchase_price,
          stock_qty: values.stock_qty,
        };
        await productApi.update(params);
        message.success('更新成功');
        setModalVisible(false);
        fetchList();
      } else {
        // 新增
        const params: ProductCreate = {
          name: values.name,
          short_name: values.short_name,
          spec: values.spec,
          barcode: values.barcode,
          image_url: values.image_url,
          purchase_price: values.purchase_price,
          stock_qty: values.stock_qty,
        };
        await productApi.create(params);
        message.success('创建成功');
        setModalVisible(false);
        fetchList();
      }
    } catch (error) {
      // 错误已经在axios拦截器中处理
    }
  };

  // 删除商品
  const handleDelete = async (record: Product) => {
    try {
      await productApi.delete({ id: record.id });
      message.success('删除成功');
      fetchList();
    } catch (error) {
      // 错误已经在axios拦截器中处理
    }
  };

  // 打开库存管理对话框
  const handleStock = (record: Product) => {
    setStockRecord(record);
    stockForm.setFieldsValue({
      delta: 0,
    });
    setStockModalVisible(true);
  };

  // 提交库存更新
  const handleStockSubmit = async () => {
    if (!stockRecord) return;

    try {
      const values = await stockForm.validateFields();
      await productApi.updateStock({
        id: stockRecord.id,
        delta: values.delta,
      });

      message.success('库存更新成功');
      setStockModalVisible(false);
      fetchList();
    } catch (error) {
      // 错误已经在axios拦截器中处理
    }
  };

  const columns = [
    {
      title: '商品图片',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
      width: 100,
      render: (url: string | null) =>
        url ? (
          <Image src={url} width={60} height={60} style={{ objectFit: 'cover' }} />
        ) : (
          <div
            style={{
              width: 60,
              height: 60,
              background: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            暂无图片
          </div>
        ),
    },
    {
      title: '商品名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '简称',
      dataIndex: 'shortName',
      key: 'shortName',
      width: 120,
    },
    {
      title: '规格',
      dataIndex: 'spec',
      key: 'spec',
      width: 100,
      render: (value: string | null) => value || '-',
    },
    {
      title: '条形码',
      dataIndex: 'barcode',
      key: 'barcode',
      width: 150,
      render: (value: string | null) => value || '-',
    },
    {
      title: '进货价',
      dataIndex: 'purchasePrice',
      key: 'purchasePrice',
      width: 100,
      render: (value: string) => `¥${value}`,
    },
    {
      title: '库存',
      dataIndex: 'stockQty',
      key: 'stockQty',
      width: 100,
      render: (value: number) => (
        <span style={{ color: value <= 0 ? 'red' : 'inherit' }}>{value}</span>
      ),
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
      width: 200,
      fixed: 'right' as const,
      render: (_: unknown, record: Product) => (
        <Space>
          <Button type="link" onClick={() => handleStock(record)}>
            库存
          </Button>
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEdit(record)}>
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个商品吗？"
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
      title="商品管理"
      extra={
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
          新增商品
        </Button>
      }
    >
      <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
        <Input.Search
          placeholder="搜索商品名称、简称、条形码"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          onSearch={handleSearch}
          style={{ width: 400 }}
          enterButton={<SearchOutlined />}
        />
        <Switch
          checked={inStockFilter}
          onChange={(checked) => {
            setInStockFilter(checked ? true : undefined);
            fetchList(1, pagination.pageSize);
          }}
          checkedChildren="有库存"
          unCheckedChildren="全部"
        />
        <Button onClick={handleReset}>重置</Button>
      </div>

      <Table
        rowKey="id"
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        pagination={pagination}
        scroll={{ x: 1400 }}
        onChange={(paginationInfo) => fetchList(paginationInfo.current, paginationInfo.pageSize)}
      />

      {/* 新增/编辑商品对话框 */}
      <Modal
        title={editingRecord ? '编辑商品' : '新增商品'}
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={700}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item
            label="商品名称"
            name="name"
            rules={[
              { required: true, message: '请输入商品名称' },
              { max: 200, message: '商品名称不能超过200个字符' },
            ]}
          >
            <Input placeholder="请输入商品名称" />
          </Form.Item>

          <Form.Item
            label="简称"
            name="short_name"
            rules={[{ required: true, message: '请输入简称' }]}
          >
            <Input placeholder="请输入简称" />
          </Form.Item>

          <Form.Item
            label="规格"
            name="spec"
          >
            <Input placeholder="请输入规格，如：500g" />
          </Form.Item>

          <Form.Item
            label="条形码"
            name="barcode"
          >
            <Input placeholder="请输入条形码" />
          </Form.Item>

          <Form.Item
            label="商品图片URL"
            name="image_url"
            rules={[{ type: 'url', message: '请输入有效的URL' }]}
          >
            <Input placeholder="请输入商品图片URL" />
          </Form.Item>

          <Form.Item
            label="进货价"
            name="purchase_price"
            rules={[
              { required: true, message: '请输入进货价' },
              { type: 'number', min: 0, message: '进货价不能小于0' },
            ]}
          >
            <InputNumber
              min={0}
              precision={2}
              placeholder="请输入进货价"
              style={{ width: '100%' }}
              prefix="¥"
            />
          </Form.Item>

          <Form.Item
            label="初始库存"
            name="stock_qty"
            rules={[
              { required: true, message: '请输入初始库存' },
              { type: 'number', min: 0, message: '库存不能小于0' },
            ]}
          >
            <InputNumber
              min={0}
              precision={0}
              placeholder="请输入初始库存"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* 库存管理对话框 */}
      <Modal
        title="库存管理"
        open={stockModalVisible}
        onOk={handleStockSubmit}
        onCancel={() => setStockModalVisible(false)}
        destroyOnHidden
      >
        <Form form={stockForm} layout="vertical" preserve={false}>
          <Form.Item label="商品名称">
            <Input value={stockRecord?.name} disabled />
          </Form.Item>

          <Form.Item label="当前库存">
            <Input value={stockRecord?.stockQty} disabled />
          </Form.Item>

          <Form.Item
            label="库存变化量"
            name="delta"
            rules={[
              { required: true, message: '请输入库存变化量' },
              { type: 'number', message: '请输入有效的数字' },
            ]}
            tooltip="正数表示增加库存，负数表示减少库存"
          >
            <InputNumber
              placeholder="请输入库存变化量"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ProductPage;
