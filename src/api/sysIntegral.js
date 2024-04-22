import service from '@/utils/request'

// @Tags SysIntegral
// @Summary 创建sysIntegral表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysIntegral true "创建sysIntegral表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /sysIntegral/createSysIntegral [post]
export const createSysIntegral = (data) => {
  return service({
    url: '/sysIntegral/createSysIntegral',
    method: 'post',
    data
  })
}

// @Tags SysIntegral
// @Summary 删除sysIntegral表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysIntegral true "删除sysIntegral表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysIntegral/deleteSysIntegral [delete]
export const deleteSysIntegral = (params) => {
  return service({
    url: '/sysIntegral/deleteSysIntegral',
    method: 'delete',
    params
  })
}

// @Tags SysIntegral
// @Summary 批量删除sysIntegral表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除sysIntegral表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysIntegral/deleteSysIntegral [delete]
export const deleteSysIntegralByIds = (params) => {
  return service({
    url: '/sysIntegral/deleteSysIntegralByIds',
    method: 'delete',
    params
  })
}

// @Tags SysIntegral
// @Summary 更新sysIntegral表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysIntegral true "更新sysIntegral表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /sysIntegral/updateSysIntegral [put]
export const updateSysIntegral = (data) => {
  return service({
    url: '/sysIntegral/updateSysIntegral',
    method: 'put',
    data
  })
}

// @Tags SysIntegral
// @Summary 用id查询sysIntegral表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SysIntegral true "用id查询sysIntegral表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /sysIntegral/findSysIntegral [get]
export const findSysIntegral = (params) => {
  return service({
    url: '/sysIntegral/findSysIntegral',
    method: 'get',
    params
  })
}

// @Tags SysIntegral
// @Summary 分页获取sysIntegral表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取sysIntegral表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /sysIntegral/getSysIntegralList [get]
export const getSysIntegralList = (params) => {
  return service({
    url: '/sysIntegral/getSysIntegralList',
    method: 'get',
    params
  })
}
