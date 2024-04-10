<template>
  <div>
    <div class="flex items-center justify-center w-full h-screen bg-gray-50">
      <div class="flex flex-col items-center gap-4 text-2xl">
        <img src="../../assets/notFound.png">
        <el-button
          size="small"
          @click="toDashboard"
        >返回首页</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/pinia/modules/user'
import { useRouter } from 'vue-router'

defineOptions({
  name: 'Error'
})

const userStore = useUserStore()
const router = useRouter()
const toDashboard = () => {
  router.push({ name: userStore.userInfo.authority.defaultRouter })
}
</script>
