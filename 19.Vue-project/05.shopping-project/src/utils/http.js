// axios基础封装
import axios from 'axios'
import {ElMessage} from "element-plus";

const httpInstance = axios.create(
  {
    baseURL: 'https://pcapi-xiaotuxian-front-devtest.itheima.net/',
    timeout: 10000,
  }
)
//请求拦截器
httpInstance.interceptors.request.use(
  (config) => {
    //请求头添加token
    // const userStore = useUserStore()
    // if (userStore.token) {
    //   config.headers.Authorization = userStore.token
    // }
    return config
  },
  (err) => Promise.reject(err),
)

//响应拦截器
httpInstance.interceptors.response.use(
  (res) => {
    if (res.data.code === '1') {
      return res
    }
    ElMessage.error(res.data.message || '请求失败')
    return Promise.reject(res.data)
  }
//   (err) => {
//     //401错误处理
//     if (err.response?.status === 401) {
//       router.push('/login')
//     }
//
//     //错误的默认情况
//     ElMessage.error(err.response.data.message || '请求失败')
//     return Promise.reject(err)
//   },
 )

export default httpInstance
//export { baseURL }
