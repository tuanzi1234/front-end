<template>
  <div class="search">
    <van-nav-bar fixed title="商品列表" left-arrow @click-left="$router.go(-1)"/>

    <van-search
      readonly
      shape="round"
      background="#ffffff"
      :value="querySearch || '搜索商品'"
      show-action
      @click="$router.push('/search')"
    >
      <template #action>
        <van-icon class="tool" name="apps-o"/>
      </template>
    </van-search>

    <!-- 排序选项按钮 -->
    <div class="sort-container">
      <div v-for="(option, index) in sortOptions"
           :key="index"
           class="sort-item"
           :class="{ active: option.active }"
           @click="handleSort(option.key)"
      >
        {{ option.label }}
        <!-- 价格排序时显示方向图标 -->
        <van-icon
          v-if="(option.key === 'price' || option.key === 'sales') && option.active"
          :name="sortDirection === 'desc' ? 'arrow-down' : 'arrow-up'"
        />
      </div>
    </div>

    <div class="goods-list">
      <GoodsItem v-for="item in proList" :key="item.goods_id" :item="item"></GoodsItem>
      <!-- 当未搜索到商品时显示 -->
      <div v-if="proList.length === 0" class="no-result">
        抱歉，没有找到相关商品
      </div>
    </div>
  </div>
</template>

<script>
import GoodsItem from '@/components/goodsItem.vue'
import { getProductDetail } from '@/api/product'

export default {
  name: 'SearchIndex',
  components: {
    GoodsItem
  },
  computed: {
    // 从地址栏中获取搜索关键字
    querySearch () {
      return this.$route.query.search
    }
  },
  data () {
    return {
      sortOptions: [
        {
          key: 'default',
          label: '综合',
          active: true
        },
        {
          key: 'sales',
          label: '销量',
          active: false
        },
        {
          key: 'price',
          label: '价格',
          active: false
        }
      ],
      sortDirection: 'desc', // 排序方向：desc(降序)/asc(升序)
      page: 1,
      proList: [] // 商品列表数据
    }
  },
  async created () {
    // 从路由参数中获取分类ID
    this.categoryId = this.$route.query.categoryId
    // 1.请求商品列表数据
    const res = await getProductDetail({
      goodsName: this.querySearch,
      page: this.page,
      categoryId: this.categoryId
    })
    this.proList = res.data.list.data
  },
  methods: {
    handleSort (key) {
      // 1. 更新排序选项状态
      this.sortOptions.forEach(option => {
        option.active = option.key === key
      })

      // 2. 价格或销量排序时切换方向
      if (key === 'price' || key === 'sales') {
        // 如果点击的是当前已激活的选项，则切换方向
        if (this.sortOptions.find(opt => opt.key === key).active) {
          this.sortDirection = this.sortDirection === 'desc' ? 'asc' : 'desc'
        } else {
          // 新激活的选项，重置为默认方向
          this.sortDirection = 'desc'
        }
      } else {
        // 综合排序默认降序
        this.sortDirection = 'desc'
      }
      // 3. 执行排序
      this.sortProducts()
    },

    sortProducts () {
      const sortKey = this.sortOptions.find(opt => opt.active).key

      // 创建新数组避免直接修改原始数据
      const sortedList = [...this.proList]

      switch (sortKey) {
        case 'sales':
          sortedList.sort((a, b) =>
            this.sortDirection === 'desc'
              ? b.goods_sales - a.goods_sales
              : a.goods_sales - b.goods_sales
          )
          break

        case 'price':
          sortedList.sort((a, b) => {
            return this.sortDirection === 'desc'
              ? b.goods_price_min - a.goods_price_min
              : a.goods_price_min - b.goods_price_min
          })
          break
        default:
          sortedList.sort((a, b) => {
            return a.goods_sales === b.goods_sales
              ? b.goods_price_min - a.goods_price_min
              : b.goods_sales - a.goods_sales
          })
      }

      // 4. 更新商品列表
      this.proList = sortedList
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  padding-top: 46px;

  ::v-deep .van-icon-arrow-left {
    color: #333;
  }

  .tool {
    font-size: 24px;
    height: 40px;
    line-height: 40px;
  }

  .sort-container {
    display: flex;
    justify-content: space-around;
    background-color: #fff;
    padding: 10px 0;
    border-bottom: 1px solid #eee;
    top: 46px; // 导航栏高度
    left: 0;
    right: 0;

    .sort-item {
      display: flex;
      flex: 1;
      font-size: 14px;
      align-items: center;
      justify-content: center;

      &.active {
        color: #f03c3c;
        font-weight: bold;
      }
    }
  }
}

// 商品样式
.goods-list {
  background-color: #f6f6f6;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .no-result {
    font-size: 20px;
    color: #333;
  }
}
</style>
