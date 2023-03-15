import React, { PureComponent } from 'react'
import { Breadcrumb, Layout, Menu } from 'antd'
import {
  EditOutlined,
  DiffOutlined,
  HomeOutlined,
  LogoutOutlined,
} from '@ant-design/icons'

import styles from './index.module.scss'

const { Header, Content, Sider } = Layout
const items2 = [ HomeOutlined, DiffOutlined,EditOutlined].map(
  (icon, index) => {
    const key =index
    const info = ["数据概览","内容管理","发布文章"]
    return {
      key: key,
      icon: React.createElement(icon),
      label: info[key],
    }
  }
)

export class Home extends PureComponent {
  render() {
    return (
      <div className={styles.layout}>
        <Layout>
          <Header className="header">
            <div className="logo" />
            <div className="profile">
              <span>用户名</span>
              <span>
                <LogoutOutlined />{' '}退出
              </span>
            </div>
          </Header>
          <Layout>
            <Sider width={200} >
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                style={{
                  height: '100%',
                  borderRight: 0,
                }}
                // 动态生成
                items={items2}
                theme="dark"
              />
            </Sider>
            <Layout
              style={{
                padding: '0 24px 24px',
              }}
            >
              <Content
                className="site-layout-background"
                style={{
                  padding: 24,
                  margin: 0,
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

export default Home
