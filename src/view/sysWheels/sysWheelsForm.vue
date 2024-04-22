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
          label="大转盘名称:"
          prop="name"
        >
          <el-input
            v-model="formData.name"
            :clearable="true"
            placeholder="请输入大转盘名称"
          />
        </el-form-item>
        <el-form-item
          label="唯一UUID:"
          prop="uuid"
        >
          <el-input
            v-model="formData.uuid"
            :clearable="true"
            placeholder="请输入唯一UUID"
          />
        </el-form-item>
        <el-form-item
          label="所需积分:"
          prop="needScore"
        >
          <el-input
            v-model.number="formData.needScore"
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          label="状态:"
          prop="status"
        >
          <el-input
            v-model.number="formData.status"
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          label="模版目录名，空表示自定义模版:"
          prop="template"
        >
          <el-input
            v-model="formData.template"
            :clearable="true"
            placeholder="请输入模版目录名，空表示自定义模版"
          />
        </el-form-item>
        <el-form-item
          label="用户每日可抽次数，0表示不限次数:"
          prop="dayGetNum"
        >
          <el-input
            v-model.number="formData.dayGetNum"
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          label="抽奖算法（1=随机概率，根据奖品数量随机，2=根据自定义奖品概率）:"
          prop="algType"
        >
          <el-input
            v-model.number="formData.algType"
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          label="分享标题:"
          prop="shareTitle"
        >
          <el-input
            v-model="formData.shareTitle"
            :clearable="true"
            placeholder="请输入分享标题"
          />
        </el-form-item>
        <el-form-item
          label="分享标题:"
          prop="shareDesc"
        >
          <el-input
            v-model="formData.shareDesc"
            :clearable="true"
            placeholder="请输入分享标题"
          />
        </el-form-item>
        <el-form-item
          label="分享标题:"
          prop="shareImg"
        >
          <el-input
            v-model="formData.shareImg"
            :clearable="true"
            placeholder="请输入分享标题"
          />
        </el-form-item>
        <el-form-item
          label="页面元素:"
          prop="pageParams"
        >
          <el-input
            v-model="formData.pageParams"
            :clearable="true"
            placeholder="请输入页面元素"
          />
        </el-form-item>
        <el-form-item
          label="开始时间:"
          prop="startTime"
        >
          <el-date-picker
            v-model="formData.startTime"
            type="date"
            placeholder="选择日期"
            :clearable="true"
          />
        </el-form-item>
        <el-form-item
          label="结束时间:"
          prop="endTime"
        >
          <el-date-picker
            v-model="formData.endTime"
            type="date"
            placeholder="选择日期"
            :clearable="true"
          />
        </el-form-item>
        <el-form-item
          label="音频地址:"
          prop="voiceUrl"
        >
          <el-input
            v-model="formData.voiceUrl"
            :clearable="true"
            placeholder="请输入音频地址"
          />
        </el-form-item>
        <el-form-item
          label="转盘缩略图:"
          prop="thumbUrl"
        >
          <el-input
            v-model="formData.thumbUrl"
            :clearable="true"
            placeholder="请输入转盘缩略图"
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
  createSysWheels,
  updateSysWheels,
  findSysWheels
} from '@/api/sysWheels'

defineOptions({
  name: 'SysWheelsForm'
})

// 自动获取字典
// import { getDictFunc } from '@/utils/format'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'

const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
  name: '',
  uuid: '',
  needScore: 0,
  status: 0,
  template: '',
  dayGetNum: 0,
  algType: 0,
  shareTitle: '',
  shareDesc: '',
  shareImg: '',
  pageParams: '',
  startTime: new Date(),
  endTime: new Date(),
  voiceUrl: '',
  thumbUrl: '',
})
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async() => {
  // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
  if (route.query.id) {
    const res = await findSysWheels({ ID: route.query.id })
    if (res.code === 0) {
      formData.value = res.data.resysWheels
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
        res = await createSysWheels(formData.value)
        break
      case 'update':
        res = await updateSysWheels(formData.value)
        break
      default:
        res = await createSysWheels(formData.value)
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
