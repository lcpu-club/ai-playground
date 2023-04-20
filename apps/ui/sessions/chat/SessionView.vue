<template>
  <VContainer class="fill-height" fluid>
    <div class="grid w-full h-full grid-rows-[1fr_auto]">
      <div class="grid relative">
        <div
          class="absolute left-0 right-0 top-0 bottom-0 overflow-auto flex flex-col items-stretch gap-2 pb-4"
        >
          <div class="self-center">Using model {{ props.session.model }}</div>
          <div v-for="(item, i) in props.session.history" :key="i">
            <HistoryCard :item="item" />
          </div>
        </div>
      </div>
      <VCard>
        <VCardActions>
          <VTextField v-model="prompt" placeholder="Prompt here" />
          <VBtn :loading="loading" icon="mdi-send" @click="submit" />
        </VCardActions>
      </VCard>
    </div>
  </VContainer>
</template>

<script setup lang="ts">
import HistoryCard from './HistoryCard.vue'
import { IChatContext } from './base'
import { ISession } from '~/libs/db'

const props = defineProps<{
  session: ISession & IChatContext
}>()

const prompt = ref('')
const loading = ref(false)
const { db } = useDatabase()

const id = props.session.id!

async function submit() {
  loading.value = true
  const history = [...toRaw(props.session.history)]
  history.push({
    role: 'user',
    message: prompt.value
  })
  await db.sessions.update(id, { history })
  try {
    const { data } = await axios.post<{ text: string }>('/api/chat/infer', {
      prompt: prompt.value,
      maxTokens: 500,
      temperature: 0.9,
      topP: 1,
      presencePenalty: 0.6,
      frequencyPenalty: 0.5,
      modelName: props.session.model
    })
    const { text, ...rest } = data
    history.push({
      role: 'bot',
      message: text,
      ...rest
    })
    await db.sessions.update(id, { history })
  } catch (err) {
    history.push({
      role: 'bot',
      message: 'Error: ' + err
    })
    await db.sessions.update(id, { history })
  }
  loading.value = false
}
</script>
