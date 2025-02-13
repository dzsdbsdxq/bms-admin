
import service from '@/utils/request'

// @Tags SysVideoUsers
// @Summary 创建sysVideoUsers表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysVideoUsers true "创建sysVideoUsers表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /sysVideoUsers/createSysVideoUsers [post]
export const createSysVideoUsers = (data) => {
  return service({
    url: '/sysVideoUsers/createSysVideoUsers',
    method: 'post',
    data
  })
}

// @Tags SysVideoUsers
// @Summary 删除sysVideoUsers表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysVideoUsers true "删除sysVideoUsers表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysVideoUsers/deleteSysVideoUsers [post]
export const deleteSysVideoUsers = (params) => {
  return service({
    url: '/sysVideoUsers/deleteSysVideoUsers',
    method: 'post',
    params
  })
}

// @Tags SysVideoUsers
// @Summary 批量删除sysVideoUsers表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除sysVideoUsers表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysVideoUsers/deleteSysVideoUsers [post]
export const deleteSysVideoUsersByIds = (params) => {
  return service({
    url: '/sysVideoUsers/deleteSysVideoUsersByIds',
    method: 'post',
    params
  })
}

// @Tags SysVideoUsers
// @Summary 更新sysVideoUsers表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysVideoUsers true "更新sysVideoUsers表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /sysVideoUsers/updateSysVideoUsers [post]
export const updateSysVideoUsers = (data) => {
  return service({
    url: '/sysVideoUsers/updateSysVideoUsers',
    method: 'post',
    data
  })
}

// @Tags SysVideoUsers
// @Summary 用id查询sysVideoUsers表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SysVideoUsers true "用id查询sysVideoUsers表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /sysVideoUsers/findSysVideoUsers [get]
export const findSysVideoUsers = (params) => {
  return service({
    url: '/sysVideoUsers/findSysVideoUsers',
    method: 'get',
    params
  })
}

// @Tags SysVideoUsers
// @Summary 分页获取sysVideoUsers表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取sysVideoUsers表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /sysVideoUsers/getSysVideoUsersList [get]
export const getSysVideoUsersList = (params) => {
  return service({
    url: '/sysVideoUsers/getSysVideoUsersList',
    method: 'get',
    params
  })
}
