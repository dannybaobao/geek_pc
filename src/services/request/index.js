import axios from "axios"
import {BASE_URL, TIMEOUT} from "./config"

 class dannyRequest {
  constructor(baseURL,timeout) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    this.instance.interceptors.response.use((res) => {
      return res
    },err => {
      return err
    })
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