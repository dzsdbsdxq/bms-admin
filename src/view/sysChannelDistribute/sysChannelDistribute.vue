<template>
  <div>
    <warning-bar
      title="接口调用：https://www.sztv.com.cn/ysztv/web/channel/get?appId="
    />
    <div class="gva-search-box">
      <el-form
        ref="elSearchFormRef"
        :inline="true"
        :model="searchInfo"
        class="demo-form-inline"
        @keyup.enter="onSubmit"
      >
        <el-form-item>
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
          </el-form-item>
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
          label="名称"
          prop="name"
          width="120"
        />
        <el-table-column
          align="left"
          label="跳转类型"
          prop="jump_type"
          width="120"
        >
          <template #default="scope">{{ channelOptions.filter(item=>item.value==scope.row.jump_type)[0].label }}</template>
        </el-table-column>
        <el-table-column
          align="left"
          label="跳转值"
          prop="jump_value"
          width="120"
        />
        <el-table-column
          align="left"
          label="查看数"
          prop="views"
          width="120"
        />
        <el-table-column
          align="left"
          label="下载数"
          prop="down"
          width="120"
        />
        <el-table-column
          align="left"
          label="状态"
          prop="status"
          width="120"
        >
          <template #default="scope">
            <el-tag :type="scope.row.status==true?`primary`:`warning`">{{ formatBoolean2(scope.row.status) }}</el-tag></template>
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
              @click="updateSysChannelDistributeFunc(scope.row)"
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
          label="名称:"
          prop="name"
        >
          <el-input
            v-model="formData.name"
            :clearable="true"
            placeholder="请输入名称"
          />
        </el-form-item>
        <el-form-item
          label="跳转类型:"
          prop="jump_type"
        >
          <el-select
            v-model="formData.jump_type"
            placeholder="选择跳转类型"
          >
            <el-option
              v-for="item in channelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="跳转值:"
          prop="jump_value"
        >
          <el-input
            v-model="formData.jump_value"
            :clearable="true"
            placeholder="请输入跳转值(栏目ID、文章ID、链接等)"
          />
        </el-form-item>
        <el-form-item
          label="状态:"
          prop="status"
        >
          <el-switch
            v-model="formData.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="启用"
            inactive-text="禁用"
            clearable
          />
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      v-model="showH5LinkVisible"
      title="下载H5链接"
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
  createSysChannelDistribute,
  deleteSysChannelDistribute,
  deleteSysChannelDistributeByIds,
  updateSysChannelDistribute,
  findSysChannelDistribute,
  getSysChannelDistributeList
} from '@/api/sysChannelDistribute'
import QrCode from '@/components/qrCode/qrCode.vue'
import WarningBar from '@/components/warningBar/warningBar.vue'
// 全量引入格式化工具 请按需保留
import { formatDate, formatBoolean2 } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'

defineOptions({
  name: 'SysChannelDistribute'
})
const h5LinkUrl = ref('')
// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  appid: '',
  name: '',
  jump_type: '',
  jump_value: '',
  status: true,
  dType: '',
})

const channelOptions = ref([
  {
    value: 'ysz://com.cutv.shakeshake/native/openApp',
    label: '壹深圳',
  },
  {
    value: 'ysz://com.cutv.shakeshake/native/articleDetail/detail?articleId=',
    label: '文章详情页',
  },
  {
    value: 'ysz://com.cutv.shakeshake/native/articleList/common?catalogId=',
    label: '通用的文章列表页面',
  },
  {
    value: 'ysz://com.cutv.shakeshake/native/articleList/recommend?catalogId=',
    label: '头条的推荐列表页',
  },
  {
    value: 'ysz://com.cutv.shakeshake/native/articleList/live?catalogId=',
    label: '直播列表页',
  },
  {
    value: 'ysz://com.cutv.shakeshake/native/customized/minyisuban?catalogId=',
    label: '民意速办页',
  },
  {
    value: 'ysz://com.cutv.shakeshake/native/customized/smartServices?catalogId=',
    label: '智慧服务页',
  },
  {
    value: 'ysz://com.cutv.shakeshake/native/customized/tvLanMuDetail?id=',
    label: '电视栏目详情页',
  },
  {
    value: 'ysz://com.cutv.shakeshake/native/customized/szMeetingDetail',
    label: '两会百事通页面',
  },
])

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
  h5LinkUrl.value = `https://www.sztv.com.cn/app/?catalog=${row.appid}`
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
  const table = await getSysChannelDistributeList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    deleteSysChannelDistributeFunc(row)
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
    const res = await deleteSysChannelDistributeByIds({ IDs })
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
const updateSysChannelDistributeFunc = async(row) => {
  const res = await findSysChannelDistribute({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data
    dialogFormVisible.value = true
  }
}

// 删除行
const deleteSysChannelDistributeFunc = async(row) => {
  const res = await deleteSysChannelDistribute({ ID: row.ID })
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
    jump_type: '',
    jump_value: '',
    status: false,
    dType: '',
  }
}
// 弹窗确定
const enterDialog = async() => {
  elFormRef.value?.validate(async(valid) => {
    if (!valid) return
    let res
    switch (type.value) {
      case 'create':
        res = await createSysChannelDistribute(formData.value)
        break
      case 'update':
        res = await updateSysChannelDistribute(formData.value)
        break
      default:
        res = await createSysChannelDistribute(formData.value)
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
