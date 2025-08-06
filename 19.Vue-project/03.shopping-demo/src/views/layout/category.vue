<template>
  <div class="shopping-category">
    <div class="header-title">
      全部分类
    </div>
    <div class="header-search">
      <van-search placeholder="请输入搜索关键词" shape="round"
                  background="#F1F1F2" clearable @click="router().push('/search')">
      </van-search>
    </div>
    <div class="main">
      <div class="left-category">
        <van-sidebar v-model="activeIndex" @change="handleCategoryChange">
          <van-sidebar-item
            v-for="(item, index) of categoryList"
            :key="item.category_id"
            :title="item.name"
            :name="index"
          />
        </van-sidebar>
      </div>
      <div class="right-category">
        <van-grid :column-num="2">
          <van-grid-item v-for="item of subCategoryList" :key="item.category_id" @click="router().push(`/searchlist?categoryId=${item.category_id}`)">
            <img :src="item.image.preview_url" alt=""/>
            <div class="category-name">{{ item.name }}</div>
          </van-grid-item>
          <div v-if="subCategoryList.length === 0" class="category-none">该分类暂无商品</div>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>

import router from '@/router'
import { getCategory } from '@/api/category'

export default {
  name: 'ShoppingCategory',
  data () {
    return {
      activeIndex: 0, // 添加这行
      activeCategoryId: 0, // 选中的分类id
      categoryList: [], // 分类列表
      subCategoryList: [] // 子分类列表
    }
  },
  methods: {
    router () {
      return router
    },
    async getCategory () {
      const { data: { list } } = await getCategory()
      this.categoryList = list
      // 设置默认选中的第一个分类
      if (list.length > 0) {
        this.subCategoryList = list[0].children || [] // 确保children存在
      }
      console.log(this.activeCategoryId)
    },
    // 添加分类切换处理方法
    handleCategoryChange (index) {
      if (this.categoryList[index]) {
        this.subCategoryList = this.categoryList[index].children || []
      } else {
        this.subCategoryList = []
        console.warn(`未找到索引为 ${index} 的分类`)
      }
    }
  },
  async created () {
    await this.getCategory()
  }
}
</script>

<style scoped lang="less">
.header-title {
  text-align: center;
  font-size: 18px;
  margin: 10px auto;
}

.header-search {
  display: flex;
  justify-content: center;

  .van-search {
    flex: 1;
  }
}

.main {
  display: flex;
  flex-direction: row;
  height: calc(100vh - 100px); // 确保整体高度合适

  .left-category {
    .van-sidebar {
      width: 90px;
      overscroll-behavior: contain; /* 关键属性 */
      height: 80vh; /* 设置固定高度 */
      overflow-y: auto; /* 启用垂直滚动 */
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* IE/Edge */
    }
  }

  .right-category {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: auto;
    flex: 1;
    height: 80vh;
    padding-bottom: 55px; /* 添加底部内边距 */

    .van-grid {
      // 网格项样式
      .van-grid-item {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100px; // 固定高度确保一致

        // 图片样式
        img {
          width: 60px;
          height: 60px;
          object-fit: cover; // 保持比例并填充容器
        }
      }
      .category-none {
        text-align: center;
        font-size: 14px;
        color: #333;
      }
    }
  }
}
</style>
