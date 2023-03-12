import React, { PureComponent } from 'react'
import { Card, Button, Checkbox, Form, Input } from 'antd'

import './index.scss'

export class Login extends PureComponent {

  onFinish = (values) => {
    console.log(values)
  }
  
  
  render() {
    return (
      // 起一个类名
      <div className="login">
        <Card className="login-container">
          <img
            src={require('../../assets/logo.png')}
            alt=""
            className="login-logo"
          />
          {/* 表单 */}
          <Form 
            size='large' 
            validateTrigger= {['onChange', 'onBlur']}
            onFinish={this.onFinish}
            initialValues={{
              mobile:'13911111111',
              // 接口几分钱一条贵，所以用万能
              code: '246810',
              agree: true
            }}
          >
            {/* 输入框 */}
            <Form.Item 
              name="mobile"
              rules={[
               {
                required: true,
                message: '手机号不能为空',
               
              },
              {
                pattern: /^1[3-9]\d{9}$/,
                message: '手机号格式错误',
                
              },
            ]}>
              <Input placeholder="请输入你的手机号" autoComplete="off" />
            </Form.Item>

            <Form.Item 
                name="code" 
                rules={[
              {
                required: true,
                message: '验证码不能为空'
              },
              {
                pattern: /^\d{6}$/,
                message: '验证码格式错误',
              }
               ]}
            > 
              <Input placeholder="请输入验证码"  autoComplete="off"></Input>
            </Form.Item>
             {/* 协议 */}
            <Form.Item    
               valuePropName="checked" 
               name="agree" 
               rules={[
                {
                  validator: (rule, value) =>
                   value ? Promise.resolve() : Promise.reject(new Error('请勾选协议')),
                 },
               ]}
            >
              <Checkbox>我已阅读并同意[隐私条款]和[用户协议]</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                登录
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }


}


export default Login
