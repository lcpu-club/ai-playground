<template>
  <div class="h-full grid place-items-center">
    <VCard class="min-w-64">
      <VCardTitle>Login</VCardTitle>
      <VCardText v-if="resp.data.value" class="markdown-body">
        Please send
        <pre><code>{{ resp.data.value._id }}</code></pre>
        in WeChat to login.
      </VCardText>
    </VCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'login'
})

const router = useRouter()
const profile = useUserProfile()

if (isLoggedIn.value) {
  router.replace('/')
}

const resp = useAsyncData(async () => {
  const { data } = await axios.post<{ _id: string; secret: string }>('/api/login/attempt')
  return data
})

const intervalId = setInterval(async () => {
  if (!resp.data.value) return
  try {
    const { data } = await axios.post<{ result: string }>('/api/login/poll', resp.data.value)
    if (data.result) {
      authToken.value = data.result
      profile.execute()
      router.replace('/')
    }
  } catch (err) {
    // TODO: reload
  }
}, 1000)

onBeforeUnmount(() => {
  clearInterval(intervalId)
})
</script>
