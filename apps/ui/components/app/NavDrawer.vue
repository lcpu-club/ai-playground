<template>
  <VNavigationDrawer v-model="navDrawer">
    <template #prepend>
      <VList variant="flat" density="compact" class="py-0 border-b">
        <VListItem :active="false" to="/" prepend-icon="mdi-home" title="Home" />
      </VList>
    </template>
    <VList variant="flat" density="compact" class="py-0">
      <VListItem
        v-for="session of sessions"
        :key="session.id"
        :to="`/sessions/${session.id}`"
        :prepend-icon="icons[session.type] ?? 'mdi-file'"
        :title="session.name"
        :subtitle="session.desc"
      >
        <template #append>
          <VBtn color="error" icon="mdi-delete" variant="text" @click="remove(session.id!)" />
        </template>
      </VListItem>
    </VList>
  </VNavigationDrawer>
</template>

<script setup lang="ts">
const { navDrawer } = useAppState()
const { db } = useDatabase()

const sessions = useLiveQuery(() => db.sessions.toArray())
const icons = {
  chat: 'mdi-chat'
}

async function remove(id: number) {
  await db.sessions.delete(id)
}
</script>
