<script setup>

import {User} from "@element-plus/icons-vue"
</script>

<template>
  <el-menu
    :default-active="activeIndex2"
    mode="horizontal"
    background-color="#2C2C2C"
    text-color="#fff"
    @select="handleSelect"
  >
    <el-menu-item index="1"><el-icon><User /></el-icon>周杰伦</el-menu-item>
    <el-menu-item index="2">退出登录</el-menu-item>
    <el-menu-item index="3">我的订单</el-menu-item>
    <el-menu-item index="4">会员中心</el-menu-item>
  </el-menu>
</template>

<style scoped lang="scss">
.el-menu {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  .el-menu-item {
    height: 20px;
    border-right: 3px solid rgba(255, 255, 255, 0.3);
    // 默认状态下无下边框
    border-bottom: none;
    font-size: 17px;

    // 悬停时无下边框
    &:hover {
      border-bottom: none;
      background-color: #2C2C2C;
    }

    // 激活状态时无下边框
    &.is-active {
      border-bottom: none;
      background-color: #2C2C2C;
    }

    // 获得焦点时无下边框
    &:focus {
      border-bottom: none;
      background-color: #2C2C2C;
    }
  }

  .el-menu-item:last-child {
    border-right: none;
    margin-right: 100px;
  }
}
</style>
