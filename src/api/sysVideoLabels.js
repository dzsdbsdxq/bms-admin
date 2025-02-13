
import service from '@/utils/request'

// @Tags SysVideoLabels
// @Summary 创建sysVideoLabels表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysVideoLabels true "创建sysVideoLabels表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /sysVideoLabels/createSysVideoLabels [post]
export const createSysVideoLabels = (data) => {
  return service({
    url: '/sysVideoLabels/createSysVideoLabels',
    method: 'post',
    data
  })
}

// @Tags SysVideoLabels
// @Summary 删除sysVideoLabels表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysVideoLabels true "删除sysVideoLabels表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysVideoLabels/deleteSysVideoLabels [delete]
export const deleteSysVideoLabels = (params) => {
  return service({
    url: '/sysVideoLabels/deleteSysVideoLabels',
    method: 'post',
    params
  })
}

// @Tags SysVideoLabels
// @Summary 批量删除sysVideoLabels表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除sysVideoLabels表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysVideoLabels/deleteSysVideoLabels [delete]
export const deleteSysVideoLabelsByIds = (params) => {
  return service({
    url: '/sysVideoLabels/deleteSysVideoLabelsByIds',
    method: 'post',
    params
  })
}

// @Tags SysVideoLabels
// @Summary 更新sysVideoLabels表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysVideoLabels true "更新sysVideoLabels表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /sysVideoLabels/updateSysVideoLabels [put]
export const updateSysVideoLabels = (data) => {
  return service({
    url: '/sysVideoLabels/updateSysVideoLabels',
    method: 'post',
    data
  })
}

// @Tags SysVideoLabels
// @Summary 用id查询sysVideoLabels表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SysVideoLabels true "用id查询sysVideoLabels表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /sysVideoLabels/findSysVideoLabels [get]
export const findSysVideoLabels = (params) => {
  return service({
    url: '/sysVideoLabels/findSysVideoLabels',
    method: 'get',
    params
  })
}

// @Tags SysVideoLabels
// @Summary 分页获取sysVideoLabels表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取sysVideoLabels表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /sysVideoLabels/getSysVideoLabelsList [get]
export const getSysVideoLabelsList = (params) => {
  return service({
    url: '/sysVideoLabels/getSysVideoLabelsList',
    method: 'get',
    params
  })
}
