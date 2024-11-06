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
        <el-form-item label="手机号">
          <el-input
            v-model="searchInfo.mobile"
            size="small"
            placeholder="搜索条件"
          />
        </el-form-item>
        <el-form-item label="请求方法">
          <el-select
            v-model="searchInfo.method"
            placeholder="选择请求方法"
            size="small"
          >
            <el-option
              v-for="item in methodOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
          label="手机号"
          prop="mobile"
          width="120"
        />
        <el-table-column
          align="left"
          label="请求方法"
          prop="method"
          width="120"
        />
        <el-table-column
          align="left"
          label="请求路径"
          prop="path"
          width="200"
        >
          <template #default="scope">
            <el-input
              v-model="scope.row.path"
              style="width: 240px"
              size="small"
              disabled
            />
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="请求状态"
          prop="status"
          width="120"
        >
          <template #default="scope">
            <el-tag :type="scope.row.status==200?`success`:`warning`">{{ scope.row.status }}</el-tag></template>
        </el-table-column>
        <el-table-column
          align="left"
          label="延迟"
          prop="latency"
          width="120"
        >
          <template #default="scope">
            <el-tag type="primary">{{ fmtDuration(scope.row.latency) }}秒</el-tag></template>
        </el-table-column>
        <el-table-column
          align="left"
          label="请求Body"
          prop="body"
          width="120"
        >
          <template #default="scope">
            <div>
              <el-popover
                v-if="scope.row.body"
                placement="left-start"
              >
                <div class="popover-box">
                  <pre>{{ fmtBody(scope.row.body) }}</pre>
                </div>
                <template #reference>
                  <el-icon style="cursor: pointer;"><warning /></el-icon>
                </template>
              </el-popover>

              <span v-else>无</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="响应Body"
          prop="resp"
          width="120"
        >
          <template #default="scope">
            <div>
              <el-popover
                v-if="scope.row.resp"
                placement="left-start"
              >
                <div class="popover-box">
                  <pre>{{ fmtBody(scope.row.resp) }}</pre>
                </div>
                <template #reference>
                  <el-icon style="cursor: pointer;"><warning /></el-icon>
                </template>
              </el-popover>
              <span v-else>无</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="日期"
          width="180"
        >
          <template #default="scope">{{ formatDate(scope.row.CreatedAt) }}</template>
        </el-table-column>
        <el-table-column
          align="left"
          label="操作"
          fixed="right"
          min-width="80"
        >
          <template #default="scope">
            <el-button
              type="primary"
              link
              icon="delete"
              size="small"
              @click="deleteRow(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="gva-pagination">
        <el-pagination
          layout="total, sizes, prev, pager, next"
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :total="total"
          small
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  deleteSysSnsRecords,
  deleteSysSnsRecordsByIds,
  getSysSnsRecordsList
} from '@/api/sysSnsRecords'

// 全量引入格式化工具 请按需保留
import { formatDate } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'

defineOptions({
  name: 'SysSnsRecords'
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

const elSearchFormRef = ref()

// =========== 表格控制部分 ===========
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})
const methodOptions = ref([
  {
    value: 'getValidateCode',
    label: '获取验证CODE',
  },
  {
    value: 'sendMessage',
    label: '发送验证码',
  },
  {
    value: 'authorize',
    label: '登录授权',
  },
  {
    value: 'getuserinfo',
    label: '申石信息',
  },
  {
    value: 'userdetail',
    label: '会员信息',
  },
])
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
  const table = await getSysSnsRecordsList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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

// 删除行
const deleteRow = (row) => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteSysSnsRecordsFunc(row)
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
    const res = await deleteSysSnsRecordsByIds({ IDs })
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

// 删除行
const deleteSysSnsRecordsFunc = async(row) => {
  const res = await deleteSysSnsRecords({ ID: row.ID })
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

const fmtBody = (value) => {
  try {
    return JSON.parse(value)
  } catch (err) {
    return value
  }
}
const fmtDuration = (value) => {
  const second = 1000000000
  const sec = value / second
  const nsec = value % second
  return parseFloat(sec) + parseFloat(nsec) / 1e9
}
</script>

<style lang="scss">
.popover-box {
  background: #112435;
  color: #f08047;
  height: 600px;
  width: 420px;
  overflow: auto;
}
.popover-box::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
