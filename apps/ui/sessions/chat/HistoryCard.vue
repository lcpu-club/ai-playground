<template>
  <VCard>
    <VCardText>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <article class="markdown-body" v-html="rendered"></article>
    </VCardText>
    <template v-if="props.item.usage">
      <VDivider />
      <VCardText>
        <code>
          Cost: {{ props.item.cost }}
          {{
            Object.entries(props.item.usage)
              .map(([k, v]) => `${k}=${v}`)
              .join(', ')
          }}
        </code>
      </VCardText>
    </template>
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
