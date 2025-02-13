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
          label="所属标签："
          prop="labelId"
        >
          <el-select
            v-model="searchInfo.labelId"
            clearable
            size="small"
            placeholder="请选择"
          >
            <el-option
              v-for="item in tableLabelData"
              :key="item.ID"
              :label="`${item.name}`"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="标题："
          prop="title"
        >
          <el-input
            v-model="searchInfo.title"
            clearable
            size="small"
            placeholder="标题"
          />
        </el-form-item>
        <el-form-item
          label="是否审核："
          prop="isCheck"
        >
          <el-select
            v-model="searchInfo.isCheck"
            clearable
            size="small"
            placeholder="请选择"
          >
            <el-option
              v-for="item in [{label:'已审核',value:1},{label:'未审核',value:0}]"
              :key="item.value"
              :label="`${item.label}`"
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
          label="排序"
          prop="sortby"
          width="80"
        >
          <template #default="scope">
            <el-button
              link
              @click="updateNumberFunc(scope.row,`sortby`)"
            >
              {{ scope.row.sortby }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="ID"
          prop="ID"
          width="80"
        />
        <el-table-column
          align="left"
          label="标签"
          prop="labelid"
          width="260"
        >
          <template #default="scope">
            <el-tag
              effect="plain"
              type="success"
            >{{ tableLabelData.filter(item=>item.ID==scope.row.labelid).map(item=>item.name)[0] }}</el-tag></template>
        </el-table-column>
        <el-table-column
          align="left"
          label="投票标题"
          prop="title"
          width="320"
        />
        <el-table-column
          align="left"
          label="票数"
          prop="count"
          width="120"
        >
          <template #default="scope">
            <el-button
              link
              @click="updateNumberFunc(scope.row,`count`)"
            >
              {{ scope.row.count }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="是否审核"
          prop="isCheck"
          width="120"
        >
          <template #default="scope">
            <el-button
              plain
              size="small"
              :type="scope.row.isCheck==1 ?`primary`: `danger`"
              @click="updateSysVideoItemFunc(scope.row,`tice`)"
            >
              {{ scope.row.isCheck == 1 ? "已审核" : "未审核" }}
            </el-button>
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
          min-width="240"
        >
          <template #default="scope">
            <el-button
              type="primary"
              link
              icon="edit"
              class="table-button"
              size="small"
              @click="updateSysVideoItemFunc(scope.row,`notice`)"
            >变更</el-button>
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
    <el-drawer
      v-model="dialogFormVisible"
      size="800"
      :show-close="false"
      :close-on-click-modal="false"
      :before-close="closeDialog"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-lg">{{ type==='create'?'添加':'审核' }}</span>
          <div>
            <el-button
              type="primary"
              size="small"
              @click="enterDialog"
            >保存并通过</el-button>
            <el-button
              size="small"
              @click="closeDialog"
            >取 消</el-button>
          </div>
        </div>
      </template>
      <warning-bar
        title="提示：后台添加视频信息必须挂靠在用户上，否则无法保存"
      />
      <el-form
        ref="elFormRef"
        :model="formData"
        label-position="top"
        :rules="rule"
        label-width="80px"
      >
        <el-form-item
          v-if="type!=='create'"
          label="投票ID:"
          prop="ID"
        >
          <el-input
            v-model="formData.ID"
            disabled
            readonly
          />
        </el-form-item>
        <el-form-item
          label="所属标签:"
          prop="labelid"
        >
          <el-select
            v-model="formData.labelid"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in tableLabelData"
              :key="item.ID"
              :label="`${item.name}`"
              :value="item.ID"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="投票标题:"
          prop="title"
        >
          <el-input
            v-model="formData.title"
            :clearable="true"
            placeholder="请输入投票标题"
          />
        </el-form-item>
        <el-form-item
          label="投票描述:"
          prop="content"
        >
          <el-input
            v-model="formData.content"
            :clearable="true"
            type="textarea"
            rows="5"
            placeholder="请输入投票描述"
          />
        </el-form-item>
        <el-form-item
          label="视频封面图:"
          prop="source"
        >
          <template #label>
            <div class="flex items-center justify-between">
              <span>视频封面图:</span>
              <el-button
                type="info"
                icon="plus"
                size="small"
                @click="openThumbChange"
              >媒体库</el-button>
              <ChooseImg
                ref="chooseThumbUrl"
                :target="formData"
                :target-key="`source`"
              />
            </div>
          </template>
          <el-row
            :gutter="20"
            style="width:100%"
          >
            <el-col :span="8">
              <el-image
                style="width:230px;max-height:115px;margin-bottom:10px;"
                fit="contain"
                :src="formData.source"
              />
            </el-col>
            <el-col :span="16">
              <el-input
                v-model="formData.source"
                :clearable="true"
                :rows="5"
                type="textarea"
                placeholder="封面图可留空，如果为空，自动获取视频第一帧作为封面图"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          label="视频源:"
          prop="voicesrc"
        >
          <template #label>
            <div class="flex items-center justify-between">
              <span>视频源:</span>
              <el-button
                type="info"
                icon="plus"
                size="small"
                @click="openUploadVideoChange"
              >上传视频</el-button>
            </div>
          </template>
          <el-row
            :gutter="20"
            style="width:100%"
          >
            <el-col :span="8">
              <video
                style="width:230px;max-height:115px;margin-bottom:10px;"
                controls
              >
                <source
                  :src="formData.voicesrc"
                  type="video/mp4"
                >
              </video>
            </el-col>
            <el-col :span="16">
              <el-input
                v-model="formData.voicesrc"
                :clearable="true"
                :rows="5"
                type="textarea"
                placeholder="请上传视频源"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          label="投票数/点赞数:"
          prop="count"
        >
          <el-input
            v-model="formData.count"
            :clearable="true"
            placeholder="投票数/点赞数"
          />
        </el-form-item>
        <el-form-item
          label="用户电话号码:"
          prop="telphone"
        >
          <el-input
            v-model="formData.telphone"
            placeholder="请输入电话号码搜索用户"
          >
            <template #append><el-button
              :icon="Search"
              @click="searchUserByMobileFunc"
            >搜索用户</el-button></template>
          </el-input>
        </el-form-item>
        <el-form-item
          label="挂靠用户UID:"
          prop="uid"
        >
          <el-input
            v-model="formData.uid"
            readonly
            disabled
            placeholder="用户UID"
          />
        </el-form-item>
        <el-form-item
          label="挂靠用户昵称:"
          prop="username"
        >
          <el-input
            v-model="formData.username"
            readonly
            disabled
            placeholder="用户昵称"
          />
        </el-form-item>
      </el-form>
    </el-drawer>
    <el-dialog
      v-model="uploadVideoVisible"
      title="视频上传"
      width="30%"
    >
      <UploadVideo
        v-if="openUploadVideoChange"
        ref="uploadVideoRef"
        @on-cancel="closeUploadVideo"
        @on-success="uploadVideoSuccess"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import {
  createSysVideoItem,
  deleteSysVideoItem,
  deleteSysVideoItemByIds,
  updateSysVideoItem,
  findSysVideoItem,
  getSysVideoItemList,
  updateCountSysVideoItem,
  updateSortBySysVideoItem,
  noCheckSysVideoItem
} from '@/api/sysVideoItem'
import {
  getSysVideoLabelsList
} from '@/api/sysVideoLabels'
import { getSysVideoUsersList } from '@/api/sysVideoUsers'
import WarningBar from '@/components/warningBar/warningBar.vue'
// 全量引入格式化工具 请按需保留
import { formatDate } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import ChooseImg from '@/components/chooseImg/index.vue'
import UploadVideo from '@/components/upload/video.vue'
import { Search } from '@element-plus/icons-vue'
defineOptions({
  name: 'SysVideoItem'
})

const uploadVideoVisible = ref(false)

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  title: '',
  content: '',
  source: '',
  uid: '',
  count: '0',
  username: '',
  telphone: '',
  voicesrc: '',
  transid: '',
  originalsrc: '',
})

