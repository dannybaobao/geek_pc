import React, { PureComponent } from 'react'
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import {
  Breadcrumb,
  Card,
  Form,
  Radio,
  Button,
  Select,
  Space,
  DatePicker,
  Table,
  Tag,
} from 'antd'
import { Link } from 'react-router-dom'

import './index.module.scss'
import styles from './index.module.scss'
import { ArticleStatus } from 'api/constants'
import { getChannels } from 'services/modules/channel'
import { getArticles } from 'services/modules/article'
import defaultImg from 'assets/error.png'

const { Option } = Select

export class ArticleList extends PureComponent {
  columns = [
    {
      title: '封面',
      // dataindex对应数据中某个属性
      // dataIndex加了的话就是直接拿到cover，不加拿到的是整个对象
      // 控制这一列自己想要渲染的内容
      render: (data) => {
        if (data.cover.type === 0) {
          // 通过观察数据结构，无图渲染该图片,objectFit:'cover'是防止图片失真
          return (
            <img
              src={defaultImg}
              alt=""
              style={{ width: 200, height: 120, objectFit: 'cover' }}
            />
          )
        }
        // 有图
        return (
          <img
            src={data.cover.images[0]}
            alt=""
            style={{ width: 200, height: 120, objectFit: 'cover' }}
          />
        )
      },
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      render(status) {
        // console.log(data)
        const obj = ArticleStatus.find((item) => item.id === status)
        return (
          <Tag color={obj.color}>
            {/* 增加不同状态不同颜色 */}
            {obj.name}
          </Tag>
        )
      },
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate',
    },
    {
      title: '阅读数',
      dataIndex: 'read_count',
    },
    {
      title: '评论数',
      dataIndex: 'comment_count',
    },
    {
      title: '点赞数',
      dataIndex: 'like_count',
    },
    {
      title: '操作',
      render(data) {
        return(
        <Space>
   
            <Button type="primary" shape="circle" icon={<EditOutlined />} />
            <Button
              type="primary"
              danger
              shape="circle"
              icon={<DeleteOutlined />}
            />
   
        </Space>)
      },
    },
  ]

  state = {
    // 频道列表数据，这里用数组存的，因为后面要用的时候遍历
    channels: [],
    // 观察数据，这里用对象存
    articles: {},
  }

  // 拿到表单的数据状态
  onFinish = (values) => {
    console.log('Success:', values)
  }

  //频道， 发起网络请求
  componentDidMount() {
    // 为了性能，把两个异步请求抽出去，让didmount变成同步发送
    this.getChannelList()
    // 获取文章列表
    this.getArticles()
  }

  async getChannelList() {
    const res = await getChannels()
    // console.log(res)
    // 把请求下来的数据储存起来，这里用数组存的，查看是否存成功，去控制台coponents搜索查看
    this.setState(
      {
        channels: res.data.data.channels,
      },
      () => {
        return this.state.channels
      }
    )
  }

  async getArticles() {
    const res = await getArticles()
    // console.log(res)
    this.setState({
      articles: res.data.data,
    })
  }

  render() {
    const { total_count, results } = this.state.articles
    // 打印出来存在组件的数据，观察需要的数据在哪里，然后再在上面columns逻辑里面定位数据
    // console.log(results)
    return (
      <div className={styles.root}>
        <Card
          title={
            <Breadcrumb
              items={[
                {
                  title: <Link to="/home">首页</Link>,
                },
                {
                  title: <Link>文章列表</Link>,
                },
              ]}
            />
          }
        >
          {/* 表单结构 */}
          <Form
            initialValues={{
              status: -1,
            }}
            onFinish={this.onFinish}
          >
            <Form.Item label="状态" name="status">
              <Radio.Group>
                {/* 数据还要用抽出去 */}
                {ArticleStatus.map((item) => (
                  <Radio key={item.id} value={item.id}>
                    {item.name}
                  </Radio>
                ))}
                {/* <Radio value={-1}>全部</Radio>
                <Radio value={0}>草稿</Radio>
                <Radio value={1}>待审核</Radio>
                <Radio value={2}>审核通过</Radio>
                <Radio value={3}>审核失败</Radio> */}
              </Radio.Group>
            </Form.Item>

            <Form.Item label="频道" name="channel_id">
              <Select
                mode="multiple"
                style={{ width: '20%' }}
                placeholder="请选择频道"
                optionLabelProp="label"
              >
                {this.state.channels.map((item) => (
                  <Option value={item.id} key={item.id}>
                    <Space>{item.name}</Space>
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="日期" name="data">
              <DatePicker.RangePicker />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                筛选
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card title={`根据筛选条件查询到${total_count}条结果`}>
          {/* 列数据，一一对应的数据源，rowKey处理报错 */}
          <Table columns={this.columns} dataSource={results} rowKey="id" />
        </Card>
      </div>
    )
  }
}

export default ArticleList
