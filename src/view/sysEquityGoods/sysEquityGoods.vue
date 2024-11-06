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
          label="商品名称"
          prop="name"
          width="150"
        />
        <el-table-column
          align="left"
          label="商品规格"
          prop="sku"
          width="150"
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
          label="原价"
          prop="orig_price"
          width="80"
        />
        <el-table-column
          align="left"
          label="状态"
          prop="status"
          width="120"
        >
          <template #default="scope">
            <el-tag :type="scope.row.status==1?`primary`:`warning`">{{ formatBoolean2(scope.row.status) }}</el-tag></template>
        </el-table-column>
        <el-table-column
          align="left"
          label="备注说明"
          prop="remark"
          width="120"
        />
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
              @click="updateSysEquityGoodsFunc(scope.row)"
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
          label="商品名称："
          prop="name"
        >
          <el-input
            v-model="formData.name"
            :clearable="true"
            placeholder="请输入商品名称"
          />
        </el-form-item>
        <el-form-item
          label="商品规格："
          prop="sku"
        >
          <el-input
            v-model="formData.sku"
            :clearable="true"
            placeholder="请输入商品规格"
          />
        </el-form-item>
        <el-form-item
          label="售价："
          prop="price"
        >
          <el-input
            v-model="formData.price"
            :clearable="true"
            placeholder="请输入售价"
          />
        </el-form-item>
        <el-form-item
          label="原价："
          prop="desc"
        >
          <el-input
            v-model="formData.orig_price"
            :clearable="true"
            placeholder="请输入原价"
          />
        </el-form-item>
        <el-form-item
          label="类型："
          props="type"
        >
          <el-radio-group
            v-model="formData.type"
            size="small"
          >
            <el-radio-button
              v-for="(option,idx) in dTypeOptions"
              :key="idx"
              :label="option.label"
              :value="option.value"
            />
          </el-radio-group>
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
            inactive-text="停用"
            clearable
          />
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog
      v-model="dialogDetailFormVisible"
      :show-close="true"
      width="70%"
      :title="`查看`"
      :before-close="closeDetailDialog"
    >
      <sys-extends-details
        v-if="dialogDetailFormVisible"
        :extend-id="extendDetailInfo.id"
        :app-id="extendDetailInfo.appId"
        :d-type="extendDetailInfo.dType"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import {
  createSysEquityGoods,
  deleteSysEquityGoodsByIds,
  updateSysEquityGoods,
  findSysEquityGoods,
  getSysEquityGoodsList,
  deleteSysEquityGoods
} from '@/api/sysEquityGoods'
// 全量引入格式化工具 请按需保留
import { formatBoolean2 } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'
import SysExtendsDetails from '@/view/sysExtendsDetails/sysExtendsDetails.vue'
defineOptions({
  name: 'SysEquityGoods'
})
const dTypeOptions = ref([
  {
    label: '1个月',
    value: '1'
  },
  {
    label: '3个月',
    value: '2'
  },
  {
    label: '6个月',
    value: '3'
  },
])

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  name: '',
  sku: '',
  type: '1',
  status: true,
  price: '',
  orig_price: '',
  remark: ''
})
const dialogDetailFormVisible = ref(false)

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
  const table = await getSysEquityGoodsList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    deleteSysEquityGoodsFunc(row)
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
    const res = await deleteSysEquityGoodsByIds({ IDs })
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
const updateSysEquityGoodsFunc = async(row) => {
  const res = await findSysEquityGoods({ ID: row.ID })
  type.value = 'update'
  if (res.code === 0) {
    formData.value = res.data.resysEquityGoods
    dialogFormVisible.value = true
  }
}

// 删除行
const deleteSysEquityGoodsFunc = async(row) => {
  const res = await deleteSysEquityGoods({ ID: row.ID })
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
const extendDetailInfo = reactive({
  id: 0,
  appId: '',
  dType: 'text'
})
// const getDetails = (row) => {
//   dialogDetailFormVisible.value = true
//   extendDetailInfo.id = row.ID
//   extendDetailInfo.appId = row.appid
//   extendDetailInfo.dType = row.d_type
// }

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
    sku: '',
    type: '1',
    status: true,
    price: '',
    orig_price: '',
    remark: ''
  }
}
const closeDetailDialog = () => {
  dialogDetailFormVisible.value = false
}
// 弹窗确定
const enterDialog = async() => {
  elFormRef.value?.validate(async(valid) => {
    if (!valid) return
    formData.value.type = parseInt(formData.value.type)
    formData.value.status = formData.value.status ? 1 : 2
    formData.value.price = parseFloat(formData.value.price)
    formData.value.orig_price = parseFloat(formData.value.orig_price)
    let res
    switch (type.value) {
      case 'create':
        res = await createSysEquityGoods(formData.value)
        break
      case 'update':
        res = await updateSysEquityGoods(formData.value)
        break
      default:
        res = await createSysEquityGoods(formData.value)
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
