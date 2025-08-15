import axios from 'axios'
import { useUserStore } from '@/stores/index.js'
import { ElMessage } from 'element-plus'
import router from '@/router/index.js'

const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // 基础路径,超时时间
  baseURL,
  timeout: 10000,
})

//请求拦截器
instance.interceptors.request.use(
  (config) => {
    //请求头添加token
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = userStore.token
    }
    return config
  },
  (err) => Promise.reject(err),
)

//响应拦截器
instance.interceptors.response.use(
  (res) => {
    if (res.data.code === 0) {
      return res
    }
    ElMessage.error(res.data.message || '请求失败')
    return Promise.reject(res.data)
  },
  (err) => {
    //401错误处理
    if (err.response?.status === 401) {
      router.push('/login')
    }

    //错误的默认情况
    ElMessage.error(err.response.data.message || '请求失败')
    return Promise.reject(err)
  },
)

export default instance
export { baseURL }
