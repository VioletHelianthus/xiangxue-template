<template>
  <PreviewShell v-if="config" :config="config">
    <!-- 修改这里切换预览的页面 -->
    <HelloWorld />
  </PreviewShell>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { PreviewShell, loadConfig } from '@xiangxue/preview'
import type { PreviewConfig } from '@xiangxue/preview'
import HelloWorld from '@pages/HelloWorld.vue'

const config = ref<PreviewConfig | null>(null)

onMounted(async () => {
  config.value = await loadConfig()
})
</script>
