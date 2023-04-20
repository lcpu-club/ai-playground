<template>
  <VAppBar>
    <template #prepend>
      <VAppBarNavIcon variant="text" @click="navDrawer = !navDrawer" />
      <VToolbarTitle>AI Playground</VToolbarTitle>
    </template>
    <template #append>
      <VToolbarItems>
        <VBtn icon="mdi-cog" variant="text" @click="settingsDrawer = !settingsDrawer" />
      </VToolbarItems>
    </template>
  </VAppBar>
</template>

<script setup lang="ts">
const { navDrawer, settingsDrawer } = useAppState()
</script>
