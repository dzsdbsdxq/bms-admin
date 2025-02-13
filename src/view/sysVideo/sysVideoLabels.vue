
<template>
  <div>
    <div class="gva-search-box">
      <el-form
        ref="elSearchFormRef"
        :inline="true"
        class="demo-form-inline"
        @keyup.enter="onSubmit"
      >
        <el-form-item label="是否允许上传">
          <el-select
            v-model="searchInfo.isup"
            size="small"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in [{label:'是',value:1},{label:'否',value:0}]"
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
          label="ID"
          prop="ID"
          width="90"
        />
        <el-table-column
          align="left"
          label="排序"
          prop="sortby"
          width="80"
        />

        <el-table-column
          align="left"
          label="标签名"
          prop="name"
          width="220"
        />
        <el-table-column
          align="left"
          label="作品数量"
          prop="usenum"
          width="120"
        />
        <el-table-column
          align="left"
          label="是否置顶"
          prop="istop"
          width="120"
        >
          <template #default="scope">
            <el-tag :type="scope.row.istop==1 ?`primary`: `warning`">{{ scope.row.istop == 1 ? "是" : "否" }}</el-tag></template>
        </el-table-column>
        <el-table-column
          align="left"
          label="是否推荐"
          prop="isrec"
          width="120"
        >
          <template #default="scope">
            <el-tag :type="scope.row.isrec==1 ?`primary`: `warning`">{{ scope.row.isrec == 1 ? "是" : "否" }}</el-tag></template>
        </el-table-column>
        <el-table-column
          align="left"
          label="是否允许上传"
          prop="isup"
          width="120"
        >
          <template #default="scope">
            <el-tag :type="scope.row.isup==1 ?`primary`: `warning`">{{ scope.row.isup == 1 ? "是" : "否" }}</el-tag></template>
        </el-table-column>
        <el-table-column
          align="left"
          label="上传显示手机号码"
          prop="ismobile"
          width="150"
        >
          <template #default="scope">
            <el-tag :type="scope.row.ismobile==1 ?`primary`: `warning`">{{ scope.row.ismobile == 1 ? "是" : "否" }}</el-tag></template>
        </el-table-column>
        <el-table-column
          align="left"
          label="左下角按钮"
          prop="noHome"
          width="120"
        >
          <template #default="scope">
            <el-tag :type="scope.row.noHome==1 ?`primary`: `warning`">{{ scope.row.noHome == 1 ? "显示" : "隐藏" }}</el-tag></template>
        </el-table-column>
        <el-table-column
          align="left"
          label="投票开始时间"
          prop="startTime"
          width="150"
        >
          <template #default="scope">{{ formatDate(scope.row.startTime * 1000) }}</template>
        </el-table-column>
        <el-table-column
          align="left"
          label="投票结束时间"
          prop="endTime"
          width="150"
        >
          <template #default="scope">{{ formatDate(scope.row.endTime * 1000) }}</template>
        </el-table-column>
        <el-table-column
          align="left"
          label="创建日期"
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
              @click="updateSysVideoLabelsFunc(scope.row)"
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
      :close-on-click-modal="false"
      :title="type===`create`?`添加标签`:`修改标签`"
      :before-close="closeDialog"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <span>{{ type===`create`?`添加标签`:`修改标签` }}</span>
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
          label="标签类型:"
          prop="type"
        >
          <el-select
            v-model="formData.type"
            placeholder="请选择标签类型"
          >
            <el-option
              v-for="item in TypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          label="页面标题:"
          prop="pageTitle"
        >
          <el-input
            v-model="formData.pageTitle"
            :clearable="true"
            placeholder="请输入页面标题"
          />
        </el-form-item>
        <el-form-item
          label="标签名:"
          prop="name"
        >
          <el-input
            v-model="formData.name"
            :clearable="true"
            placeholder="请输入标签名"
          />
        </el-form-item>
        <el-form-item
          label="分享seo标题:"
          prop="sharetitle"
        >
          <el-input
            v-model="formData.sharetitle"
            :clearable="true"
            placeholder="请输入分享seo标题"
          />
        </el-form-item>
        <el-form-item
          label="标签描述:"
          prop="desc"
        >
          <el-input
            v-model="formData.desc"
            :clearable="true"
            type="textarea"
            placeholder="请输入标签描述"
          />
        </el-form-item>
        <el-form-item
          label="标签展示图:"
          prop="imgurl"
        >
          <template #label>
            <div class="flex items-center justify-between">
              <span>标签展示图:</span>
              <el-button
                type="info"
                icon="plus"
                size="small"
                @click="openThumbChange"
              >媒体库</el-button>
              <ChooseImg
                ref="chooseThumbUrl"
                :target="formData"
                :target-key="`imgurl`"
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
                fit="scale-down"
                :src="formData.imgurl"
              />
            </el-col>
            <el-col :span="16">
              <el-input
                v-model="formData.imgurl"
                :clearable="true"
                :rows="5"
                type="textarea"
                placeholder="请输入标签展示图"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          label="标签说明图:"
          prop="descpic"
        >
          <template #label>
            <div class="flex items-center justify-between">
              <span>标签说明图:</span>
              <el-button
                type="info"
                icon="plus"
                size="small"
                @click="openThumb2Change"
              >媒体库</el-button>
              <ChooseImg
                ref="chooseThumbUrl2"
                :target="formData"
                :target-key="`descpic`"
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
                fit="scale-down"
                :src="formData.descpic"
              />
            </el-col>
            <el-col :span="16">
              <el-input
                v-model="formData.descpic"
                :clearable="true"
                :rows="5"
                type="textarea"
                placeholder="请输入标签说明图"
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item
          label="排序:"
          prop="sortby"
        >
          <el-input
            v-model="formData.sortby"
            :clearable="true"
            placeholder="请输入排序"
          />
        </el-form-item>
        <el-form-item
          label="是否置顶:"
          prop="istop"
        >
          <template #label>
            <div style="display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: flex-start;align-items: center;align-content: stretch;">
              <span>是否置顶:</span>
              <el-radio-group
                v-model="formData.istop"
                style="margin-left:10px;"
              >
                <el-radio
                  value="0"
                >否</el-radio>
                <el-radio
                  value="1"
                >是</el-radio>
              </el-radio-group>
            </div>
          </template>
        </el-form-item>
        <el-form-item
          label="是否推荐:"
          prop="isrec"
        >
          <template #label>
            <div style="display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: flex-start;align-items: center;align-content: stretch;">
              <span>是否推荐:</span>
              <el-radio-group
                v-model="formData.isrec"
                style="margin-left:10px;"
              >
                <el-radio
                  value="0"
                >否</el-radio>
                <el-radio
                  value="1"
                >是</el-radio>
              </el-radio-group>
            </div>
          </template>
        </el-form-item>
        <el-form-item
          label="是否允许上传:"
          prop="isup"
        >
          <template #label>
            <div style="display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: flex-start;align-items: center;align-content: stretch;">
              <span>是否允许上传:</span>
              <el-radio-group
                v-model="formData.isup"
                style="margin-left:10px;"
              >
                <el-radio
                  value="0"
                >否</el-radio>
                <el-radio
                  value="1"
                >是</el-radio>
              </el-radio-group>
            </div>
          </template>
        </el-form-item>
        <el-form-item
          label="是否需要填写手机号:"
          prop="ismobile"
        >
          <template #label>
            <div style="display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: flex-start;align-items: center;align-content: stretch;">
              <span>是否需要填写手机号:</span>
              <el-radio-group
                v-model="formData.ismobile"
                style="margin-left:10px;"
              >
                <el-radio
                  value="0"
                >否</el-radio>
                <el-radio
                  value="1"
                >是</el-radio>
              </el-radio-group>
            </div>
          </template>
        </el-form-item>
        <el-form-item
          label="是否显示左下角按钮:"
          prop="noHome"
        >
          <template #label>
            <div style="display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: flex-start;align-items: center;align-content: stretch;">
              <span>是否显示左下角按钮:</span>
              <el-radio-group
                v-model="formData.noHome"
                style="margin-left:10px;"
              >
                <el-radio
                  value="0"
                >否</el-radio>
                <el-radio
                  value="1"
                >是</el-radio>
              </el-radio-group>
            </div>
          </template>
        </el-form-item>
        <div v-if="formData.type == '1'">
          <el-form-item
            label="投票开始时间:"
          >
            <el-date-picker
              v-model="timeFormat.startTime"
              type="datetime"
              placeholder="开始日期"
              :disabled-date="time=> timeFormat.endTime ? time.getTime() > timeFormat.endTime.getTime() : false"
            />
            —
            <el-date-picker
              v-model="timeFormat.endTime"
              type="datetime"
              placeholder="结束日期"
              :disabled-date="time=> timeFormat.startTime ? time.getTime() < timeFormat.startTime.getTime() : false"
            />
          </el-form-item>
          <el-form-item
            label="重复对一个作品投票:"
          >
            <template #label>
              <div style="display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: flex-start;align-items: center;align-content: stretch;">
                <span>重复对一个作品投票:</span>
                <el-radio-group
                  v-model="formData.retry"
                  style="margin-left:10px;"
                >
                  <el-radio
                    value="0"
                  >否</el-radio>
                  <el-radio
                    value="1"
                  >是</el-radio>
                </el-radio-group>
              </div>
            </template>
          </el-form-item>
          <el-form-item
            label="每人每天可投票数:"
          >
            <template #label>
              <div style="display: flex;flex-direction: row;flex-wrap: nowrap;justify-content: flex-start;align-items: center;align-content: stretch;">
                <span>每人每天可投票数:</span>
                <el-input-number
                  v-model="formData.day_vote"
                  style="margin-left:10px;"
                  :min="0"
                  :max="100"
                  label="每天可投票数"
                />
              </div>
            </template>
          </el-form-item>
        </div>
      </el-form>
    </el-drawer>

    <el-dialog
      v-model="showH5LinkVisible"
      title="标签H5链接"
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
            disabled
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
  createSysVideoLabels,
  deleteSysVideoLabels,
  deleteSysVideoLabelsByIds,
  updateSysVideoLabels,
  findSysVideoLabels,
  getSysVideoLabelsList
} from '@/api/sysVideoLabels'

