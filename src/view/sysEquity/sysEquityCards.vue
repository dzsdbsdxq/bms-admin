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
          label="卡号"
          prop="card_no"
          width="350"
        />
        <el-table-column
          align="left"
          label="兑换码"
          prop="card"
          width="350"
        />
        <el-table-column
          align="left"
          label="兑换人"
          prop="user_name"
          width="150"
        />
        <el-table-column
          align="left"
          label="订单ID"
          prop="order_id"
          width="220"
        />
        <el-table-column
          align="left"
          label="兑换手机号"
          prop="mobile"
          width="200"
        />
        <el-table-column
          align="left"
          label="兑换时间"
          prop="created_at"
          width="220"
        />
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
    <el-dialog
      v-model="dialogFormVisible"
      :show-close="true"
      width="40%"
      :title="type===`create`?`添加`:`修改`"
      :before-close="closeDialog"
    >
      <template #footer>
        <div class="flex items-center justify-between">
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
          label="卡号："
          prop="card_no"
        >
          <el-input
            v-model="formData.card_no"
            :clearable="true"
            rows="20"
            placeholder="请输入卡号"
          />
        </el-form-item>
        <el-form-item
          label="兑换码："
          prop="cards"
        >
          <el-input
            v-model="formData.cards"
            :clearable="true"
            rows="20"
            placeholder="请输入兑换码"
          />
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  createSysEquityCards,
  getSysEquityCardsList
} from '@/api/sysEquityCards'
// 全量引入格式化工具 请按需保留
import { ElMessage } from 'element-plus'
import { ref, reactive, defineProps } from 'vue'
defineOptions({
  name: 'SysEquityCards'
})
const props = defineProps({
  equityId: {
    type: Number,
    default: 0
  }
})

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  eid: props.equityId,
  card_no: '',
  cards: '',
  cards_arr: [],
})
// 验证规则
const rule = reactive({
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
  const table = await getSysEquityCardsList({ page: page.value, pageSize: pageSize.value, eid: props.equityId, ...searchInfo.value })
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
    eid: props.equityId,
    card_no: '',
    cards: '',
    cards_arr: [],
  }
}
// 弹窗确定
const enterDialog = async() => {
  elFormRef.value?.validate(async(valid) => {
    if (!valid) return
    if (!formData.value.card_no) {
      ElMessage({
        type: 'error',
        message: '请输入卡号'
      })
      return
    }
    if (!formData.value.cards) {
      ElMessage({
        type: 'error',
        message: '请输入兑换码'
      })
      return
    }
    // formData.value.cards = formData.value.cards.replace(/\n/g, '')
    formData.value.cards_arr = formData.value.cards.split('\n')

    let res
    switch (type.value) {
      case 'create':
        res = await createSysEquityCards(formData.value)
        break
      case 'update':
        res = await updateSysEquityCards(formData.value)
        break
      default:
        res = await createSysEquityCards(formData.value)
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
