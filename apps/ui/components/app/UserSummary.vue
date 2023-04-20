<template>
  <VListItem>
    <template #prepend>
      <VAvatar color="grey-lighten-1">
        <VIcon color="white">mdi-account</VIcon>
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
function logout() {
  authToken.value = ''
}

const profile = useAsyncData(async () => {
  const { data } = await axios.get<{
    _id: string
    name: string
    email: string
    balance: Record<string, number>
    tags: string[]
  }>('/api/user/profile')
  return data
})
</script>
