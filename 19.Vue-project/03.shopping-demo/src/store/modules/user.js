import { getInfo, setInfo } from '@/utils/storage'

// 用户模块
export default {
  namespace: true,
  state () {
    return {
      userInfo: getInfo()
    }
  },
  mutations: {
    setUserInfo (state, payload) {
      state.userInfo = payload
      setInfo(payload)
    }
  },
  actions: {},
  getters: {}
}
