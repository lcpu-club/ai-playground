<template>
  <VContainer class="fill-height">
    <VRow justify="center">
      <VCol>
        <VCard>
          <VCardTitle>New session</VCardTitle>
          <VCardText>
            <VSelect v-model="model" :items="['gpt-3.5-turbo', 'gpt-4']" label="Type" />
          </VCardText>
          <VCardActions>
            <VBtn variant="outlined" @click="create">Go</VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
const { db } = useDatabase()
const router = useRouter()

const model = ref('')

async function create() {
  const id = await db.sessions.add({
    name: 'Untitled',
    type: 'chat',
    desc: '',
    model: model.value,
    history: []
  })
  router.replace(`/sessions/${id}`)
}
</script>
