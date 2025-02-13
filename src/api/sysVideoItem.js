import service from '@/utils/request'

// @Tags SysVideoItem
// @Summary 创建sysVideoItem表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysVideoItem true "创建sysVideoItem表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /sysVideoItem/createSysVideoItem [post]
export const createSysVideoItem = (data) => {
  return service({
    url: '/sysVideoItem/createSysVideoItem',
    method: 'post',
    data
  })
}

// @Tags SysVideoItem
// @Summary 删除sysVideoItem表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysVideoItem true "删除sysVideoItem表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysVideoItem/deleteSysVideoItem [delete]
export const deleteSysVideoItem = (params) => {
  return service({
    url: '/sysVideoItem/deleteSysVideoItem',
    method: 'post',
    params
  })
}

// @Tags SysVideoItem
// @Summary 批量删除sysVideoItem表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除sysVideoItem表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysVideoItem/deleteSysVideoItem [delete]
export const deleteSysVideoItemByIds = (params) => {
  return service({
    url: '/sysVideoItem/deleteSysVideoItemByIds',
    method: 'post',
    params
  })
}

// @Tags SysVideoItem
// @Summary 更新sysVideoItem表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysVideoItem true "更新sysVideoItem表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /sysVideoItem/updateSysVideoItem [put]
export const updateSysVideoItem = (data) => {
  return service({
    url: '/sysVideoItem/updateSysVideoItem',
    method: 'post',
    data
  })
}

export const updateCountSysVideoItem = (data) => {
  return service({
    url: '/sysVideoItem/updateCountSysVideoItem',
    method: 'post',
    data
  })
}

export const updateSortBySysVideoItem = (data) => {
  return service({
    url: '/sysVideoItem/updateSortBySysVideoItem',
    method: 'post',
    data
  })
}

export const noCheckSysVideoItem = (data) => {
  return service({
    url: '/sysVideoItem/noCheckSysVideoItem',
    method: 'post',
    data
  })
}

// @Tags SysVideoItem
// @Summary 用id查询sysVideoItem表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SysVideoItem true "用id查询sysVideoItem表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /sysVideoItem/findSysVideoItem [get]
export const findSysVideoItem = (params) => {
  return service({
    url: '/sysVideoItem/findSysVideoItem',
    method: 'get',
    params
  })
}

// @Tags SysVideoItem
// @Summary 分页获取sysVideoItem表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取sysVideoItem表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /sysVideoItem/getSysVideoItemList [get]
export const getSysVideoItemList = (params) => {
  return service({
    url: '/sysVideoItem/getSysVideoItemList',
    method: 'get',
    params
  })
}
