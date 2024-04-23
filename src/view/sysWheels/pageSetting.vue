<template>
  <div>
    <div
      class="gva-form-box"
    >
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          label="转盘设置"
          name="first"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form
                ref="elFormRef"
                :model="luckyConfigForm"
                label-position="right"
                :rules="rule"
                label-width="auto"
              >
                <el-collapse
                  v-model="wheelActiveName"
                  accordion
                >
                  <el-collapse-item
                    title="转盘背景图"
                    name="1"
                  >
                    <el-row>
                      <el-col
                        :span="24"
                        class="flex align-middle justify-evenly"
                      >
                        <div
                          style="display: inline-block;width:120px;height:120px;"
                          @click="openBlockHeaderChange()"
                        >
                          <img
                            v-if="blocks.src"
                            alt="缩略图"
                            class="header-img-box"
                            style="width:100%;height:100%;cursor: pointer;object-fit: cover;"
                            :src="blocks.src"
                          >
                          <div
                            v-else
                            class="flex header-img-box"
                            style="cursor: pointer;width:100px;height:100px;border:1px dotted #ccc;display:flex;justify-content:center;align-items:center;"
                          >从媒体库选择</div>
                          <ChooseImg
                            :ref="`chooseImg_blocks_1`"
                            :target="blocks"
                            :target-key="`src`"
                          />
                        </div>
                        <div>
                          <div>
                            <el-form-item label="宽度：">
                              <el-input v-model="luckyConfigForm.width" />
                            </el-form-item>
                          </div>
                          <div>
                            <el-form-item label="高度：">
                              <el-input v-model="luckyConfigForm.height" />
                            </el-form-item>
                          </div>
                          <div>
                            <el-form-item label="内边距：">
                              <el-input v-model="blocks.padding" />
                            </el-form-item>
                          </div>
                        </div>
                      </el-col>
                    </el-row>

                  </el-collapse-item>
                  <el-collapse-item
                    name="2"
                    title="奖项设置"
                  >
                    <el-card
                      v-for="(prize,index) in generatePrizeForm"
                      :key="index"
                      shadow="hover"
                      class="prizeSettingBox"
                      :body-style="{padding:'10px',}"
                      style="margin-bottom: 10px;"
                    >
                      <template #header>
                        <div class="flex justify-between card-header">
                          <span class="flex items-center justify-start">
                            <el-avatar
                              :size="20"
                              style="margin-right: 10px;"
                              :src="prize.src"
                            />
                            奖项{{ index + 1 }}：{{ prize.text }}</span>
                          <el-button
                            v-if="index == 0"
                            size="small"
                            type="primary"
                            @click="syncPrizeFunc(index)"
                          >同步至其他奖项</el-button>
                        </div>
                      </template>
                      <el-descriptions
                        size="small"
                        :column="2"
                      >
                        <el-descriptions-item label="奖品底板：">
                          <el-input
                            v-model="prize.background"
                            size="small"
                            style="width:100px;"
                            class="prizes_text-input"
                          >
                            <template #append>
                              <el-color-picker
                                v-model="prize.background"
                                size="small"
                              />
                            </template>

                          </el-input>
                        </el-descriptions-item>
                        <el-descriptions-item label="图片位置：">
                          <el-input
                            v-model="prize.top"
                            size="small"
                            style="width:100px;"
                          />
                        </el-descriptions-item>
                        <el-descriptions-item label="图片宽度：">
                          <el-input
                            v-model="prize.width"
                            size="small"
                            style="width:100px;"
                          />
                        </el-descriptions-item>
                        <el-descriptions-item label="图片高度：">
                          <el-input
                            v-model="prize.height"
                            size="small"
                            style="width:100px;"
                          />
                        </el-descriptions-item>
                        <el-descriptions-item label="文字位置：">
                          <el-input
                            v-model="prize.textTop"
                            size="small"
                            style="width:100px;"
                          />
                        </el-descriptions-item>
                        <el-descriptions-item label="文字颜色：">
                          <el-input
                            v-model="prize.textColor"
                            size="small"
                            style="width:100px;"
                            class="prizes_text-input"
                          >
                            <template #append>
                              <el-color-picker
                                v-model="prize.textColor"
                                size="small"
                              />
                            </template>
                          </el-input>
                        </el-descriptions-item>
                        <el-descriptions-item label="文字大小：">
                          <el-input
                            v-model="prize.textSize"
                            size="small"
                            style="width:100px;"
                          />
                        </el-descriptions-item>
                      </el-descriptions>

                    </el-card>
                  </el-collapse-item>
                  <el-collapse-item
                    name="3"
                    title="抽奖按钮"
                  >
                    <el-row>
                      <el-col
                        :span="24"
                        class="flex align-middle justify-evenly"
                      >
                        <div
                          style="display: inline-block;width:140px;height:160px;"
                          @click="openButtonsHeaderChange()"
                        >
                          <img
                            v-if="buttons.src"
                            alt="缩略图"
                            class="header-img-box"
                            style="width:100%;height:100%;cursor: pointer;object-fit: cover;"
                            :src="buttons.src"
                          >
                          <div
                            v-else
                            class="flex header-img-box"
                            style="cursor: pointer;width:100px;height:100px;border:1px dotted #ccc;display:flex;justify-content:center;align-items:center;"
                          >从媒体库选择</div>
                          <ChooseImg
                            :ref="`chooseImg_buttons_1`"
                            :target="buttons"
                            :target-key="`src`"
                          />
                        </div>
                        <div style="padding:0px 20px 0px 0px">
                          <div>
                            <el-form-item label="半径：">
                              <el-input v-model="buttons.radius" />
                            </el-form-item>
                          </div>
                          <div>
                            <el-form-item label="位置：">
                              <el-input v-model="buttons.top" />
                            </el-form-item>
                          </div>
                          <div>
                            <el-form-item label="宽度：">
                              <el-input v-model="buttons.width" />
                            </el-form-item>
                          </div>
                          <div>
                            <el-form-item label="高度：">
                              <el-input v-model="buttons.height" />
                            </el-form-item>
                          </div>
                        </div>

                      </el-col>
                    </el-row>
                  </el-collapse-item>

                </el-collapse>

                <div style="height:20px" />
                <el-form-item>
                  <el-button
                    type="primary"
                    icon="PictureFilled"
                    @click="wheelTurntablePreview"
                  >预览</el-button>
                  <el-button
                    type="danger"
                    icon="Promotion"
                    @click="wheelTurntableNext"
                  >下一步</el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col
              :span="12"
              class="flex items-center justify-center"
            >
              <bms-lucky-wheel
                :key="luckyConfigForm.key"
                :width="luckyConfigForm.width"
                :height="luckyConfigForm.height"
                :blocks="luckyConfigForm.blocks"
                :prizes="luckyConfigForm.prizes"
                :buttons="luckyConfigForm.buttons"
              /></el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane
          label="页面元素"
          name="second"
        >
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form
                ref="elFormRef"
                :model="pageSettingForm"
                label-position="top"
                :rules="rule"
                label-width="80px"
              >
                <el-collapse accordion>
                  <el-collapse-item
                    v-for="(item, index) in pageSettingForm"
                    :key="index"
                    :name="index"
                  >
                    <template #title>
                      {{ item.label }}:
                    </template>
                    <el-form-item
                      :prop="index"
                    >
                      <el-input
                        v-if="item.type == `text`"
                        v-model="pageSettingFormObj[index]"
                        :clearable="true"
                      />
                      <div v-if="item.type === `image`">
                        <div
                          style="display: inline-block;width:100px;height:100px;max-width:100px;max-height:100px;"
                          @click="openHeaderChange(index)"
                        >
                          <img
                            v-if="pageSettingFormObj[index]"
                            alt="缩略图"
                            class="header-img-box"
                            style="width:100%;height:100%;cursor: pointer;object-fit: cover;"
                            :src="pageSettingFormObj[index]"
                          >
                          <div
                            v-else
                            class="flex header-img-box"
                            style="cursor: pointer;"
                          >从媒体库选择</div>
                          <ChooseImg
                            :ref="`chooseImg_${index}`"
                            :target="pageSettingFormObj"
                            :target-key="index"
                          />
                        </div>
                      </div>
                      <div v-if="item.type === `radio`">
                        <el-radio-group
                          v-model="pageSettingFormObj[index]"
                          class="ml-4"
                        >
                          <el-radio
                            v-for="(r,i) in item.radio"
                            :key="i"
                            :value="r.value"
                            size="large"
                          >{{ r.label }}</el-radio>
                        </el-radio-group>
                      </div>
                    </el-form-item>
                  </el-collapse-item>
                </el-collapse>
                <div style="height:20px" />
                <el-form-item>
                  <el-button
                    type="primary"
                    icon="Promotion"
                    @click="save"
                  >保存&预览</el-button>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="12">
              <div :style="{position:`relative`,width:`250px`,height:`500px`,marginLeft:`50px`,backgroundImage:`url(${Iphone})`,backgroundRepeat:`no-repeat`,backgroundSize:`100% 100%`}">
                <iframe
                  id="previewIframe"
                  :key="randomKey"
                  style="position:absolute;border:none;top:51px;left:9px;width:231px;height:400px;"
                  :src="previewUrl"
                />
              </div>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script setup name="PageSetting">
