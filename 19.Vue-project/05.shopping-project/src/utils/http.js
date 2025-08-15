// axios基础封装
import axios from 'axios'

const httpInstance = axios.create(
  {
    baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/',
    timeout: 10000,
  }
)
// 拦截器
httpInstance.interceptors.request.use(
  (config) => {
    // 添加token
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

export default httpInstance
