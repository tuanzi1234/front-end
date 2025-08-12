<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
<template>
  <el-card>
    <template #header>
      <div class="header">
        <span>{{ title }}</span>
        <slot name="action"></slot>
      </div>
    </template>
    <slot></slot>
  </el-card>
</template>
<style scoped lang="less">
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: 20px;
  }
}
</style>