import { onMounted, ref, reactive, getCurrentInstance } from 'vue'
import { updatePageParams } from '@/api/sysWheels'
import { ElMessage } from 'element-plus'
// import CustomPic from '@/components/customPic/index.vue'
import ChooseImg from '@/components/chooseImg/index.vue'
import BmsLuckyWheel from '@/components/lucky/wheel.vue'
import Iphone from '@/assets/iphone.png'
// 验证规则
const rule = reactive({})

const elFormRef = ref()
const wheelActiveName = ref(1)
const activeName = ref('first')
const { proxy } = getCurrentInstance()

const props = defineProps({
  wheelId: {
    type: Number,
    default: 0
  },
  previewUrl: {
    type: String,
    default: () => {
      return ''
    }
  },
  pageConfigSetting: {
    type: Object,
    default: () => {
      return {}
    }
  },
  pageSetting: {
    type: Object,
    default: () => {
      return {}
    }
  },
  prizes: {
    type: Array,
    default: () => {
      return []
    }
  }
})
const generatePrizeForm = ref([])
const generatePrizeFormFunc = () => {
  for (let i = 0; i < props.prizes.length; i++) {
    generatePrizeForm.value[i] = {
      id: props.prizes[i].ID,
      src: props.prizes[i].thumbUrl,
      background: '#fff',
      top: '0px',
      width: '0px',
      height: '0px',
      text: props.prizes[i].shortName,
      textTop: '0px',
      textColor: '#000',
      textSize: '22px'
    }
    if (props.pageSetting.lucky) {
      // 过滤配置
      const tmpItem = props.pageSetting.lucky.prizes.filter(item => item.id === props.prizes[i].ID)
      if (tmpItem.length > 0) {
        generatePrizeForm.value[i] = {
          src: tmpItem[0]['imgs'][0]['src'],
          background: tmpItem[0]['background'],
          top: tmpItem[0]['imgs'][0]['top'],
          width: tmpItem[0]['imgs'][0]['width'],
          height: tmpItem[0]['imgs'][0]['height'],
          text: tmpItem[0]['fonts'][0]['text'],
          textTop: tmpItem[0]['fonts'][0]['top'],
          textColor: tmpItem[0]['fonts'][0]['fontColor'],
          textSize: tmpItem[0]['fonts'][0]['fontSize']
        }
      }
    }
  }
}
generatePrizeFormFunc()

