<template>
  <div>
    <div class="gva-form-box">
      <el-form
        ref="cdnForm"
        label-position="right"
        label-width="100px"
        :model="form"
      >
        <el-form-item label="刷新地址：">
          <el-input v-model="form.url" />
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            @click="sendCdnUrl"
          >刷新</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>

</template>

<script setup>
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { createFlushCdnRecords } from '@/api/sysCdn'
defineOptions({
  name: 'Cdn',
})

const cdnForm = ref(null)
const form = reactive({
  url: '',
})
const sendCdnUrl = async() => {
  const res = await createFlushCdnRecords({ url: form.url })
  if (res.code === 0) {
    ElMessage.success('刷新成功')
  }
}
</script>

