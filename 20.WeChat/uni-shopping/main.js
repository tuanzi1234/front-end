import App from './App'

// 导入网络请求
import {$http} from "@escook/request-miniprogram"
// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

// 挂载$http
uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net/'
// 请求拦截器
$http.beforeRequest = function(options) {
  uni.showLoading({
    title: '数据加载中...',
  })
}
// 响应拦截器
$http.afterRequest = function() {
  uni.hideLoading()
}

// 创建Vue实例
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {createSSRApp} from 'vue'

export function createApp() {
    const app = createSSRApp(App)
    return {
        app
    }
}

// #endif
