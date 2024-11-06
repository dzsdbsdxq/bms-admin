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
          label="唯一随机值:"
          prop="appid"
        >
          <el-input
            v-model="formData.appid"
            :clearable="true"
            placeholder="请输入唯一随机值"
          />
        </el-form-item>
        <el-form-item
          label="字典名（中）:"
          prop="name"
        >
          <el-input
            v-model="formData.name"
            :clearable="true"
            placeholder="请输入字典名（中）"
          />
        </el-form-item>
        <el-form-item
          label="字典名（英）:"
          prop="type"
        >
          <el-input
            v-model="formData.type"
            :clearable="true"
            placeholder="请输入字典名（英）"
          />
        </el-form-item>
        <el-form-item
          label="状态:"
          prop="status"
        >
          <el-switch
            v-model="formData.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="描述:"
          prop="desc"
        >
          <el-input
            v-model="formData.desc"
            :clearable="true"
            placeholder="请输入描述"
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
  createSysExtends,
  updateSysExtends,
  findSysExtends
} from '@/api/sysExtends'

defineOptions({
  name: 'SysExtendsForm'
})

// 自动获取字典
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'

const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
  appid: '',
  name: '',
  type: '',
  status: false,
  desc: '',
})
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async() => {
  // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
  if (route.query.id) {
    const res = await findSysExtends({ ID: route.query.id })
    if (res.code === 0) {
      formData.value = res.data.resysExtends
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
        res = await createSysExtends(formData.value)
        break
      case 'update':
        res = await updateSysExtends(formData.value)
        break
      default:
        res = await createSysExtends(formData.value)
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
