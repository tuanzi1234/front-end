import request from '@/utils/request.js'

// 用户注册
export const userRegisterService = ({ username, password, repassword }) => {
  return request.post('/api/reg', { username, password, repassword })
}

// 用户登录
export const userLoginService = ({ username, password }) => {
  return request.post('/api/login', { username, password })
}

// 获取用户信息
export const userInfoService = () => {
  return request.get('/my/userinfo')
}

// 更新用户信息
export const updateUserInfoService = (data) => {
  return request.put('/my/userinfo', data)
}

// 更新用户头像
export const updateUserAvatarService = (avatar) => {
  return request.patch('/my/update/avatar', { avatar })
}

// 修改密码
export const updatePasswordService = ({ old_pwd, new_pwd, re_pwd }) => {
  return request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
}
