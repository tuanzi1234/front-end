<template>
  <div class="cart">
<!--    购物车顶部-->
    <div class="cart-header">
      购物车
    </div>
    <div v-if="isLogin && cartList.length > 0">
<!--      头部信息-->
      <div class="content-header">
        <span>共 <span class="num">{{ cartListLength }}</span> 件商品</span> <span @click="isEdit = !isEdit"><van-icon
        name="edit"/>编辑</span>
      </div>
<!--      商品内容-->
      <div class="cart-content">
        <div class="content-list" v-for="item in cartList" :key="item.id">
          <van-checkbox v-model="item.isChecked"/>
          <img
            :src="item.goods.goods_images && item.goods.goods_images.length > 0 ? item.goods.goods_images[0].external_url : ''"
            alt=""
            v-if="item.goods.goods_images && item.goods.goods_images.length > 0"
          >
          <div class="content-detail">
            <div class="content-title">
              {{ item.goods.goods_name }}
            </div>
            <div class="content-footer">
              <span class="price">¥ {{ item.goods.goods_price_min }}</span>
              <span><van-stepper :value="item.goods_num" @change="(value) => onGoodsNumChange(item, value)" theme=""
                                 button-size="42" disable-input/></span>
            </div>
          </div>
        </div>
      </div>
<!--      底部操作栏-->
      <div class="cart-footer">
        <div class="footer-left">
          <van-checkbox v-model="isAllChecked" @click="checkedAll"/>
          <span>全选</span>
        </div>
        <div class="footer-right">
          合计：¥<span class="price"> {{ checkedGoodsPrice }}</span>
          <van-button v-if="!isEdit" color="#FC411C" round size="small" @click="goPay">去结算({{ checkedGoodsLength }})</van-button>
          <van-button v-else color="#FC411C" round size="small" @click="del">删除</van-button>
        </div>
      </div>
    </div>
    <div v-else class="cart-empty">
      <van-empty image="search" description="购物车空空如也">
        <div class="cart-empty-btn">
          <van-button round color="#FC411C" @click="$router.push('/')" size="small">去逛逛</van-button>
        </div>
      </van-empty>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'ShoppingCart',
  data () {
    return {
      isAllChecked: false, // 全选状态
      isEdit: false // 是否处于编辑状态
    }
  },
  methods: {
    checkedAll () {
      this.cartList.forEach(item => {
        item.isChecked = this.isAllChecked
      })
    },
    updateAllCheckedState () {
      // 更新全选状态
      this.isAllChecked = this.cartList.length > 0 &&
        this.cartList.every(item => item.isChecked)
    },
    // 商品数量变化处理
    async onGoodsNumChange (item, newNum) {
      await this.$store.dispatch('cart/updateCartNumAction', {
        item,
        goodsNum: newNum
      })
    },
    // 删除商品
    del () {
      // 删除商品
      if (this.checkedGoodsLength === 0) return
      this.$store.dispatch('cart/delCartAction')
    },
    goPay () {
      // 跳转到支付页面
      if (this.checkedGoodsLength === 0) return
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'cart',
          cartIds: this.checkedGoods.map(item => item.id).join(',')
        }
      })
    }
  },
  watch: {
    cartList: {
      handler () { // 监听购物车列表选择状态
        this.updateAllCheckedState()
      },
      deep: true // 深度监听
    }
  },
  created () {
    // 先判断token是否存在，若存在，则获取购物车列表
    if (this.isLogin) {
      this.$store.dispatch('cart/getCartAction')
    }
  },
  computed: {
    // 获取购物车列表
    ...mapState('cart', ['cartList']),
    // 获取购物车页面的参数
    ...mapGetters('cart', ['checkedGoodsLength', 'cartListLength', 'checkedGoods', 'checkedGoodsPrice']),
    isLogin () {
      return this.$store.getters.token
    }
  }
}
</script>

<style scoped lang="less">
.cart {
  background-color: #f5f5f5;
  height: 100vh;

  .cart-header {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    font-size: 16px;
    color: #333;
  }

  .content-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    padding: 10px 15px;

    .num {
      color: red;
    }
  }

  .cart-content {
    padding: 0 15px;
    height: calc(100vh - 160px - 30px);
    overflow-y: auto;

    .content-list {
      display: flex;
      background-color: #ffffff;
      padding: 10px 5px;
      margin-bottom: 10px;

      img {
        margin: auto 10px;
        width: 80px;
        height: 80px;
      }

      .content-detail {
        flex: 1;
        font-size: 10px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .content-title {
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 1.5;
          height: 3em; /* line-height * 2 */
        }

        .content-footer {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;

          .price {
            color: red;
          }
        }
      }
    }
  }

  .cart-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #ffffff;
    flex-direction: row;
    height: 45px;
    padding: 0 15px;
    font-size: 12px;

    .footer-left {
      display: flex;
      align-items: center;
      flex-direction: row;

      .van-checkbox {
        margin-right: 10px;
      }
    }

    .footer-right {
      display: flex;
      align-items: center;

      .price {
        color: red;
        font-size: 16px;
        margin-right: 10px;
      }

      .van-button {
        width: 80px;
      }
    }
  }
}
.cart-empty {
  text-align: center;
  .van-button {
    width: 100px;
  }
}

</style>
