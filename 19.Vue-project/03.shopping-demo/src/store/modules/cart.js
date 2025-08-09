import { deleteCart, getCartList, updateCartNum } from '@/api/cart'
import { Toast } from 'vant'

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
    },
    // 更新单个商品数量
    updateCartItemNum (state, { item, goodsNum }) {
      item.goods_num = goodsNum
    }
  },
  actions: {
    // 获取购物车列表
    async getCartAction (context) {
      const { data } = await getCartList()
      // 设置购物车的isChecked状态(标记是否选中)
      data.list.forEach(item => {
        item.isChecked = false
      })
      context.commit('setCartList', data.list)
    },
    // 更新购物车商品数量
    async updateCartNumAction (context, { item, goodsNum }) {
      try {
        // 调用 API 更新服务器数据
        await updateCartNum(item.goods_id, goodsNum, 0)
        // 更新本地状态
        context.commit('updateCartItemNum', { item, goodsNum })
        return Promise.resolve()
      } catch (error) {
        console.error('更新购物车数量失败:', error)
        return Promise.reject(error)
      }
    },
    // 删除购物车商品
    async delCartAction (context) {
      const selectCartList = context.getters.checkedGoods
      const cartIds = selectCartList.map(item => item.id)
      await deleteCart(cartIds)
      await context.dispatch('getCartAction')
      Toast('删除成功')
    }
  },
  getters: {
    // 计算商品数量
    cartListLength (state) {
      return state.cartList.reduce((total, item) => {
        return total + item.goods_num
      }, 0)
    },
    // 选中的商品项
    checkedGoods (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的商品数量
    checkedGoodsLength (state, getters) {
      return getters.checkedGoods.reduce((total, item) => {
        return total + item.goods_num
      }, 0)
    },
    // 选中商品总价
    checkedGoodsPrice (state, getters) {
      const total = getters.checkedGoods.reduce((sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0)
      // 解决浮点数精度问题，保留两位小数
      return Math.round(total * 100) / 100
    }
  }
}
