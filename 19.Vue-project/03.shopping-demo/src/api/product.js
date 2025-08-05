import request from '@/utils/request'

// 获取商品详情
export const getProductDetail = (obj) => {
  const {
    categoryId,
    goodsName,
    page
  } = obj
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}
