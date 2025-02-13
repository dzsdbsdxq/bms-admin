<template>
  <div class="modal">
    <div class="modal-body">
      <el-upload
        class="upload"
        drag
        action="https://vms.mp.sztv.com.cn/vms/servlet/BlUploadServlet?siteid=863&TenantID=ysz"
        :before-upload="checkFile"
        :on-error="uploadError"
        :on-success="uploadSuccess"
      >
        <el-icon class="el-icon--upload">
          <span class="upload-area-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              width="340.531"
              height="419.116"
              viewBox="0 0 340.531 419.116"
            >
              <g
                id="files-new"
                clip-path="url(#clip-files-new)"
              >
                <path
                  id="Union_2"
                  data-name="Union 2"
                  d="M-2904.708-8.885A39.292,39.292,0,0,1-2944-48.177V-388.708A39.292,39.292,0,0,1-2904.708-428h209.558a13.1,13.1,0,0,1,9.3,3.8l78.584,78.584a13.1,13.1,0,0,1,3.8,9.3V-48.177a39.292,39.292,0,0,1-39.292,39.292Zm-13.1-379.823V-48.177a13.1,13.1,0,0,0,13.1,13.1h261.947a13.1,13.1,0,0,0,13.1-13.1V-323.221h-52.39a26.2,26.2,0,0,1-26.194-26.195v-52.39h-196.46A13.1,13.1,0,0,0-2917.805-388.708Zm146.5,241.621a14.269,14.269,0,0,1-7.883-12.758v-19.113h-68.841c-7.869,0-7.87-47.619,0-47.619h68.842v-18.8a14.271,14.271,0,0,1,7.882-12.758,14.239,14.239,0,0,1,14.925,1.354l57.019,42.764c.242.185.328.485.555.671a13.9,13.9,0,0,1,2.751,3.292,14.57,14.57,0,0,1,.984,1.454,14.114,14.114,0,0,1,1.411,5.987,14.006,14.006,0,0,1-1.411,5.973,14.653,14.653,0,0,1-.984,1.468,13.9,13.9,0,0,1-2.751,3.293c-.228.2-.313.485-.555.671l-57.019,42.764a14.26,14.26,0,0,1-8.558,2.847A14.326,14.326,0,0,1-2771.3-147.087Z"
                  transform="translate(2944 428)"
                  fill="var(--c-action-primary)"
                />
              </g>
            </svg>
          </span>
        </el-icon>
        <span class="upload-area-title">将文件拖到此处上传。</span>
        <span class="upload-area-description">
          或者，您可以单击此处选择一个文件 <br><strong>点击上传</strong>
        </span>
        <template #tip>
          <div class="el-upload__tip">
            请选择视频文件，最大不超过2GB
          </div>
        </template>
      </el-upload>
    </div>
    <div class="modal-footer">
      <button
        class="btn-secondary"
        @click="onCancel"
      >取消</button>
      <button
        class="btn-primary"
        @click="onConfirm"
      >确定</button>
    </div>
  </div>
</template>
<script setup name="UploadVideo">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { isVideoMime } from '@/utils/image'
const emit = defineEmits(['on-success', 'on-cancel'])

const fullscreenLoading = ref(false)
const videoData = ref({})

const checkFile = (file) => {
  fullscreenLoading.value = true
  const isLt5M = file.size / 1024 / 1024 / 1024 < 2 // 2GB, @todo 应支持项目中设置
  const isVideo = isVideoMime(file.type)
  let pass = true
  if (!isVideo) {
    ElMessage.error('上传图片只能是视频格式, 上传视频只能是 mp4,webm等格式!')
    fullscreenLoading.value = false
    pass = false
  }
  if (!isLt5M && isVideo) {
    ElMessage.error('上传视频大小不能超过2GB')
    fullscreenLoading.value = false
    pass = false
  }

  console.log('upload file check result: ', pass)

  return pass
}

const uploadSuccess = (res) => {
  const { state, data } = res
  console.log(state, data)
  if (state === 'true') {
    videoData.value = data[0]
    emit('on-success', { close: false, ...data[0] })
  }
}

const uploadError = () => {
  ElMessage({
    type: 'error',
    message: '上传失败'
  })
  fullscreenLoading.value = false
}
const onCancel = () => {
  emit('on-cancel')
}
const onConfirm = () => {
  emit('on-success', { close: true, ...videoData.value })
}
</script>
<style>
:root {
  --c-action-primary: #2e44ff;
  --c-action-primary-accent: #e9e5ff;
  --c-action-secondary: #e5e5e5;
  --c-text-primary: #0d0f21;
  --c-text-secondary: #6a6b76;
  --c-background-primary: #d0d1de;
}
</style>
<style scoped>
.modal {
  width: 100%;
  min-width: 500px;
  margin-left: auto;
  margin-right: auto;
  background-color: #FFF;
  border-radius: .5rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.modal-body {
  padding: 1rem 1.5rem;
}

.modal-title {
  font-weight: 700;
}

.modal-description {
  color: var(--c-text-secondary);
}

.upload-area {
  margin-top: 1.25rem;
  border: none;
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23ccc' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  background-color: transparent;
  padding: 3rem;
  width: 100%;
  display: -webkit-box;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
          flex-direction: column;
  -webkit-box-align: center;
          align-items: center;
}
.upload-area:hover, .upload-area:focus {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%232e44ff' stroke-width='3' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
}

.upload-area-icon {
  display: block;
  width: 2.25rem;
  height: 2.25rem;
}
.upload-area-icon svg {
  max-height: 100%;
  max-width: 100%;
}

.upload-area-title {
  margin-top: 1rem;
  display: block;
  font-weight: 700;
  color: var(--c-text-primary);
}

.upload-area-description {
  display: block;
  color: var(--c-text-secondary);
}
.upload-area-description strong {
  color: var(--c-action-primary);
  font-weight: 700;
}

.modal-footer {
  padding: 1rem 1.5rem 1.5rem;
  display: -webkit-box;
  display: flex;
  -webkit-box-pack: end;
          justify-content: flex-end;
}
.modal-footer [class*="btn-"] {
  margin-left: .75rem;
}

.btn-secondary, .btn-primary {
  padding: .5rem 1rem;
  font-weight: 500;
  border: 2px solid var(--c-action-secondary);
  border-radius: .25rem;
  background-color: transparent;
  cursor: pointer;
}

.btn-primary {
  color: #FFF;
  background-color: var(--c-action-primary);
  border-color: var(--c-action-primary);
  cursor: pointer;
}
</style>
