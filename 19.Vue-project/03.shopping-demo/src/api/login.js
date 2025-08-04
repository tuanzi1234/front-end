// 存放登录相关请求
import request from '@/utils/request'

// 获取图形验证码
export const getCode = () => {
  return request.get('/captcha/image')
}

// 获取短信验证码
export const getMsgCode = (captchaCode, captchaKey, mobile) => {
  return request.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

// 登录
export const login = (mobile, smsCode) => {
  return request.post('passport/login', {
    form: {
      mobile,
      isParty: false,
      partyData: {},
      smsCode
    }
  })
}
