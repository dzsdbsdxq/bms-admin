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
          label="会员id:"
          prop="memberId"
        >
          <el-input
            v-model.number="formData.memberId"
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          label="适用规则ID:"
          prop="projectId"
        >
          <el-input
            v-model.number="formData.projectId"
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          label="积分类型:"
          prop="scoreType"
        >
          <el-input
            v-model="formData.scoreType"
            :clearable="true"
            placeholder="请输入积分类型"
          />
        </el-form-item>
        <el-form-item
          label="积分增或减,1=add,2=del:"
          prop="aors"
        >
          <el-input
            v-model.number="formData.aors"
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          label="分值:"
          prop="score"
        >
          <el-input
            v-model.number="formData.score"
            :clearable="true"
            placeholder="请输入"
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
  createSysIntegral,
  updateSysIntegral,
  findSysIntegral
} from '@/api/sysIntegral'

defineOptions({
  name: 'SysIntegralForm'
})

import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'

const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
  memberId: 0,
  projectId: 0,
  scoreType: '',
  aors: 0,
  score: 0,
  remark: '',
})
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async() => {
  // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
  if (route.query.id) {
    const res = await findSysIntegral({ ID: route.query.id })
    if (res.code === 0) {
      formData.value = res.data.resysIntegral
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
        res = await createSysIntegral(formData.value)
        break
      case 'update':
        res = await updateSysIntegral(formData.value)
        break
      default:
        res = await createSysIntegral(formData.value)
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
