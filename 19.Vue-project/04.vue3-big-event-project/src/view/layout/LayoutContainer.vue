<script setup>
import {
  ArrowDown,
  Crop,
  EditPen,
  Management,
  Promotion,
  SwitchButton,
  User,
  UserFilled,
} from '@element-plus/icons-vue'
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/index.js'
import deFaultAvatar from '@/assets/default.png'
import {useRouter} from 'vue-router'
import { ElMessageBox } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
onMounted(() => {
  userStore.getUser()
})
const handleCommand = (command) => {
  if (command === 'logout') {
    ElMessageBox.confirm( '确定要退出登录吗？','Warning',{
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      }).then(() => {
      userStore.removeToken()
      userStore.setUser({})
      // 跳转到登录页面
      router.push('/login')
    }).catch(() => {})
  } else {
    router.push(command)
  }
}
</script>

<template>
  <div class="common-layout">
    <el-container>
<!--      左半部分菜单-->
      <el-aside width="200px">
        <el-menu
          router
          active-text-color="#ffd04b"
          text-color="#fff"
          background-color="#232323"
          :default-active="$route.path"
        >
          <img src="@/assets/logo.png" alt="" />
          <el-menu-item index="/article/manage">
            <el-icon>
              <Management />
            </el-icon>
            文章管理
          </el-menu-item>
          <el-menu-item index="/article/channel">
            <el-icon>
              <Promotion />
            </el-icon>
            文章分类
          </el-menu-item>
          <el-sub-menu>
            <template #title>
              <el-icon>
                <UserFilled />
              </el-icon>
              用户管理
            </template>
            <el-menu-item index="/user/profile">
              <el-icon>
                <User />
              </el-icon>
              基本资料
            </el-menu-item>
            <el-menu-item index="/user/avatar">
              <el-icon>
                <Crop />
              </el-icon>
              更换头像
            </el-menu-item>
            <el-menu-item index="/user/password">
              <el-icon>
                <EditPen />
              </el-icon>
              重置密码
            </el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      <el-container>
<!--        头部-->
        <el-header>
          <div class="user">
            程序员:&nbsp;<span class="name">{{ userStore.user.username || userStore.user.nickname }}</span>
          </div>
          <div class="avatar">
            <el-dropdown trigger="click" @command="handleCommand">
              <span class="el-dropdown-link">
                <el-avatar :size="50" :src="deFaultAvatar || userStore.user.user_pic" />
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
<!--              下拉菜单-->
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item command="/user/profile">
                    <el-icon>
                      <User />
                    </el-icon>
                    基本资料
                  </el-dropdown-item>
                  <el-dropdown-item command="/user/avatar">
                    <el-icon>
                      <Crop />
                    </el-icon>
                    更换头像
                  </el-dropdown-item>
                  <el-dropdown-item command="/user/password">
                    <el-icon>
                      <EditPen />
                    </el-icon>
                    重置密码
                  </el-dropdown-item>
                  <el-dropdown-item command="logout">
                    <el-icon>
                      <SwitchButton />
                    </el-icon>
                    退出登录
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
<!--        页面主体-->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="less">
.el-menu {
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;

  img {
    padding: 20px 0;
    width: 130px;
  }

  .el-menu-item {
    width: 170px;
  }

  .el-sub-menu {
    width: 170px;
  }
}

.el-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .name {
    font-size: 25px;
  }

  .el-dropdown-link {
    display: flex;
    align-items: center;
  }
}
</style>
