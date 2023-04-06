// 封装axios

import axios from "axios"
import {BASE_URL, TIMEOUT} from "./config"
import { message } from "antd"


import { getToken , hasToken, removeToken} from "utils/storage"



 class dannyRequest {
  constructor(baseURL,timeout) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
// 响应拦截器
    this.instance.interceptors.response.use((res) => {
     
      return res
    },(err) => {
      // console.log(err.response)
      // 对响应错误做点什么，token是服务器响应的
      // 对token过期（理解为token是错误的，但是还能在页面停留）进行统一的处理
      if (err.response.status === 401) {
        // 代表token过期了
        // 1.删除token
        removeToken()
        // 2.给提示消息
        message.warning('登录信息过期了')
        //  3.跳转到登录页面
        // 难点：在非组件中，是无法使用redirect navigate 访问history对象
        // window.location.href = './login' message消息不提示，且会刷新页面重新加载资源（没有了单页面）
        window.location.href = './login'
        


      } 
     
      return err
    })

    // 请求拦截器,有token就自动加上token，每一次请求共同点都需要headers携带Bearer
    this.instance.interceptors.request.use(
     (config) => {
      if (hasToken()) {
        config.headers.Authorization = `Bearer ${getToken()}`
      }
      return config
     }, (err) => {
      return Promise.reject(err)
     }
    )
  }


  // 2.请求方法，类的静态方法
request(config) {
    return this.instance.request(config)
  }

get(config) {
  // 调用上面的request加上携带的参数
  return this.request({...config, method:"get"})
}

post(config) {
  return this.request({...config, method:"post"})
}

}


// eslint-disable-next-line
export default new dannyRequest(BASE_URL, TIMEOUT)
// 1......更多实例