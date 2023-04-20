<template>
  <VAppBar>
    <template #prepend>
      <VAppBarNavIcon variant="text" @click="nav = !nav" />
      <VToolbarTitle>AI Playground</VToolbarTitle>
    </template>
    <template #append>
      <VToolbarItems>
        <VBtn icon="mdi-cog" variant="text" @click="settings = !settings" />
      </VToolbarItems>
    </template>
  </VAppBar>
  <VNavigationDrawer v-model="nav">
    <!--  -->
  </VNavigationDrawer>
  <VNavigationDrawer
    v-model="settings"
    location="right"
    disable-route-watcher
    temporary
    touchless
    width="350"
  >
    <VToolbar flat>
      <VToolbarTitle text="Settings" class="ps-0" />
      <template #append>
        <VBtn icon="mdi-close" variant="flat" @click="settings = false" />
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
      <!-- <app-settings-append /> -->
    </template>
  </VNavigationDrawer>
  <VMain>
    <NuxtPage />
  </VMain>
</template>

<script setup lang="ts">
const nav = ref<boolean>()
const settings = ref<boolean>()

const router = useRouter()
if (!isLoggedIn) {
  router.replace('/login')
}
</script>
