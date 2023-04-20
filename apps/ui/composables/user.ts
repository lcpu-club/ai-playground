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

export function useUserProfile() {
  return profile
}
