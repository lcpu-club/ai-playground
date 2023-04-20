export default defineNuxtConfig({
  ssr: false,
  modules: [
    //
    '@unocss/nuxt'
  ],
  unocss: {
    wind: true
  },
  css: [
    //
    '@unocss/reset/tailwind.css',
    'github-markdown-css/github-markdown-light.css'
  ],
  nitro: {
    devProxy: {
      '/api/': 'http://localhost:4000/api/'
    }
  }
})
