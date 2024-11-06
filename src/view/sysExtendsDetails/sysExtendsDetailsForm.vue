<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="展示值:" prop="label">
          <el-input v-model="formData.label" :clearable="true"  placeholder="请输入展示值" />
       </el-form-item>
        <el-form-item label="字典值:" prop="key">
          <el-input v-model="formData.key" :clearable="true"  placeholder="请输入字典值" />
       </el-form-item>
        <el-form-item label="扩展值:" prop="value">
          <el-input v-model="formData.value" :clearable="true"  placeholder="请输入扩展值" />
       </el-form-item>
        <el-form-item label="启用状态:" prop="status">
          <el-switch v-model="formData.status" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
       </el-form-item>
        <el-form-item label="排序标记:" prop="sort">
          <el-input v-model.number="formData.sort" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="关联标记ID:" prop="sysExtendsId">
          <el-input v-model.number="formData.sysExtendsId" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="关联标记Appid:" prop="appid">
          <el-input v-model="formData.appid" :clearable="true"  placeholder="请输入关联标记Appid" />
       </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="save">保存</el-button>
          <el-button type="primary" @click="back">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {
  createSysExtendsDetails,
  updateSysExtendsDetails,
  findSysExtendsDetails
} from '@/api/sysExtendsDetails'

defineOptions({
    name: 'SysExtendsDetailsForm'
})

// 自动获取字典
import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from "vue-router"
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'

const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
            label: '',
            key: '',
            value: '',
            status: false,
            sort: 0,
            sysExtendsId: 0,
            appid: '',
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findSysExtendsDetails({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.resysExtendsDetails
        type.value = 'update'
      }
    } else {
      type.value = 'create'
    }
}

init()
// 保存按钮
const save = async() => {
      elFormRef.value?.validate( async (valid) => {
         if (!valid) return
            let res
           switch (type.value) {
             case 'create':
               res = await createSysExtendsDetails(formData.value)
               break
             case 'update':
               res = await updateSysExtendsDetails(formData.value)
               break
             default:
               res = await createSysExtendsDetails(formData.value)
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
