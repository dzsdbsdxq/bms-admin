import service from '@/utils/request'
export const createSysEquity = (data) => {
  return service({
    url: '/sysEquity/createSysEquity',
    method: 'post',
    data
  })
}

export const deleteSysEquity = (params) => {
  return service({
    url: '/sysEquity/deleteSysEquity',
    method: 'post',
    params
  })
}
export const deleteSysEquityByIds = (params) => {
  return service({
    url: '/sysEquity/deleteSysEquity',
    method: 'post',
    params
  })
}
export const updateSysEquity = (data) => {
  return service({
    url: '/sysEquity/updateSysEquity',
    method: 'post',
    data
  })
}
export const findSysEquity = (params) => {
  return service({
    url: '/sysEquity/findSysEquity',
    method: 'get',
    params
  })
}
export const getSysEquityList = (params) => {
  return service({
    url: '/sysEquity/getSysEquityList',
    method: 'get',
    params
  })
}
