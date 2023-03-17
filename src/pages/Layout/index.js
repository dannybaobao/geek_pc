import React, { PureComponent } from 'react'
import { Routes, Route, Navigate, Link } from 'react-router-dom'
import {
  LogoutOutlined,
  HomeOutlined,
  UnorderedListOutlined,
  EditOutlined,
} from '@ant-design/icons'
import { Layout, Menu, message, Popconfirm, } from 'antd'

import styles from './index.module.scss'
import ArticleList from 'pages/ArticleList'
import ArticlePublish from 'pages/ArticlePublish'
import Home from 'pages/Home'

const { Header, Content, Sider} = Layout

export class LayoutPanel extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isLogOut:null
    }
  }
  
// 点击确定触发退出系统
 onConfirm = () => {
  //  移除token
  localStorage.removeItem('token')
  // 跳转到登录页,类用不了hook，这里使用navigate
  this.setState({isLogOut:true})
  message.success('退出成功')
  // 退出逻辑写在这里无效,是组件切换
}




  render() {
    return (
      
      <div className={styles.layout}>
        <Layout>
          {/* 头部区域 */}
          {/* 要用{}包裹着因为是动态的 */}
          {this.state.isLogOut&& <Navigate to='/login' />}
          <Header className="header">
            {/* 将就logo，可以在样式里用背景图 */}
            <div className="logo" />
            <div className="profile">
              <span>用户名</span>
              <span>
                <Popconfirm
                  placement="topLeft"
                  title='确定退出登录吗？'
                  description='不要嘛老公'
                  onConfirm={this.onConfirm}
                  okText="确定"
                  cancelText="取消"
                
                >
                 <LogoutOutlined /> 退出
                </Popconfirm>
              </span>
            </div>
          </Header>
          <Layout>
            {/* 左侧menu，路由 */}
            <Sider trigger={null} collapsible>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['1']}
                items={[
                  {
                    key: '1',
                    icon: (
                      <Link to="/">
                        <HomeOutlined />
                      </Link>
                    ),
                    label: <Link to="/">数据概览</Link>,
                  },
                  {
                    key: '2',
                    icon: (
                      <Link to="/home/list">
                        <UnorderedListOutlined />
                      </Link>
                    ),
                    label: <Link to="/home/list">内容管理</Link>,
                  },
                  {
                    key: '3',
                    icon: (
                      <Link to="/home/publish">
                        <EditOutlined />
                      </Link>
                    ),
                    label: <Link to="/home/publish">发布文章</Link>,
                  },
                ]}
              ></Menu>
            </Sider>
            {/* 内容区域 */}
            <Layout style={{ padding: '10px 10px 10px' }}>
              <Content
                style={{
                  background: '#fff',
                  margin: 24,
                  minHeight: 280,
                  height: 100,
                }}
              >
                <Routes>
                  {/* 可以不用精确匹配exact，默认就是 */}
                  <Route path="/" element={<Home />}>
                    {' '}
                  </Route>
                  <Route path="publish" element={<ArticlePublish />}>
                    {' '}
                  </Route>
                  <Route path="list" element={<ArticleList />}>
                    {' '}
                  </Route>
                </Routes>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    )
  }
}
