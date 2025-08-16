<script setup>
import {ref, onMounted} from "vue"
import {Search} from "@element-plus/icons-vue"
import {getCategory} from '@/apis/layout.js'

// 定义响应式数据
const onInput = ref('') // 搜索框输入值
const index = ref('1') // 当前激活的菜单项索引
const categoryList = ref([]) // 存储从后端获取的分类列表数据
// 获取分类列表的异步方法
const fetchCategoryList = async () => {
  // 调用API获取分类数据
  const res = await getCategory()
  categoryList.value = res.data.result
}
// 定义菜单项选择处理函数
const handleSelect = (index) => {
  // 更新当前激活的菜单项索引
  index.value = index
}
// 在组件挂载完成后执行数据获取
onMounted(() => {
  fetchCategoryList()
})
</script>

<template>
  <el-menu
    :default-active="index"
    mode="horizontal"
    background-color="#fff"
    text-color="#000"
    @select="handleSelect"
  >
    <!-- 左侧菜单组 -->
    <div class="menu-left">
      <el-menu-item index="0">
        <img src="@/assets/images/logo.png" alt="" class="logo-img"/>
      </el-menu-item>
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item v-for="item in categoryList" :index="item.id" :key="item.id">{{
          item.name
        }}
      </el-menu-item>
    </div>

    <!-- 右侧搜索框 -->
    <div class="menu-right">
      <el-input class="el-input" v-model="onInput" placeholder="搜一搜" :prefix-icon="Search"/>
    </div>
  </el-menu>


</template>

<style scoped lang="scss">
.el-menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 130px;
  padding: 0 120px;

  .menu-left {
    display: flex;
    align-items: center;
  }

  .menu-right {
    display: flex;
    align-items: center;
    margin-right: 100px;

    .el-input {
      width: 300px;
      height: 40px;
    }
  }

  .logo-img {
    height: 80px; // 根据需要调整logo高度
    background: none;

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