// 全量引入格式化工具 请按需保留
import { formatDate, formatTimeStamp } from '@/utils/format'
import QrCode from '@/components/qrCode/qrCode.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import ChooseImg from '@/components/chooseImg/index.vue'
defineOptions({
  name: 'SysVideoLabels'
})
const h5LinkUrl = ref('')
// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  pageTitle: '',
  name: '',
  sharetitle: '',
  desc: '',
  imgurl: '',
  type: '0',
  descpic: '',
  sortby: '0',
  istop: '0',
  isrec: '0',
  isup: '0',
  ismobile: '0',
  noHome: '0',
  startTime: '0',
  endTime: '0',
  retry: '1',
  day_vote: 1,
})
const timeFormat = ref({
  startTime: '',
  endTime: ''
})

const TypeOptions = [
  { label: '点赞', value: '0' },
  { label: '投票', value: '1' },
]
const showH5LinkVisible = ref(false)
const createH5LinkDialog = (row) => {
  h5LinkUrl.value = `https://www.sztv.com.cn/huodong/sj/dsp/#/label?id=${row.ID}`
  showH5LinkVisible.value = !showH5LinkVisible.value
}

// 验证规则
const rule = reactive({
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
  page.value = 1
  pageSize.value = 10
  getTableData()
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
  const table = await getSysVideoLabelsList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    deleteSysVideoLabelsFunc(row)
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
    const res = await deleteSysVideoLabelsByIds({ IDs })
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
const updateSysVideoLabelsFunc = async(row) => {
  const res = await findSysVideoLabels({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    const label = res.data.resysVideoLabels
    formData.value = {
      ID: label.ID,
      pageTitle: label.pageTitle,
      name: label.name,
      sharetitle: label.sharetitle,
      desc: label.desc,
      imgurl: label.imgurl,
      type: label.type.toString(),
      descpic: label.descpic,
      sortby: label.sortby.toString(),
      istop: label.istop.toString(),
      isrec: label.isrec.toString(),
      isup: label.isup.toString(),
      ismobile: label.ismobile.toString(),
      noHome: label.noHome.toString(),
      startTime: label.startTime.toString(),
      endTime: label.endTime.toString(),
      retry: label.retry.toString(),
      day_vote: label.day_vote,
    }
    timeFormat.value = {
      startTime: new Date(label.startTime * 1000),
      endTime: new Date(label.endTime * 1000),
    }
    dialogFormVisible.value = true
  }
}

// 删除行
const deleteSysVideoLabelsFunc = async(row) => {
  const res = await deleteSysVideoLabels({ ID: row.ID })
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
  timeFormat.value = {
    startTime: '',
    endTime: ''
  }
  formData.value = {
    pageTitle: '',
    name: '',
    sharetitle: '',
    desc: '',
    imgurl: '',
    type: '0',
    descpic: '',
    sortby: '0',
    istop: '0',
    isrec: '0',
    isup: '0',
    ismobile: '0',
    noHome: '0',
    startTime: '',
    endTime: '',
    retry: '1',
    day_vote: '1',
  }
}
// 弹窗确定
const enterDialog = async() => {
  elFormRef.value?.validate(async(valid) => {
    if (!valid) return
    formData.value.type = parseInt(formData.value.type)
    formData.value.ismobile = parseInt(formData.value.ismobile)
    formData.value.isrec = parseInt(formData.value.isrec)
    formData.value.istop = parseInt(formData.value.istop)
    formData.value.isup = parseInt(formData.value.isup)
    formData.value.noHome = parseInt(formData.value.noHome)
    formData.value.sortby = parseInt(formData.value.sortby)
    formData.value.retry = parseInt(formData.value.retry)
    formData.value.day_vote = parseInt(formData.value.day_vote)
    formData.value.startTime = timeFormat.value.startTime
    formData.value.endTime = timeFormat.value.endTime
    // time 转 时间戳
    formData.value.startTime = formData.value.startTime ? formatTimeStamp(formData.value.startTime) : 0
    formData.value.endTime = formData.value.endTime ? formatTimeStamp(formData.value.endTime) : 0
    console.log(formData.value)
    let res
    switch (type.value) {
      case 'create':
        res = await createSysVideoLabels(formData.value)
        break
      case 'update':
        res = await updateSysVideoLabels(formData.value)
        break
      default:
        res = await createSysVideoLabels(formData.value)
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
const chooseThumbUrl2 = ref(null)
const openThumb2Change = () => {
  chooseThumbUrl2.value.open()
}
</script>

  <style>

  </style>
