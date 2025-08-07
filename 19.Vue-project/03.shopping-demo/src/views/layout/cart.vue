<template>
  <div class="cart">
    <div class="cart-header">
      购物车
    </div>
    <div class="content-header">
      <span>共 <span class="num">{{ cartList.length }}</span> 件商品</span> <span><van-icon name="edit"/>编辑</span>
    </div>
    <div class="cart-content">
      <div class="content-list" v-for="item in cartList" :key="item.id">
        <van-checkbox/>
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
            <span><van-stepper v-model="item.goods_num" theme="" button-size="42" disable-input/></span>
          </div>
        </div>
      </div>
    </div>
    <div class="cart-footer">
      <div class="footer-left">
        <van-checkbox/>
        <span>全选</span>
      </div>
      <div class="footer-right">
        合计：¥<span class="price"> {{ totalPrice }}</span>
        <van-button type="primary" round size="small">去结算({{ cartList.length }})</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ShoppingCart',
  data () {
    return {}
  },
  created () {
    // 先判断token是否存在，若存在，则获取购物车列表
    if (this.$store.getters.token) {
      this.$store.dispatch('cart/getCartAction')
    }
  },
  computed: {
    // 获取购物车列表
    ...mapState('cart', ['cartList']),
    // 计算总价格并处理精度问题
    totalPrice () {
      const total = this.cartList.reduce((total, item) => {
        return total + item.goods.goods_price_min * item.goods_num
      }, 0)
      return parseFloat(total.toFixed(2))
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

</style>
