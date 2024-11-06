import service from '@/utils/request'
export const createSysEquityGoods = (data) => {
  return service({
    url: '/sysEquityGoods/createSysEquityGoods',
    method: 'post',
    data
  })
}

export const deleteSysEquityGoods = (params) => {
  return service({
    url: '/sysEquityGoods/deleteSysEquityGoods',
    method: 'post',
    params
  })
}
export const deleteSysEquityGoodsByIds = (params) => {
  return service({
    url: '/sysEquityGoods/deleteSysEquityGoods',
    method: 'post',
    params
  })
}
export const updateSysEquityGoods = (data) => {
  return service({
    url: '/sysEquityGoods/updateSysEquityGoods',
    method: 'post',
    data
  })
}
export const findSysEquityGoods = (params) => {
  return service({
    url: '/sysEquityGoods/findSysEquityGoods',
    method: 'get',
    params
  })
}
export const getSysEquityGoodsList = (params) => {
  return service({
    url: '/sysEquityGoods/getSysEquityGoodsList',
    method: 'get',
    params
  })
}
