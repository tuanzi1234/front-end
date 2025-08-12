<script setup>
import { ref } from 'vue'
import { addCategoryService,updateCategoryService } from '@/api/category.js'
import { ElMessage } from 'element-plus'

// 表单对象
const categoryRef = ref()
// 控制弹窗显示
const dialogVisible = ref(false)
// 表单数据
const categoryModel = ref({
  cate_name: '',
  cate_alias: '',
})
// 同时需要定义 emits
const emits = defineEmits(['success'])
// 表单验证
const categoryRules = {
  cate_name: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    { pattern: /^\S{1,10}$/, message: '长度在 1 到 10 位的非空字符', trigger: 'blur' },
  ],
  cate_alias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '长度在 1 到 15 位的非空字母或数字字符',
      trigger: 'blur',
    },
  ],
}
// 添加一个方法，在其他组件调用时是编辑或添加
const openDialog = (row) => {
  categoryModel.value = {...row}
  dialogVisible.value = true
}

// 点击确定按钮提交表单
const onsubmit = () => {
  categoryRef.value.validate(async (valid) => {
    if (!valid) return
    const formId = categoryModel.value.id
    if (formId) {
      await updateCategoryService({
        id: formId,
        cate_name: categoryModel.value.cate_name,
        cate_alias: categoryModel.value.cate_alias,
      })
      ElMessage.success('编辑成功')
    } else {
      await addCategoryService({
        cate_name: categoryModel.value.cate_name,
        cate_alias: categoryModel.value.cate_alias,
      })
      ElMessage.success('添加成功')
    }
      emits('success')
      dialogVisible.value = false
  })
}
// 暴露弹窗给其他组件调用
defineExpose({
  openDialog,
})
</script>

<template>
  <el-dialog v-model="dialogVisible" :title="categoryModel.id ? '编辑分类' : '添加分类'" width="500">
    <el-form ref="categoryRef" :model="categoryModel" :rules="categoryRules" label-width="80px">
      <el-form-item label="分类名称" prop="cate_name">
        <el-input v-model="categoryModel.cate_name" placeholder="请输入分类名称"></el-input>
      </el-form-item>
      <el-form-item label="分类别名" prop="cate_alias">
        <el-input v-model="categoryModel.cate_alias" placeholder="请输入分类别名"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onsubmit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
