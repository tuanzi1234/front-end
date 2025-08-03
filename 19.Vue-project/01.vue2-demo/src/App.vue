<template>
  <div id="app">
    <!-- 主体区域 -->
    <TodoHeader @changeProject="add"></TodoHeader>
    <!-- 列表区域 -->
    <TodoMain :todos="todos" @remove="removeProject"></TodoMain>
    <!-- 统计和清空 -->
    <TodoFooter :todos="todos" @removeAll="removeAll"></TodoFooter>
  </div>
</template>

<script>
import TodoMain from "@/components/TodoMain.vue";
import TodoFooter from "@/components/TodoFooter.vue";
import TodoHeader from "@/components/TodoHeader.vue";

export default {
  components: {TodoFooter, TodoMain, TodoHeader},
  data() {
    return {
      todos: [
          {
            id: 0,
            project: ""
          },
      ],
    }
  },
  methods: {
    // 添加任务的函数
    add(project) {
      this.todos.push({id: this.todos.length + 1, ...project});
    },
    // 删除任务的函数
    removeProject(id) {
      this.todos = this.todos.filter(todo => todo.id !== id);
      this.changeId();
    },
    // 清空任务的函数
    removeAll() {
      this.todos = [];
      localStorage.removeItem("todos");
    },
    // 改变任务ID的函数
    changeId(){
      // 重新排列剩余任务的ID（从1开始递增）
      this.todos = this.todos.map((todo, index) => ({
        ...todo,
        id: index + 1
      }));
    },
  },
  created() {
    this.todos = JSON.parse(localStorage.getItem("todos")) || [];
    this.changeId();
  },
  // 添加 watch 监听器
  watch: {
    todos: {
      handler(newTodos) {
        // 当 todos 数组发生变化时，保存到本地存储
        localStorage.setItem("todos", JSON.stringify(newTodos));

      },
      deep: true  // 深度监听，监听数组内对象的变化
    }
  }
}
</script>

<style>

</style>
