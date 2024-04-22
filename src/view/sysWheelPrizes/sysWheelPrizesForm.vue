<template>
  <div>
    <div class="gva-form-box">
      <el-form :model="formData" ref="elFormRef" label-position="right" :rules="rule" label-width="80px">
        <el-form-item label="奖品名称:" prop="name">
          <el-input v-model="formData.name" :clearable="true"  placeholder="请输入奖品名称" />
       </el-form-item>
        <el-form-item label="大转盘ID:" prop="wheelId">
          <el-input v-model.number="formData.wheelId" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="唯一UUID:" prop="uuid">
          <el-input v-model="formData.uuid" :clearable="true"  placeholder="请输入唯一UUID" />
       </el-form-item>
        <el-form-item label="奖品图片:" prop="thumbUrl">
          <el-input v-model="formData.thumbUrl" :clearable="true"  placeholder="请输入奖品图片" />
       </el-form-item>
        <el-form-item label="奖品数量:" prop="nums">
          <el-input v-model.number="formData.nums" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="已抽数量:" prop="useNums">
          <el-input v-model.number="formData.useNums" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="奖品概率:" prop="perc">
          <el-input v-model.number="formData.perc" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="是否实物（0=否，1=是）:" prop="type">
          <el-input v-model.number="formData.type" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="实物是否需要填写地址（0=否，1=是）:" prop="needAddr">
          <el-input v-model.number="formData.needAddr" :clearable="true" placeholder="请输入" />
       </el-form-item>
        <el-form-item label="是否中奖:" prop="isHit">
          <el-input v-model.number="formData.isHit" :clearable="true" placeholder="请输入" />
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
  createSysWheelPrizes,
  updateSysWheelPrizes,
  findSysWheelPrizes
} from '@/api/sysWheelPrizes'

defineOptions({
    name: 'SysWheelPrizesForm'
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
            name: '',
            wheelId: 0,
            uuid: '',
            thumbUrl: '',
            nums: 0,
            useNums: 0,
            perc: 0,
            type: 0,
            needAddr: 0,
            isHit: 0,
        })
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async () => {
 // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (route.query.id) {
      const res = await findSysWheelPrizes({ ID: route.query.id })
      if (res.code === 0) {
        formData.value = res.data.resysWheelPrizes
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
               res = await createSysWheelPrizes(formData.value)
               break
             case 'update':
               res = await updateSysWheelPrizes(formData.value)
               break
             default:
               res = await createSysWheelPrizes(formData.value)
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
