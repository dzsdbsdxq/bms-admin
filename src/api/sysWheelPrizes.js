import service from '@/utils/request'

// @Tags SysWheelPrizes
// @Summary 创建sysWheelPrizes表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysWheelPrizes true "创建sysWheelPrizes表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /sysWheelPrizes/createSysWheelPrizes [post]
export const createSysWheelPrizes = (data) => {
  return service({
    url: '/sysWheelPrizes/createSysWheelPrizes',
    method: 'post',
    data
  })
}

// @Tags SysWheelPrizes
// @Summary 删除sysWheelPrizes表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysWheelPrizes true "删除sysWheelPrizes表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysWheelPrizes/deleteSysWheelPrizes [delete]
export const deleteSysWheelPrizes = (params) => {
  return service({
    url: '/sysWheelPrizes/deleteSysWheelPrizes',
    method: 'delete',
    params
  })
}

// @Tags SysWheelPrizes
// @Summary 批量删除sysWheelPrizes表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除sysWheelPrizes表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysWheelPrizes/deleteSysWheelPrizes [delete]
export const deleteSysWheelPrizesByIds = (params) => {
  return service({
    url: '/sysWheelPrizes/deleteSysWheelPrizesByIds',
    method: 'delete',
    params
  })
}

// @Tags SysWheelPrizes
// @Summary 更新sysWheelPrizes表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysWheelPrizes true "更新sysWheelPrizes表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /sysWheelPrizes/updateSysWheelPrizes [put]
export const updateSysWheelPrizes = (data) => {
  return service({
    url: '/sysWheelPrizes/updateSysWheelPrizes',
    method: 'put',
    data
  })
}

// @Tags SysWheelPrizes
// @Summary 用id查询sysWheelPrizes表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SysWheelPrizes true "用id查询sysWheelPrizes表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /sysWheelPrizes/findSysWheelPrizes [get]
export const findSysWheelPrizes = (params) => {
  return service({
    url: '/sysWheelPrizes/findSysWheelPrizes',
    method: 'get',
    params
  })
}

// @Tags SysWheelPrizes
// @Summary 分页获取sysWheelPrizes表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取sysWheelPrizes表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /sysWheelPrizes/getSysWheelPrizesList [get]
export const getSysWheelPrizesList = (params) => {
  return service({
    url: '/sysWheelPrizes/getSysWheelPrizesList',
    method: 'get',
    params
  })
}

