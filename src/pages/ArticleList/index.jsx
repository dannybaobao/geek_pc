import React, { PureComponent } from 'react'
import { Breadcrumb, Card, Form, Radio, Button, Select, Space, DatePicker, Table ,Tag} from 'antd'
import { Link } from 'react-router-dom'

import './index.module.scss'
import styles from './index.module.scss'
import { ArticleStatus } from 'api/constants'
import { getChannels } from 'services/modules/channel'
import { getArticles } from 'services/modules/article'

const { Option } = Select


export class ArticleList extends PureComponent {
  columns = [
    {
      title: '封面',
      // dataindex对应数据中某个属性
      dataIndex: 'name'
    },
    {
      title: '标题',
      dataIndex: 'age',
   
    },
    {
      title: '状态',
      dataIndex: 'address',
    
    },
    {
      title: '发布时间',
      dataIndex: 'tags',
    },
    {
      title: '阅读数',
      dataIndex: 'tags',
    },
    {
      title: '评论数',
      dataIndex: 'tags',
    },
    {
      title: '点赞数',
      dataIndex: 'tags',
    },
    {
      title: '操作',
      dataIndex: 'tags',
    },
    
  ]
 
  data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
      tags: ['nice', 'developer'],
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
      tags: ['loser'],
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
      tags: ['cool', 'teacher'],
    },
  ]

  state = {
    // 频道列表数据，这里用数组存的，因为后面要用的时候遍历
    channels: [],
    // 观察数据，这里用对象存
    articles: {}
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
    console.log(res)
    this.setState({

      articles: res.data.data
    })
  }

  render() {
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
              <DatePicker.RangePicker   />
            </Form.Item>
           
            
            <Form.Item>
              <Button type="primary" htmlType="submit">
                筛选
              </Button>
            </Form.Item>
          </Form>
        </Card>

        <Card title={'根据筛选条件查询到xxx结果'} >
          <Table columns={this.columns} dataSource={this.data} />
        </Card>
      </div>
    )
  }
}

export default ArticleList
