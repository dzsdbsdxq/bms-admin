import service from '@/utils/request'

// @Tags SysSnsRecords
// @Summary 创建sysSnsRecords表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysSnsRecords true "创建sysSnsRecords表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"创建成功"}"
// @Router /sysSnsRecords/createSysSnsRecords [post]
export const createSysSnsRecords = (data) => {
  return service({
    url: '/sysSnsRecords/createSysSnsRecords',
    method: 'post',
    data
  })
}

// @Tags SysSnsRecords
// @Summary 删除sysSnsRecords表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysSnsRecords true "删除sysSnsRecords表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysSnsRecords/deleteSysSnsRecords [delete]
export const deleteSysSnsRecords = (params) => {
  return service({
    url: '/sysSnsRecords/deleteSysSnsRecords',
    method: 'post',
    params
  })
}

// @Tags SysSnsRecords
// @Summary 批量删除sysSnsRecords表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body request.IdsReq true "批量删除sysSnsRecords表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"删除成功"}"
// @Router /sysSnsRecords/deleteSysSnsRecords [delete]
export const deleteSysSnsRecordsByIds = (params) => {
  return service({
    url: '/sysSnsRecords/deleteSysSnsRecordsByIds',
    method: 'post',
    params
  })
}

// @Tags SysSnsRecords
// @Summary 更新sysSnsRecords表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body model.SysSnsRecords true "更新sysSnsRecords表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"更新成功"}"
// @Router /sysSnsRecords/updateSysSnsRecords [put]
export const updateSysSnsRecords = (data) => {
  return service({
    url: '/sysSnsRecords/updateSysSnsRecords',
    method: 'post',
    data
  })
}

// @Tags SysSnsRecords
// @Summary 用id查询sysSnsRecords表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query model.SysSnsRecords true "用id查询sysSnsRecords表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"查询成功"}"
// @Router /sysSnsRecords/findSysSnsRecords [get]
export const findSysSnsRecords = (params) => {
  return service({
    url: '/sysSnsRecords/findSysSnsRecords',
    method: 'get',
    params
  })
}

// @Tags SysSnsRecords
// @Summary 分页获取sysSnsRecords表列表
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data query request.PageInfo true "分页获取sysSnsRecords表列表"
// @Success 200 {string} string "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /sysSnsRecords/getSysSnsRecordsList [get]
export const getSysSnsRecordsList = (params) => {
  return service({
    url: '/sysSnsRecords/getSysSnsRecordsList',
    method: 'get',
    params
  })
}
