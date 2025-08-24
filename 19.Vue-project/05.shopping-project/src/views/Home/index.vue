<script setup>
import HomeCategory from "@/views/Home/components/HomeCategory.vue"
import HomeBanner from "@/views/Home/components/HomeBanner.vue"
import HomeHot from "@/views/Home/components/HomeHot.vue"
import HomeNews from "@/views/Home/components/HomeNews.vue"
import HomeProduct from "@/views/Home/components/HomeProduct.vue"
import {useCategoryStore} from '@/stores/category.js'
import {onMounted} from 'vue'

const categoryStore = useCategoryStore()

onMounted(() => {
  categoryStore.getCategoryList()
})
</script>

<template>
  <div>
    <HomeCategory />
    <HomeBanner />
    <HomeHot />
    <HomeNews />
    <HomeProduct />
  </div>
</template>

<style scoped>
</style>
