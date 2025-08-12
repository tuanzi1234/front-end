import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userInfoService } from '@/api/user.js'

// 定义一个用户信息存储, token setToken removeToken
export const useUserStore = defineStore(
  'admin-user',
  () => {
    // token的响应式数据
    const token = ref('')
    // 设置token
    const setToken = (newToken) => {
      token.value = newToken
    }
    // 移除token
    const removeToken = () => {
      token.value = ''
    }
    // 用户信息
    const user = ref({})
    // 获取用户信息
    const getUser = async () => {
      const res = await userInfoService()
      user.value = res.data.data
    }
    // 设置用户信息
    const setUser = (newUser) => {
      user.value = newUser
    }
    return { token, setToken, removeToken, user, getUser, setUser }
  },
  {
    persist: true,
  },
)
