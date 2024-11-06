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
        <el-form-item label="支付状态">
          <el-select
            v-model="searchInfo.order_status"
            placeholder="选择支付状态"
            size="small"
          >
            <el-option
              v-for="item in [{label:'未支付',value:1},{label:'已支付',value:2
              }]"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="核销状态">
          <el-select
            v-model="searchInfo.off_status"
            placeholder="选择核销状态"
            size="small"
          >
            <el-option
              v-for="item in [{label:'全部',value:0},{label:'未核销',value:2},{label:'已核销',value:1
              }]"
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
          label="商品名称"
          prop="name"
          width="200"
        />
        <el-table-column
          align="left"
          label="订单号"
          prop="order_id"
          width="300"
        />
        <el-table-column
          align="left"
          label="类型"
          prop="type"
          width="120"
        >
          <template #default="scope">
            <el-tag
              v-if="scope.row.type==1"
              type="primary"
            >1个月</el-tag>
            <el-tag
              v-if="scope.row.type==2"
              type="primary"
            >6个月</el-tag>
            <el-tag
              v-if="scope.row.type==3"
              type="primary"
            >连续包月</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="售价"
          prop="price"
          width="80"
        />
        <el-table-column
          align="left"
          label="实际支付"
          prop="payer_total"
          width="80"
        />
        <el-table-column
          align="left"
          label="状态"
          prop="order_status"
          width="120"
        >
          <template #default="scope">
            <el-tag
              v-if="scope.row.order_status==1"
              type="danger"
            >未支付</el-tag>
            <el-tag
              v-if="scope.row.order_status==2"
              type="primary"
            >已支付</el-tag></template>
        </el-table-column>
        <el-table-column
          align="left"
          label="手机号"
          prop="mobile"
          width="150"
        />
        <el-table-column
          align="left"
          label="支付方式"
          prop="pay_type"
          width="80"
        />
        <el-table-column
          align="left"
          label="商户订单号"
          prop="transaction_id"
          width="280"
        />
        <el-table-column
          align="left"
          label="核销状态"
          prop="off_status"
          width="80"
        >
        <template #default="scope">
            <el-tag
              v-if="scope.row.off_status==0"
              type="danger"
            >未核销</el-tag>
            <el-tag
              v-if="scope.row.off_status==1"
              type="primary"
            >已核销</el-tag></template>
        </el-table-column>
        <el-table-column
          align="left"
          label="备注说明"
          prop="remark"
          width="120"
        />
        <el-table-column
          align="left"
          label="创建时间"
          prop="CreatedAt"
          width="280"
        />
        <el-table-column
          align="left"
          label="支付时间"
          prop="success_time"
          width="280"
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
  </div>
</template>

<script setup>
import {
  getSysEquityOrdersList
} from '@/api/sysEquityOrders'
  // 全量引入格式化工具 请按需保留
import { ref, reactive } from 'vue'
defineOptions({
  name: 'SysEquityOrders'
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

// const
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
  const table = await getSysEquityOrdersList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
// const getDetails = (row) => {
//   dialogDetailFormVisible.value = true
//   extendDetailInfo.id = row.ID
//   extendDetailInfo.appId = row.appid
//   extendDetailInfo.dType = row.d_type
// }

// 弹窗控制标记

</script>

    <style>

    </style>
