import request from '@/utils/request'

// 加入购物车接口
export const addCartList = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
// 获取购物车列表
export const getCartList = () => {
  return request.get('/cart/list')
}
// 修改购物车商品数量
export const updateCartNum = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车商品
export const deleteCart = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
