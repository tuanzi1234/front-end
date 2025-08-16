// 使用pinia状态管理控制category相关数据
import {defineStore} from 'pinia'
import {getCategory} from '@/apis/layout'
import {ref} from "vue";

export const useCategoryStore = defineStore('category', () => {
  const categoryList = ref([]) // 存储从后端获取的分类列表数据
  // 获取分类列表的异步方法
  const getCategoryList = async () => {
    // 调用API获取分类数据
    const res = await getCategory()
    categoryList.value = res.data.result
  }
  return {
    categoryList,
    getCategoryList
  }
})
