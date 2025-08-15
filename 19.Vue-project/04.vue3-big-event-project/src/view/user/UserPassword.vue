<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { updatePasswordService } from '@/api/user.js'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/index.js'
import { useRouter } from 'vue-router'

// 表单数据
const passwordRef = ref()
const passwordForm = ref({
  old_pwd: '',
  new_pwd: '',
  re_pwd: '',
})
// 获取用户信息
const userStore = useUserStore()
const router = useRouter()
// 表单验证规则
const rules = {
  oldPassword: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' },
  ],
  rePassword: [
    { required: true, message: '请再次输入新密码', trigger: 'blur' },
    // 确认密码必须与新密码一致
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.value.newPassword) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
}
// 修改密码
const updatePassword = async () => {
  // 验证表单
  await passwordRef.value.validate()
  // 发送请求
  await updatePasswordService(passwordForm.value)
  // 提示
  ElMessage.success('密码修改成功')
  // 跳转到登录页面，清除token
  userStore.removeToken()
  userStore.setUser({})
  router.push('/login')
}
</script>
<template>
  <page-container title="重置密码">
    <el-row>
      <el-col :span="12">
        <el-form ref="passwordRef" :rules="rules" :model="passwordForm" label-width="80px">
          <el-form-item label="旧密码" prop="old_pwd">
            <el-input
              v-model="passwordForm.old_pwd"
              show-password
              type="password"
              placeholder="请输入旧密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input
              v-model="passwordForm.new_pwd"
              show-password
              type="password"
              placeholder="请输入新密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="re_pwd">
            <el-input
              v-model="passwordForm.re_pwd"
              show-password
              type="password"
              placeholder="请再次输入新密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updatePassword">重置密码</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </page-container>
</template>
