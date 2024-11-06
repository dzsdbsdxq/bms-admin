import service from '@/utils/request'

// @Tags SysExtends
// @Summary 创建sysExtends表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysExtends true "创建sysExtends表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /sysExtends/createSysExtends [post]
export const createSysExtends = (data) => {
  return service({
    url: '/sysExtends/createSysExtends',
    method: 'post',
    data
  })
}

// @Tags SysExtends
// @Summary 删除sysExtends表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysExtends true "删除sysExtends表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysExtends/deleteSysExtends [delete]
export const deleteSysExtends = (params) => {
  return service({
    url: '/sysExtends/deleteSysExtends',
    method: 'post',
    params
  })
}

// @Tags SysExtends
// @Summary 批量删除sysExtends表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除sysExtends表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysExtends/deleteSysExtends [delete]
export const deleteSysExtendsByIds = (params) => {
  return service({
    url: '/sysExtends/deleteSysExtendsByIds',
    method: 'post',
    params
  })
}

// @Tags SysExtends
// @Summary 更新sysExtends表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysExtends true "更新sysExtends表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /sysExtends/updateSysExtends [put]
export const updateSysExtends = (data) => {
  return service({
    url: '/sysExtends/updateSysExtends',
    method: 'post',
    data
  })
}

// @Tags SysExtends
// @Summary 用id查询sysExtends表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SysExtends true "用id查询sysExtends表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /sysExtends/findSysExtends [get]
export const findSysExtends = (params) => {
  return service({
    url: '/sysExtends/findSysExtends',
    method: 'get',
    params
  })
}

// @Tags SysExtends
// @Summary 分页获取sysExtends表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取sysExtends表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /sysExtends/getSysExtendsList [get]
export const getSysExtendsList = (params) => {
  return service({
    url: '/sysExtends/getSysExtendsList',
    method: 'get',
    params
  })
}
