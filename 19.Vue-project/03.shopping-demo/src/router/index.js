import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login/index.vue'
import Layout from '@/views/layout/index.vue'
import Order from '@/views/order/index.vue'
import Pay from '@/views/pay/index.vue'
import Prodetail from '@/views/prodetail/index.vue'
import Search from '@/views/search/index.vue'
import SearchList from '@/views/search/List.vue'
// 子路由
import Home from '@/views/layout/home.vue'
import Category from '@/views/layout/category.vue'
import ShoppingCart from '@/views/layout/cart.vue'
import User from '@/views/layout/user.vue'

// 引入Vuex，用于访问token
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/layout'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/layout',
      component: Layout,
      children: [
        {
          path: '/',
          redirect: '/home'
        },
        {
          path: '/home',
          component: Home
        },
        {
          path: '/category',
          component: Category
        },
        {
          path: '/cart',
          component: ShoppingCart
        },
        {
          path: '/user',
          component: User
        }
      ]
    },
    {
      path: '/order',
      component: Order
    },
    {
      path: '/pay',
      component: Pay
    },
    {
      // 商品详情,需要携带对应的商品id
      path: '/prodetail/:id',
      component: Prodetail
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/searchList',
      component: SearchList
    }
  ]
})

// 预先存储需要用户token才能访问的路由
const needLogin = ['/order', '/pay']

// 导航守卫
router.beforeEach((to, from, next) => {
  // to: 即将要进入的目标
  // from: 当前导航正要离开的路由
  // next: 一定要调用该方法来 resolve 这个钩子
  // next() 若不做任何操作，会放行所有路由
  // 查看to.path是否在needLogin数组中
  if (!needLogin.includes(to.path)) {
    // 如果没有，直接放行
    next()
  }
  // 如果有，查看store中是否有token
  const token = store.getters.token
  // 如果有token，放行
  if (token) {
    next()
  } else {
    // 如果没有token，跳转到登录页
    next('/login')
  }
})

export default router
