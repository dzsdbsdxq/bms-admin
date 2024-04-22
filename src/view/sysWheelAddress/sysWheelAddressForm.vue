<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="用户ID:" prop="memberId">
          <el-input v-model.number="formData.memberId" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="大转盘ID:" prop="wheelId">
          <el-input v-model.number="formData.wheelId" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="抽奖记录ID:" prop="wheelRecordsId">
          <el-input v-model.number="formData.wheelRecordsId" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="奖项ID:" prop="wheelPrizeId">
          <el-input v-model.number="formData.wheelPrizeId" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="用户名:" prop="name">
          <el-input v-model="formData.name" :clearable="true"  placeholder="请输入用户名" />
       </el-form-item>
        <el-form-item label="用户电话:" prop="phone">
          <el-input v-model="formData.phone" :clearable="true"  placeholder="请输入用户电话" />
       </el-form-item>
        <el-form-item label="用户地址:" prop="address">
          <el-input v-model="formData.address" :clearable="true"  placeholder="请输入用户地址" />
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
  createSysWheelAddress,
  updateSysWheelAddress,
  findSysWheelAddress
} from '@/api/sysWheelAddress'

defineOptions({
    name: 'SysWheelAddressForm'
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
            memberId: 0,
            wheelId: 0,
            wheelRecordsId: 0,
            wheelPrizeId: 0,
            name: '',
            phone: '',
            address: '',
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findSysWheelAddress({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.resysWheelAddress
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
               res = await createSysWheelAddress(formData.value)
               break
             case 'update':
               res = await updateSysWheelAddress(formData.value)
               break
             default:
               res = await createSysWheelAddress(formData.value)
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
