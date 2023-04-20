<template>
  <VAppBar>
    <template #prepend>
      <VAppBarNavIcon variant="text" @click="navDrawer = !navDrawer" />
      <VToolbarTitle>AI Playground</VToolbarTitle>
    </template>
    <template #append>
      <VToolbarItems>
        <VBtn variant="text" @click="settingsDrawer = !settingsDrawer">
          <VAvatar color="grey-lighten-1">
            <img :src="avatarUrl" />
          </VAvatar>
        </VBtn>
      </VToolbarItems>
    </template>
  </VAppBar>
</template>

<script setup lang="ts">
const { navDrawer, settingsDrawer } = useAppState()
const avatarUrl = useAvatarUrl()
</script>
