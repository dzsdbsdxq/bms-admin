
import service from '@/utils/request'

// @Tags SysGits
// @Summary 创建sysGits表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysGits true "创建sysGits表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /sysGits/createSysGits [post]
export const createSysGits = (data) => {
  return service({
    url: '/sysGits/createSysGits',
    method: 'post',
    data
  })
}

// @Tags SysGits
// @Summary 删除sysGits表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysGits true "删除sysGits表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysGits/deleteSysGits [delete]
export const deleteSysGits = (params) => {
  return service({
    url: '/sysGits/deleteSysGits',
    method: 'post',
    params
  })
}

// @Tags SysGits
// @Summary 批量删除sysGits表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除sysGits表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysGits/deleteSysGits [delete]
export const deleteSysGitsByIds = (params) => {
  return service({
    url: '/sysGits/deleteSysGitsByIds',
    method: 'post',
    params
  })
}

// @Tags SysGits
// @Summary 更新sysGits表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysGits true "更新sysGits表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /sysGits/updateSysGits [put]
export const updateSysGits = (data) => {
  return service({
    url: '/sysGits/updateSysGits',
    method: 'post',
    data
  })
}

// @Tags SysGits
// @Summary 用id查询sysGits表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SysGits true "用id查询sysGits表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /sysGits/findSysGits [get]
export const findSysGits = (params) => {
  return service({
    url: '/sysGits/findSysGits',
    method: 'get',
    params
  })
}

// @Tags SysGits
// @Summary 分页获取sysGits表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取sysGits表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /sysGits/getSysGitsList [get]
export const getSysGitsList = (params) => {
  return service({
    url: '/sysGits/getSysGitsList',
    method: 'get',
    params
  })
}

export const getSysGitsPull = (params) => {
  return service({
    url: '/sysGits/getSysGitsPull',
    method: 'get',
    params
  })
}
