
<template>
  <div>
    <div class="gva-table-box">
      <div class="gva-btn-list">
        <el-button
          type="primary"
          icon="plus"
          size="small"
          @click="openDialog"
        >添加任务</el-button>
        <!-- <el-button
          icon="delete"
          style="margin-left: 10px;"
          size="small"
          :disabled="!multipleSelection.length"
          @click="onDelete"
        >删除</el-button> -->
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
          label="项目名称"
          prop="name"
          width="220"
        />

        <el-table-column
          align="left"
          label="令牌用户名"
          prop="user"
          width="220"
        />
        <el-table-column
          align="left"
          label="git地址"
          prop="url"
          width="400"
        >
          <template #default="scope">
            <el-input
              style="width: 100%"
              size="small"
              :value="`${scope.row.url}`"
              disabled
            />
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="项目分支"
          prop="branch"
          width="120"
        />
        <el-table-column
          align="left"
          label="访问路径"
          prop="remark"
          width="400"
        >
          <template #default="scope">
            <el-input
              style="width: 100%"
              size="small"
              :value="`https://www.sztv.com.cn/huodong/${scope.row.remark}/`"
              disabled
            />
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="状态"
          prop="status"
          width="120"
        >
          <template #default="scope">
            <el-tag :type="scope.row.status==1 ?`primary`: scope.row.status == 2 ? `warning`:`success`">{{ scope.row.status == 1 ? "闲置": scope.row.status == 2 ? "部署中":"完成" }}</el-tag></template>
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
              class="table-button"
              @click="getPull(scope.row)"
            >
              <el-icon style="margin-right: 5px"><Van /></el-icon>
              拉取
            </el-button>
            <!-- <el-button
              type="primary"
              link
              icon="edit"
              class="table-button"
              @click="updateSysGitsFunc(scope.row)"
            >变更</el-button> -->
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
          small
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      width="30%"
      :show-close="true"
      :title="type===`create`?`添加任务`:`修改任务`"
      :before-close="closeDialog"
    >
      <template #footer>
        <div class="flex items-center justify-between">
          <div>
            <el-button
              type="primary"
              size="small"
              :loading="submitLoading.value"
              @click="enterDialog"
            >{{ submitText }}</el-button>
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
          label="项目名称:"
          prop="name"
        >
          <el-input
            v-model="formData.name"
            :clearable="true"
            placeholder="请输入项目名称"
          />
        </el-form-item>
        <el-form-item
          label="部署令牌用户名:"
          prop="user"
        >
          <template #label>
            <div>
              <span> 部署令牌用户名： </span>
              <el-tooltip
                content="点击查看如何获取部署令牌？"
                placement="top"
                effect="light"
              >
                <span
                  style="color:red;cursor:pointer;"
                  @click="howToCreateAuth"
                >如何获取部署令牌？
                  <el-icon><QuestionFilled /></el-icon>
                </span>
              </el-tooltip>
            </div>
          </template>
          <el-input
            v-model="formData.user"
            :clearable="true"
            placeholder="请输入git仓库部署令牌用户名"
          />
        </el-form-item>
        <el-form-item
          label="部署令牌密码:"
          prop="auth"
        >
          <template #label>
            <div>
              <span> 部署令牌密码： </span>
              <el-tooltip
                content="点击查看如何获取部署令牌密码？"
                placement="top"
                effect="light"
              >
                <span
                  style="color:red;cursor:pointer;"
                  @click="howToCreateAuth"
                >如何获取部署令牌？
                  <el-icon><QuestionFilled /></el-icon>
                </span>
              </el-tooltip>
            </div>
          </template>
          <el-input
            v-model="formData.auth"
            :clearable="true"
            placeholder="请输入部署令牌"
          />
        </el-form-item>
        <el-form-item
          label="git地址:"
          prop="url"
        >
          <el-input
            v-model="formData.url"
            :clearable="true"
            placeholder="请输入git地址（https://example.com/example.git）"
          />
        </el-form-item>
        <el-form-item
          label="分支名称:"
          prop="branch"
        >
          <el-input
            v-model="formData.branch"
            :clearable="true"
            placeholder="请输入分支名称(默认master分支)"
          />
        </el-form-item>
        <el-form-item
          label="项目访问路径:"
          prop="remark"
        >
          <el-input
            v-model="formData.remark"
            :clearable="true"
            placeholder="请输入项目访问路径(前后不需携带/)"
          >
            <template #prepend>https://www.sztv.com.cn/huodong/</template>
          </el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script setup>
