import service from '@/utils/request'
export const createSysEquityOrders = (data) => {
  return service({
    url: '/sysEquityOrders/createSysEquityOrders',
    method: 'post',
    data
  })
}

export const deleteSysEquityOrders = (params) => {
  return service({
    url: '/sysEquityOrders/deleteSysEquityOrders',
    method: 'post',
    params
  })
}
export const deleteSysEquityOrdersByIds = (params) => {
  return service({
    url: '/sysEquityOrders/deleteSysEquityOrders',
    method: 'post',
    params
  })
}
export const updateSysEquityOrders = (data) => {
  return service({
    url: '/sysEquityOrders/updateSysEquityOrders',
    method: 'post',
    data
  })
}
export const findSysEquityOrders = (params) => {
  return service({
    url: '/sysEquityOrders/findSysEquityOrders',
    method: 'get',
    params
  })
}
export const getSysEquityOrdersList = (params) => {
  return service({
    url: '/sysEquityOrders/getSysEquityOrdersList',
    method: 'get',
    params
  })
}
