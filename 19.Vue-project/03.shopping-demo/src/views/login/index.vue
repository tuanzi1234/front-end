<template>
  <div class="login-container">
    <van-nav-bar
      title="标题"
      left-arrow
      @click-left="$router.go(-1)"
    />
    <div class="title">
      <div class="title-icon">手机号登录</div>
      <div class="tips">未注册手机号登录后自动注册</div>
    </div>
    <div class="form-wrapper">
      <van-form>
        <!--输入框-->
        <van-field
          v-model="phoneNumber"
          name="phoneNumber"
          placeholder="请输入手机号码"
          :rules="phoneRules"
        />
        <van-field
          v-model="picNum"
          name="picNum"
          placeholder="请输入图形验证码"
          :rules="picRules"
        >
          <template #button>
            <img v-if="picUrl" :src="picUrl" alt="" @click="getPicCode" class="captcha-image">
          </template>
        </van-field>
        <van-field
          v-model="phoneCode"
          name="phoneCode"
          placeholder="请输入短信验证码"
        >
          <template #button>
            <van-button class="code-button" :disabled="second !== totalSeconds" size="small" plain color="#FF8C00"
                        @click="getPhoneCode">
              {{ second === totalSeconds ? '获取验证码' : `重新获取(${second})` }}
            </van-button>
          </template>
        </van-field>
      </van-form>
      <div class="button-wrapper">
        <van-button round block type="primary" color="#FF8C00" @click="goLogin">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getCode, getMsgCode, login } from '@/api/login'

export default {
  name: 'LoginIndex',
  data () {
    return {
      phoneNumber: '', // 手机号
      phoneCode: '', // 手机验证码
      picNum: '', // 用户输入的图片验证码
      picKey: '', // 图片验证码的key
      picUrl: '', // 图片的url
      totalSeconds: 5, // 验证码倒计时
      second: 5, // 倒计时的秒数
      timer: null, // 定时器
      // 表单验证规则
      // 手机号校验
      phoneRules: [
        {
          required: true,
          trigger: 'onBlur'
        },
        {
          pattern: /^1[3-9]\d{9}$/,
          message: '请输入正确的手机号码',
          trigger: 'onBlur'
        }
      ],
      // 图片验证码校验
      picRules: [
        {
          required: true,
          trigger: 'onBlur'
        },
        {
          pattern: /^[a-zA-Z0-9]{4}$/,
          message: '请输入正确的图片验证码',
          trigger: 'onBlur'
        }
      ]
    }
  },
  async created () {
    await this.getPicCode()
  },
  methods: {
    // 获取图片验证码的函数
    async getPicCode () {
      const res = await getCode()
      this.picUrl = res.data.base64 // 存储地址
      this.picKey = res.data.key // 存储唯一标识
    },
    // 校验的函数
    validate () {
      if (!/^1[3-9]\d{9}$/.test(this.phoneNumber)) {
        return false
      }
      if (!/^[a-zA-Z0-9]{4}$/.test(this.picNum)) {
        return false
      }
      return true
    },
    // 获取手机验证码的函数
    async getPhoneCode () {
      if (!this.validate()) {
        return
      }
      // 若无定时器，或totalSecond和second相等，才开始倒计时
      if (!this.timer || this.totalSeconds === this.second) {
        // 发送请求获取验证码
        const res = await getMsgCode(this.picNum, this.picKey, this.phoneNumber)
        this.$toast.success('正在发送验证码，请注意查收')
        console.log(res)
        // 开启倒计时
        this.timer = setInterval(() => {
          this.second--
          if (this.second <= 0) {
            // 停止定时器
            clearInterval(this.timer)
            this.timer = null
            this.second = this.totalSeconds
          }
        }, 1000)
      }
    },
    // 登录的函数
    async goLogin () {
      if (!this.validate()) {
        return
      }
      // 检查验证码是否正确
      if (!/^\d{6}$/.test(this.phoneCode)) {
        this.$toast('请输入正确的手机验证码')
        return
      }
      // 该系统手机号默认为:18917286702
      const res = await login(this.phoneNumber, this.phoneCode)
      this.$store.commit('user/setUserInfo', res.data)
      this.$toast.success('登录成功')
      // 做出判断，判断路径中有没有携带重定向地址，如果有则跳转
      const url = this.$route.query.redirect || '/'
      await this.$router.replace(url)
    }
  },
  destroyed () {
    // 当离开页面时，停止定时器
    clearInterval(this.timer)
  }
}
</script>

<style scoped lang="less">
.login-container {
  height: 100vh; /* 占满整个视口高度 */
  display: flex;
  flex-direction: column;
}

.form-wrapper {
  flex: 1; /* 占据剩余空间 */
  display: flex;
  flex-direction: column;
  padding: 0 20px;
}

.title {
  margin: 30px 0 40px 25px;

  .title-icon {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .tips {
    font-size: 12px;
    color: #999;
  }
}

.code-button {
  border: none;
}

.button-wrapper {
  margin: 30px auto 0; /* 上边距30px，左右自动居中 */
  width: 300px;
}

:deep(.van-field__button) {
  height: 20px;
  padding-bottom: 20px;
}
</style>
