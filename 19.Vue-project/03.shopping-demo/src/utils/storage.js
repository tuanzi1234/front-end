// 约定一个通用键值
const STORAGE_KEY = 'shopping-demo'

// 获取个人信息
export const getInfo = () => {
  const defaultInfo = { token: '', userId: '' }
  const result = localStorage.getItem(STORAGE_KEY)
  return result ? JSON.parse(result) : defaultInfo
}

// 设置个人信息
export const setInfo = (obj) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(obj))
}

// 删除个人信息
export const removeInfo = () => {
  localStorage.removeItem(STORAGE_KEY)
}
