import React, { PureComponent } from 'react'
import { Routes, Route, Navigate, Link, Outlet } from 'react-router-dom'
import {
  LogoutOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Layout, Menu } from 'antd'

import styles from './index.module.scss'
import ArticleList from 'pages/ArticleList'
import ArticlePublish from 'pages/ArticlePublish'
import Home from 'pages/Home'

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
                    icon: <Link to='/'><HomeOutlined /></Link>,
                    label: <Link to='/'>数据概览</Link>, 
                  },
                  {
                    key: '2',
                    icon: <Link to='/home/list'><UnorderedListOutlined /></Link>,
                    label:<Link to='/home/list'>内容管理</Link>,
                  },
                  {
                    key: '3',
                    icon: <Link to='/home/publish'><EditOutlined /></Link>,
                    label: <Link to='/home/publish'>发布文章</Link>,
                  },
                ]}
              >
              </Menu>
            </Sider>
            <Layout style={{ padding: '10px 10px 10px' }}>
              <Content
                style={{
                  background: '#fff',
                  margin: 24,
                  minHeight: 280,
                  height:100
                }}
              >
               
                <Routes>
                  {/* 可以不用精确匹配exact，默认就是 */}
                  <Route path='/' element={<Home/>}> </Route>
                  <Route path='/publish' element={<ArticlePublish/>}> </Route>
                  <Route path='/list' element={<ArticleList/>}> </Route>
                </Routes>
                
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}
