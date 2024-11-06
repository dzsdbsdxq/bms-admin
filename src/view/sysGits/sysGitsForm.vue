
<template>
  <div>
    <div class="gva-form-box">
      <el-form
        ref="elFormRef"
        :model="formData"
        label-position="right"
        :rules="rule"
        label-width="80px"
      >
        <el-form-item
          label="AccessToken:"
          prop="auth"
        >
          <el-input
            v-model="formData.auth"
            :clearable="true"
            placeholder="请输入AccessToken"
          />
        </el-form-item>
        <el-form-item
          label="分支名称:"
          prop="branch"
        >
          <el-input
            v-model="formData.branch"
            :clearable="true"
            placeholder="请输入分支名称"
          />
        </el-form-item>
        <el-form-item
          label="项目名称:"
          prop="name"
        >
          <el-input
            v-model="formData.name"
            :clearable="true"
            placeholder="请输入项目名称"
          />
        </el-form-item>
        <el-form-item
          label="操作符:"
          prop="operator"
        >
          <el-input
            v-model="formData.operator"
            :clearable="true"
            placeholder="请输入操作符"
          />
        </el-form-item>
        <el-form-item
          label="备注说明:"
          prop="remark"
        >
          <el-input
            v-model="formData.remark"
            :clearable="true"
            placeholder="请输入备注说明"
          />
        </el-form-item>
        <el-form-item
          label="git地址:"
          prop="url"
        >
          <el-input
            v-model="formData.url"
            :clearable="true"
            placeholder="请输入git地址"
          />
        </el-form-item>
        <el-form-item
          label="用户名:"
          prop="user"
        >
          <el-input
            v-model="formData.user"
            :clearable="true"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="save"
          >保存</el-button>
          <el-button
            type="primary"
            @click="back"
          >返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {
  createSysGits,
  updateSysGits,
  findSysGits
} from '@/api/sysGits'

defineOptions({
  name: 'SysGitsForm'
})

import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'

const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
  auth: '',
  branch: '',
  name: '',
  operator: '',
  remark: '',
  url: '',
  user: '',
})
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async() => {
  // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
  if (route.query.id) {
    const res = await findSysGits({ ID: route.query.id })
    if (res.code === 0) {
      formData.value = res.data.resysGits
      type.value = 'update'
    }
  } else {
    type.value = 'create'
  }
}

init()
// 保存按钮
const save = async() => {
  elFormRef.value?.validate(async(valid) => {
    if (!valid) return
    let res
    switch (type.value) {
      case 'create':
        res = await createSysGits(formData.value)
        break
      case 'update':
        res = await updateSysGits(formData.value)
        break
      default:
        res = await createSysGits(formData.value)
        break
    }
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '创建/更改成功'
      })
    }
  })
}

// 返回按钮
const back = () => {
  router.go(-1)
}

</script>

  <style>
  </style>
