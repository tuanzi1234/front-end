<template>
  <div class="prodetail">
    <!-- 商品详情页头部 -->
    <van-nav-bar fixed title="商品详情页" left-arrow @click-left="$router.go(-1)"/>
    <!-- 商品轮播图 -->
    <van-swipe :autoplay="3000" @change="onChange">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img :src="image.external_url"/>
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">{{ current + 1 }} / {{ images.length }}</div>
      </template>
    </van-swipe>

    <!-- 商品说明 -->
    <div class="info">
      <div class="title">
        <div class="price">
          <span class="now">￥{{ detail.goods_price_min }}</span>
          <span class="oldprice">￥{{ detail.goods_price_max }}</span>
        </div>
        <div class="sellcount">已售{{ detail.goods_sales }}件</div>
      </div>
      <div class="msg text-ellipsis-2">
        {{ detail.goods_name }}
      </div>

      <div class="service">
        <div class="left-words">
          <span><van-icon name="passed"/>七天无理由退货</span>
          <span><van-icon name="passed"/>48小时发货</span>
        </div>
        <div class="right-icon">
          <van-icon name="arrow"/>
        </div>
      </div>
    </div>

    <!-- 商品评价 -->
    <div class="comment">
      <div class="comment-title">
        <div class="left">商品评价 ({{ total }}条)</div>
        <div class="right">查看更多
          <van-icon name="arrow"/>
        </div>
      </div>
      <div class="comment-list">
        <div class="comment-item" v-for="item in comment" :key="item.comment_id">
          <div class="top">
            <img :src="item.user.avatar_url || defaultImg" alt="">
            <div class="name">{{ item.user.nick_name }}</div>
            <van-rate :size="16" :value="5" color="#ffd21e" void-icon="star" void-color="#eee"/>
          </div>
          <div class="content">
            {{ item.content }}
          </div>
          <div class="time">
            {{ item.create_time }}
          </div>
        </div>
      </div>
    </div>

    <!-- 商品描述 -->
    <div class="desc" v-html="detail.content">
    </div>

    <!-- 底部 -->
    <div class="footer">
      <div class="icon-home" @click="$router.push('/')">
        <van-icon name="wap-home-o"/>
        <span>首页</span>
      </div>
      <div class="icon-cart" @click="$router.push('/cart')">
        <van-badge :content="cartTotal" class="custom-badge" v-if="cartTotal">
          <van-icon name="shopping-cart-o"/>
        </van-badge>
        <van-icon name="shopping-cart-o" v-else/>
        <span>购物车</span>
      </div>
      <div class="btn-add" @click="addShop">加入购物车</div>
      <div class="btn-buy" @click="buyShop">立刻购买</div>
    </div>

    <!-- 购物车提示框 -->
    <van-action-sheet v-model="shoppingPannel" :title="mode === 'cart' ? '加入购物车' : '立即购买'">
      <div class="content">
        <!-- 购物车提示框内容 -->
        <div class="pannel">
          <img :src="detail.goods_image" alt="">
          <div class="price-detail">
            <div class="price">￥<span>{{ detail.goods_price_min }}</span></div>
            <div class="detail">库存&nbsp;&nbsp;{{ detail.stock_total }}</div>
          </div>
        </div>
        <!-- 购物车数量增减 -->
        <div class="num">
          <span class="num-content">数量</span>
          <van-stepper v-model="shoppingNum" theme="" button-size="40" disable-input/>
        </div>
        <!-- 加入购物车按钮 -->
        <div class="btn-group">
          <van-button color="#FF8C00" v-if="mode === 'cart' && detail.stock_total > 0" round size="large"
                      @click="addCart">加入购物车
          </van-button>
          <van-button color="#FE5630" v-else-if="mode === 'buy' && detail.stock_total > 0" round size="large"
                      @click="buyNow">立即购买
          </van-button>
          <van-button v-else round size="large" disabled>该商品已售完</van-button>
        </div>
      </div>
    </van-action-sheet>
  </div>
</template>

<script>
import { getProComment, getProDetail } from '@/api/product'
import defaultImg from '@/assets/default-avatar.png'
import { addCartList } from '@/api/cart'
import loginConfirm from '@/mixins/loginConfirm'

