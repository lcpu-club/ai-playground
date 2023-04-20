<template>
  <VNavigationDrawer
    v-model="settingsDrawer"
    location="right"
    disable-route-watcher
    temporary
    touchless
    width="350"
  >
    <VToolbar flat>
      <VToolbarTitle text="Settings" class="ps-0" />
      <template #append>
        <VBtn icon="mdi-close" variant="flat" @click="settingsDrawer = false" />
      </template>
    </VToolbar>
    <VDivider />
    <VContainer>
      <!-- <app-settings-theme />

      <v-divider class="mt-4 mb-3 mx-n3" />

      <app-settings-rtl />

      <v-divider class="mt-4 mb-3 mx-n3" />

      <app-settings-api />

      <v-divider class="mt-4 mb-3 mx-n3" />

      <app-settings-dev /> -->
    </VContainer>
    <template #append>
      <AppUserSummary />
    </template>
  </VNavigationDrawer>
</template>

<script setup lang="ts">
const { settingsDrawer } = useAppState()
</script>
