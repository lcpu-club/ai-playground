<template>
  <component
    :is="types[session!.type].SessionView"
    v-if="session && types[session.type]"
    :session="session"
  />
  <VContainer v-else class="fill-height" fluid>
    <VCard> Loading... </VCard>
  </VContainer>
</template>

<script setup lang="ts">
const route = useRoute()
const { db } = useDatabase()
const session = useLiveQuery(() => db.sessions.get(+route.params.id))
const { types } = useSessionTypes()
</script>
