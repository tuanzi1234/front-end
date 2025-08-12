<script setup>
import { Back, Lock, Right, User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref, watch } from 'vue'
import { userRegisterService } from '@/api/user.js'
import { userLoginService } from '@/api/user.js'
import { useUserStore } from '@/stores/index.js'
import { useRouter } from 'vue-router'

// 表单响应式数据
const formRef = ref(null)
// 表单数据
const loginForm = ref({
  username: '',
  password: '',
  againPassword: '',
})
//登录信息
const userMes = useUserStore()
// 登录状态
const remember = ref(false)
// 登录/注册切换
const isLogin = ref(true)
// 路由信息
const router = useRouter() // 用于路由跳转
//自定义校验
const confirmPass = (rule, value, callback) => {
  if (isLogin.value) {
    callback()
  } else if (value !== loginForm.value.password) {
    callback(new Error('两次输入密码不一致!'))
  } else if (value === ''){
    callback(new Error('请再次输入密码'))
  } else {
    callback()
  }
}
// 表单校验
const loginRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' },
  ],
  againPassword: [
    { validator: confirmPass, trigger: 'blur' },
  ],
}

// 点击注册按钮触发的函数
const register = () => {
  isLogin.value = !isLogin.value
}
// 提交表单
const submitForm = async () => {
  await formRef.value.validate()
  if (!isLogin.value){
    await userRegisterService({
      username: loginForm.value.username,
      password: loginForm.value.password,
      repassword: loginForm.value.againPassword,
    })
    loginForm.value.isLogin = true
    // 注册成功
    ElMessage.success('注册成功')
    // 重置表单
    loginForm.value = {
      username:  '',
      password: '',
      againPassword: '',
    }
  } else {
    const res = await userLoginService({
      username: loginForm.value.username,
      password: loginForm.value.password,
    })
    userMes.setToken(res.data.token)
    // 登录成功
    ElMessage.success('登录成功')
    // 跳转到首页
    await router.push('/')
  }
}
// 切换登录/注册时重置表单
watch(isLogin, () => {
  loginForm.value = {
    username:  '',
    password: '',
    againPassword: '',
  }
})
</script>
<template>
  <el-row>
<!--    登录页作半图片-->
    <el-col :span="12">
      <div class="login-left">
        <img src="@/assets/logo2.png" alt="" />
      </div>
    </el-col>
    <el-col :span="3"></el-col>
    <el-col :span="6">
<!--      登录表单-->
      <el-form ref="formRef" :model="loginForm" :rules="loginRules" class="login-form-col">
        <el-form-item class="login-title">
          <h1 v-if="isLogin">登录</h1>
          <h1 v-else>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="loginForm.username" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
            show-password
            v-model="loginForm.password"
          />
        </el-form-item>
        <el-form-item prop="againPassword">
          <div class="login-checkbox-wrapper" v-if="isLogin">
            <el-checkbox v-model="remember">记住我</el-checkbox>
            <el-button type="primary" link>忘记密码？</el-button>
          </div>
          <el-input
            :prefix-icon="Lock"
            type="password"
            show-password
            v-model="loginForm.againPassword"
            placeholder="请再次输入密码"
            v-else
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm" style="width: 100%">
            {{ isLogin ? '登录' : '注册' }}
          </el-button>
        </el-form-item>
        <el-form-item>
          <el-button v-if="isLogin" link @click="register" class="button-register"
            >注册<el-icon><Right /></el-icon
          ></el-button>
          <el-button v-else link @click="register" class="button-register"
            ><el-icon><Back /></el-icon>返回</el-button
          >
        </el-form-item>
      </el-form>
    </el-col>
    <el-col :span="3"></el-col>
  </el-row>
</template>
<style scoped lang="less">
.el-col {
  display: flex;
  height: 100vh; /* 设置高度为视口高度 */
  background-color: #fff;

  .login-left,
  .login-right {
    flex: 1; /* 平分空间 */
    display: flex;
    flex-direction: column;
    background-color: #fff;
  }

  .login-left {
    align-items: center;
    justify-content: center;
    background-image: url('@/assets/login_bg.jpg');
    background-repeat: no-repeat;
    background-size: cover; // 缩放背景图片以覆盖整个容器
    background-position: center; // 让背景图片居中显示
    border-radius: 0 30px 30px 0;

    img {
      height: 180px;
    }
  }

  .login-form-col {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 100%;
  }

  // 为复选框容器添加样式
  .login-checkbox-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 40px;
    .el-checkbox {
      color: #a3a2a5;
    }
  }
  .button-register {
    color: #a3a2a5;
  }
  .el-input {
    height: 40px;
  }
}
</style>
