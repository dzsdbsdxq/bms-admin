<template>
  <LuckyWheel
    ref="myLucky"
    :width="width"
    :height="height"
    :prizes="prizes"
    :blocks="blocks"
    :buttons="buttons"
    @start="startCallback"
    @end="endCallback"
  />
</template>
<script setup name="BmsLuckyWheel">
import { defineProps } from 'vue'
defineProps({
  width: {
    type: String,
    default: () => {
      return '300px'
    }
  },
  height: {
    type: String,
    default: () => {
      return '300px'
    }
  },
  prizes: {
    type: Array,
    default: () => {
      return []
    }
  },
  blocks: {
    type: Array,
    default: () => {
      return []
    }
  },
  buttons: {
    type: Array,
    default: () => {
      return []
    },
  }
})

const startCallback = () => {}
const endCallback = () => {}
</script>
<style lang="scss" scoped>

</style>>
