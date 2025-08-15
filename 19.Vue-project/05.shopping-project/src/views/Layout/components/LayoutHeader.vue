<script setup>

import {Search} from "@element-plus/icons-vue";
</script>

<template>
  <el-menu
    :default-active="activeIndex2"
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
      <el-menu-item index="2">居家</el-menu-item>
      <el-menu-item index="3">美食</el-menu-item>
      <el-menu-item index="4">服饰</el-menu-item>
    </div>

    <!-- 右侧搜索框 -->
    <div class="menu-right">
      <el-input class="el-input" v-model="input" placeholder="搜一搜" :prefix-icon="Search"/>
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
