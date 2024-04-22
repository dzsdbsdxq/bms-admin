import service from '@/utils/request'

// @Tags SysMembers
// @Summary 创建sysMembers表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysMembers true "创建sysMembers表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /sysMembers/createSysMembers [post]
export const createSysMembers = (data) => {
  return service({
    url: '/sysMembers/createSysMembers',
    method: 'post',
    data
  })
}

// @Tags SysMembers
// @Summary 删除sysMembers表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysMembers true "删除sysMembers表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysMembers/deleteSysMembers [delete]
export const deleteSysMembers = (params) => {
  return service({
    url: '/sysMembers/deleteSysMembers',
    method: 'delete',
    params
  })
}

// @Tags SysMembers
// @Summary 批量删除sysMembers表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除sysMembers表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysMembers/deleteSysMembers [delete]
export const deleteSysMembersByIds = (params) => {
  return service({
    url: '/sysMembers/deleteSysMembersByIds',
    method: 'delete',
    params
  })
}

// @Tags SysMembers
// @Summary 更新sysMembers表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysMembers true "更新sysMembers表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /sysMembers/updateSysMembers [put]
export const updateSysMembers = (data) => {
  return service({
    url: '/sysMembers/updateSysMembers',
    method: 'put',
    data
  })
}

// @Tags SysMembers
// @Summary 用id查询sysMembers表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SysMembers true "用id查询sysMembers表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /sysMembers/findSysMembers [get]
export const findSysMembers = (params) => {
  return service({
    url: '/sysMembers/findSysMembers',
    method: 'get',
    params
  })
}

// @Tags SysMembers
// @Summary 分页获取sysMembers表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取sysMembers表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /sysMembers/getSysMembersList [get]
export const getSysMembersList = (params) => {
  return service({
    url: '/sysMembers/getSysMembersList',
    method: 'get',
    params
  })
}

export const resetMemberPassword = (data) => {
  return service({
    url: '/sysMembers/resetPassword',
    method: 'post',
    data: data
  })
}
// @Tags SysMembers
// @Summary 积分更改
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更改成功"}"
// @Router /sysMembers/scoreUpdate [post]
export const scoreUpdate = (data) => {
  return service({
    url: '/sysMembers/scoreUpdate',
    method: 'post',
    data: data
  })
}
