<template>
  <div>
    <warning-bar
      title="获取字典且缓存方法已在前端utils/dictionary 已经封装完成 不必自己书写 使用方法查看文件内注释"
    />
    <div class="flex gap-4 dict-box">
      <div class="w-64 p-4 bg-white">
        <div class="flex items-center justify-between">
          <span class="font-bold text">字典列表</span>
          <el-button
            size="small"
            type="primary"
            @click="openDialog"
          >
            新增
          </el-button>
        </div>
        <el-scrollbar
          class="mt-4"
          style="height: calc(100vh - 300px)"
        >
          <div
            v-for="dictionary in dictionaryData"
            :key="dictionary.ID"
            class="flex items-center justify-between px-2 py-4 mt-2 rounded cursor-pointer hover:bg-blue-50 hover:text-gray-800 group bg-gray-50"
            :class="selectID === dictionary.ID && 'active'"
            @click="toDetail(dictionary)"
          >
            <span class="max-w-[160px] truncate">{{ dictionary.name }}</span>
            <div>
              <el-icon
                class="group-hover:text-blue-500"
                :class="selectID === dictionary.ID ? 'text-white-800':'text-blue-500'"
                @click.stop="updateSysDictionaryFunc(dictionary)"
              >
                <Edit />
              </el-icon>
              <el-icon
                class="ml-2 group-hover:text-red-500"
                :class="selectID === dictionary.ID ? 'text-white-800':'text-red-500'"
                @click="deleteSysDictionaryFunc(dictionary)"
              >
                <Delete />
              </el-icon>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div class="flex-1 bg-white">
        <sysDictionaryDetail :sys-dictionary-i-d="selectID" />
      </div>
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      :before-close="closeDialog"
      :title="type==='create'?'添加字典':'修改字典'"
    >
      <el-form
        ref="dialogForm"
        :model="formData"
        :rules="rules"
        label-width="110px"
      >
        <el-form-item
          label="字典名（中）"
          prop="name"
        >
          <el-input
            v-model="formData.name"
            placeholder="请输入字典名（中）"
            clearable
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item
          label="字典名（英）"
          prop="type"
        >
          <el-input
            v-model="formData.type"
            placeholder="请输入字典名（英）"
            clearable
            :style="{ width: '100%' }"
          />
        </el-form-item>
        <el-form-item
          label="状态"
          prop="status"
          required
        >
          <el-switch
            v-model="formData.status"
            active-text="开启"
            inactive-text="停用"
          />
        </el-form-item>
        <el-form-item
          label="描述"
          prop="desc"
        >
          <el-input
            v-model="formData.desc"
            placeholder="请输入描述"
            clearable
            :style="{ width: '100%' }"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            size="small"
            @click="closeDialog"
          >取 消</el-button>
          <el-button
            size="small"
            type="primary"
            @click="enterDialog"
          >确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  createSysDictionary,
  deleteSysDictionary,
  updateSysDictionary,
  findSysDictionary,
  getSysDictionaryList,
} from '@/api/sysDictionary' // 此处请自行替换地址
import WarningBar from '@/components/warningBar/warningBar.vue'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

import sysDictionaryDetail from './sysDictionaryDetail.vue'
import { Edit } from '@element-plus/icons-vue'

defineOptions({
  name: 'SysDictionary',
})

const selectID = ref(1)

const formData = ref({
  name: null,
  type: null,
  status: true,
  desc: null,
})
const rules = ref({
  name: [
    {
      required: true,
      message: '请输入字典名（中）',
      trigger: 'blur',
    },
  ],
  type: [
    {
      required: true,
      message: '请输入字典名（英）',
      trigger: 'blur',
    },
  ],
  desc: [
    {
      required: true,
      message: '请输入描述',
      trigger: 'blur',
    },
  ],
})

const dictionaryData = ref([])

// 查询
const getTableData = async() => {
  const res = await getSysDictionaryList()
  if (res.code === 0) {
    dictionaryData.value = res.data
  }
}

getTableData()

const toDetail = (row) => {
  selectID.value = row.ID
}

const dialogFormVisible = ref(false)
const type = ref('')
const updateSysDictionaryFunc = async(row) => {
  const res = await findSysDictionary({ ID: row.ID, status: row.status })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.resysDictionary
    dialogFormVisible.value = true
  }
}
const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = {
    name: null,
    type: null,
    status: true,
    desc: null,
  }
}
const deleteSysDictionaryFunc = async(row) => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async() => {
    const res = await deleteSysDictionary({ ID: row.ID })
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      getTableData()
    }
  })
}

const dialogForm = ref(null)
const enterDialog = async() => {
  dialogForm.value.validate(async(valid) => {
    if (!valid) return
    let res
    switch (type.value) {
      case 'create':
        res = await createSysDictionary(formData.value)
        break
      case 'update':
        res = await updateSysDictionary(formData.value)
        break
      default:
        res = await createSysDictionary(formData.value)
        break
    }
    if (res.code === 0) {
      ElMessage.success('操作成功')
      closeDialog()
      getTableData()
    }
  })
}
const openDialog = () => {
  type.value = 'create'
  dialogFormVisible.value = true
}
</script>

<style>
.dict-box{
  height: calc(100vh - 240px);
}
.active {
  background-color: var(--el-color-primary) !important;
  color: #fff;
}
</style>
