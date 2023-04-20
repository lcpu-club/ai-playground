import { useLocalStorage } from '@vueuse/core'

export const authToken = useLocalStorage('authToken', '')
export const isLoggedIn = computed(() => !!authToken.value)
