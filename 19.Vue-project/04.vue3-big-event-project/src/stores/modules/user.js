import { defineStore } from 'pinia'
import { ref } from 'vue'

// 定义一个用户信息存储, token setToken removeToken
export const useUserStore = defineStore(
  'admin-user',
  () => {
    const token = ref('')
    const setToken = (newToken) => {
      token.value = newToken
    }
    const removeToken = () => {
      token.value = ''
    }
    return { token, setToken, removeToken }
  },
  {
    persist: true,
  },
)
