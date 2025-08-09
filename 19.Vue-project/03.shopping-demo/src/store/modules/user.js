import { getInfo, setInfo } from '@/utils/storage'

// 用户模块
export default {
  namespaced: true,
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
  actions: {
    logout (context) {
      // 清空用户信息
      context.commit('setUserInfo', {})
      // 重置购物车数据
      context.commit('cart/setCartList', [], { root: true })
    }
  },
  getters: {
  }
}
