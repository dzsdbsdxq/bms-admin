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
          label="创建日期"
          prop="createdAt"
        >
          <template #label>
            <span>
              创建日期
              <el-tooltip content="搜索范围是开始日期（包含）至结束日期（不包含）">
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </span>
          </template>
          <el-date-picker
            v-model="searchInfo.startCreatedAt"
            type="datetime"
            placeholder="开始日期"
            :disabled-date="time=> searchInfo.endCreatedAt ? time.getTime() > searchInfo.endCreatedAt.getTime() : false"
          />
          —
          <el-date-picker
            v-model="searchInfo.endCreatedAt"
            type="datetime"
            placeholder="结束日期"
            :disabled-date="time=> searchInfo.startCreatedAt ? time.getTime() < searchInfo.startCreatedAt.getTime() : false"
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
          label="ID"
          prop="ID"
          width="80"
        />
        <el-table-column
          align="left"
          label="名称"
          prop="name"
          :show-overflow-tooltip="true"
          width="250"
        />
        <el-table-column
          align="left"
          label="缩略图"
          prop="thumbUrl"
          width="120"
        >
          <template #default="scope">
            <CustomPic
              style="justify-content: start;max-width:100px;max-height:50px;"
              :pic-type="`img`"
              :pic-src="scope.row.thumbUrl"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="积分"
          prop="needScore"
          width="120"
        >
          <template #default="scope">
            <el-tag
              v-if="scope.row.needScore"
              type="success"
            >{{ scope.row.needScore }}</el-tag>
            <el-tag
              v-else
              type="info"
            >无</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="模版"
          prop="template"
          width="120"
        />
        <el-table-column
          align="left"
          label="每日可抽次数"
          prop="dayGetNum"
          width="120"
        >
          <template #default="scope">
            <el-tag
              v-if="scope.row.dayGetNum"
              type="success"
            >{{ scope.row.dayGetNum }}</el-tag>
            <el-tag
              v-else
              type="info"
            >不限</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="抽奖算法"
          prop="algType"
          width="120"
        >
          <template #default="scope">
            <el-tag
              v-if="scope.row.algType == 1"
              type="success"
            >随机概率</el-tag>
            <el-tag
              v-else
              type="info"
            >自定义奖品概率</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="开始时间"
          width="180"
        >
          <template #default="scope">{{ formatDate(scope.row.startTime) }}</template>
        </el-table-column>
        <el-table-column
          align="left"
          label="结束时间"
          width="180"
        >
          <template #default="scope">{{ formatDate(scope.row.endTime) }}</template>
        </el-table-column>
        <el-table-column
          align="left"
          label="状态"
          prop="status"
          width="120"
        >
          <template #default="scope">
            <el-tag
              v-if="scope.row.status == 0"
              type="success"
            >启用</el-tag>
            <el-tag
              v-else
              type="danger"
            >禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="操作"
          fixed="right"
          min-width="350"
        >
          <template #default="scope">
            <el-button
              type="primary"
              link
              icon="edit"
              class="table-button"
              @click="updateSysWheelsFunc(scope.row)"
            >变更</el-button>
            <el-button
              type="primary"
              link
              class="table-button"
              @click="showWheelPrizeVisibleFunc(scope.row)"
            >
              <el-icon style="margin-right: 5px"><Compass /></el-icon>
              奖项设置
            </el-button>
            <el-button
              type="primary"
              link
              class="table-button"
              @click="showWheelPageSettingFunc(scope.row)"
            >
              <el-icon style="margin-right: 5px"><Document /></el-icon>
              页面设置
            </el-button>
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
                      @click="createH5LinkDialog(scope.row)"
                    >H5链接</el-button>
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
          label="大转盘名称:"
          prop="name"
        >
          <el-input
            v-model="formData.name"
            :clearable="true"
            placeholder="请输入大转盘名称"
          />
        </el-form-item>
        <el-form-item
          label="大转盘缩略图:"
          prop="thumbUrl"
        >
          <div
            style="display: inline-block;max-width:100px;max-height:100px;"
            @click="openThumbChange"
          >
            <img
              v-if="formData.thumbUrl"
              alt="缩略图"
              class="header-img-box"
              style="width:100%;height:100%"
              :src="
                formData.thumbUrl && formData.thumbUrl.slice(0, 4) !== 'http'
                  ? path + formData.thumbUrl
                  : formData.thumbUrl
              "
            >
            <div
              v-else
              class="flex header-img-box"
              style="cursor: pointer;"
            >从媒体库选择</div>
            <ChooseImg
              ref="chooseThumbUrl"
              :target="formData"
              :target-key="`thumbUrl`"
            />
          </div>
        </el-form-item>
        <el-form-item
          label="所需积分:"
          prop="needScore"
        >
          <el-input
            v-model.number="formData.needScore"
            :clearable="true"
            type="number"
            placeholder="请输入所需积分"
          />
        </el-form-item>
        <el-form-item
          label="分享标题:"
          prop="shareTitle"
        >
          <el-input
            v-model="formData.shareTitle"
            :clearable="true"
            placeholder="请输入分享标题"
          />
        </el-form-item>
        <el-form-item
          label="分享描述:"
          prop="shareDesc"
        >
          <el-input
            v-model="formData.shareDesc"
            type="textarea"
            :clearable="true"
            placeholder="请输入分享标题"
          />
        </el-form-item>
        <el-form-item
          label="分享图片:"
          prop="shareImg"
        >
          <div
            style="display: inline-block;max-width:100px;max-height:100px;"
            @click="openHeaderChange"
          >
            <img
              v-if="formData.shareImg"
              alt="缩略图"
              class="header-img-box"
              style="width:100%;height:100%"
              :src="
                formData.shareImg && formData.shareImg.slice(0, 4) !== 'http'
                  ? path + formData.shareImg
                  : formData.shareImg
              "
            >
            <div
              v-else
              class="flex header-img-box"
              style="cursor: pointer;"
            >从媒体库选择</div>
            <ChooseImg
              ref="chooseImg"
              :target="formData"
              :target-key="`shareImg`"
            />
          </div>
        </el-form-item>
        <el-form-item
          label="模版:"
          prop="template"
        >
          <el-select
            v-model="formData.template"
            placeholder="请选择模版"
          >
            <el-option
              v-for="item in templateOptions"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            />
          </el-select>
        </el-form-item>
        <el-form-item
          prop="dayGetNum"
        >
          <template #label>
            <div> 每日可抽次数:
              <el-tooltip
                content="0表示不限次数"
                placement="top"
                effect="dark"
              >
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>
          <el-input
            v-model.number="formData.dayGetNum"
            :clearable="true"
            placeholder="请输入用户每日可抽次数，0表示不限次数"
          />
        </el-form-item>
        <el-form-item
          label="音频地址:"
          prop="voiceUrl"
        >
          <el-input
            v-model="formData.voiceUrl"
            :clearable="true"
            placeholder="请输入音频地址"
          />
        </el-form-item>
        <el-form-item
          label="开始时间:"
          prop="startTime"
        >
          <el-date-picker
            v-model="formData.startTime"
            type="date"
            style="width:100%"
            placeholder="选择日期"
            :clearable="true"
          />
        </el-form-item>
        <el-form-item
          label="结束时间:"
          prop="endTime"
        >
          <el-date-picker
            v-model="formData.endTime"
            type="date"
            style="width:100%"
            placeholder="选择日期"
            :clearable="true"
          />
        </el-form-item>
        <el-form-item
          label="状态:"
          prop="status"
        >
          <el-radio-group
            v-model="formData.status"
            class="ml-4"
          >
            <el-radio
              :value="0"
              size="large"
            >启用</el-radio>
            <el-radio
              :value="1"
              size="large"
            >禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          prop="algType"
        >
          <template #label>
            <div> 抽奖算法:
              <el-tooltip
                placement="top"
                effect="dark"
              >
                <template #content>
                  <div>随机概率：系统根据奖品数量随机抽出;</div>
                  <div>自定义奖品概率：设置奖项设置概率抽出;</div>
                </template>
                <el-icon><QuestionFilled /></el-icon>
              </el-tooltip>
            </div>
          </template>
          <el-radio-group
            v-model="formData.algType"
            class="ml-4"
          >
            <el-radio
              :value="1"
            >随机概率</el-radio>
            <el-radio
              :value="2"
            >自定义奖品概率</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-drawer>

    <el-dialog
      v-model="pageSettingShow"
      width="1000px"
      top="50px"
      title="页面设置"
      :close-on-click-modal="false"
      destroy-on-close
    >
      <page-setting
        v-if="pageSettingShow"
        :wheel-id="wheelInfo.wheelId"
        :preview-url="wheelInfo.previewUrl"
        :page-config-setting="wheelPageSettingConfig"
        :page-setting="wheelPageSetting"
        :prizes="wheelInfo.prizes"
      />
    </el-dialog>

    <el-dialog
      v-model="showWheelPrizeVisible"
      title="奖项设置"
      width="70%"
      style="min-height:600px"
    >
      <sys-wheel-prizes
        :key="wheelInfo.wheelId"
        :wheel-id="wheelInfo.wheelId"
        :wheel-name="wheelInfo.wheelName"
      />
    </el-dialog>
    <el-dialog
      v-model="showH5LinkVisible"
      title="H5链接"
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
            <template #append>
              <el-button type="primary">复制</el-button>
            </template>
          </el-input>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  createSysWheels,
  deleteSysWheels,
  deleteSysWheelsByIds,
  updateSysWheels,
  findSysWheels,
  getSysWheelsList,
  getSysWheelsTemplateInfo,
  getTemplateConfig
} from '@/api/sysWheels'
import { getSysWheelPrizesList } from '@/api/sysWheelPrizes'
import CustomPic from '@/components/customPic/index.vue'
import ChooseImg from '@/components/chooseImg/index.vue'
import QrCode from '@/components/qrCode/qrCode.vue'
import SysWheelPrizes from '@/view/sysWheelPrizes/sysWheelPrizes.vue'
// 全量引入格式化工具 请按需保留
import PageSetting from '@/view/sysWheels/pageSetting.vue'
import { formatDate } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive, nextTick } from 'vue'

