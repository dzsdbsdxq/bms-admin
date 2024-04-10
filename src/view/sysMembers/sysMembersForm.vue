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
          label="用户UUID:"
          prop="uuid"
        >
          <el-input
            v-model="formData.uuid"
            :clearable="true"
            placeholder="请输入用户UUID"
          />
        </el-form-item>
        <el-form-item
          label="用户名:"
          prop="username"
        >
          <el-input
            v-model="formData.username"
            :clearable="true"
            placeholder="请输入用户名"
          />
        </el-form-item>
        <el-form-item
          label="用户密码:"
          prop="password"
        >
          <el-input
            v-model="formData.password"
            :clearable="true"
            placeholder="请输入用户密码"
          />
        </el-form-item>
        <el-form-item
          label="用户昵称:"
          prop="nickName"
        >
          <el-input
            v-model="formData.nickName"
            :clearable="true"
            placeholder="请输入用户昵称"
          />
        </el-form-item>
        <el-form-item
          label="用户头像:"
          prop="avatar"
        >
          <el-input
            v-model="formData.avatar"
            :clearable="true"
            placeholder="请输入用户头像"
          />
        </el-form-item>
        <el-form-item
          label="性别(1=男，2=女):"
          prop="gender"
        >
          <el-switch
            v-model="formData.gender"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="年龄:"
          prop="age"
        >
          <el-switch
            v-model="formData.age"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="生日:"
          prop="birthday"
        >
          <el-date-picker
            v-model="formData.birthday"
            type="date"
            placeholder="选择日期"
            :clearable="true"
          />
        </el-form-item>
        <el-form-item
          label="背景图:"
          prop="bgImage"
        >
          <el-input
            v-model="formData.bgImage"
            :clearable="true"
            placeholder="请输入背景图"
          />
        </el-form-item>
        <el-form-item
          label="openid:"
          prop="openid"
        >
          <el-input
            v-model="formData.openid"
            :clearable="true"
            placeholder="请输入openid"
          />
        </el-form-item>
        <el-form-item
          label="用户注册来源:"
          prop="platform"
        >
          <el-input
            v-model.number="formData.platform"
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          label="用户项目来源:"
          prop="project"
        >
          <el-input
            v-model="formData.project"
            :clearable="true"
            placeholder="请输入用户项目来源"
          />
        </el-form-item>
        <el-form-item
          label="积分:"
          prop="score"
        >
          <el-input
            v-model.number="formData.score"
            :clearable="true"
            placeholder="请输入"
          />
        </el-form-item>
        <el-form-item
          label="用户手机号:"
          prop="phone"
        >
          <el-input
            v-model="formData.phone"
            :clearable="true"
            placeholder="请输入用户手机号"
          />
        </el-form-item>
        <el-form-item
          label="用户邮箱:"
          prop="email"
        >
          <el-input
            v-model="formData.email"
            :clearable="true"
            placeholder="请输入用户邮箱"
          />
        </el-form-item>
        <el-form-item
          label="邮箱是否验证:"
          prop="emailVerified"
        >
          <el-switch
            v-model="formData.emailVerified"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="是"
            inactive-text="否"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="用户是否被冻结 1正常 2冻结:"
          prop="enable"
        >
          <el-input
            v-model.number="formData.enable"
            :clearable="true"
            placeholder="请输入"
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
  createSysMembers,
  updateSysMembers,
  findSysMembers
} from '@/api/sysMembers'

defineOptions({
  name: 'SysMembersForm'
})

import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'

const route = useRoute()
const router = useRouter()

const type = ref('')
const formData = ref({
  uuid: '',
  username: '',
  password: '',
  nickName: '',
  avatar: '',
  gender: false,
  age: false,
  birthday: new Date(),
  bgImage: '',
  openid: '',
  platform: 0,
  project: '',
  score: 0,
  phone: '',
  email: '',
  emailVerified: false,
  enable: 0,
})
// 验证规则
const rule = reactive({
})

const elFormRef = ref()

// 初始化方法
const init = async() => {
  // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
  if (route.query.id) {
    const res = await findSysMembers({ ID: route.query.id })
    if (res.code === 0) {
      formData.value = res.data.resysMembers
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
        res = await createSysMembers(formData.value)
        break
      case 'update':
        res = await updateSysMembers(formData.value)
        break
      default:
        res = await createSysMembers(formData.value)
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
