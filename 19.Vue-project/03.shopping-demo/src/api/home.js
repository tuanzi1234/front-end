import request from '@/utils/request'

// 获取首页数据
export function getHomeData () {
  return request.get('/page/detail', {
    params: {
      pageId: 0
    }
  })
}
