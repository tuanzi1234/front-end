<script setup>
import { getCategoryService } from '@/api/category.js'
import { ref } from 'vue'

const categoryList = ref([])
const getCategory = async () => {
  const res = await getCategoryService()
  categoryList.value = res.data.data
}
getCategory()

defineProps({
  modelValue: {
    type: [String, Number],
  },
})
const emit = defineEmits(['update:modelValue'])
</script>
<template>
  <el-select placeholder="请选择" clearable :modelValue="modelValue" @update:modelValue="emit('update:modelValue', $event)">
    <el-option v-for="item in categoryList" :key="item.id" :label="item.cate_name" :value="item.id" />
  </el-select>
</template>
