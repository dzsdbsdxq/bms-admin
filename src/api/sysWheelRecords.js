import service from '@/utils/request'

// @Tags SysWheelRecords
// @Summary 创建sysWheelRecords表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysWheelRecords true "创建sysWheelRecords表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /sysWheelRecords/createSysWheelRecords [post]
export const createSysWheelRecords = (data) => {
  return service({
    url: '/sysWheelRecords/createSysWheelRecords',
    method: 'post',
    data
  })
}

// @Tags SysWheelRecords
// @Summary 删除sysWheelRecords表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysWheelRecords true "删除sysWheelRecords表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysWheelRecords/deleteSysWheelRecords [delete]
export const deleteSysWheelRecords = (params) => {
  return service({
    url: '/sysWheelRecords/deleteSysWheelRecords',
    method: 'delete',
    params
  })
}

// @Tags SysWheelRecords
// @Summary 批量删除sysWheelRecords表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除sysWheelRecords表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysWheelRecords/deleteSysWheelRecords [delete]
export const deleteSysWheelRecordsByIds = (params) => {
  return service({
    url: '/sysWheelRecords/deleteSysWheelRecordsByIds',
    method: 'delete',
    params
  })
}

// @Tags SysWheelRecords
// @Summary 更新sysWheelRecords表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysWheelRecords true "更新sysWheelRecords表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /sysWheelRecords/updateSysWheelRecords [put]
export const updateSysWheelRecords = (data) => {
  return service({
    url: '/sysWheelRecords/updateSysWheelRecords',
    method: 'put',
    data
  })
}

// @Tags SysWheelRecords
// @Summary 用id查询sysWheelRecords表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SysWheelRecords true "用id查询sysWheelRecords表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /sysWheelRecords/findSysWheelRecords [get]
export const findSysWheelRecords = (params) => {
  return service({
    url: '/sysWheelRecords/findSysWheelRecords',
    method: 'get',
    params
  })
}

// @Tags SysWheelRecords
// @Summary 分页获取sysWheelRecords表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取sysWheelRecords表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /sysWheelRecords/getSysWheelRecordsList [get]
export const getSysWheelRecordsList = (params) => {
  return service({
    url: '/sysWheelRecords/getSysWheelRecordsList',
    method: 'get',
    params
  })
}
