/**
 * 仪表盘页面
 */

import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import { UserOutlined, ShoppingCartOutlined, DollarOutlined, ShoppingOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
  return (
    <div style={{ width: '100%' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={11280}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="总订单数"
              value={93}
              suffix="个"
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="销售额"
              value={112800}
              prefix={<DollarOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="商品数"
              value={93}
              suffix="件"
              prefix={<ShoppingOutlined />}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
        <Col span={24}>
          <Card title="数据概览" bordered={false}>
            <p>欢迎使用后台管理系统！</p>
            <p>这里将展示图表和数据分析内容。</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
