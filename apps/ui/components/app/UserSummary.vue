<template>
  <VListItem to="/profile">
    <template #prepend>
      <VAvatar color="grey-lighten-1">
        <img :src="avatarUrl" />
      </VAvatar>
    </template>
    <VListItemTitle>{{ profile.data.value?.name }}</VListItemTitle>
    <VListItemSubtitle>{{ profile.data.value?.email }}</VListItemSubtitle>
    <template #append>
      <VBtn icon="mdi-logout" variant="text" color="error" @click="logout" />
    </template>
  </VListItem>
</template>

<script setup lang="ts">
import md5 from 'crypto-js/md5'

function logout() {
  authToken.value = ''
}

const profile = useUserProfile()
const avatarUrl = computed(() => {
  return `https://www.gravatar.com/avatar/${md5(profile.data.value?.email ?? '')}?d=mp`
})
</script>
