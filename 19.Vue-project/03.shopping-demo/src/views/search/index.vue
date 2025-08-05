<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search show-action v-model="searchValue" placeholder="请输入搜索关键词" clearable>
      <template #action>
        <div @click="goSearch(searchValue)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history">
      <div class="title">
        <span>最近搜索</span>
        <img src="@/assets/svg/delete.svg" alt="" @click="clearHistory" height="50" />
      </div>
      <div class="list">
        <div class="list-item" v-for="item in history" :key="item" @click="goSearch(item)">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入本地存储历史记录的相关方法
import { getSearchHistory, setSearchHistory } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  data () {
    return {
      searchValue: '', // 搜索框的值
      // 搜索历史数据
      history: getSearchHistory()
    }
  },
  methods: {
    // 跳转搜索结果页
    goSearch (key) {
      // 查询历史在数组的索引
      const index = this.history.indexOf(key)
      // 如果存在，将原有关键字移除，并添加到数组首位
      if (index !== -1) {
        this.history.splice(index, 1)
      }
      // 添加到数组首位
      this.history.unshift(key)
      // 保存到本地存储
      setSearchHistory(this.history)
      // 跳转
      this.$router.push(`/searchList?search=${key}`)
    },
    // 清空历史记录
    clearHistory () {
      this.history = []
      // 移除本地存储的数据
      setSearchHistory([])
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
