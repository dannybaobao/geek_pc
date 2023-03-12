import React, { PureComponent } from 'react'
import { Card } from 'antd'



import './index.css'

export class Login extends PureComponent {
  render() {
    return (
      // 起一个类名
      <div className="login" >
        <Card className="login-container">
         <img src={require("../../assets/logo.png")} alt="" className="login-logo"/>
        </Card>
      </div>
    )
  }
}

export default Login