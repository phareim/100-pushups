// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/content',
    '@nuxt/test-utils',
    '@nuxt/ui',
    '@nuxt/icon'
  ],

  runtimeConfig: {
    public: {
      firebase: {
        apiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyC8aCvsFcrTmLibGdnmfzztJvhkM0fGRLY",
        authDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "pushups-b89ad.firebaseapp.com",
        projectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID || "pushups-b89ad",
        storageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "pushups-b89ad.firebasestorage.app",
        messagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1078180015023",
        appId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID || "1:1078180015023:web:c6198c0bc8ee9e1dc4dd5a",
        measurementId: process.env.NUXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-0MCYF0YEWG"
      }
    }
  },

  nitro: {
    // preset: 'firebase' // Optional: if deploying to Firebase Hosting + Functions
  },

  typescript: {
    shim: false // Recommended for better type checking
  }
})

declare module '@nuxt/schema' {
  interface PublicRuntimeConfig {
    firebase: {
      apiKey: string;
      authDomain: string;
      projectId: string;
      storageBucket: string;
      messagingSenderId: string;
      appId: string;
      measurementId?: string;
    };
  }
}