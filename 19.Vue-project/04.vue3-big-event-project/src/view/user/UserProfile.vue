<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { useUserStore } from '@/stores';
import { updateUserInfoService } from '@/api/user'
import { ElMessage } from 'element-plus'

const userRef = ref()
// 用户数据
const user = ref({
  id: '',
  username: '',
  nickname: '',
  email: ''
})
// 获取用户信息
const userStore = useUserStore()
user.value = {
  id: userStore.user.id,
  username: userStore.user.username,
  nickname: userStore.user.nickname,
  email: userStore.user.email
}
// 表单验证
const rules = {
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 2, max: 10, message: '昵称长度在 2 到 10 个字符', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ]
}
// 修改用户信息
const updateUser = async () => {
  // 校验表单
  await userRef.value.validate()
  // 提交表单
  await updateUserInfoService(user.value)
  await userStore.getUser()
  ElMessage.success('修改成功')
}
</script>
<template>
  <page-container title="基本资料">
    <div>
      <el-row>
        <el-col :span="12">
          <el-form ref="userRef" :model="user" label-width="80px" :rules="rules">
            <el-form-item label="用户名" prop="username">
              <el-input v-model="user.username" placeholder="请输入用户名" disabled />
            </el-form-item>
            <el-form-item label="用户昵称" prop="nickname">
              <el-input v-model="user.nickname" placeholder="请输入昵称" />
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="user.email" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="updateUser">提交修改</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </page-container>
</template>