defineOptions({
  name: 'SysWheels'
})

const h5LinkUrl = ref('')

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  name: '',
  uuid: '',
  needScore: 0,
  status: 0,
  template: '',
  dayGetNum: 0,
  algType: 1,
  shareTitle: '',
  shareDesc: '',
  shareImg: '',
  pageParams: '',
  startTime: new Date(),
  endTime: new Date(),
  voiceUrl: '',
  thumbUrl: '',
})

// 验证规则
const rule = reactive({
})

const templateOptions = ref([])

const getSysWheelsTemplateInfoFunc = () => {
  getSysWheelsTemplateInfo({}).then(res => {
    templateOptions.value = res.data
  })
}

getSysWheelsTemplateInfoFunc()
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
  const table = await getSysWheelsList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    deleteSysWheelsFunc(row)
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
    const res = await deleteSysWheelsByIds({ IDs })
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
const updateSysWheelsFunc = async(row) => {
  const res = await findSysWheels({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.resysWheels
    dialogFormVisible.value = true
  }
}

// 删除行
const deleteSysWheelsFunc = async(row) => {
  const res = await deleteSysWheels({ ID: row.ID })
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

// 打开页面设置标记弹窗
const openPageSettingShow = () => {
  pageSettingShow.value = true
}
/** 奖项设置弹框 */
const wheelInfo = ref({
  wheelId: 0,
  wheelName: '',
  previewUrl: '',
  prizes: []
})
const showWheelPrizeVisible = ref(false)
const showWheelPrizeVisibleFunc = (row) => {
  wheelInfo.value.wheelId = row.ID
  wheelInfo.value.wheelName = row.name
  nextTick(() => {
    showWheelPrizeVisible.value = !showWheelPrizeVisible.value
  })
}
// 页面设置标记
const pageSettingShow = ref(false)
const wheelPageSettingConfig = ref({})
const wheelPageSetting = ref({})
// 打开页面设置
const showWheelPageSettingFunc = async(row) => {
  const configInfoStr = await getTemplateConfig({ ID: row.ID })
  const configInfoObj = JSON.parse(configInfoStr.data.y)
  wheelPageSettingConfig.value = configInfoObj
  wheelPageSetting.value = configInfoStr.data.z !== '' ? JSON.parse(configInfoStr.data.z) : {}

  const prizes = await getSysWheelPrizesList({ id: row.ID, page: 1, pageSize: 30 })
  if (prizes.code === 0) {
    wheelInfo.value.prizes = prizes.data.list
    wheelInfo.value.wheelId = row.ID
    wheelInfo.value.wheelName = row.name
    wheelInfo.value.previewUrl = `${import.meta.env.VITE_FRONTEND_WEB_URL}/wheels?id=${row.uuid}`
    // 打开弹窗
    openPageSettingShow()
  } else {
    ElMessage({
      type: 'warning',
      message: '请先设置奖项'
    })
    return
  }
}

const showH5LinkVisible = ref(false)
const createH5LinkDialog = (row) => {
  h5LinkUrl.value = `${import.meta.env.VITE_FRONTEND_WEB_URL}/wheels?id=${row.uuid}`
  showH5LinkVisible.value = !showH5LinkVisible.value
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
    name: '',
    uuid: '',
    needScore: 0,
    status: 0,
    template: '',
    dayGetNum: 0,
    algType: 1,
    shareTitle: '',
    shareDesc: '',
    shareImg: '',
    pageParams: '',
    startTime: new Date(),
    endTime: new Date(),
    voiceUrl: '',
    thumbUrl: '',
  }
}
// 弹窗确定
const enterDialog = async() => {
  elFormRef.value?.validate(async(valid) => {
    if (!valid) return
    let res
    switch (type.value) {
      case 'create':
        res = await createSysWheels(formData.value)
        break
      case 'update':
        res = await updateSysWheels(formData.value)
        break
      default:
        res = await createSysWheels(formData.value)
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
/** 上传 */
const chooseImg = ref(null)
const chooseThumbUrl = ref(null)
const openHeaderChange = () => {
  chooseImg.value.open()
}

const openThumbChange = () => {
  chooseThumbUrl.value.open()
}
</script>

<style>

</style>
