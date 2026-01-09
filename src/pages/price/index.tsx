import React, { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Button,
  Space,
  Modal,
  Form,
  Select,
  InputNumber,
  message,
  Row,
  Col,
  Tag,
} from 'antd';
import { PlusOutlined, DollarOutlined } from '@ant-design/icons';
import { priceApi, productApi, customerLevelApi } from '@/services';
import type {
  Product,
  CustomerLevelResponse,
  ProductPriceListResponse,
  PriceItemResponse,
  PriceCreate,
} from '@/types/api';

const { Option } = Select;

const PricePage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [priceList, setPriceList] = useState<PriceItemResponse[]>([]);
  const [productList, setProductList] = useState<Product[]>([]);
  const [levelList, setLevelList] = useState<CustomerLevelResponse[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [form] = Form.useForm();

  // 获取商品列表
  const fetchProductList = async () => {
    try {
      const data = await productApi.page({ pageIndex: 1, pageSize: 1000 });
      setProductList(data.items || []);
    } catch (error) {
      // 错误已经在axios拦截器中处理
    }
  };

  // 获取等级列表
  const fetchLevelList = async () => {
    try {
      const data = await customerLevelApi.page();
      setLevelList(data.items || []);
    } catch (error) {
      // 错误已经在axios拦截器中处理
    }
  };

  // 获取价格列表
  const fetchPriceList = async () => {
    if (!selectedProduct) return;

    setLoading(true);
    try {
      const data: ProductPriceListResponse = await priceApi.getProductPrices({
        product_id: selectedProduct.id,
      });
      setPriceList(data.prices || []);
    } catch (error) {
      // 错误已经在axios拦截器中处理
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductList();
    fetchLevelList();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      fetchPriceList();
    }
  }, [selectedProduct]);

  // 打开新增价格对话框
  const handleAdd = () => {
    if (!selectedProduct) {
      message.warning('请先选择商品');
      return;
    }
    form.resetFields();
    form.setFieldsValue({ product_id: selectedProduct.id });
    setModalVisible(true);
  };

  // 提交表单
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const params: PriceCreate = {
        product_id: values.product_id,
        level_id: values.level_id,
        sale_price: values.sale_price,
      };

      await priceApi.set(params);
      message.success('设置价格成功');
      setModalVisible(false);
      fetchPriceList();
    } catch (error) {
      // 错误已经在axios拦截器中处理
    }
  };

  // 删除价格
  const handleDelete = async (record: PriceItemResponse) => {
    try {
      await priceApi.delete({ id: record.id });
      message.success('删除成功');
      fetchPriceList();
    } catch (error) {
      // 错误已经在axios拦截器中处理
    }
  };

  const columns = [
    {
      title: '会员等级',
      dataIndex: 'levelName',
      key: 'levelName',
      render: (name: string | null) => (name ? <Tag color="blue">{name}</Tag> : '-'),
    },
    {
      title: '价格',
      dataIndex: 'salePrice',
      key: 'salePrice',
      render: (value: string) => `¥${value}`,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (value: string) => (value ? new Date(value).toLocaleString('zh-CN') : '-'),
    },
    {
      title: '操作',
      key: 'action',
      width: 100,
      render: (_: unknown, record: PriceItemResponse) => (
        <Button type="link" danger onClick={() => handleDelete(record)}>
          删除
        </Button>
      ),
    },
  ];

  return (
    <Card
      title="价格管理"
      extra={
        selectedProduct && (
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>
            新增价格
          </Button>
        )
      }
    >
      <Row gutter={16} style={{ marginBottom: 16 }}>
        <Col span={12}>
          <Select
            style={{ width: '100%' }}
            placeholder="请选择商品"
            value={selectedProduct?.id}
            onChange={(value) => {
              const product = productList.find((p) => p.id === value);
              setSelectedProduct(product || null);
            }}
            showSearch
            optionFilterProp="children"
          >
            {productList.map((product) => (
              <Option key={product.id} value={product.id}>
                {product.name} {product.spec ? `(${product.spec})` : ''}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>

      {selectedProduct ? (
        <>
          <Card
            size="small"
            style={{ marginBottom: 16 }}
            title={
              <Space>
                <span>商品信息：</span>
                <span>{selectedProduct.name}</span>
                {selectedProduct.shortName && <Tag>{selectedProduct.shortName}</Tag>}
                {selectedProduct.spec && <Tag>{selectedProduct.spec}</Tag>}
              </Space>
            }
          >
            <Row gutter={16}>
              <Col span={6}>
                <span style={{ color: '#888' }}>条形码：</span>
                {selectedProduct.barcode || '-'}
              </Col>
              <Col span={6}>
                <span style={{ color: '#888' }}>进货价：</span>
                ¥{selectedProduct.purchasePrice}
              </Col>
              <Col span={6}>
                <span style={{ color: '#888' }}>库存：</span>
                {selectedProduct.stockQty}
              </Col>
              <Col span={6}>
                <span style={{ color: '#888' }}>创建时间：</span>
                {selectedProduct.createdAt
                  ? new Date(selectedProduct.createdAt).toLocaleString('zh-CN')
                  : '-'}
              </Col>
            </Row>
          </Card>

          <Table
            rowKey="id"
            loading={loading}
            dataSource={priceList}
            columns={columns}
            pagination={false}
          />
        </>
      ) : (
        <div
          style={{
            textAlign: 'center',
            padding: '100px 0',
            color: '#999',
          }}
        >
          <DollarOutlined style={{ fontSize: 64, marginBottom: 16 }} />
          <p>请先选择商品以查看和设置价格</p>
        </div>
      )}

      <Modal
        title="新增价格"
        open={modalVisible}
        onOk={handleSubmit}
        onCancel={() => setModalVisible(false)}
        width={500}
        destroyOnHidden
      >
        <Form form={form} layout="vertical" preserve={false}>
          <Form.Item label="商品" name="product_id">
            <Select disabled>
              {productList.map((product) => (
                <Option key={product.id} value={product.id}>
                  {product.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="会员等级"
            name="level_id"
            rules={[{ required: true, message: '请选择会员等级' }]}
          >
            <Select placeholder="请选择会员等级">
              {levelList.map((level) => (
                <Option key={level.id} value={level.id}>
                  {level.levelName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="价格"
            name="sale_price"
            rules={[
              { required: true, message: '请输入价格' },
              { type: 'number', min: 0, message: '价格不能小于0' },
            ]}
          >
            <InputNumber
              min={0}
              precision={2}
              placeholder="请输入价格"
              style={{ width: '100%' }}
              prefix="¥"
            />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default PricePage;
