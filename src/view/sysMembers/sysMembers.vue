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
          style="margin-left: 10px"
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
              style="justify-content: start"
              :pic-src="scope.row.headerImg"
            />
          </template>
        </el-table-column>
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
            >{{
              formatBoolean(scope.row.emailVerified)
            }}</el-tag>
            <el-tag
              v-else
              type="info"
            >{{
              formatBoolean(scope.row.emailVerified)
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="状态"
          width="120"
        >
          <template #default="scope">
            <el-tag
              v-if="scope.row.enable == 1"
              type="success"
            >正常</el-tag>
            <el-tag
              v-else
              type="danger"
            >冻结</el-tag>
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
          min-width="250"
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
            <el-dropdown>
              <el-button
                type="primary"
                link
                icon="menu"
              >更多</el-button>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>
                    <el-button
                      type="primary"
                      link
                      icon="lock"
                      @click="resetPasswordFunc(scope.row)"
                    >重置密码</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      type="primary"
                      link
                      icon="coin"
                      @click="updateScoreFunc(scope.row)"
                    >积分变更</el-button>
                  </el-dropdown-item>
                  <el-dropdown-item>
                    <el-button
                      type="primary"
                      link
                      icon="delete"
                      @click="deleteRow(scope.row)"
                    >删除</el-button>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
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
          <span class="text-lg">{{ type === "create" ? "添加" : "修改" }}</span>
          <div>
            <el-button
              type="primary"
              size="small"
              @click="enterDialog"
            >确 定</el-button>
            <el-button
              size="small"
              @click="closeDialog"
            >取 消</el-button>
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
          label="昵称:"
          prop="nickName"
        >
          <el-input
            v-model="formData.nickName"
            :clearable="true"
            placeholder="请输入昵称"
          />
        </el-form-item>
        <el-form-item
          label="用户头像:"
          prop="avatar"
        >
          <div
            style="display: inline-block"
            @click="openHeaderChange"
          >
            <img
              v-if="formData.avatar"
              alt="头像"
              class="header-img-box"
              :src="
                formData.avatar && formData.avatar.slice(0, 4) !== 'http'
                  ? path + formData.avatar
                  : formData.avatar
              "
            >
            <div
              v-else
              class="header-img-box"
            >从媒体库选择</div>
            <ChooseImg
              ref="chooseImg"
              :target="formData"
              :target-key="`avatar`"
            />
          </div>
        </el-form-item>
        <el-form-item
          label="性别:"
          prop="gender"
        >
          <el-switch
            v-model="formData.gender"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
            :active-text="`男`"
            :inactive-text="`女`"
            clearable
          />
        </el-form-item>
        <el-form-item
          label="年龄:"
          prop="age"
        >
          <el-input
            v-model="formData.age"
            type="number"
            :clearable="true"
            placeholder="请输入年龄"
          />
        </el-form-item>
        <el-form-item
          label="生日:"
          prop="birthday"
        >
          <el-date-picker
            v-model="formData.birthday"
            type="date"
            style="width: 100%"
            placeholder="选择日期"
            :clearable="true"
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
          label="用户是否被冻结:"
          prop="enable"
        >
          <el-switch
            v-model="formData.enable"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
            active-text="否"
            inactive-text="是"
            clearable
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
        <el-descriptions-item label="UID">
          {{ formData.ID }}
        </el-descriptions-item>
        <el-descriptions-item label="UUID">
          {{ formData.uuid }}
        </el-descriptions-item>
        <el-descriptions-item label="用户名">
          {{ formData.username }}
        </el-descriptions-item>
        <el-descriptions-item label="用户昵称">
          {{ formData.nickName }}
        </el-descriptions-item>
        <el-descriptions-item label="用户头像">
          <CustomPic
            style="justify-content: start"
            :pic-src="formData.avatar"
          />
        </el-descriptions-item>
        <el-descriptions-item label="性别">
          <el-tag
            v-if="formData.gender == 1"
            type="success"
          >男</el-tag>
          <el-tag
            v-else
            type="info"
          >女</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="年龄">
          {{ formData.age }}
        </el-descriptions-item>
        <el-descriptions-item label="生日">
          {{ formatDate(formData.birthday) }}
        </el-descriptions-item>
        <el-descriptions-item label="背景图">
          <CustomPic
            :pic-type="`img`"
            style="justify-content: start"
            :pic-src="formData.bgImage"
          />
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
          <el-tag
            v-if="formData.emailVerified == 1"
            type="success"
          >是</el-tag>
          <el-tag
            v-else
            type="danger"
          >否</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="用户是否被冻结">
          <el-tag
            v-if="formData.enable == 1"
            type="success"
          >正常</el-tag>
          <el-tag
            v-else
            type="danger"
          >冻结</el-tag>
        </el-descriptions-item>
      </el-descriptions>
    </el-drawer>
    <el-dialog
      v-model="dialogScoreVisible"
      :before-close="closeScoreDialog"
      :title="scoreForm.title"
      width="30%"
    >
      <el-form
        :inline="false"
        :model="scoreForm"
        label-width="80px"
      >
        <el-form-item label="操作类型">
          <el-radio-group v-model="scoreForm.optionType">
            <el-radio :value="1">增加</el-radio>
            <el-radio :value="2">减少</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="积分数量">
          <el-input
            v-model="scoreForm.scoreValue"
            autocomplete="off"
            type="number"
          />
        </el-form-item>
        <el-form-item label="描述">
          <el-input
            v-model="scoreForm.desc"
            type="textarea"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            size="small"
            @click="closeScoreDialog"
          >取 消</el-button>
          <el-button
            type="primary"
            size="small"
            @click="enterScoreSubmitFunc"
          >确 定</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  createSysMembers,
  deleteSysMembers,
  deleteSysMembersByIds,
  updateSysMembers,
  findSysMembers,
  getSysMembersList,
  resetMemberPassword,
  scoreUpdate
} from '@/api/sysMembers'
import CustomPic from '@/components/customPic/index.vue'
import ChooseImg from '@/components/chooseImg/index.vue'
// 全量引入格式化工具 请按需保留
import { formatDate, formatBoolean } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'

defineOptions({
  name: 'SysMembers',
})
// 积分变更弹框控制
const dialogScoreVisible = ref(false)

const scoreForm = ref({
  title: '',
  memberId: 0,
  optionType: 1, // 1=增加，2=减少
  scoreType: 'system', // 类型，系统操作
  scoreValue: 0, // 积分数量
  desc: '', // 描述
})
const updateScoreFunc = (row) => {
  scoreForm.value.title = `对用户【${row.username}】的积分变更`
  scoreForm.value.memberId = row.ID
  dialogScoreVisible.value = true
}
const closeScoreDialog = () => {
  scoreForm.value.title = ``
  scoreForm.value = {
    title: '',
    memberId: 0,
    optionType: 1,
    scoreType: 'system',
    scoreValue: 0,
    desc: '',
  }
  dialogScoreVisible.value = false
}
const enterScoreSubmitFunc = () => {
  ElMessageBox.confirm('确定要积分变更吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async() => {
    scoreForm.value.scoreValue = parseInt(scoreForm.value.scoreValue)
    const data = await scoreUpdate(scoreForm.value)
    console.log(data)
    if (data.code === 0) {
      ElMessage({
        type: 'success',
        message: '变更成功',
      })
      getTableData()
    } else {
      ElMessage({
        type: 'error',
        message: data.msg,
      })
    }
    // deleteSysMembersFunc(row)
  })
}

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  uuid: '',
  username: '',
  password: '',
  nickName: '',
  avatar: '',
  gender: 1,
  age: 0,
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
const rule = reactive({})

