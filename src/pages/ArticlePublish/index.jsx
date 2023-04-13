import React, { PureComponent } from 'react'
import { 
  Card, 
  Breadcrumb, 
  Form, 
  Button, 
  Space, 
  Input, 
  Radio, 
  Upload,
  Modal, 
  message} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'


import styles from './index.module.scss'
import Channel from 'components/Channel'
import { BASE_URL} from 'services/request/config'
import { addArticle } from 'services/modules/article'

export class ArticlePublish extends PureComponent {
   state = {
    // 文章的封面类型
    type: 0,
    // 用于控制上传的图片以及显示,先写死，图片后端给
    fileList: [],
    showPreview: false,
    previewUrl:'',
   //  编辑的id
    id: this.props.match.params.id,
   }

  //  手动验证需要的ref
  formRef = React.createRef()

  // 抽出来逻辑
   async save(values, draft) {

    const {fileList, type} = this.state
    if (fileList.length !== type) {
       return message.warning('上传的图片数量不正确')
    }

    // 根据fileList得到
    const images = await fileList.map((item) => {
      return item.url || item.response.data.url
    })
    // console.log(images)
    // 添加文章
    // console.log(values)
     addArticle({
      ...values,
      cover: {
        type,
        images,
      }
    },
     draft
    )
    message.success('添加成功')
    window.location.href = '/home/list'
  }

  // 拿到整个Form的values值，要给Form一个name属性，name=“”值取决于接口文档，
    onFinish = async (values) => {
    // console.log(values)
    // 拿到
    // console.log(this.state.fileList)
    // 校验
    // 提交表单
    this.save(values, false)
  }

    addDraft = async() => {
    // console.log('添加草稿')
    //antd validateFields是promise，等他校验，所以async await
    const values = await this.formRef.current.validateFields()
    // console.log(values)
    // 校验完，剩下的逻辑跟上面的发布文章一样，所以save方法
    // 添加草稿
    this.save(values,true)
  }




  changeType = (e) => {
    this.setState({
      type: e.target.value
    })
  }

  uploadImage = ({ fileList }) => {
      // console.log(e)
      // 把fileList修改到state中 
      this.setState({
        fileList,
      })
}

// 图片预览，注意：如果fileList是将来回显的，通过url就能访问到
// 如果fileList的文件是上传的，需要通过file.response.data.url
handlePreview = (file) => {
    //  console.log(file)
    const url = file.url || file.response.data.url
   this.setState({
    showPreview: true,
    previewUrl: url,

   })

   
}
// 关闭图片预览
handleCancel = () => {
  this.setState({
    showPreview: false,
    previewUrl: '' ,
  })
}

// 上传图片校验
beforeUpload = (file) => {
// console.log(file)
// 判断图片的大小不能超过500k
// debugger
// 注意：这里return false可以校验但是仍然会上传不符合规则的文件，return ignore就不会 
if (file.size >= 1024 * 500) {
  message.warning('上传的文件不能超过500kb')
  return Upload.LIST_IGNORE
}
if ( !['image/png', 'image/jpeg'].includes(file.type)) {
   message.warn('只能上传jpg或者png图片')
   return Upload.LIST_IGNORE
}
return true
}




  render() {
    // console.log(this.props.match)
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
                  title: <Link>发布文章</Link>,
                },
              ]}
            />
          }
        >
          <Form
            ref={this.formRef}
            labelCol={{ span: 4 }}
            size="large"
            onFinish={this.onFinish}
            validateTrigger={['onBlur', 'onChange']}
            // type为表格封面默认选中
            initialValues={{ content: '', type: 0 }}
            //测试回显，能不能回到默认的id为4，拿到id，让他受控
            // initialValues={{ title: '哈哈哈', channel_id: 4}}
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: '文章的标题不能为空',
                },
              ]}
            >
              <Input
                style={{ widyh: 400 }}
                placeholder="请输入文章的标题"
              ></Input>
            </Form.Item>

            <Form.Item
              label="频道"
              name="channel_id"
              rules={[
                {
                  required: true,
                  message: '请选择频道',
                },
              ]}
            >
              {/* 抽出去select才和Form有关，Channel组件和Form表单没有关系，变成受控组件。antd帮做了value和onChange */}
              <Channel />
            </Form.Item>

            <Form.Item label="封面" name="type">
              <Radio.Group onChange={this.changeType}>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio> 
                <Radio value={0}>无图</Radio>
              </Radio.Group>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4}}>
              {/* 上传组件 */}
              {/* filelist控制文件列表 */}
              {/* action控制上传的url，注意这里时antd帮我梦上传，没有axios，写全,而且前面的地址未来会变 用baseurl,相当于没有axios下的url请求*/}
              { this.state.type !== 0 && 
              <Upload
              
              listType="picture-card"
              className="avatar-uploader"
              fileList= { this.state.fileList }
              action= {`${BASE_URL}/upload`}
              name="image"
              onChange={this.uploadImage}
              onPreview={this.handlePreview}
              beforeUpload={this.beforeUpload}
            >
              { 
                this.state.fileList.length < this.state.type && <PlusOutlined/>
              }
            </Upload>}

            

            </Form.Item>

            <Form.Item
              label="内容"
              name="content"
              rules={[{ required: true, message: '文章内容不能为空' }]}
            >
              {/* value onChange不用提供 ，Form提供了*/}
              <ReactQuill
                theme="snow"
                placeholder="请输入文章的内容"
              ></ReactQuill>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 4 }}>
              {/* space隔 */}
              <Space>
                <Button type="primary" htmlType="submit" size="large">
                  发布文章
                </Button>
                {/* 这个按钮不能再写成submit因为onfinsh时会和上一个冲突 */}
                <Button size="large" onClick={this.addDraft}>存入草稿</Button>
              </Space>
            </Form.Item>
          </Form>
        </Card>

          {/* 预览弹窗，用于显示预览的图片 */}
          <Modal open={this.state.showPreview} title="图片预览" footer={null} onCancel={this.handleCancel}>
            <img
            alt="example"
            style={{
            width: '100%',
          }}
          src={this.state.previewUrl}
        />
      </Modal>
      </div>
    )
  }
}

export default ArticlePublish