const blocks = ref({
  padding: '0px',
  background: '',
  src: '',
  top: '',
  width: '',
  height: '',
  rotate: false
})
const luckyConfigForm = ref({
  width: '300px',
  height: '300px',
  blocks: [],
  buttons: [],
  prizes: [],
})
const buttons = ref({
  radius: '50%',
  src: '',
  top: '',
  width: '',
  height: '',
})
const syncPrizeFunc = (index) => {
  for (let i = 0; i < generatePrizeForm.value.length; i++) {
    if (i !== index) {
      Object.assign(generatePrizeForm.value[i], {
        background: generatePrizeForm.value[index].background,
        top: generatePrizeForm.value[index].top,
        width: generatePrizeForm.value[index].width,
        height: generatePrizeForm.value[index].height,
        textTop: generatePrizeForm.value[index].textTop,
        textColor: generatePrizeForm.value[index].textColor,
        textSize: generatePrizeForm.value[index].textSize
      })
    }
  }
}
/** 上传弹框 */
const openHeaderChange = (id) => {
  proxy.$refs[`chooseImg_${id}`][0].open()
}
const openBlockHeaderChange = () => {
  proxy.$refs[`chooseImg_blocks_1`].open()
}
const openButtonsHeaderChange = () => {
  proxy.$refs[`chooseImg_buttons_1`].open()
}
const wheelTurntablePreview = () => {
  luckyConfigForm.value.blocks = []
  luckyConfigForm.value.buttons = []
  luckyConfigForm.value.prizes = []
  luckyConfigForm.value.blocks.push({
    padding: blocks.value.padding,
    imgs: [
      {
        src: blocks.value.src,
        top: blocks.value.top,
        width: luckyConfigForm.value.width,
        height: luckyConfigForm.value.height,
        rotate: true
      }
    ]
  })
  luckyConfigForm.value.buttons.push({
    radius: buttons.value.radius,
    imgs: [
      {
        src: buttons.value.src,
        top: buttons.value.top,
        width: buttons.value.width,
        height: buttons.value.height,
      }
    ]
  })
  for (let i = 0; i < generatePrizeForm.value.length; i++) {
    luckyConfigForm.value.prizes.push({
      id: generatePrizeForm.value[i].id,
      background: generatePrizeForm.value[i].background,
      fonts: [
        {
          text: generatePrizeForm.value[i].text,
          top: generatePrizeForm.value[i].textTop,
          fontColor: generatePrizeForm.value[i].textColor,
          fontSize: generatePrizeForm.value[i].textSize,
        }
      ],
      imgs: [
        {
          src: generatePrizeForm.value[i].src,
          top: generatePrizeForm.value[i].top,
          width: generatePrizeForm.value[i].width,
          height: generatePrizeForm.value[i].height,
          rotate: true
        }
      ]
    })
  }
  luckyConfigForm.value.key = Math.random()
}

