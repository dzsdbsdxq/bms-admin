<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="用户ID:" prop="memberId">
          <el-input v-model.number="formData.memberId" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="冗余字段-奖品名称:" prop="name">
          <el-input v-model="formData.name" :clearable="true"  placeholder="请输入冗余字段-奖品名称" />
       </el-form-item>
        <el-form-item label="大转盘ID:" prop="wheelId">
          <el-input v-model.number="formData.wheelId" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="奖项ID:" prop="wheelPrizeId">
          <el-input v-model.number="formData.wheelPrizeId" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="是否实物（0=否，1=是）:" prop="type">
          <el-input v-model.number="formData.type" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="是否中奖:" prop="isHit">
          <el-input v-model.number="formData.isHit" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="是否兑换（核销）:" prop="exchange">
          <el-input v-model.number="formData.exchange" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="兑换时间:" prop="exchangeAt">
          <el-date-picker v-model="formData.exchangeAt" type="date" placeholder="选择日期" :clearable="true"></el-date-picker>
       </el-form-item>
        <el-form-item label="是否发货:" prop="delivery">
          <el-input v-model.number="formData.delivery" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="物流单号:" prop="expressId">
          <el-input v-model="formData.expressId" :clearable="true"  placeholder="请输入物流单号" />
       </el-form-item>
        <el-form-item label="发货时间:" prop="expressAt">
          <el-date-picker v-model="formData.expressAt" type="date" placeholder="选择日期" :clearable="true"></el-date-picker>
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
  createSysWheelRecords,
  updateSysWheelRecords,
  findSysWheelRecords
} from '@/api/sysWheelRecords'

defineOptions({
    name: 'SysWheelRecordsForm'
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
            name: '',
            wheelId: 0,
            wheelPrizeId: 0,
            type: 0,
            isHit: 0,
            exchange: 0,
            exchangeAt: new Date(),
            delivery: 0,
            expressId: '',
            expressAt: new Date(),
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findSysWheelRecords({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.resysWheelRecords
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
               res = await createSysWheelRecords(formData.value)
               break
             case 'update':
               res = await updateSysWheelRecords(formData.value)
               break
             default:
               res = await createSysWheelRecords(formData.value)
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
