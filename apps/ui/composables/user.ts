import md5 from 'crypto-js/md5'

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
const avatarUrl = computed(() => {
  return `https://www.gravatar.com/avatar/${md5(profile.data.value?.email ?? '')}?d=mp`
})

export function useUserProfile() {
  return profile
}

export function useAvatarUrl() {
  return avatarUrl
}