const searchRule = reactive({
  createdAt: [
    {
      validator: (rule, value, callback) => {
        if (searchInfo.value.startCreatedAt && !searchInfo.value.endCreatedAt) {
          callback(new Error('请填写结束日期'))
        } else if (!searchInfo.value.startCreatedAt && searchInfo.value.endCreatedAt) {
          callback(new Error('请填写开始日期'))
        } else if (
          searchInfo.value.startCreatedAt &&
          searchInfo.value.endCreatedAt &&
          (searchInfo.value.startCreael - dialogTime() ===
            searchInfo.value.endCreatedAt.getTime() ||
            searchInfo.value.startCreatedAt.getTime() >
              searchInfo.value.endCreatedAt.getTime())
        ) {
          callback(new Error('开始日期应当早于结束日期'))
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
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
  const table = await getSysMembersList({
    page: page.value,
    pageSize: pageSize.value,
    ...searchInfo.value,
  })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}

getTableData()

// ============== 表格控制部分结束 ===============

// 获取需要的字典 可能为空 按需保留
const setOptions = async() => {}

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
    type: 'warning',
  }).then(() => {
    deleteSysMembersFunc(row)
  })
}

// 多选删除
const onDelete = async() => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async() => {
    const IDs = []
    if (multipleSelection.value.length === 0) {
      ElMessage({
        type: 'warning',
        message: '请选择要删除的数据',
      })
      return
    }
    multipleSelection.value &&
      multipleSelection.value.map((item) => {
        IDs.push(item.ID)
      })
    const res = await deleteSysMembersByIds({ IDs })
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '删除成功',
      })
      if (tableData.value.length === IDs.length && page.value > 1) {
        page.value--
      }
      getTableData()
    }
  })
}
// 重置密码
const resetPasswordFunc = (row) => {
  ElMessageBox.confirm('是否将此用户密码重置为123456?', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async() => {
    const res = await resetMemberPassword({
      ID: row.ID,
    })
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: res.msg,
      })
    } else {
      ElMessage({
        type: 'error',
        message: res.msg,
      })
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
      message: '删除成功',
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
    gender: 1,
    age: 0,
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
    gender: 1,
    age: 0,
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
    formData.value.age = parseInt(formData.value.age)
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
        message: '创建/更改成功',
      })
      closeDialog()
      getTableData()
    }
  })
}
/** 头像上传 */
const chooseImg = ref(null)
const openHeaderChange = () => {
  chooseImg.value.open()
}
</script>

<style></style>
