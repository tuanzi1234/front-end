import request from '@/utils/request.js'

// 获取文章列表
export const getArticleListService = (params) => {
  return request.get('/my/article/list', { params })
}

// 添加文章
export const addArticleService = (data) => {
  return request.post('/my/article/add', data)
}
