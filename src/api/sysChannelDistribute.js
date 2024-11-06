import service from '@/utils/request'

// @Tags SysChannelDistribute
// @Summary 创建sysChannelDistribute表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysChannelDistribute true "创建sysChannelDistribute表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /sysChannelDistribute/createSysChannelDistribute [post]
export const createSysChannelDistribute = (data) => {
  return service({
    url: '/sysChannelDistribute/createSysChannelDistribute',
    method: 'post',
    data
  })
}

// @Tags SysChannelDistribute
// @Summary 删除sysChannelDistribute表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysChannelDistribute true "删除sysChannelDistribute表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysChannelDistribute/deleteSysChannelDistribute [delete]
export const deleteSysChannelDistribute = (params) => {
  return service({
    url: '/sysChannelDistribute/deleteSysChannelDistribute',
    method: 'post',
    params
  })
}

// @Tags SysChannelDistribute
// @Summary 批量删除sysChannelDistribute表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除sysChannelDistribute表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysChannelDistribute/deleteSysChannelDistribute [delete]
export const deleteSysChannelDistributeByIds = (params) => {
  return service({
    url: '/sysChannelDistribute/deleteSysChannelDistributeByIds',
    method: 'post',
    params
  })
}

// @Tags SysChannelDistribute
// @Summary 更新sysChannelDistribute表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysChannelDistribute true "更新sysChannelDistribute表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /sysChannelDistribute/updateSysChannelDistribute [put]
export const updateSysChannelDistribute = (data) => {
  return service({
    url: '/sysChannelDistribute/updateSysChannelDistribute',
    method: 'post',
    data
  })
}

// @Tags SysChannelDistribute
// @Summary 用id查询sysChannelDistribute表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SysChannelDistribute true "用id查询sysChannelDistribute表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /sysChannelDistribute/findSysChannelDistribute [get]
export const findSysChannelDistribute = (params) => {
  return service({
    url: '/sysChannelDistribute/findSysChannelDistribute',
    method: 'get',
    params
  })
}

// @Tags SysChannelDistribute
// @Summary 分页获取sysChannelDistribute表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取sysChannelDistribute表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /sysChannelDistribute/getSysChannelDistributeList [get]
export const getSysChannelDistributeList = (params) => {
  return service({
    url: '/sysChannelDistribute/getSysChannelDistributeList',
    method: 'get',
    params
  })
}
