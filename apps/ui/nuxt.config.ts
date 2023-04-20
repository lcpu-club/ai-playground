export default defineNuxtConfig({
  ssr: false,
  modules: ['@unocss/nuxt'],
  unocss: {
    wind: true
  },
  css: ['@unocss/reset/tailwind.css']
})