import {
  createSysGits,
  deleteSysGits,
  // deleteSysGitsByIds,
  updateSysGits,
  getSysGitsPull,
  // findSysGits,
  getSysGitsList
} from '@/api/sysGits'

// 全量引入格式化工具 请按需保留
import { formatDate } from '@/utils/format'
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive } from 'vue'

defineOptions({
  name: 'SysGits'
})
const submitLoading = ref(false)
const submitText = ref('确 定')

// 自动化生成的字典（可能为空）以及字段
const formData = ref({
  auth: '',
  branch: 'master',
  name: '',
  operator: '',
  remark: '',
  url: '',
  user: '',
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
  const table = await getSysGitsList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
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
    deleteSysGitsFunc(row)
  })
}
const howToCreateAuth = () => {
  window.open('https://www.sztv.com.cn/ysz/upload/Image/mrtp/2024/11/08/2d7de757156041569066d5e9f095ea20.png')
}

// 多选删除
/*
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
    const res = await deleteSysGitsByIds({ IDs })
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
*/

// 行为控制标记（弹窗内部需要增还是改）
const type = ref('')

// 更新行
// const updateSysGitsFunc = async(row) => {
//   const res = await findSysGits({ ID: row.ID })
//   type.value = 'update'
//   if (res.code === 0) {
//     formData.value = res.data.resysGits
//     dialogFormVisible.value = true
//   }
// }

// 删除行
const deleteSysGitsFunc = async(row) => {
  const res = await deleteSysGits({ ID: row.ID })
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
const getPull = async(row) => {
  const res = await getSysGitsPull({ ID: row.ID })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '拉取成功'
    })
  }
}
// 查看详情控制标记
// const detailShow = ref(false)

// // 打开详情弹窗
// const openDetailShow = () => {
//   detailShow.value = true
// }

// // 打开详情
// const getDetails = async(row) => {
//   // 打开弹窗
//   const res = await findSysGits({ ID: row.ID })
//   if (res.code === 0) {
//     formData.value = res.data.resysGits
//     openDetailShow()
//   }
// }

// // 关闭详情弹窗
// const closeDetailShow = () => {
//   detailShow.value = false
//   formData.value = {
//     auth: '',
//     branch: '',
//     name: '',
//     operator: '',
//     remark: '',
//     url: '',
//     user: '',
//   }
// }

// 打开弹窗
const openDialog = () => {
  type.value = 'create'
  dialogFormVisible.value = true
}

// 关闭弹窗
const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = {
    auth: '',
    branch: '',
    name: '',
    operator: '',
    remark: '',
    url: '',
    user: '',
  }
}
// 弹窗确定
const enterDialog = async() => {
  elFormRef.value?.validate(async(valid) => {
    if (!valid) return
    submitLoading.value = true
    submitText.value = '部署中'
    // formData.value.auth = SimpleCryptoEncode(formData.value.auth)
    formData.value.branch = formData.value.branch === '' ? 'master' : formData.value.branch
    let res
    switch (type.value) {
      case 'create':
        res = await createSysGits(formData.value)
        break
      case 'update':
        res = await updateSysGits(formData.value)
        break
      default:
        res = await createSysGits(formData.value)
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
    submitLoading.value = false
    submitText.value = '确 定'
  })
}

</script>

  <style>

  </style>

