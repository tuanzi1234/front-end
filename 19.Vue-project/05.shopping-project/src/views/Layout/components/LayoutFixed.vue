<script setup>
import {ref, watch} from "vue"
import {useScroll} from '@vueuse/core'
import {useCategoryStore} from "@/stores/category.js"

const categoryStore = useCategoryStore()
// 定义响应式数据
const index = ref('1') // 当前激活的菜单项索引
const showFixedNav = ref(false)  // 控制是否显示固定导航
// 使用 VueUse 监听滚动
const {y} = useScroll(window)

// 监听滚动位置变化
watch(y, (newY) => {
  showFixedNav.value = newY > 78
})
</script>

<template>
  <!-- 条件渲染固定导航 -->
  <el-affix :offset="0" v-if="showFixedNav">
    <el-menu
      :default-active="index"
      mode="horizontal"
      background-color="#fff"
      text-color="#000"
      @select="handleSelect"
    >
      <el-menu-item index="0">
        <img src="@/assets/images/logo.png" alt="" class="logo-img"/>
      </el-menu-item>
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item v-for="item in categoryStore.categoryList" :index="item.id" :key="item.id">{{
          item.name
        }}
      </el-menu-item>
      <el-menu-item index="2" class="fl">品牌</el-menu-item>
      <el-menu-item index="3">专题</el-menu-item>
    </el-menu>
  </el-affix>
</template>

<style scoped lang="scss">
.el-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 120px;

  .logo-img {
    height: 80px; // 根据需要调整logo高度
    background: none;
  }

  .fl {
    border-left: 3px solid $xtxColor;
    height: 30px;
  }

  .el-menu-item {
    // 默认状态下无下边框
    border-bottom: none;
    font-size: 25px;
    padding: 0 30px;

    // 悬停时无下边框
    &:hover {
      border-bottom: none;
      background-color: transparent;
    }

    // 激活状态时无下边框
    &.is-active {
      border-bottom: none;
      background-color: transparent;
    }

    // 获得焦点时无下边框
    &:focus {
      border-bottom: none;
      background-color: transparent;
    }
  }

  .el-menu-item:last-child {
    border-right: none;
    margin-right: 100px;
  }
}
</style>
