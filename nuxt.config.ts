// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'High Coherence - Employee Development Platform',
      meta: [
        { name: 'description', content: 'HEXACO-based personality assessments and 360 reviews for employee development' }
      ]
    }
  }
})
