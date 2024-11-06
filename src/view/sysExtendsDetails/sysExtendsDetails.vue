<template>
  <div>
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
          label="名称"
          prop="label"
          width="120"
        />
        <el-table-column
          align="left"
          label="键"
          prop="key"
          width="120"
        />
        <el-table-column
          align="left"
          label="值"
          prop="value"
          width="350"
        >
          <template #default="scope">
            <el-input
              v-model="scope.row.value"
              style="width: 240px"
              size="small"
              disabled
            />
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="启用状态"
          prop="status"
          width="120"
        >
          <template #default="scope">
            <el-tag :type="scope.row.status==true?`primary`:`warning`">{{ formatBoolean2(scope.row.status) }}</el-tag></template>
        </el-table-column>
        <el-table-column
          align="left"
          label="操作"
          fixed="right"
          min-width="100"
        >
          <template #default="scope">
            <el-button
              type="primary"
              link
              icon="edit"
              class="table-button"
              @click="updateSysExtendsDetailsFunc(scope.row)"
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
          <span class="text-lg">{{ type==='create'?'添加字典值':'修改字典值' }}</span>
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
          label="名称:"
          prop="label"
        >
          <el-input
            v-model="formData.label"
            :clearable="true"
            placeholder="请输入名称"
          />
        </el-form-item>
        <el-form-item
          label="键(Key):"
          prop="key"
        >
          <el-input
            v-model="formData.key"
            :clearable="true"
            placeholder="请输入键(Key)"
          />
        </el-form-item>
        <div v-if="dType == `text`">
          <el-form-item
            v-if="dType == `text`"
            prop="value"
          >
            <template #label>
              <div class="flex items-center justify-between">
                <span>值(value):</span>
                <el-button
                  type="info"
                  icon="plus"
                  size="small"
                  @click="openThumbChange"
                >媒体库</el-button>
                <ChooseImg
                  ref="chooseThumbUrl"
                  :target="formData"
                  :target-key="`value`"
                />
              </div>
            </template>
            <el-input
              v-model="formData.value"
              :clearable="true"
              type="textarea"
              placeholder="请输入值(value)"
            />
          </el-form-item>
        </div>

        <div v-if="dType == `gps`">
          <el-form-item
            label="地点ID:"
            prop="gpsFormData.addressId"
          >
            <el-input
              v-model="gpsFormData.addressId"
              :clearable="true"
              placeholder="请输入地点ID"
            />
          </el-form-item>
          <el-form-item
            label="地点名称:"
            prop="gpsFormData.addressName"
          >
            <el-input
              v-model="gpsFormData.addressName"
              :clearable="true"
              placeholder="请输入地点名称"
            />
          </el-form-item>
          <el-form-item
            label="地点详细地址:"
            prop="gpsFormData.addressPoint"
          >
            <el-input
              v-model="gpsFormData.addressPoint"
              :clearable="true"
              placeholder="请输入地点详细地址"
            />
          </el-form-item>
          <el-form-item
            label="地点缩略图:"
            prop="gpsFormData.addressPoster"
          >
            <el-input
              v-model="gpsFormData.addressPoster"
              :clearable="true"
              placeholder="请输入地点缩略图"
            />
          </el-form-item>
          <el-form-item
            label="地点经纬度:"
            prop="gpsFormData.addressLat"
          >
            <el-input
              v-model="gpsFormData.addressLng"
              :clearable="true"
              style="width:150px"
              placeholder="请输入地点经度"
            /> -
            <el-input
              v-model="gpsFormData.addressLat"
              :clearable="true"
              style="width:150px"
              placeholder="请输入地点纬度"
            />
          </el-form-item>
        </div>
        <div
          v-if="dType == `array`"
          style="margin-bottom:10px"
        >
          <div
            v-for="(item,index) in extendValues"
            :key="index"
            style="margin-bottom:10px;"
          >
            <el-input
              v-model="item.name"
              :clearable="true"
              style="width:150px"
              placeholder="请输入名称"
            />
            <el-input
              v-model="item.key"
              :clearable="true"
              style="width:150px;margin-left:10px;"
              placeholder="请输入Key"
            />
            <el-input
              v-model="item.value"
              :clearable="true"
              style="width:250px;margin-left:10px;"
              placeholder="请输入Value"
            />
            <el-button
              type="success"
              style="margin-left:10px;"
              :icon="Plus"
              size="small"
              @click="addItem(index)"
            />
            <el-button
              v-if="index != 0"
              style="margin-left:10px;"
              type="danger"
              :icon="Delete"
              size="small"
              @click="deleteItem(index)"
            />
          </div>
        </div>
        <el-form-item
          label="启用状态:"
          prop="status"
        >
          <el-switch
            v-model="formData.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-text="启用"
            inactive-text="停用"
            clearable
          />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  createSysExtendsDetails,
  deleteSysExtendsDetails,
  deleteSysExtendsDetailsByIds,
  updateSysExtendsDetails,
  findSysExtendsDetails,
  getSysExtendsDetailsList
} from '@/api/sysExtendsDetails'

