import service from '@/utils/request'

export const createSysShegong = (data) => {
  return service({
    url: '/sysShegong/createSysShegong',
    method: 'post',
    data
  })
}

// @Tags SysShegong
// @Summary 删除sysShegong表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysShegong true "删除sysShegong表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysShegong/deleteSysShegong [delete]
export const deleteSysShegong = (params) => {
  return service({
    url: '/sysShegong/deleteSysShegong',
    method: 'post',
    params
  })
}

// @Tags SysShegong
// @Summary 批量删除sysShegong表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除sysShegong表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysShegong/deleteSysShegong [delete]
export const deleteSysShegongByIds = (params) => {
  return service({
    url: '/sysShegong/deleteSysShegongByIds',
    method: 'post',
    params
  })
}

// @Tags SysShegong
// @Summary 更新sysShegong表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysShegong true "更新sysShegong表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /sysShegong/updateSysShegong [put]
export const updateSysShegong = (data) => {
  return service({
    url: '/sysShegong/updateSysShegong',
    method: 'post',
    data
  })
}

// @Tags SysShegong
// @Summary 用id查询sysShegong表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SysShegong true "用id查询sysShegong表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /sysShegong/findSysShegong [get]
export const findSysShegong = (params) => {
  return service({
    url: '/sysShegong/findSysShegong',
    method: 'get',
    params
  })
}

// @Tags SysShegong
// @Summary 分页获取sysShegong表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取sysShegong表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /sysShegong/getSysShegongList [get]
export const getSysShegongList = (params) => {
  return service({
    url: '/sysShegong/getSysShegongList',
    method: 'get',
    params
  })
}
