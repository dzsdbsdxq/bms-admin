import service from '@/utils/request'

export const createFlushCdnRecords = (data) => {
  return service({
    url: '/sysCdnRecords/createSysCdnRecords',
    method: 'post',
    data
  })
}
