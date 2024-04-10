<template>
  <div>
    <div class="gva-search-box">
      <el-form
        ref="elSearchFormRef"
        :inline="true"
        :flexible="true"
        :show-overflow-tooltip="true"
        :model="searchInfo"
        :rules="searchRule"
        @keyup.enter="onSubmit"
      >
        <el-form-item label="用户名">
          <el-input
            v-model="searchInfo.username"
            size="small"
            placeholder="用户名"
          />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input
            v-model="searchInfo.phone"
            size="small"
            placeholder="手机号"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="search"
            size="small"
            @click="onSubmit"
          >查询</el-button>
          <el-button
            icon="refresh"
            size="small"
            @click="onReset"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button
          type="primary"
          icon="plus"
          size="small"
          @click="openDialog"
        >新增</el-button>
        <el-button
          icon="delete"
          style="margin-left: 10px;"
          size="small"
          :disabled="!multipleSelection.length"
          @click="onDelete"
        >删除</el-button>
      </div>
      <el-table
        ref="multipleTable"
        style="width: 100%"
        tooltip-effect="dark"
        :data="tableData"
        row-key="ID"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          align="left"
          label="UID"
          prop="ID"
          width="70"
        />
        <el-table-column
          align="left"
          label="用户名"
          prop="username"
          width="120"
        />
        <el-table-column
          align="left"
          label="用户昵称"
          :show-overflow-tooltip="true"
          prop="nickName"
          width="120"
        />
        <el-table-column
          align="left"
          label="用户头像"
          width="120"
        >
          <template #default="scope">
            <CustomPic
              style="justify-content: start;"
              :pic-src="scope.row.headerImg"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="性别"
          width="120"
        >
          <template #default="scope">
            <el-tag
              v-if="scope.row.gender == 1"
              type="success"
            >男</el-tag>
            <el-tag
              v-else
              type="info"
            >女</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="年龄"
          prop="age"
          width="80"
        />
        <el-table-column
          align="left"
          label="openid"
          prop="openid"
          :show-overflow-tooltip="true"
          width="120"
        />
        <el-table-column
          align="left"
          label="积分"
          prop="score"
          width="120"
        />
        <el-table-column
          align="left"
          label="手机号"
          prop="phone"
          width="120"
        />
        <el-table-column
          align="left"
          label="邮箱"
          prop="email"
          width="150"
        />
        <el-table-column
          align="left"
          label="邮箱验证"
          prop="emailVerified"
          width="120"
        >
          <template #default="scope">
            <el-tag
              v-if="scope.row.emailVerified"
              type="success"
            >{{ formatBoolean(scope.row.emailVerified) }}</el-tag>
            <el-tag
              v-else
              type="info"
            >{{ formatBoolean(scope.row.emailVerified) }}</el-tag>

          </template>
        </el-table-column>
        <el-table-column
          label="启用"
          width="120"
        >
          <template #default="scope">
            <el-switch
              v-model="scope.row.enable"
              inline-prompt
              :active-value="1"
              :inactive-value="2"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="注册时间"
          width="180"
        >
          <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>
        <el-table-column
          align="left"
          label="操作"
          fixed="right"
          min-width="240"
        >
          <template #default="scope">
            <el-button
              type="primary"
              link
              class="table-button"
              @click="getDetails(scope.row)"
            >
              <el-icon style="margin-right: 5px"><InfoFilled /></el-icon>
              查看详情
            </el-button>
            <el-button
              type="primary"
              link
              icon="edit"
              class="table-button"
              @click="updateSysMembersFunc(scope.row)"
            >变更</el-button>
            <el-button
              type="primary"
              link
              icon="delete"
              @click="deleteRow(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="gva-pagination">
        <el-pagination
          layout="total, sizes, prev, pager, next"
          small
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <el-drawer
      v-model="dialogFormVisible"
      size="800"
      :show-close="false"
      :before-close="closeDialog"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-lg">{{ type==='create'?'添加':'修改' }}</span>
          <div>
            <el-button
              type="primary"
              @click="enterDialog"
            >确 定</el-button>
            <el-button @click="closeDialog">取 消</el-button>
          </div>
        </div>
      </template>

      <el-form
        ref="elFormRef"
        :model="formData"
        label-position="top"
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
            style="width:100%"
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
            placeholder="请输入用户注册来源"
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
            placeholder="请输入积分"
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
            placeholder="请输入用户是否被冻结 1正常 2冻结"
          />
        </el-form-item>
      </el-form>
    </el-drawer>

    <el-drawer
      v-model="detailShow"
      size="800"
      :before-close="closeDetailShow"
      title="查看详情"
      destroy-on-close
    >
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-lg">查看详情</span>
        </div>
      </template>
      <el-descriptions
        :column="1"
        border
      >
        <el-descriptions-item label="用户UUID">
          {{ formData.uuid }}
        </el-descriptions-item>
        <el-descriptions-item label="用户名">
          {{ formData.username }}
        </el-descriptions-item>
        <el-descriptions-item label="用户密码">
          {{ formData.password }}
        </el-descriptions-item>
        <el-descriptions-item label="用户昵称">
          {{ formData.nickName }}
        </el-descriptions-item>
        <el-descriptions-item label="用户头像">
          {{ formData.avatar }}
        </el-descriptions-item>
        <el-descriptions-item label="性别(1=男，2=女)">
          {{ formatBoolean(formData.gender) }}
        </el-descriptions-item>
        <el-descriptions-item label="年龄">
          {{ formatBoolean(formData.age) }}
        </el-descriptions-item>
        <el-descriptions-item label="生日">
          {{ formatDate(formData.birthday) }}
        </el-descriptions-item>
        <el-descriptions-item label="背景图">
          {{ formData.bgImage }}
        </el-descriptions-item>
        <el-descriptions-item label="openid">
          {{ formData.openid }}
        </el-descriptions-item>
        <el-descriptions-item label="用户注册来源">
          {{ formData.platform }}
        </el-descriptions-item>
        <el-descriptions-item label="用户项目来源">
          {{ formData.project }}
        </el-descriptions-item>
        <el-descriptions-item label="积分">
          {{ formData.score }}
        </el-descriptions-item>
        <el-descriptions-item label="用户手机号">
          {{ formData.phone }}
        </el-descriptions-item>
        <el-descriptions-item label="用户邮箱">
          {{ formData.email }}
        </el-descriptions-item>
        <el-descriptions-item label="邮箱是否验证">
          {{ formatBoolean(formData.emailVerified) }}
        </el-descriptions-item>
        <el-descriptions-item label="用户是否被冻结 1正常 2冻结">
          {{ formData.enable }}
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
  </div>
