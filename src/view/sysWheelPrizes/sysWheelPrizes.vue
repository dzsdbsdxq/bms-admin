<template>
  <div>
    <div class="p-0 gva-table-box">
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
          label="奖品名称"
          prop="name"
          :show-overflow-tooltip="true"
          width="220"
        />
        <el-table-column
          align="left"
          label="简短奖品名称"
          prop="shortName"
          :show-overflow-tooltip="true"
          width="120"
        />
        <el-table-column
          align="left"
          label="奖品图片"
          prop="thumbUrl"
          width="120"
        >
          <template #default="scope">
            <CustomPic
              style="justify-content: start;max-width:50px;max-height:50px;"
              :pic-type="`avatar`"
              :pic-src="scope.row.thumbUrl"
            />
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="奖品数量"
          prop="nums"
          width="120"
        />
        <el-table-column
          align="left"
          label="已抽数量"
          prop="useNums"
          width="120"
        />
        <el-table-column
          align="left"
          label="奖品概率(%)"
          prop="perc"
          width="120"
        />
        <el-table-column
          align="left"
          label="是否实物"
          prop="type"
          width="120"
        >
          <template #default="scope">
            <el-tag
              v-if="scope.row.type == 1"
              type="success"
            >是</el-tag>
            <el-tag
              v-else
              type="danger"
            >否</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="填写地址"
          prop="needAddr"
          width="120"
        >
          <template #default="scope">
            <el-tag
              v-if="scope.row.needAddr == 1"
              type="success"
            >需要</el-tag>
            <el-tag
              v-else
              type="danger"
            >不需要</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="中奖项"
          prop="isHit"
          width="120"
        >
          <template #default="scope">
            <el-tag
              v-if="scope.row.isHit == 1"
              type="success"
            >是</el-tag>
            <el-tag
              v-else
              type="danger"
            >否</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="操作"
          fixed="right"
          min-width="210"
        >
          <template #default="scope">
            <el-button
              type="primary"
              link
              icon="edit"
              class="table-button"
              @click="updateSysWheelPrizesFunc(scope.row)"
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
    </div>
    <el-drawer
      v-model="dialogFormVisible"
      size="800"
      :show-close="false"
      :before-close="closeDialog"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-lg">{{ type==='create'?'添加奖项':'修改奖项' }}</span>
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
          label="奖品名称:"
          prop="name"
        >
          <el-input
            v-model="formData.name"
            :clearable="true"
            placeholder="请输入奖品名称"
          />
        </el-form-item>
        <el-form-item
          label="简短奖品名称:"
          prop="shortName"
        >
          <el-input
            v-model="formData.shortName"
            :clearable="true"
            placeholder="请输入简短奖品名称"
          />
        </el-form-item>
        <el-form-item
          label="奖品图片:"
          prop="thumbUrl"
        >
          <div
            style="display: inline-block;max-width:100px;max-height:100px;"
            @click="openHeaderChange"
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
              ref="chooseImg"
              :target="formData"
              :target-key="`thumbUrl`"
            />
          </div>
        </el-form-item>
        <el-form-item
          label="奖品数量:"
          prop="nums"
        >
          <el-input
            v-model.number="formData.nums"
            :clearable="true"
            type="number"
            placeholder="请输入奖品数量"
          />
        </el-form-item>
        <el-form-item
          label="奖品概率(%):"
          prop="perc"
        >
          <el-input
            v-model="formData.perc"
            class="w-full"
            :clearable="true"
            placeholder="请输入奖品概率"
          />
        </el-form-item>
        <el-form-item
          label="是否实物:"
          prop="type"
        >
          <el-radio-group
            v-model="formData.type"
            class="ml-4"
          >
            <el-radio
              :value="0"
            >否</el-radio>
            <el-radio
              :value="1"
            >是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="实物是否需要填写地址:"
          prop="needAddr"
        >
          <el-radio-group
            v-model="formData.needAddr"
            class="ml-4"
          >
            <el-radio
              :value="0"
            >否</el-radio>
            <el-radio
              :value="1"
            >是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="该奖项是否设为中奖:"
          prop="isHit"
        >
          <el-radio-group
            v-model="formData.isHit"
            class="ml-4"
          >
            <el-radio
              :value="0"
            >否</el-radio>
            <el-radio
              :value="1"
            >是</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-drawer>
  </div>
</template>

<script setup>
import {
  createSysWheelPrizes,
  deleteSysWheelPrizes,
  deleteSysWheelPrizesByIds,
  updateSysWheelPrizes,
  findSysWheelPrizes,
  getSysWheelPrizesList
} from '@/api/sysWheelPrizes'
import CustomPic from '@/components/customPic/index.vue'
import ChooseImg from '@/components/chooseImg/index.vue'
// 全量引入格式化工具 请按需保留
// mport { formatDate } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref } from 'vue'
const props = defineProps({
  wheelId: {
    type: Number,
    default: 0
  },
  wheelName: {
    type: String,
    default: ''
  }
})
console.log(props)
defineOptions({
  name: 'SysWheelPrizes'
})

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  name: '',
  shortName: '',
  wheelId: props.wheelId,
  uuid: '',
  thumbUrl: '',
  nums: 0,
  useNums: 0,
  perc: 0,
  type: 0,
  needAddr: 0,
  isHit: 0,
})

// 验证规则

const elFormRef = ref()
// =========== 表格控制部分 ===========
const tableData = ref([])

// 查询
const getTableData = async() => {
  const table = await getSysWheelPrizesList({ id: props.wheelId, page: 1, pageSize: 30 })
  if (table.code === 0) {
    tableData.value = table.data.list
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
    deleteSysWheelPrizesFunc(row)
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
    const res = await deleteSysWheelPrizesByIds({ IDs })
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
const updateSysWheelPrizesFunc = async(row) => {
  const res = await findSysWheelPrizes({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.resysWheelPrizes
    dialogFormVisible.value = true
  }
}

// 删除行
const deleteSysWheelPrizesFunc = async(row) => {
  const res = await deleteSysWheelPrizes({ ID: row.ID })
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
    name: '',
    shortName: '',
    wheelId: props.wheelId,
    uuid: '',
    thumbUrl: '',
    nums: 0,
    useNums: 0,
    perc: 0,
    type: 0,
    needAddr: 0,
    isHit: 0,
  }
}
// 弹窗确定
const enterDialog = async() => {
  elFormRef.value?.validate(async(valid) => {
    if (!valid) return
    let res
    formData.value.perc = parseFloat(formData.value.perc)
    switch (type.value) {
      case 'create':
        res = await createSysWheelPrizes(formData.value)
        break
      case 'update':
        res = await updateSysWheelPrizes(formData.value)
        break
      default:
        res = await createSysWheelPrizes(formData.value)
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
const openHeaderChange = () => {
  chooseImg.value.open()
}
</script>

<style>

</style>
