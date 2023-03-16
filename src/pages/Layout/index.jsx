import React, { PureComponent } from 'react'
import {
  LogoutOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'

import styles from './index.module.scss'

const { Header, Content, Sider } = Layout

export class LayoutPanel extends PureComponent {
  render() {
    return (
      <div className={styles.layout}>
        <Layout>
          {/* 头部区域 */}
          <Header className="header">
            {/* 将就logo，可以在样式里用背景图 */}
            <div className="logo" />
            <div className="profile">
              <span>用户名</span>
              <span>
                <LogoutOutlined /> 退出
              </span>
            </div>
          </Header>
          <Layout>
            <Sider trigger={null} collapsible >

              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                  {
                    key: '1',
                    icon: <HomeOutlined />,
                    label: '数据概览',
                  },
                  {
                    key: '2',
                    icon: <UnorderedListOutlined />,
                    label: '内容管理',
                  },
                  {
                    key: '3',
                    icon: <EditOutlined />,
                    label: '发布文章',
                  },
                ]}
              />
            </Sider>
            <Layout style={{ padding: '10px 10px 10px' }}>
              <Content
                style={{
                  background: '#fff',
                  padding: 24,
                  margin: 24,
                  minHeight: 280,
                }}
              >
                Content
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}
