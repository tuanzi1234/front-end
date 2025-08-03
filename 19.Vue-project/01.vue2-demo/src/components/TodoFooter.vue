<template>
  <!-- 统计和清空 -->
  <footer class="footer">
    <!-- 统计 -->
    <span class="todo-count">合 计:<strong>{{ total }}</strong></span>
    <!-- 清空 -->
    <button class="clear-completed" @click="removeAll">
      清空任务
    </button>
  </footer>
</template>
<script>
export default {
  name: "TodoFooter",
  props: ['todos'],
  methods: {
    removeAll() {
      this.$emit('removeAll');
    }
  },
  computed: {
    total() {
      return this.todos.length;
    }
  },
}
</script>
<style>

</style>