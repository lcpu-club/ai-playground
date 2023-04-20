<template>
  <VContainer class="fill-height">
    <VRow justify="center">
      <VCol>
        <VCard>
          <VCardTitle>My Profile</VCardTitle>
          <VCardText>
            <VTextField v-model="name" label="Name" />
            <VTextField v-model="email" label="Email" type="email" />
          </VCardText>
          <VCardActions>
            <VSpacer />
            <VBtn color="secondary" :disabled="loading" @click="load">Reset</VBtn>
            <VBtn color="primary" :disabled="loading" @click="submit">Save</VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </VContainer>
</template>

<script setup lang="ts">
const profile = useUserProfile()
const name = ref(profile.data.value?.name ?? '')
const email = ref(profile.data.value?.email ?? '')
const loading = ref(false)

async function load() {
  loading.value = true
  await profile.execute()
  name.value = profile.data.value?.name ?? ''
  email.value = profile.data.value?.email ?? ''
  loading.value = false
}

async function submit() {
  loading.value = true
  await axios.put('/api/user/profile', {
    name: name.value,
    email: email.value
  })
  await profile.execute()
  loading.value = false
}

load()
</script>