</template>

<script setup>
import {
  createSysMembers,
  deleteSysMembers,
  deleteSysMembersByIds,
  updateSysMembers,
  findSysMembers,
  getSysMembersList
} from '@/api/sysMembers'
import CustomPic from '@/components/customPic/index.vue'
// 全量引入格式化工具 请按需保留
import { formatDate, formatBoolean } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'

defineOptions({
  name: 'SysMembers'
})

// 自动化生成的字典（可能为空）以及字段
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
  enable: 1,
})

// 验证规则
const rule = reactive({
})

const searchRule = reactive({
  createdAt: [
    { validator: (rule, value, callback) => {
      if (searchInfo.value.startCreatedAt && !searchInfo.value.endCreatedAt) {
        callback(new Error('请填写结束日期'))
      } else if (!searchInfo.value.startCreatedAt && searchInfo.value.endCreatedAt) {
        callback(new Error('请填写开始日期'))
      } else if (searchInfo.value.startCreatedAt && searchInfo.value.endCreatedAt && (searchInfo.value.startCreatedAt.getTime() === searchInfo.value.endCreatedAt.getTime() || searchInfo.value.startCreatedAt.getTime() > searchInfo.value.endCreatedAt.getTime())) {
        callback(new Error('开始日期应当早于结束日期'))
      } else {
        callback()
      }
    }, trigger: 'change' }
  ],
})

const elFormRef = ref()
const elSearchFormRef = ref()

// =========== 表格控制部分 ===========
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})

// 重置
const onReset = () => {
  searchInfo.value = {}
  getTableData()
}

// 搜索
const onSubmit = () => {
  elSearchFormRef.value?.validate(async(valid) => {
    if (!valid) return
    page.value = 1
    pageSize.value = 10
    if (searchInfo.value.gender === '') {
      searchInfo.value.gender = null
    }
    if (searchInfo.value.age === '') {
      searchInfo.value.age = null
    }
    if (searchInfo.value.emailVerified === '') {
      searchInfo.value.emailVerified = null
    }
    getTableData()
  })
}

// 分页
const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

// 修改页面容量
const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

// 查询
const getTableData = async() => {
  const table = await getSysMembersList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
  if (table.code === 0) {
    console.log(table.data.list)
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData()

// ============== 表格控制部分结束 ===============

// 获取需要的字典 可能为空 按需保留
const setOptions = async() => {
}

// 获取需要的字典 可能为空 按需保留
setOptions()

// 多选数据
const multipleSelection = ref([])
// 多选
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}

// 删除行
const deleteRow = (row) => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteSysMembersFunc(row)
  })
}

// 多选删除
const onDelete = async() => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async() => {
    const IDs = []
    if (multipleSelection.value.length === 0) {
      ElMessage({
        type: 'warning',
        message: '请选择要删除的数据'
      })
      return
    }
    multipleSelection.value &&
        multipleSelection.value.map(item => {
          IDs.push(item.ID)
        })
    const res = await deleteSysMembersByIds({ IDs })
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
      if (tableData.value.length === IDs.length && page.value > 1) {
        page.value--
      }
      getTableData()
    }
  })
}

// 行为控制标记（弹窗内部需要增还是改）
const type = ref('')

// 更新行
const updateSysMembersFunc = async(row) => {
  const res = await findSysMembers({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.resysMembers
    dialogFormVisible.value = true
  }
}

// 删除行
const deleteSysMembersFunc = async(row) => {
  const res = await deleteSysMembers({ ID: row.ID })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    if (tableData.value.length === 1 && page.value > 1) {
      page.value--
    }
    getTableData()
  }
}

// 弹窗控制标记
const dialogFormVisible = ref(false)

// 查看详情控制标记
const detailShow = ref(false)

// 打开详情弹窗
const openDetailShow = () => {
  detailShow.value = true
}

// 打开详情
const getDetails = async(row) => {
  // 打开弹窗
  const res = await findSysMembers({ ID: row.ID })
  if (res.code === 0) {
    formData.value = res.data.resysMembers
    openDetailShow()
  }
}

// 关闭详情弹窗
const closeDetailShow = () => {
  detailShow.value = false
  formData.value = {
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
  }
}

// 打开弹窗
const openDialog = () => {
  type.value = 'create'
  dialogFormVisible.value = true
}

// 关闭弹窗
const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = {
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
  }
}
// 弹窗确定
const enterDialog = async() => {
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
      closeDialog()
      getTableData()
    }
  })
}

</script>

<style>

</style>
