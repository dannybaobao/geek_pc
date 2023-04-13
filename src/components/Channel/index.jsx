import React, { Component } from 'react'
import { Select, Space } from 'antd'

import { getChannels } from 'services/modules/channel'

const { Option } = Select

export default class Channel extends Component {
  state = {
    channels: [],
  }

  //频道， 发起网络请求
  componentDidMount() {
    // 为了性能，把两个异步请求抽出去，让didmount变成同步发送
    this.getChannelList()
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

  render() {
    // console.log(props),父组件Form给的,拿来实现回显
    return (
      <Select
        mode="multiple"
        style={{ width: '20%' }}
        placeholder="请选择文章频道"
        // 回显
        value={this.props.value}
        onChange={this.props.onChange}
      >
        {this.state.channels.map((item) => (
          <Option value={item.id} key={item.id}>
            <Space>{item.name}</Space>
          </Option>
        ))}
      </Select>
    )
  }
}
