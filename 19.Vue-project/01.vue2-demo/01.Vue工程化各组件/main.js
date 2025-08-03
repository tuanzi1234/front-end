//导入App.vue, 基于App.vue渲染index.html
//1.导入Vue核心包
import Vue from 'vue'
//2.导入App.vue根组件
import App from './App.vue'

//当前所处的环境，false为生产环境，true为开发环境
Vue.config.productionTip = false

//3.创建Vue实例对象
new Vue({
  //render: function (createElement) {
  //   return createElement(App)
  // }的简写，基于App.vue根组件渲染页面
  render: h => h(App),
}).$mount('#app') //相当于Vue实例对象的el: '#app'
