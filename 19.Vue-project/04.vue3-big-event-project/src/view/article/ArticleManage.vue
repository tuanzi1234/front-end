<script setup>
import PageContainer from '@/components/PageContainer.vue'
import CategorySelect from '@/view/article/components/CategorySelect.vue'
import ArticleEdit from '@/view/article/components/ArticleEdit.vue'
import { onMounted, ref } from 'vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { getArticleListService } from '@/api/article.js'
import { formatDate } from '@/utils/format.js'

// 定义请求参数对象
const articleParams = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: '',
})
// 表格数据
const articleData = ref([])
// 总条数
const total = ref(0)
// 加载
const loading = ref(false)
// 抽屉
const articleDrawer = ref()
// 获取文章列表
const getArticleList = async () => {
  loading.value = true
  const res = await getArticleListService(articleParams.value)
  articleData.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
// 点击删除按钮
const deleteArticle = (row) => {
  console.log(row)
}
// 分页切换
const handleSizeChange = (val) => {
  articleParams.value.pagenum = 1
  articleParams.value.pagesize = val
  getArticleList()
}
const handleCurrentChange = (val) => {
  // 更新当前页
  articleParams.value.pagenum = val
  getArticleList()
}
// 点击搜索按钮
const onSearch = () => {
  articleParams.value.pagenum = 1
  getArticleList()
}
// 点击重置按钮
const onReset = () => {
  articleParams.value = {
    pagenum: 1,
    pagesize: 5,
    cate_id: '',
    state: '',
  }
  getArticleList()
}

// 点击添加按钮
const onAddArticle = () => {
  articleDrawer.value.openDrawer()
}
// 点击编辑按钮
const editArticle = (row) => {
  articleDrawer.value.openDrawer(row)
}
onMounted(() => {
  getArticleList()
})
// 回调函数
const onSuccess = (type) => {
  if (type === 'add') {
    // 渲染最后一页
    articleParams.value.pagenum = Math.ceil((total.value + 1) / articleParams.value.pagesize)
    getArticleList()
  } else {
    getArticleList()
  }
}
</script>
<template>
  <PageContainer title="文章管理">
    <template #action>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>
    <!--搜索栏-->
    <el-form :inline="true" :model="articleParams">
      <el-form-item label="文章分类">
        <CategorySelect v-model="articleParams.cate_id"></CategorySelect>
      </el-form-item>
      <el-form-item label="文章状态">
        <el-select placeholder="请选择" clearable v-model="articleParams.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSearch">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!--表格区域-->
    <el-table :data="articleData" v-loading="loading" style="width: 100%">
      <el-table-column label="文章标题" width="300" prop="title">
        <template #default="scope">
          <el-link type="primary" :underline="false">{{ scope.row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="文章分类" prop="cate_name"> </el-table-column>
      <el-table-column label="发布时间" prop="pub_date">
        <template #default="scope">
          {{ formatDate(scope.row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"> </el-table-column>
      <el-table-column label="操作">
        <template #default="scope">
          <el-button :icon="Edit" circle type="primary" @click="editArticle(scope.row)"></el-button>
          <el-button
            :icon="Delete"
            circle
            type="danger"
            @click="deleteArticle(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据" />
      </template>
    </el-table>
    <!--分页区域-->
    <div class="pagination">
      <el-pagination
        v-model:current-page="articleParams.pagenum"
        v-model:page-size="articleParams.pagesize"
        :page-sizes="[2, 3, 5, 10]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <!--抽屉区域-->
      <ArticleEdit ref="articleDrawer" @success="onSuccess"></ArticleEdit>
    </div>
  </PageContainer>
</template>
<style scoped lang="less">
.el-form {
  .el-select {
    width: 200px;
  }
}

.el-pagination {
  justify-content: flex-end;
  margin-top: 20px;
}
</style>
