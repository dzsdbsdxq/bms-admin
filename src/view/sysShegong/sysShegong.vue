<template>
  <div>
    <div class="gva-search-box">
      <el-form
        ref="elSearchFormRef"
        :inline="true"
        :model="searchInfo"
        class="demo-form-inline"
        @keyup.enter="onSubmit"
      >
        <el-form-item
          label=""
          style="float:right;"
        >
          <el-select
            v-model="columnValue"
            size="small"
            multiple
            default-first-option
            :reserve-keyword="false"
            placeholder="显示额外栏目"
            style="width: 250px"
            @change="changeColumnValueFunc"
          >
            <el-option
              v-for="item in columnOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="分发ID"
          prop="appId"
        >
          <el-input
            v-model="searchInfo.appid"
            placeholder="分发ID"
            clearable
            size="small"
          /></el-form-item>
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
        </el-form-item></el-form>
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
          :disabled="!multipleSelection.length"
          size="small"
          @click="onDelete"
        >删除</el-button>
        <el-button
          type="warning"
          icon="download"
          style="margin-left: 10px;"
          size="small"
          @click="onExport"
        >导出</el-button>
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
          label="分发ID"
          prop="appid"
          width="120"
        />
        <el-table-column
          align="left"
          label="渠道"
          prop="name"
          width="320"
        />
        <el-table-column
          align="left"
          label="二维码"
          prop="qrCode"
          width="220"
        >
          <template #default="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.qrCode"
              :preview-src-list="[scope.row.qrCode]"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-if="columnParams.views"
          align="left"
          label="查看数"
          prop="views"
          width="120"
        />
        <el-table-column
          v-if="columnParams.scans"
          align="left"
          label="扫码数"
          prop="scan"
          width="120"
        />
        <el-table-column
          v-if="columnParams.logins"
          align="left"
          label="登录数"
          prop="logins"
          width="120"
        />
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
          min-width="240"
        >
          <template #default="scope">
            <el-button
              type="primary"
              link
              icon="Document"
              class="table-button"
              @click="createH5LinkDialog(scope.row)"
            >二维码</el-button>
            <el-button
              type="primary"
              link
              icon="edit"
              class="table-button"
              @click="updateSysShegongFunc(scope.row)"
            >变更</el-button>
            <el-button
              type="primary"
              link
              icon="download"
              class="table-button"
              @click="exportDetailFunc(scope.row)"
            >导出</el-button>
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
    <el-dialog
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
        label-width="80px"
      >
        <el-form-item
          label="分发ID:"
          prop="appid"
        >
          <el-input
            v-model="formData.appid"
            :clearable="true"
            placeholder="请输入分发ID"
          />
        </el-form-item>
        <el-form-item
          label="渠道:"
          prop="name"
        >
          <el-input
            v-model="formData.name"
            :clearable="true"
            placeholder="请输入渠道"
          />
        </el-form-item>
        <el-form-item
          label="二维码:"
          prop="qrCode"
        >
          <template #label>
            <div class="flex items-center justify-between">
              <span>图标:</span>
              <el-button
                type="info"
                icon="plus"
                size="small"
                @click="openThumbChange"
              >媒体库</el-button>
              <ChooseImg
                ref="chooseThumbUrl"
                :target="formData"
                :target-key="`qrCode`"
              />
            </div>
          </template>
          <el-input
            v-model="formData.qrCode"
            :clearable="true"
            placeholder="请输入渠道分享公众号二维码"
          />
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      v-model="showH5LinkVisible"
      title="渠道码链接"
      width="30%"
    >
      <div
        class="h5"
        style="display: flex;flex-direction: column;flex-wrap: nowrap;justify-content: center;align-items: center;align-content: center;"
      >
        <div style="qr">
          <qr-code
            :key="h5LinkUrl"
            type="image/png"
            :value="h5LinkUrl"
            :margin="3"
          />
          <div class="flex justify-center mt-0 text-center"><el-icon class="mr-1"><Iphone /></el-icon>微信扫描二维码打开链接</div>
        </div>
        <div
          class="w-5/6 mt-10 mb-10"
        >
          <el-input
            v-model="h5LinkUrl"
            readonly
            placeholder=""
          >
            <template #prepend>链接：</template>
          </el-input>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  createSysShegong,
  deleteSysShegong,
  deleteSysShegongByIds,
  updateSysShegong,
  findSysShegong,
  getSysShegongList
} from '@/api/sysShegong'
import QrCode from '@/components/qrCode/qrCode.vue'
import ChooseImg from '@/components/chooseImg/index.vue'
// 全量引入格式化工具 请按需保留
import { formatDate } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'

defineOptions({
  name: 'SysShegong'
})
const columnValue = ref(['scan'])
const columnOptions = [
  {
    value: 'views',
    label: '查看数',
  },
  {
    value: 'scan',
    label: '扫码数',
  },
  {
    value: 'logins',
    label: '登录数',
  },
]
const columnParams = ref({
  views: false,
  logins: false,
  scans: true
})
const changeColumnValueFunc = (val) => {
  columnParams.value.views = val.includes('views')
  columnParams.value.logins = val.includes('logins')
  columnParams.value.scans = val.includes('scan')
}
const h5LinkUrl = ref('')
// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  appid: '',
  name: '',
  qrCode: '',
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
    if (searchInfo.value.status === '') {
      searchInfo.value.status = null
    }
    getTableData()
  })
}
const showH5LinkVisible = ref(false)
const createH5LinkDialog = (row) => {
  h5LinkUrl.value = `https://www.sztv.com.cn/huodong/sj/webservice/sgb.html?ch=${row.appid}`
  showH5LinkVisible.value = !showH5LinkVisible.value
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
  const table = await getSysShegongList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    deleteSysShegongFunc(row)
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
    const res = await deleteSysShegongByIds({ IDs })
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
const updateSysShegongFunc = async(row) => {
  const res = await findSysShegong({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.resysShegong
    dialogFormVisible.value = true
  }
}

// 删除行
const deleteSysShegongFunc = async(row) => {
  const res = await deleteSysShegong({ ID: row.ID })
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

const onExport = () => {
  const url = `${import.meta.env.VITE_BASE_API}/sysShegong/exportAll`
  window.open(url, '_blank')
}
const exportDetailFunc = (row) => {
  const url = `${import.meta.env.VITE_BASE_API}/sysShegong/exportOne?ID=${row.ID}`
  window.open(url, '_blank')
}
// 弹窗控制标记
const dialogFormVisible = ref(false)
// 打开弹窗
const openDialog = () => {
  type.value = 'create'
  dialogFormVisible.value = true
}

// 关闭弹窗
const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = {
    appid: '',
    name: '',
    qrCode: '',
  }
}
// 弹窗确定
const enterDialog = async() => {
  elFormRef.value?.validate(async(valid) => {
    if (!valid) return
    let res
    switch (type.value) {
      case 'create':
        res = await createSysShegong(formData.value)
        break
      case 'update':
        res = await updateSysShegong(formData.value)
        break
      default:
        res = await createSysShegong(formData.value)
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

const chooseThumbUrl = ref(null)
const openThumbChange = () => {
  chooseThumbUrl.value.open()
}
</script>

  <style>

  </style>
