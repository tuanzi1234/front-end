<script setup>
import {useCategoryStore} from "@/stores/category.js"
import {ref} from "vue"

const categoryStore = useCategoryStore()
const index = ref('1') // 当前激活的菜单项索引
// 添加当前悬停的分类数据
const activeCategory = ref(null)

// 鼠标进入菜单项时触发，设置当前分类
const handleMouseEnter = (category) => {
  activeCategory.value = category
}
</script>

<template>
  <div class="el-category">
    <el-row gutter="20">
      <el-col :span="5">
        <el-menu
          :default-active="index"
          background-color="rgba(0,0,0,0.8)"
          text-color="#fff"
          active-text-color="#fff"
        >
          <el-menu-item
            v-for="item in categoryStore.categoryList"
            :index="item.id"
            :key="item.id"
            @mouseenter="handleMouseEnter(item)"
            @mouseleave="handleMouseLeave"
          >
          <!-- 在这里添加显示分类名称的内容 -->
          <span class="first-category">{{ item.name }}</span>
          <span class="second-category">
              {{ item.children?.[0]?.name ?? '' }}&nbsp;
              {{ item.children?.[1]?.name ?? '' }}</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <!-- 修改右侧内容区域 -->
      <el-col :span="19" class="category-goods">
        <!-- 当有悬停分类且有商品数据时显示商品 -->
        <div v-if="activeCategory && activeCategory.goods" class="goods-container">
          <!-- 商品标题 -->
          <div class="goods-title">
            <h3>分类推荐</h3><span>根据您的购买或浏览记录推荐</span>
          </div>
          <!-- 商品列表网格 -->
          <el-row :gutter="15">
            <!-- 显示前6个商品 -->
            <el-col
              v-for="good in activeCategory.goods.slice(0, 6)"
              :key="good.id"
              :span="8"
              class="goods-item"
            >
              <el-card>
                <div class="goods-card">
                  <!-- 商品图片 -->
                  <img :src="good.picture" :alt="good.name" class="goods-image">
                  <div class="goods-info">
                    <!-- 商品名称 -->
                    <div class="goods-name">{{ good.name }}</div>
                    <!-- 商品描述 -->
                    <div class="goods-desc">{{ good.desc }}</div>
                    <!-- 商品价格 -->
                    <div class="goods-price">¥{{ good.price }}</div>
                  </div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <!-- 无悬停分类时的占位内容 -->
        <div v-else class="placeholder">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.el-category {
  margin: auto 130px;

  .first-category {
    font-size: 20px;
    margin-right: 10px;
    padding-left: 30px;
  }

  .second-category {
    font-size: 16px;
  }

  .el-menu-item {
    height: 60px;
    // 悬停时设置背景颜色
    &:hover {
      background-color: $xtxColor;
    }

    // 获得焦点时设置背景颜色
    &:focus {
      background: none;
    }
  }
  /* 新增商品展示区域样式 */
  .category-goods {
    height: 390px;
    .goods-title {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin: 20px auto;
      h3 {
        margin-right: 20px;
      }
    }

    .goods-item {
      margin-bottom: 15px;

      .goods-card {
        display: flex;
        flex-direction: row;
        border-radius: 8px;

        .goods-image {
          height: 150px;
          margin-right: 10px;
        }
        .goods-name {
          font-size: 20px;
          margin-bottom: 10px;
        }
        .goods-desc {
          font-size: 16px;
          color: #666666;
          margin-bottom: 10px;
        }
        .goods-price {
          font-size: 30px;
          color: $priceColor;
          margin-bottom: 10px;
        }
      }
    }

  }


  .el-category-content {
    margin-top: 20px;

    .header {
      display: flex;
      align-items: center;
      font-size: 15px;

      span {
        margin-right: 10px;
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
}
</style>
