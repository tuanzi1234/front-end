import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/index.js'

// 初始化Vue-Router4
const router = createRouter({
  // 创建history模式, 另一个是createWebHashHistory() 创建带#的hash模式
  history: createWebHistory(import.meta.env.BASE_URL), //该变量可在vue.config.js中配置
  routes: [
    { path: '/login', name: 'Login', component: () => import('@/view/login/loginPage.vue')},
    { path: '/',
      name: 'home',
      component: () => import('@/view/layout/LayoutContainer.vue'),
      redirect: '/article/manage',
      children: [
        { path: '/article/manage', name: 'ArticleManage', component: () => import('@/view/article/ArticleManage.vue')},
        { path: '/article/channel', name: 'ArticleChannel', component: () => import('@/view/article/articleChannel.vue')},
        { path: '/user/profile', name: 'UserProfile', component: () => import('@/view/user/UserProfile.vue')},
        { path: '/user/avatar', name: 'UserAvatar', component: () => import('@/view/user/UserAvatar.vue')},
        { path: '/user/password', name: 'UserPassword', component: () => import('@/view/user/UserPassword.vue')},
      ]
    }
  ],
})

// 路由导航守卫
router.beforeEach((to) => {
  // 获取token
  const userStore = useUserStore()
  const token = userStore.token
  // 如果没有token，并且访问的不是登录页，则跳转到登录页
  if (!token && to.path !== '/login') return '/login'
  return true
})

export default router
