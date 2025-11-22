// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/image",
    "nuxt-swiper",
    "nuxt-lucide-icons",
    'shadcn-nuxt',
    '@nuxtjs/supabase'
  ],

  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/fav-ico.png' },
      ]
    }
  },

  supabase: {
    redirect: false
  },

  ssr:false,
  compatibilityDate: '2025-11-22'
})