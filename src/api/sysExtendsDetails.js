import service from '@/utils/request'

// @Tags SysExtendsDetails
// @Summary 创建sysExtendsDetails表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysExtendsDetails true "创建sysExtendsDetails表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /sysExtendsDetails/createSysExtendsDetails [post]
export const createSysExtendsDetails = (data) => {
  return service({
    url: '/sysExtendsDetails/createSysExtendsDetails',
    method: 'post',
    data
  })
}

// @Tags SysExtendsDetails
// @Summary 删除sysExtendsDetails表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysExtendsDetails true "删除sysExtendsDetails表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysExtendsDetails/deleteSysExtendsDetails [delete]
export const deleteSysExtendsDetails = (params) => {
  return service({
    url: '/sysExtendsDetails/deleteSysExtendsDetails',
    method: 'post',
    params
  })
}

// @Tags SysExtendsDetails
// @Summary 批量删除sysExtendsDetails表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除sysExtendsDetails表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysExtendsDetails/deleteSysExtendsDetails [delete]
export const deleteSysExtendsDetailsByIds = (params) => {
  return service({
    url: '/sysExtendsDetails/deleteSysExtendsDetailsByIds',
    method: 'post',
    params
  })
}

// @Tags SysExtendsDetails
// @Summary 更新sysExtendsDetails表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysExtendsDetails true "更新sysExtendsDetails表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /sysExtendsDetails/updateSysExtendsDetails [put]
export const updateSysExtendsDetails = (data) => {
  return service({
    url: '/sysExtendsDetails/updateSysExtendsDetails',
    method: 'post',
    data
  })
}

// @Tags SysExtendsDetails
// @Summary 用id查询sysExtendsDetails表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SysExtendsDetails true "用id查询sysExtendsDetails表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /sysExtendsDetails/findSysExtendsDetails [get]
export const findSysExtendsDetails = (params) => {
  return service({
    url: '/sysExtendsDetails/findSysExtendsDetails',
    method: 'get',
    params
  })
}

// @Tags SysExtendsDetails
// @Summary 分页获取sysExtendsDetails表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取sysExtendsDetails表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /sysExtendsDetails/getSysExtendsDetailsList [get]
export const getSysExtendsDetailsList = (params) => {
  return service({
    url: '/sysExtendsDetails/getSysExtendsDetailsList',
    method: 'get',
    params
  })
}
