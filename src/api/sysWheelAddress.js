import service from '@/utils/request'

// @Tags SysWheelAddress
// @Summary 创建sysWheelAddress表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysWheelAddress true "创建sysWheelAddress表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /sysWheelAddress/createSysWheelAddress [post]
export const createSysWheelAddress = (data) => {
  return service({
    url: '/sysWheelAddress/createSysWheelAddress',
    method: 'post',
    data
  })
}

// @Tags SysWheelAddress
// @Summary 删除sysWheelAddress表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysWheelAddress true "删除sysWheelAddress表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysWheelAddress/deleteSysWheelAddress [delete]
export const deleteSysWheelAddress = (params) => {
  return service({
    url: '/sysWheelAddress/deleteSysWheelAddress',
    method: 'delete',
    params
  })
}

// @Tags SysWheelAddress
// @Summary 批量删除sysWheelAddress表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除sysWheelAddress表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysWheelAddress/deleteSysWheelAddress [delete]
export const deleteSysWheelAddressByIds = (params) => {
  return service({
    url: '/sysWheelAddress/deleteSysWheelAddressByIds',
    method: 'delete',
    params
  })
}

// @Tags SysWheelAddress
// @Summary 更新sysWheelAddress表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysWheelAddress true "更新sysWheelAddress表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /sysWheelAddress/updateSysWheelAddress [put]
export const updateSysWheelAddress = (data) => {
  return service({
    url: '/sysWheelAddress/updateSysWheelAddress',
    method: 'put',
    data
  })
}

// @Tags SysWheelAddress
// @Summary 用id查询sysWheelAddress表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SysWheelAddress true "用id查询sysWheelAddress表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /sysWheelAddress/findSysWheelAddress [get]
export const findSysWheelAddress = (params) => {
  return service({
    url: '/sysWheelAddress/findSysWheelAddress',
    method: 'get',
    params
  })
}

// @Tags SysWheelAddress
// @Summary 分页获取sysWheelAddress表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取sysWheelAddress表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /sysWheelAddress/getSysWheelAddressList [get]
export const getSysWheelAddressList = (params) => {
  return service({
    url: '/sysWheelAddress/getSysWheelAddressList',
    method: 'get',
    params
  })
}
