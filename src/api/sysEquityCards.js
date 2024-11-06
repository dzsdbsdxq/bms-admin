import service from '@/utils/request'
export const createSysEquityCards = (data) => {
  return service({
    url: '/sysEquityCards/createSysEquityCards',
    method: 'post',
    data
  })
}

export const deleteSysEquityCards = (params) => {
  return service({
    url: '/sysEquityCards/deleteSysEquityCards',
    method: 'post',
    params
  })
}
export const deleteSysEquityCardsByIds = (params) => {
  return service({
    url: '/sysEquityCards/deleteSysEquityCards',
    method: 'post',
    params
  })
}
export const updateSysEquityCards = (data) => {
  return service({
    url: '/sysEquityCards/updateSysEquityCards',
    method: 'post',
    data
  })
}
export const findSysEquityCards = (params) => {
  return service({
    url: '/sysEquityCards/findSysEquityCards',
    method: 'get',
    params
  })
}
export const getSysEquityCardsList = (params) => {
  return service({
    url: '/sysEquityCards/getSysEquityCardsList',
    method: 'get',
    params
  })
}
