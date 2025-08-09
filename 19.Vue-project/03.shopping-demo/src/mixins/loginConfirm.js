export default {
  // 此处存放的是Vue实例的配置项，通过语法，可直接在组件内使用
  methods: {
    // 弹窗的函数
    loginConfirm () {
      // 1.判断token是否存在(是否登录), 没有则弹出提示框确认是否登录
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: '提示',
          message: '该功能需要登录，是否前往登录？',
          confirmButtonText: '去登录',
          cancelButtonText: '再逛逛',
          confirmButtonColor: '#FFA900'
        }).then(() => {
          this.$router.replace({
            path: '/login',
            query: {
              // 登录完毕后回到当前页面
              redirect: this.$route.fullPath
            }
          })
        }).catch(() => {
        })
        return true
      }
      return false
    }
  }
}
