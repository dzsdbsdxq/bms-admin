<template>
  <div>
    <div class="gva-search-box">
      <el-form
        ref="elSearchFormRef"
        :inline="true"
        :model="searchInfo"
        class="demo-form-inline"
        :rules="searchRule"
        @keyup.enter="onSubmit"
      >
        <el-form-item
          label="手机号："
          prop="mobile"
        >
          <el-input
            v-model="searchInfo.mobile"
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
          label="用户ID"
          prop="ID"
          width="120"
        />
        <el-table-column
          align="left"
          label="头像"
          prop="headimgurl"
          width="80"
        >
          <template #default="scope">
            <CustomPic
              style="margin-top:8px"
              :pic-src="scope.row.headimgurl ? scope.row.headimgurl : defaultAvatar"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="电话号码"
          prop="mobile"
          width="120"
        />
        <el-table-column
          align="left"
          label="昵称"
          prop="nickname"
          width="120"
        />
        <el-table-column
          align="left"
          label="来源"
          prop="platform"
          width="120"
        >
          <template #default="scope">
            <el-tag
              effect="plain"
              type="success"
            >{{ scope.row.platform == 1 ? `微信`:`壹深圳` }}</el-tag></template>
        </el-table-column>
        <el-table-column
          align="left"
          label="国家"
          prop="country"
          width="120"
        >zh-CN
        </el-table-column>
        <el-table-column
          align="left"
          label="省份"
          prop="province"
          width="120"
        />

        <el-table-column
          align="left"
          label="城市"
          prop="city"
          width="120"
        />
        <el-table-column
          align="left"
          label="创建日期"
          width="180"
        >
          <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>
        <el-table-column
          align="left"
          label="最后登录时间"
          prop="lastlogin"
          width="180"
        >
          <template #default="scope">{{ formatDate(scope.row.lastlogin) }}</template>
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
              icon="edit"
              class="table-button"
              @click="updateSysVideoUsersFunc(scope.row)"
            >变更</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="gva-pagination">
        <el-pagination
          layout="total, sizes, prev, pager, next"
          :current-page="page"
          :page-size="pageSize"
          small
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
          label="自增ID:"
          prop="ID"
        >
          <el-input
            v-model="formData.ID"
            disabled
            readonly
          />
        </el-form-item>
        <el-form-item
          label="昵称:"
          prop="nickname"
        >
          <el-input
            v-model="formData.nickname"
            :clearable="true"
            placeholder="请输入昵称"
          />
        </el-form-item>
        <el-form-item
          label="头像:"
          prop="headimgurl"
        >
          <div
            style="display: inline-block;width: 120px;height: 120px;"
            @click="openHeaderChange"
          >
            <img
              v-if="formData.headimgurl"
              alt="头像"
              class="header-img-box"
              style="width:100%;height:100%;"
              :src="
                formData.headimgurl && formData.headimgurl.slice(0, 4) !== 'http'
                  ? path + formData.headimgurl
                  : formData.headimgurl
              "
            >
            <div
              v-else
              class="header-img-box"
            >从媒体库选择</div>
            <ChooseImg
              ref="chooseImg"
              :target="formData"
              :target-key="`headimgurl`"
            />
          </div>
          <el-input v-model="formData.headimgurl" />
        </el-form-item>
        <el-form-item
          label="电话号码:"
          prop="mobile"
        >
          <el-input
            v-model="formData.mobile"
            :clearable="true"
            placeholder="请输入电话号码"
          />
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
import {
  createSysVideoUsers,
  updateSysVideoUsers,
  findSysVideoUsers,
  getSysVideoUsersList
} from '@/api/sysVideoUsers'

// 全量引入格式化工具 请按需保留
import { formatDate } from '@/utils/format'
import { ElMessage } from 'element-plus'
import { ref, reactive } from 'vue'
import CustomPic from '@/components/customPic/index.vue'
import ChooseImg from '@/components/chooseImg/index.vue'
defineOptions({
  name: 'SysVideoUsers'
})
const defaultAvatar = 'https://avatar.mp.sztv.com.cn/default.jpg'
// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  city: '',
  country: '',
  eszuid: '',
  headimgurl: '',
  mobile: '',
  nickname: '',
  openid: '',
  partment: '',
  province: '',
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
const pageSize = ref(50)
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
  const table = await getSysVideoUsersList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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

// 行为控制标记（弹窗内部需要增还是改）
const type = ref('')

// 更新行
const updateSysVideoUsersFunc = async(row) => {
  const res = await findSysVideoUsers({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.resysVideoUsers
    formData.value.headimgurl = res.data.resysVideoUsers.headimgurl ? res.data.resysVideoUsers.headimgurl : defaultAvatar
    dialogFormVisible.value = true
  }
}

// 弹窗控制标记
const dialogFormVisible = ref(false)

// 关闭弹窗
const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = {
    city: '',
    country: '',
    eszuid: '',
    headimgurl: '',
    mobile: '',
    nickname: '',
    openid: '',
    partment: '',
    province: '',
  }
}
// 弹窗确定
const enterDialog = async() => {
  elFormRef.value?.validate(async(valid) => {
    if (!valid) return
    let res
    switch (type.value) {
      case 'create':
        res = await createSysVideoUsers(formData.value)
        break
      case 'update':
        res = await updateSysVideoUsers(formData.value)
        break
      default:
        res = await createSysVideoUsers(formData.value)
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

/** 头像上传 */
const chooseImg = ref(null)
const openHeaderChange = () => {
  chooseImg.value.open()
}

</script>

  <style>

  </style>
