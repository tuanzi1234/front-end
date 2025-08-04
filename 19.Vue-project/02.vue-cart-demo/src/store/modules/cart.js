import axios from 'axios'

export default {
  namespaced: true,
  state () {
    return {
      cart: []
    }
  },
  mutations: {
    // 更新购物车列表
    updateList (state, newList) {
      state.cart = newList
    },
    // 更改商品数量
    updateCount (state, payload) {
      const product = state.cart.find(item => item.id === payload.id)
      product.count = payload.count
    }
  },
  actions: {
    // 获取购物车列表
    async getCart (context) {
      const { data } = await axios.get('http://localhost:3000/cart')
      context.commit('updateList', data)
    },
    // 更改商品数量的函数
    async updateCount (context, payload) {
      await axios.patch(`http://localhost:3000/cart/${payload.id}`, {
        count: payload.count
      })
      context.commit('updateCount', payload)
    }
  },
  getters: {
    // 计算商品数量
    getCount (state) {
      return state.cart.reduce((pre, item) => {
        return pre + item.count
      }, 0)
    },
    // 计算商品总价
    getTotalPrice (state) {
      return state.cart.reduce((pre, item) => {
        return pre + item.price * item.count
      }, 0)
    }
  }
}
