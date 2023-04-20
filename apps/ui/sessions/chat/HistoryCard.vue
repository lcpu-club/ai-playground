<template>
  <VCard>
    <VCardText>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <article class="markdown-body" v-html="rendered"></article>
    </VCardText>
  </VCard>
</template>

<script setup lang="ts">
import { IChatHistoryItem } from './base'
import { renderMarkdown } from '~/libs/markdown'

const props = defineProps<{
  item: IChatHistoryItem
}>()

const rendered = computed(() => renderMarkdown(props.item.message))
</script>