const wheelTurntableNext = () => {
  wheelTurntablePreview()
  activeName.value = 'second'
}

const pageSettingFormObj = ref({})
const pageSettingForm = ref({})
const randomKey = ref(Math.random())
onMounted(() => {
  initWheelTurntable()
  mergerObject()
})
/**
 * 初始化转盘
 */
const initWheelTurntable = () => {
  if (!props.pageSetting.lucky) {
    return
  }
  blocks.value = {
    padding: props.pageSetting.lucky.blocks[0].padding,
    src: props.pageSetting.lucky.blocks[0]['imgs'][0]['src'],
    top: props.pageSetting.lucky.blocks[0]['imgs'][0]['top'],
    width: props.pageSetting.lucky.blocks[0]['imgs'][0]['width'],
    height: props.pageSetting.lucky.blocks[0]['imgs'][0]['height'],
    rotate: props.pageSetting.lucky.blocks[0]['imgs'][0]['rotate'],
  }
  luckyConfigForm.value.width = props.pageSetting.lucky['width']
  luckyConfigForm.value.height = props.pageSetting.lucky['height']
  buttons.value = {
    radius: props.pageSetting.lucky.buttons[0].radius,
    src: props.pageSetting.lucky.buttons[0]['imgs'][0]['src'],
    top: props.pageSetting.lucky.buttons[0]['imgs'][0]['top'],
    width: props.pageSetting.lucky.buttons[0]['imgs'][0]['width'],
    height: props.pageSetting.lucky.buttons[0]['imgs'][0]['height'],
  }
}

// 合并两个对象的值
const mergerObject = () => {
  const tmpPageSettingFormObj = {}
  // 取pageConfigSetting的pages值，
  const pagesConfig = Object.assign({}, props.pageConfigSetting.pages)
  // 循环遍历pagesConfig，并且查找pageSetting中是否含有值，如果有，则替换pagesConfig中的value，如果没有，跳过
  Object.keys(pagesConfig).forEach(function(key) {
    tmpPageSettingFormObj[key] = pagesConfig[key].value
    if (props.pageSetting[key]) {
      tmpPageSettingFormObj[key] = props.pageSetting[key]
      pagesConfig[key].value = props.pageSetting[key]
    }
  })
  pageSettingFormObj.value = tmpPageSettingFormObj
  pageSettingForm.value = pagesConfig
}
const save = async() => {
  wheelTurntableNext()
  pageSettingFormObj.value['lucky'] = luckyConfigForm.value
  const res = await updatePageParams({ ID: props.wheelId, pageParams: JSON.stringify(pageSettingFormObj.value) })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '更改成功'
    })
    reloadIframe()
    return
  } else {
    ElMessage({
      type: 'warning',
      message: '更新失败'
    })
    return
  }
}

const handleClick = (tab, event) => {
  console.log(tab, event)
}

const reloadIframe = () => {
  randomKey.value = Math.random()
}
</script>
<style scoped lang="scss">

</style>
