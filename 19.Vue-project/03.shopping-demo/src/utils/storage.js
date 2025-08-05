// 约定一个通用键值
// 用于存储用户信息的键值
const STORAGE_KEY = 'shopping-demo'
// 用于存储用户搜索历史的键值
const STORAGE_KEY_SEARCH = 'shopping-demo-search'

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

// 获取搜索历史
export const getSearchHistory = () => {
  const result = localStorage.getItem(STORAGE_KEY_SEARCH)
  return result ? JSON.parse(result) : []
}

// 设置搜索历史
export const setSearchHistory = (arr) => {
  localStorage.setItem(STORAGE_KEY_SEARCH, JSON.stringify(arr))
}
