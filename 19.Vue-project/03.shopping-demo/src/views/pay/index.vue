<template>
  <div class="pay">
    <!-- 导航栏-->
    <van-nav-bar
      title="订单结算台"
      left-arrow
      @click-left="onclickLeft"
    />
    <!-- 地址-->
    <div class="address">
      <div class="address-item" v-if="selectAddress.address_id">
        <van-icon name="logistics"/>
        <div class="message">
          <div class="people-msg">
            <span class="name">{{ selectAddress.name }}</span>&nbsp;
            <span class="phone">{{ selectAddress.phone }}</span>
          </div>
          <div class="long-address">{{ longAddress }}</div>
        </div>
        <van-icon name="arrow"/>
      </div>
      <div class="address-item" v-else>
        <div class="name">请选择收货地址</div>
      </div>
    </div>
    <!-- 商品列表-->
    <div class="goods-list" v-for="item in order.goodsList" :key="item.goods_id">
      <img :src="item.goods_image" alt="">
      <div class="goods-msg">
        <div class="goods-name">{{ item.goods_name }}</div>
        <div class="goods-price"><span class="num">x {{ item.total_num }}</span> <span
          class="price">¥{{ item.goods_price_min }}</span></div>
      </div>
    </div>
    <!-- 商品总价-->
    <div class="goods-total">
      <span>共计&nbsp;{{ goodsTotalNum }}&nbsp;件商品， </span>
      <span>合计：</span><span class="goods-total-price">¥{{ goodsTotalPrice }}</span>
    </div>
    <!-- 订单信息-->
    <div class="pay-mes">
      <div class="pay-price">
        <span>订单总额：</span><span class="goods-total-price">¥{{ goodsTotalPrice }}</span>
      </div>
      <div class="pay-discount">
        <span class="discount">优惠券：</span> <span class="discount-price">无优惠券可用</span>
      </div>
      <div class="pay-delivery">
        <span class="delivery">运费：</span> <span class="delivery-price">+￥0.00</span>
      </div>
    </div>
    <!-- 支付方式-->
    <div class="pay-way">
      支付方式
      <div class="pay-way-item">
        <span><van-icon name="balance-o" />&nbsp;余额支付&nbsp;(可用余额：<span class="balance">¥{{ personal.balance }}</span>)</span><van-icon color="red" name="passed" />
      </div>
    </div>
    <!-- 留言-->
    <div class="message">
      <van-field
        v-model="value"
        autosize
        rows="2"
        show-word-limit
        maxlength="50"
        type="textarea"
        placeholder="选填: 买家留言 (50字内)"
        vertical
      />
    </div>
    <!-- 提交-->
    <div class="pay-submit">
      <span>实付款：&nbsp;<span class="goods-total-price">¥{{ goodsTotalPrice }}</span></span>
      <van-button type="primary" color="linear-gradient(to right, #ee0a24, #ff6034)" @click="goPay">提交订单</van-button>
    </div>
  </div>
</template>

<script>
import { getAddressList } from '@/api/address'
import { checkOrder } from '@/api/order'

export default {
  name: 'PayIndex',
  data () {
    return {
      addressList: [],
      order: {},
      personal: {}
    }
  },
  created () {
    this.getAddressList()
    this.checkOrder()
  },
  methods: {
    async getAddressList () {
      const { data } = await getAddressList()
      this.addressList = data.list
    },
    onclickLeft () {
      this.$router.back()
    },
    async checkOrder () {
      const {
        data: {
          order,
          personal
        }
      } = await checkOrder(this.mode, {
        cartIds: this.cartIds
      })
      this.order = order
      console.log(order)
      this.personal = personal
    }
  },
  computed: {
    selectAddress () {
      return this.addressList[0] || {}
    },
    longAddress () {
      const region = this.selectAddress.region
      return `${region.province || ''} ${region.city || ''} ${region.region || ''} ${this.selectAddress.detail || ''}`.trim()
    },
    mode () {
      return this.$route.query.mode
    },
    cartIds () {
      return this.$route.query.cartIds
    },
    // 计算所有商品数量
    goodsTotalNum () {
      if (!this.order.goodsList || !Array.isArray(this.order.goodsList)) {
        return 0
      }
      const total = this.order.goodsList.reduce((sum, item) => {
        return sum + item.total_num
      }, 0)
      return total
    },
    // 计算所有商品的总价
    goodsTotalPrice () {
      if (!this.order.goodsList || !Array.isArray(this.order.goodsList)) {
        return '0.00'
      }
      const total = this.order.goodsList.reduce((sum, item) => {
        const itemTotal = item.total_num * parseFloat(item.goods_price_min)
        return sum + itemTotal
      }, 0)
      // 解决浮点数精度问题，保留两位小数
      return total.toFixed(2)
    }
  }
}
</script>

<style scoped lang="less">
.pay {
  background-color: #f5f5f5;

  .address {
    padding: 10px 15px;
    font-size: 15px;
    border-bottom: 5px solid #333;

    .address-item {
      display: flex;
      align-items: center;
      color: #999;

      .message {
        flex: 1;
        display: flex;
        flex-direction: column;

        .people-msg {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-left: 10px;
        }

        .long-address {
          margin-left: 10px;
          font-size: 13px;
        }
      }
    }
  }

  .goods-list {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    flex-direction: row;
    background-color: #fff;
    font-size: 14px;

    img {
      width: 60px;
      height: 60px;
    }

    .goods-msg {
      display: flex;
      flex-direction: column;
      margin-left: 10px;

      .goods-name {
        flex: 1;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .goods-price {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .price {
          color: red;
        }
      }
    }
  }

  .goods-total {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 15px;
    font-size: 11px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    background-color: #fff;

    .goods-total-price {
      color: red;
    }
  }

  .pay-mes {
    display: flex;
    flex-direction: column;
    font-size: 13px;
    padding: 10px 15px;
    background-color: #fff;
    .pay-price {
      display: flex;
      justify-content: space-between;
      .goods-total-price {
        color: red;
      }
      padding-bottom: 10px;
    }
    .pay-discount {
      display: flex;
      justify-content: space-between;
      padding-bottom: 10px;
    }
    .pay-delivery {
      display: flex;
      justify-content: space-between;
      .delivery-price {
        color: red;
      }
    }
  }
  .pay-way {
    font-size: 11px;
    padding: 10px 15px;
    background-color: #fff;
    border-bottom: 1px solid rgba(0, 0, 0, 0.3);
    .pay-way-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 0;
      .balance {
        color: red;
      }
    }
  }
  .pay-submit {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(0, 0, 0, 0.3);
    font-size: 12px;
    .goods-total-price {
      color: red;
    }
  }
}
</style>
