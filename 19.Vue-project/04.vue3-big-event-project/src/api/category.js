import request from '@/utils/request.js'

// 获取分类列表
export const getCategoryService = () => request.get('/my/cate/list')

// 添加分类
export const addCategoryService = ({ cate_name, cate_alias }) =>
  request.post('/my/cate/add', { cate_name, cate_alias })

// 修改分类
export const updateCategoryService = ({ id, cate_name, cate_alias }) =>
  request.put('/my/cate/info', { id, cate_name, cate_alias })

// 删除分类
export const deleteCategoryService = (id) =>
  request.delete(`/my/cate/del/`, {
    params: {
      id,
    },
  })
