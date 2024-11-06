<template>
  <div>
    <el-upload
      :action="`${path}/fileUploadAndDownload/upload?engine=${engine}`"
      :before-upload="checkFile"
      :on-error="uploadError"
      :on-success="uploadSuccess"
      :show-file-list="false"
      class="upload-btn"
    >
      <el-button
        size="small"
        :type="btnType"
      >{{ textTag }}</el-button>
    </el-upload>
  </div>
</template>

<script setup>

import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { isVideoMime, isImageMime } from '@/utils/image'

defineOptions({
  name: 'UploadCommon',
})
defineProps({
  textTag: {
    type: String,
    default: '腾讯COS上传'
  },
  btnType: {
    type: String,
    default: 'primary'
  },
  engine: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['on-success'])
const path = ref(import.meta.env.VITE_BASE_API)

const fullscreenLoading = ref(false)

const checkFile = (file) => {
  fullscreenLoading.value = true
  const isLt500K = file.size / 1024 / 1024 < 15 // 500K, @todo 应支持在项目中设置
  const isLt5M = file.size / 1024 / 1024 < 15 // 15MB, @todo 应支持项目中设置
  const isVideo = isVideoMime(file.type)
  const isImage = isImageMime(file.type)
  let pass = true
  if (!isVideo && !isImage) {
    ElMessage.error('上传图片只能是 jpg,png,svg,webp,gif 格式, 上传视频只能是 mp4,webm 格式!')
    fullscreenLoading.value = false
    pass = false
  }
  if (!isLt5M && isVideo) {
    ElMessage.error('上传视频大小不能超过 15MB')
    fullscreenLoading.value = false
    pass = false
  }
  if (!isLt500K && isImage) {
    ElMessage.error('未压缩的上传图片大小不能超过 500KB，请使用压缩上传')
    fullscreenLoading.value = false
    pass = false
  }

  console.log('upload file check result: ', pass)

  return pass
}

const uploadSuccess = (res) => {
  const { data } = res
  if (data.file) {
    emit('on-success', data.file.url)
  }
}

const uploadError = () => {
  ElMessage({
    type: 'error',
    message: '上传失败'
  })
  fullscreenLoading.value = false
}

</script>

