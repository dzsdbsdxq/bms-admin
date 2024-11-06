<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="分发ID:" prop="appid">
          <el-input v-model="formData.appid" :clearable="true"  placeholder="请输入分发ID" />
       </el-form-item>
        <el-form-item label="名称:" prop="name">
          <el-input v-model="formData.name" :clearable="true"  placeholder="请输入名称" />
       </el-form-item>
        <el-form-item label="跳转类型:" prop="jumpType">
       </el-form-item>
        <el-form-item label="跳转值:" prop="jumpValue">
          <el-input v-model="formData.jumpValue" :clearable="true"  placeholder="请输入跳转值" />
       </el-form-item>
        <el-form-item label="查看数:" prop="views">
       </el-form-item>
        <el-form-item label="下载数:" prop="down">
       </el-form-item>
        <el-form-item label="状态:" prop="status">
          <el-switch v-model="formData.status" active-color="#13ce66" inactive-color="#ff4949" active-text="是" inactive-text="否" clearable ></el-switch>
       </el-form-item>
        <el-form-item label="类型:" prop="dType">
          <el-input v-model="formData.dType" :clearable="true"  placeholder="请输入类型" />
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
  createSysChannelDistribute,
  updateSysChannelDistribute,
  findSysChannelDistribute
} from '@/api/sysChannelDistribute'

defineOptions({
    name: 'SysChannelDistributeForm'
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
            appid: '',
            name: '',
            jumpValue: '',
            status: false,
            dType: '',
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findSysChannelDistribute({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.resysChannelDistribute
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
               res = await createSysChannelDistribute(formData.value)
               break
             case 'update':
               res = await updateSysChannelDistribute(formData.value)
               break
             default:
               res = await createSysChannelDistribute(formData.value)
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
