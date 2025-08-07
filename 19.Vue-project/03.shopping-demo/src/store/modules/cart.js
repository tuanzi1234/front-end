import { getCartList } from '@/api/cart'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 设置购物车列表
    setCartList (state, newList) {
      state.cartList = newList
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      // 设置购物车的isChecked状态(标记是否选中)
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    }
  },
  getters: {
  }
}
