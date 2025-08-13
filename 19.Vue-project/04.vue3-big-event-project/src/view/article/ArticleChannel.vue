<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { onMounted, ref } from 'vue'
import { getCategoryService } from '@/api/category'
import { Delete, Edit } from '@element-plus/icons-vue'
import CategoryEdit from '@/view/article/components/CategoryEdit.vue'
import { deleteCategoryService } from '@/api/category'
import { ElMessageBox, ElMessage } from 'element-plus'

const loading = ref(false)
// 弹窗样式
const dialog = ref()
// 表单数据
const categoryList = ref([])
const getCategoryList = async () => {
  loading.value = true
  const res = await getCategoryService()
  categoryList.value = res.data.data
  loading.value = false
}
onMounted( () => {
  getCategoryList()
})

// 点击删除按钮
const onDeleteCategory = (row) => {
  ElMessageBox.confirm('此操作将永久删除该文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await deleteCategoryService(row.id)
    ElMessage.success('删除成功')
    await getCategoryList()
  })
}
// 点击添加按钮
const onAddCategory = () => {
  dialog.value.openDialog()
}
// 点击编辑按钮
const onEditCategory = (row) => {
  dialog.value.openDialog(row)
}
</script>
<template>
  <PageContainer title="文章分类">
    <template #action>
      <el-button type="primary" @click="onAddCategory">添加分类</el-button>
    </template>
    <el-table v-loading="loading" :data="categoryList" style="width: 100%">
      <el-table-column  type="index" label="序号" width="180" />
      <el-table-column prop="cate_name" label="分类名称"  />
      <el-table-column prop="cate_alias" label="分类别名" />
      <el-table-column prop="操作" label="操作" width="180">
        <template #default="scope">
          <el-button :icon="Edit" circle type="primary" @click="onEditCategory(scope.row)"></el-button>
          <el-button :icon="Delete" circle type="danger" @click="onDeleteCategory(scope.row)"></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="暂无数据"/>
      </template>
    </el-table>
    <CategoryEdit ref="dialog" @success="getCategoryList"></CategoryEdit>
  </PageContainer>
</template>
