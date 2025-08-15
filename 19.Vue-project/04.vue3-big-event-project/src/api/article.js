import request from '@/utils/request.js'

// 获取文章列表
export const getArticleListService = (params) => {
  return request.get('/my/article/list', { params })
}

// 添加文章
export const addArticleService = (data) => {
  return request.post('/my/article/add', data)
}

// 获取文章详情
export const getArticleDetailService = (id) => {
  return request.get('/my/article/info', {
    params: {
      id
    }
  })
}

// 修改文章
export const updateArticleService = (data) => {
  return request.put('/my/article/info', data)
}

// 删除文章
