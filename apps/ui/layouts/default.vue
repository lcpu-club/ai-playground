<template>
  <AppNavDrawer />
  <AppSettingsDrawer />
  <AppMainBar />
  <VMain>
    <NuxtPage />
  </VMain>
</template>

<script setup lang="ts">
const router = useRouter()
if (!isLoggedIn.value) {
  router.replace('/login')
}
</script>
