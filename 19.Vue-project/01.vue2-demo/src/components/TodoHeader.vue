<template>
  <!-- 输入框 -->
  <header class="header">
    <h1>小黑记事本</h1>
    <input placeholder="请输入任务" class="new-todo" @keyup.enter="add" v-model="project" />
    <button class="add"  @click="add">添加任务</button>
  </header>
</template>
<script>

export default {
  name: "TodoHeader",
  props: ['todos'],
  data() {
    return {
      project: ""
    };
  },
  methods: {
    add() {
      if (this.project.trim()) {

        // 触发 changeProject 事件，传递任务数据
        this.$emit('changeProject', {
          title: this.project,
        });
        this.project = '';
      }else {
        alert('请输入任务');
      }
    }
  },
};

</script>
<style>

</style>