// 全量引入格式化工具 请按需保留
import { formatBoolean2 } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, defineProps } from 'vue'
import ChooseImg from '@/components/chooseImg/index.vue'
import { generateRandomString } from '@/utils/stringFun'
import { Delete, Plus } from '@element-plus/icons-vue'
const props = defineProps({
  extendId: {
    type: Number,
    default: 0
  },
  appId: {
    type: String,
    default: ''
  },
  dType: {
    type: String,
    default: ''
  }
})

const extendValues = ref([{
  id: generateRandomString(32),
  name: '',
  key: '',
  value: ''
}])

defineOptions({
  name: 'SysExtendsDetails'
})

const gpsFormData = ref({
  addressId: '',
  addressName: '',
  addressLng: '',
  addressLat: '',
  addressPoint: '',
  addressPoster: ''
})
// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  label: '',
  key: '',
  value: '',
  status: true,
  sort: 0,
  sysExtendsId: props.extendId,
  appId: props.appId,
})
const elFormRef = ref()

// =========== 表格控制部分 ===========
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})
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
  const table = await getSysExtendsDetailsList({ sysExtendsID: props.extendId, page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    deleteSysExtendsDetailsFunc(row)
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
    const res = await deleteSysExtendsDetailsByIds({ IDs })
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

const addItem = (index) => {
  extendValues.value.push({
    id: generateRandomString(32),
    name: '',
    key: '',
    value: ''
  })
}
const deleteItem = (index) => {
  extendValues.value.splice(index, 1)
}

// 行为控制标记（弹窗内部需要增还是改）
const type = ref('')

// 更新行
const updateSysExtendsDetailsFunc = async(row) => {
  const res = await findSysExtendsDetails({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.reSysExtendsDetail
    console.log(res.data)
    dialogFormVisible.value = true
    if (props.dType === `gps`) {
      const tmpJson = JSON.parse(formData.value.value)
      gpsFormData.value.addressId = tmpJson.addressId
      gpsFormData.value.addressName = tmpJson.addressName
      gpsFormData.value.addressLng = tmpJson.addressLng
      gpsFormData.value.addressLat = tmpJson.addressLat
      gpsFormData.value.addressPoint = tmpJson.addressPoint
      gpsFormData.value.addressPoster = tmpJson.addressPoster
    } else if (props.dType === `array`) {
      extendValues.value = JSON.parse(formData.value.value)
    }
  }
}

// 删除行
const deleteSysExtendsDetailsFunc = async(row) => {
  const res = await deleteSysExtendsDetails({ ID: row.ID })
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
  gpsFormData.value.addressId = ''
  gpsFormData.value.addressName = ''
  gpsFormData.value.addressLng = ''
  gpsFormData.value.addressLat = ''
  gpsFormData.value.addressPoint = ''
  gpsFormData.value.addressPoster = ''
  extendValues.value = [{
    id: generateRandomString(32),
    name: '',
    key: '',
    value: ''
  }]
}

// 关闭弹窗
const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = {
    label: '',
    key: '',
    value: '',
    status: false,
    sort: 0,
    sysExtendsId: props.extendId,
    appId: props.appId,
  }
}
// 弹窗确定
const enterDialog = async() => {
  elFormRef.value?.validate(async(valid) => {
    if (!valid) return
    if (props.dType === `gps`) {
      formData.value.value = JSON.stringify(gpsFormData.value)
    } else if (props.dType === `array`) {
      formData.value.value = JSON.stringify(extendValues.value)
    }

    let res
    switch (type.value) {
      case 'create':
        res = await createSysExtendsDetails(formData.value)
        break
      case 'update':
        res = await updateSysExtendsDetails(formData.value)
        break
      default:
        res = await createSysExtendsDetails(formData.value)
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