// 验证规则
const rule = reactive({
})

const elFormRef = ref()
const elSearchFormRef = ref()

// =========== 表格控制部分 ===========
const page = ref(1)
const total = ref(0)
const pageSize = ref(30)
const tableData = ref([])
const searchInfo = ref({})

const tableLabelData = ref([])

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

const getVideoLabel = async() => {
  const table = await getSysVideoLabelsList({ page: 1, pageSize: 10000 })
  if (table.code === 0) {
    tableLabelData.value = table.data.list
  }
}
getVideoLabel()

// 查询
const getTableData = async() => {
  const table = await getSysVideoItemList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    deleteSysVideoItemFunc(row)
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
    const res = await deleteSysVideoItemByIds({ IDs })
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
const updateSysVideoItemFunc = async(row, vtype) => {
  const res = await findSysVideoItem({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.resysVideoItem
    if (formData.value.isCheck && vtype === 'tice') {
      ElMessageBox.confirm(
        '您确定将该视频由【审核】状态变更为【未审核】？',
        '二次确认',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
        .then(async() => {
          const res = await noCheckSysVideoItem({ id: row.ID, isCheck: 0 })
          if (res.code === 0) {
            getTableData()
            ElMessage({
              type: 'success',
              message: '更新成功',
            })
          } else {
            ElMessage({
              type: 'info',
              message: '更新失败',
            })
          }
        })
        .catch(() => {})
    } else {
      dialogFormVisible.value = true
    }
  }
}

// 删除行
const deleteSysVideoItemFunc = async(row) => {
  const res = await deleteSysVideoItem({ ID: row.ID })
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
    title: '',
    content: '',
    source: '',
    uid: '',
    count: '0',
    username: '',
    telphone: '',
    voicesrc: '',
    transid: '',
    originalsrc: '',
  }
  document.querySelectorAll('video').forEach(function(otherVideo) {
    otherVideo.pause()
  })
}

const searchUserByMobileFunc = async() => {
  const table = await getSysVideoUsersList({ page: 1, pageSize: 1, mobile: formData.value.telphone })
  if (table.code === 0 && table.data.list.length > 0) {
    const userInfo = table.data.list
    formData.value.uid = userInfo[0].ID
    formData.value.telphone = userInfo[0].mobile
    formData.value.username = userInfo[0].nickname
  } else {
    ElMessage({
      type: 'warning',
      message: '未找到该用户'
    })
  }
  return
}
// 弹窗确定
const enterDialog = async() => {
  elFormRef.value?.validate(async(valid) => {
    if (!valid) return
    // 为空校验
    if (!formData.value.labelid) {
      ElMessage({
        type: 'warning',
        message: '请选择标签'
      })
      return
    }
    if (!formData.value.title) {
      ElMessage({
        type: 'warning',
        message: '请填写标题'
      })
      return
    }
    if (!formData.value.voicesrc) {
      ElMessage({
        type: 'warning',
        message: '请上传视频'
      })
      return
    }
    if (!formData.value.uid) {
      ElMessage({
        type: 'warning',
        message: '请挂靠用户'
      })
      return
    }
    formData.value.count = parseInt(formData.value.count)
    formData.value.uid = parseInt(formData.value.uid)
    let res
    switch (type.value) {
      case 'create':
        if (!formData.value.telphone) {
          ElMessage({
            type: 'warning',
            message: '请填写手机号'
          })
          return
        }
        res = await createSysVideoItem(formData.value)
        break
      case 'update':
        res = await updateSysVideoItem(formData.value)
        break
      default:
        res = await createSysVideoItem(formData.value)
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
const openUploadVideoChange = () => {
  uploadVideoVisible.value = true
}

const closeUploadVideo = () => {
  uploadVideoVisible.value = false
}
const uploadVideoSuccess = (data) => {
  if (data.close) {
    uploadVideoVisible.value = false
  }
  if (data.url) {
    formData.value.voicesrc = data.url
  }
}

const updateNumberFunc = (row, type) => {
  let tipsText = '当前'
  if (type === 'sortby') {
    tipsText += `排序为${row.sortby}`
  } else if (type === 'count') {
    tipsText += `票数为${row.count}`
  } else {
    return
  }
  ElMessageBox.prompt(tipsText, '修改', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPlaceholder: type === 'sortby' ? row.sortby : row.count,
    inputPattern:
        /\d+/,
    inputErrorMessage: '输入只能是数字',
  })
    .then(async({ value }) => {
      let res
      if (type === 'sortby') {
        res = await updateSortBySysVideoItem({ id: row.ID, sortBy: parseInt(value) })
      } else if (type === 'count') {
        res = await updateCountSysVideoItem({ id: row.ID, count: parseInt(value) })
      } else {
        console.log('error')
      }

      if (res.code === 0) {
        getTableData()
        ElMessage({
          type: 'success',
          message: '更新成功',
        })
      } else {
        ElMessage({
          type: 'info',
          message: '更新失败',
        })
      }
    })
    .catch(() => {})
}
</script>

  <style>

  </style>
