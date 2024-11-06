<template>
  <div class="page">

    <div class="gva-card-box">
      <div class="gva-card quick-entrance">
        <div class="gva-card-title">工具箱</div>
        <el-row :gutter="20">
          <el-col
            v-for="(card, key) in toolCards"
            :key="key"
            :span="4"
            :xs="8"
            class="quick-entrance-items"
            @click="toTarget(card.name)"
          >
            <div class="quick-entrance-item">
              <div
                class="quick-entrance-item-icon"
                :style="{ backgroundColor: card.bg }"
              >
                <el-icon>
                  <component
                    :is="card.icon"
                    :style="{ color: card.color }"
                  />
                </el-icon>
              </div>
              <p>{{ card.label }}</p>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <el-dialog
      v-model="dialogFlushCdnFormVisible"
      :show-close="true"
      width="60%"
      :title="`刷新CDN`"
      :before-close="closeFlushCdnDialog"
    >
      <Cdn />
    </el-dialog>
  </div>
</template>

<script setup>
import Cdn from './cdn.vue'
import { ref } from 'vue'
defineOptions({
  name: 'SysTools'
})
const dialogFlushCdnFormVisible = ref(false)

const toolCards = ref([
  {
    label: 'CDN刷新',
    icon: 'monitor',
    name: 'cdn',
    color: '#ff9c6e',
    bg: 'rgba(255, 156, 110,.3)'
  }
])
const closeFlushCdnDialog = () => {
  dialogFlushCdnFormVisible.value = false
}
const toTarget = (name) => {
  if (name === 'cdn') {
    dialogFlushCdnFormVisible.value = true
  }
}

</script>

<style lang="scss" scoped>
.page {
    @apply p-0;
    .gva-card-box{
      @apply p-4;
      &+.gva-card-box{
        @apply pt-0;
      }
    }
    .gva-card {
      @apply box-border bg-white rounded h-auto px-6 py-8 overflow-hidden shadow-sm;
      .gva-card-title{
        @apply pb-5 border-t-0 border-l-0 border-r-0 border-b border-solid border-gray-100;
      }
    }
    .gva-top-card {
        @apply h-72 flex items-center justify-between text-gray-500;
        &-left {
          @apply h-full flex flex-col w-auto;
            &-title {
              @apply text-3xl text-gray-600;
            }
            &-dot {
              @apply mt-4 text-gray-600 text-lg;
            }
            &-item{
              +.gva-top-card-left-item{
                margin-top: 24px;
              }
              margin-top: 14px;
            }
        }
        &-right {
            height: 600px;
            width: 600px;
            margin-top: 28px;
        }
    }
     ::v-deep(.el-card__header){
          @apply p-0  border-gray-200;
        }
        .card-header{
          @apply pb-5 border-b border-solid border-gray-200 border-t-0 border-l-0 border-r-0;
        }
    .quick-entrance-items {
      @apply flex items-center justify-center text-center text-gray-800;
        .quick-entrance-item {
          @apply px-8 py-6 flex items-center flex-col transition-all duration-100 ease-in-out rounded-lg cursor-pointer;
          &:hover{
            @apply shadow-lg;
          }
            &-icon {
              @apply flex items-center h-16 w-16 rounded-lg justify-center mx-0 my-auto text-2xl;
            }
            p {
                @apply mt-2.5;
            }
        }
    }
}
.dashboard-icon {
  @apply flex items-center text-xl mr-2 text-blue-400;
}

</style>
