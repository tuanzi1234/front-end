<template>
  <!-- 列表区域 -->
  <section class="main">
    <ul class="todo-list">
      <li class="todo" v-for="item in todos" :key="item.id">
        <div class="view" >
          <span class="index">{{ item.id }}.</span> <label>{{ item.title }}</label>
          <button class="destroy" @click="remove(item.id)"></button>
        </div>
      </li>
    </ul>
  </section>
</template>
<script>
export default {
  name: "TodoMain",
  props: [ 'todos',],
  methods: {
    remove(id) {
      this.$emit("remove", id);
    },
  },
};
</script>
<style>

</style>