import service from '@/utils/request'

// @Tags SysWheels
// @Summary 创建sysWheels表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysWheels true "创建sysWheels表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /sysWheels/createSysWheels [post]
export const createSysWheels = (data) => {
  return service({
    url: '/sysWheels/createSysWheels',
    method: 'post',
    data
  })
}

// @Tags SysWheels
// @Summary 删除sysWheels表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysWheels true "删除sysWheels表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysWheels/deleteSysWheels [delete]
export const deleteSysWheels = (params) => {
  return service({
    url: '/sysWheels/deleteSysWheels',
    method: 'delete',
    params
  })
}

// @Tags SysWheels
// @Summary 批量删除sysWheels表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除sysWheels表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysWheels/deleteSysWheels [delete]
export const deleteSysWheelsByIds = (params) => {
  return service({
    url: '/sysWheels/deleteSysWheelsByIds',
    method: 'delete',
    params
  })
}

// @Tags SysWheels
// @Summary 更新sysWheels表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysWheels true "更新sysWheels表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /sysWheels/updateSysWheels [put]
export const updateSysWheels = (data) => {
  return service({
    url: '/sysWheels/updateSysWheels',
    method: 'put',
    data
  })
}
// @Tags SysWheels
// @Summary 更新pageParams字段
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysWheels true "更新pageParams字段"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /sysWheels/updateSysWheels [put]
export const updatePageParams = (data) => {
  return service({
    url: '/sysWheels/updatePageParams',
    method: 'put',
    data
  })
}

// @Tags SysWheels
// @Summary 用id查询sysWheels表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SysWheels true "用id查询sysWheels表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /sysWheels/findSysWheels [get]
export const findSysWheels = (params) => {
  return service({
    url: '/sysWheels/findSysWheels',
    method: 'get',
    params
  })
}

// @Tags SysWheels
// @Summary 分页获取sysWheels表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取sysWheels表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /sysWheels/getSysWheelsList [get]
export const getSysWheelsList = (params) => {
  return service({
    url: '/sysWheels/getSysWheelsList',
    method: 'get',
    params
  })
}

// @Tags SysWheels
// @Summary 获取大转盘模版信息
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取获取大转盘模版信息"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /sysWheels/getSysWheelsList [get]
export const getSysWheelsTemplateInfo = (params) => {
  return service({
    url: '/sysWheels/getTemplateInfo',
    method: 'get',
    params
  })
}

// @Tags SysWheels
// @Summary 获取sysWheel表模版配置信息列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "获取sysWheel表模版配置信息列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /SysWheels/getSysWheelPrizesList [get]
export const getTemplateConfig = (params) => {
  return service({
    url: '/sysWheels/getTemplateConfig',
    method: 'get',
    params
  })
}
