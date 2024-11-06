<template>
  <div>
    <div class="gva-table-box">
      <warning-bar
        title="此处为存储空间文件上传，方便H5端展示图片，请不要上传违法图片，且图片大小不要超过15M"
      />
      <div class="gva-btn-list">
        <upload-common
          :image-common="imageCommon"
          @on-success="getTableData"
        />
        <upload-common
          :image-common="imageCommon"
          :text-tag="`本地上传`"
          :btn-type="`warning`"
          :engine="`sztv`"
          @on-success="getTableData"
        />
        <el-input
          v-model="search.keyword"
          class="keyword"
          size="small"
          placeholder="请输入文件名或备注"
        />
        <el-button
          type="primary"
          icon="search"
          size="small"
          @click="getTableData"
        >查询</el-button>
      </div>

      <el-table :data="tableData">
        <el-table-column
          align="left"
          label="预览"
          width="100"
        >
          <template #default="scope">
            <CustomPic
              pic-type="file"
              :pic-src="scope.row.url"
              preview
            />
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="文件名/备注"
          prop="name"
          width="300"
        >
          <template #default="scope">
            <div
              class="name"
              @click="editFileNameFunc(scope.row)"
            >{{ scope.row.name }}</div>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="链接"
          prop="url"
          min-width="250"
        >
        <template #default="scope">
            <el-input
              v-model="scope.row.url"
              style="width: 240px"
              disabled
            />
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="标签"
          prop="tag"
          width="100"
        >
          <template #default="scope">
            <el-tag
              :type="scope.row.tag === 'jpg' ? 'info' : 'success'"
              disable-transitions
            >{{ scope.row.tag }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="日期"
          prop="UpdatedAt"
          width="180"
        >
          <template #default="scope">
            <div>{{ formatDate(scope.row.UpdatedAt) }}</div>
          </template>
        </el-table-column>
        <el-table-column
          align="left"
          label="操作"
          width="160"
        >
          <template #default="scope">
            <el-button
              icon="download"
              type="primary"
              size="small"
              link
              @click="copyFile(scope.row)"
            >复制</el-button>
            <el-button
              icon="delete"
              type="primary"
              size="small"
              link
              @click="deleteFileFunc(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="gva-pagination">
        <el-pagination
          :current-page="page"
          :page-size="pageSize"
          :page-sizes="[10, 30, 50, 100]"
          :style="{ float: 'right', padding: '20px' }"
          :total="total"
          small
          layout="total, sizes, prev, pager, next"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getFileList, deleteFile, editFileName } from '@/api/fileUploadAndDownload'
// import { downloadImage } from '@/utils/downloadImg'
import CustomPic from '@/components/customPic/index.vue'
import UploadCommon from '@/components/upload/common.vue'
import { formatDate } from '@/utils/format'
import WarningBar from '@/components/warningBar/warningBar.vue'
import useClipboard from 'vue-clipboard3'
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const { toClipboard } = useClipboard()
defineOptions({
  name: 'Upload',
})

// const path = ref(import.meta.env.VITE_BASE_API)

const imageCommon = ref('')

const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const search = ref({})
const tableData = ref([])

// 分页
const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}

// 查询
const getTableData = async() => {
  const table = await getFileList({ page: page.value, pageSize: pageSize.value, ...search.value })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}
getTableData()

const deleteFileFunc = async(row) => {
  ElMessageBox.confirm('此操作将永久删除文件, 是否继续?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  })
    .then(async() => {
      const res = await deleteFile(row)
      if (res.code === 0) {
        ElMessage({
          type: 'success',
          message: '删除成功!',
        })
        if (tableData.value.length === 1 && page.value > 1) {
          page.value--
        }
        getTableData()
      }
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除',
      })
    })
}

// const downloadFile = (row) => {
//   if (row.url.indexOf('http://') > -1 || row.url.indexOf('https://') > -1) {
//     downloadImage(row.url, row.name)
//   } else {
//     debugger
//     downloadImage(path.value + '/' + row.url, row.name)
//   }
// }

const copyFile = async(row) => {
  try {
    await toClipboard(row.url)
    ElMessage({
      type: 'success',
      message: '复制成功',
    })
  } catch (e) {
    console.error(e)
  }
}

/**
 * 编辑文件名或者备注
 * @param row
 * @returns {Promise<void>}
 */
const editFileNameFunc = async(row) => {
  ElMessageBox.prompt('请输入文件名或者备注', '编辑', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /\S/,
    inputErrorMessage: '不能为空',
    inputValue: row.name
  }).then(async({ value }) => {
    row.name = value
    // console.log(row)
    const res = await editFileName(row)
    if (res.code === 0) {
      ElMessage({
        type: 'success',
        message: '编辑成功!',
      })
      getTableData()
    }
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消修改'
    })
  })
}
</script>

<style scoped>
.name {
  cursor: pointer;
}

</style>
