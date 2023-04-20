<template>
  <VAppBar>
    <VAppBarNavIcon variant="text" @click="nav = !nav" />
    <VToolbarTitle>AI Playground</VToolbarTitle>
    <VSpacer />
  </VAppBar>
  <VNavigationDrawer v-model="nav"> </VNavigationDrawer>
  <VMain>
    <NuxtWelcome />
  </VMain>
</template>

<script setup lang="ts">
const nav = ref<boolean>()

const router = useRouter()
router.replace('/login')
</script>
