import Axios from 'axios'

export const axios = Axios.create()

watch(
  authToken,
  (token) => {
    axios.defaults.headers.Authorization = `Bearer ${token}`
  },
  { immediate: true }
)
