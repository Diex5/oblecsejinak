// https://nuxt.com/docs/api/configuration/nuxt-config
import Aura from '@primevue/themes/aura'
import { definePreset } from '@primevue/themes'
import { themeColors } from './unocss.config.ts'

const primePreset = definePreset(Aura, {
  semantic: {
    primary: themeColors.primary,
    /* colorScheme: {
      light: {
        surface: themeColors.surface,
      },
      dark: {
        surface: themeColors.surface,
      },
    }, */
  },
})
export default defineNuxtConfig({
  modules: ['@nuxthub/core',
    '@primevue/nuxt-module',
    '@nuxt/eslint',
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    /*  '@nuxtjs/color-mode', */
    'nuxt-radash',
    '@nuxt/image',
    /* 'nuxt-aos', */
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@vee-validate/nuxt',
    'nuxt-nodemailer',
    '@nuxt/scripts',
    'nuxt-headlessui',
    '@formkit/auto-animate/nuxt',
    '@vueuse/motion/nuxt',
    '@unlok-co/nuxt-stripe',

  ],
  ssr: false,
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: 'cs' },
      title: 'OblecSeJinak',
    },
    pageTransition: false,
    layoutTransition: false,
  },
  css: [
    '@unocss/reset/tailwind.css',
    'primeicons/primeicons.css',
  ],

  runtimeConfig: {

    public: {
      siteUrl: 'http://localhost:3000',
    },

    meta: {
      conversionsAPI: 'EAAl5sY7eIh0BOzgtb5lYVB0M3ZCKkMjuaCR5WWRBUMPuqC3R8bchIRrlpin8JwF339cH7Db5CMEMfwGGdx71dE3ZCT4aZAnEqxq5dmyIBhvuwhlMZCvDIZAU9eaomfDAcZCyjxoOHwuMkLgUpyQvLVcfZBmohMg8xgUw76kP5CHwDdN1s5EtM2mGlt7z57KZAPcV2wZDZD',
      pixelId: '650190810719844',
    },

  },
  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    typedPages: true,

  },
  compatibilityDate: '2024-11-01',
  nitro: {
    experimental: {
      openAPI: true,

    },
    preset: 'cloudflare_pages',
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
  },

  hub: {
    database: false,

    dir: '.data/hub',
    bindings: {
      compatibilityFlags: ['nodejs_compat_v2'],
    },
  },
  vite: {
    build: {
      target: 'esnext',
    },
  },
  /* colorMode: {
    classSuffix: '',
    preference: 'light',
  }, */

  eslint: {
    config: {
      stylistic: true,
    },
  },
  headlessui: {
    prefix: 'Headless',
  },
  pinia: {
    storesDirs: ['~/composables'],
  },
  primevue: {
    options: {
      ripple: true,
      theme: {
        preset: primePreset,
        options: {
          darkModeSelector: false,
          cssLayer: false,
        },
      },
    },
  },
  scripts: {
    registry: {
      metaPixel: {
        id: '650190810719844',
      },
    },
  },
  stripe: {
    server: {
      key: process.env.STRIPE_SECRET_KEY,
      options: {

      },
    },
    client: {
      key: process.env.STRIPE_PUBLIC_KEY,
      manualClientLoad: true,
      options: {},
    },
  },
  /* nodemailer: {
    from: '"ostom.cz" <dev@mail.develit.io>',
    host: 'smtp.seznam.cz',
    port: 465,
    secure: true,
    auth: {
      user: 'dev@mail.develit.io',
      pass: process.env.NUXT_NODEMAILER_AUTH_PASS ?? '',
    },
  }, */

  target: 'static',

})
