// 获取分类信息的接口
import request from '@/utils/request'

// 获取分类信息
export const getCategory = () => {
  return request.get('category/list')
}
