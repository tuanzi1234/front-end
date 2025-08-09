import request from '@/utils/request'

// 获取订单信息
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      delivery: 10,
      couponId: 0,
      isUsePoints: 0,
      mode,
      ...obj
    }
  })
}

// 提交订单
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/order', {
    delivery: 10,
    couponId: 0,
    isUsePoints: 0,
    payType: 0,
    mode,
    ...obj
  })
}

// 获取订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