export default {
  name: 'ProDetail',
  mixins: [loginConfirm],
  data () {
    return {
      images: [],
      current: 0,
      detail: {},
      total: 0, // 商品评论总数
      comment: [], // 商品评论
      defaultImg, // 默认图片
      shoppingPannel: false, // 购物车提示框
      mode: 'cart', // 提示框模式
      shoppingNum: 1, // 购物车数量
      cartTotal: 0 // 购物车角标
    }
  },
  methods: {
    // 轮播图切换
    onChange (index) {
      this.current = index
    },
    // 获取商品详情
    async getDetail () {
      // 获取商品详情
      const { data: { detail } } = await getProDetail(this.goodsId)
      this.detail = detail
      this.images = detail.goods_images
    },
    // 获取商品评价
    async getComment () {
      // 获取商品评价
      const {
        data: {
          list,
          total
        }
      } = await getProComment(this.goodsId, 3)
      this.comment = list
      this.total = total
    },
    // 点击加入购物车触发的函数
    addShop () {
      this.mode = 'cart'
      this.shoppingPannel = true
    },
    // 点击立即购买触发的函数
    buyShop () {
      this.mode = 'buy'
      this.shoppingPannel = true
    },
    // 点击弹窗中添加购物车按钮触发的函数
    async addCart () {
      if (this.loginConfirm()) {
        return
      }
      const { data } = await addCartList(this.goodsId, this.shoppingNum, this.detail.skuList[0].goods_sku_id)
      this.cartTotal = data.cartTotal
      this.$toast.success('购物车添加成功')
      this.shoppingPannel = false
    },
    // 点击弹窗中立即购买按钮触发的函数
    buyNow () {
      if (this.loginConfirm()) {
        return
      }
      this.$router.push({
        path: '/pay',
        query: {
          mode: 'buyNow',
          goodsId: this.goodsId,
          goodsSkuId: this.detail.skuList[0].goods_sku_id,
          goodsNum: this.shoppingNum
        }
      })
    }
  },
  computed: {
    // 获取商品id
    goodsId () {
      return this.$route.params.id
    }
  },
  created () {
    // 获取商品详情
    this.getDetail()
    this.getComment()
  }
}
</script>

<style lang="less" scoped>
.prodetail {
  padding-top: 46px;

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  img {
    display: block;
    width: 100%;
  }

  .custom-indicator {
    position: absolute;
    right: 10px;
    bottom: 10px;
    padding: 5px 10px;
    font-size: 12px;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 15px;
  }

  .desc {
    width: 100%;
    overflow: scroll;

    ::v-deep img {
      display: block;
      width: 100% !important;
    }
  }

  .info {
    padding: 10px;
  }

  .title {
    display: flex;
    justify-content: space-between;

    .now {
      color: #fa2209;
      font-size: 20px;
    }

    .oldprice {
      color: #959595;
      font-size: 16px;
      text-decoration: line-through;
      margin-left: 5px;
    }

    .sellcount {
      color: #959595;
      font-size: 16px;
      position: relative;
      top: 4px;
    }
  }

  .msg {
    font-size: 16px;
    line-height: 24px;
    margin-top: 5px;
  }

  .service {
    display: flex;
    justify-content: space-between;
    line-height: 40px;
    margin-top: 10px;
    font-size: 16px;
    background-color: #fafafa;

    .left-words {
      span {
        margin-right: 10px;
      }

      .van-icon {
        margin-right: 4px;
        color: #fa2209;
      }
    }
  }

  .comment {
    padding: 10px;
  }

  .comment-title {
    display: flex;
    justify-content: space-between;

    .right {
      color: #959595;
    }
  }

  .comment-item {
    font-size: 16px;
    line-height: 30px;

    .top {
      height: 30px;
      display: flex;
      align-items: center;
      margin-top: 20px;

      img {
        width: 20px;
        height: 20px;
      }

      .name {
        margin: 0 10px;
      }
    }

    .time {
      color: #999;
    }
  }

  .footer {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    background-color: #fff;
    border-top: 1px solid #ccc;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    .icon-home, .icon-cart {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: 14px;

      .van-icon {
        font-size: 24px;
      }
    }

    .btn-add,
    .btn-buy {
      height: 36px;
      line-height: 36px;
      width: 120px;
      border-radius: 18px;
      background-color: #ffa900;
      text-align: center;
      color: #fff;
      font-size: 14px;
    }

    .btn-buy {
      background-color: #fe5630;
    }
  }
}

.tips {
  padding: 10px;
}

.content {
  padding: 0 10px;

  .pannel {
    display: flex;
    justify-content: flex-start;

    img {
      width: 150px;
      height: 150px;
    }

    .price-detail {
      margin-left: 10px;

      .price {
        color: #FF8C00;
        font-size: 20px;

        span {
          font-size: 30px;
        }
      }

      .detail {
        margin-top: 5px;
        color: #999;
        font-size: 16px;
      }
    }
  }

  .num {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px 10px;

    .num-content {
      color: #696969;
      font-size: 16px;
    }
  }

  .btn-group {
    margin-bottom: 10px;
  }
}

.custom-badge {
  ::v-deep .van-badge {
    transform: translate(40%, -20%);
  }
}
</style>
