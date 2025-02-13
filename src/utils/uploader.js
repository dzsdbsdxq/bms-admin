export const Uploader = {
  data: {
    uploadFile: null
  },
  Request: ({ url, method = 'post', data, headers = {}, onprogress = e => e }) => {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      xhr.upload.onprogress = onprogress
      // 设置xhr请求的超时时间
      // xhr.timeout = 10000;
      xhr.open(method, url, true)
      Object.keys(headers).forEach(key => {
        xhr.setRequestHeader(key, headers[key])
      })
      // 注册相关事件回调处理函数
      xhr.onload = e => {
        if (e.target.status === 200) {
          resolve(e.target.response)
        }
      }
      xhr.ontimeout = e => {
        reject(e)
      }
      xhr.onerror = e => {
        reject(e)
      }
      xhr.send(data)
    })
  },
  UploadChunks: async(processCallback) => {
    const formData = new FormData()
    formData.append('file', Uploader.data.uploadFile)
    // formData.append('name', Uploader.data.uploadFile.filename)
    // 调用VMS视频上传接口进行素材上传
    return await Uploader.Request({
      url: 'https://vms.mp.sztv.com.cn/vms/servlet/BlUploadServlet?siteid=863&TenantID=ysz',
      data: formData,
      onprogress: (e) => processCallback(e)
      // onprogress: ( item ) => {
      //
      //     return e => {
      //
      //         item.percentage = parseInt(e.loaded / e.total * 100)
      //     }
      // }
    })
  },
  HandleChange: (event) => {
    Uploader.data.uploadFile = event.target.files[0]
    return Uploader
  },
  HandleUpload: async(processCallback) => {
    return await Uploader.UploadChunks(processCallback)
  },
}
