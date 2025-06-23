/// <reference types="vite/client" />

// Déclarations pour les modules Vue
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// Déclarations pour les variables d'environnement Vite
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_GOOGLE_CLIENT_ID: string
  readonly VITE_APPLE_CLIENT_ID: string
  readonly VITE_MAP_API_KEY: string
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_ANALYTICS_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Déclarations pour les assets
declare module '*.svg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

// Déclarations pour Chart.js
declare module 'chart.js/auto'

// Déclarations pour Leaflet
declare module 'leaflet' {
  export * from 'leaflet'
}

// Déclarations globales pour l'application
declare global {
  interface Window {
    // Google OAuth
    google?: {
      accounts: {
        id: {
          initialize: (config: any) => void
          prompt: () => void
        }
      }
    }
    
    // Apple OAuth
    AppleID?: {
      auth: {
        init: (config: any) => void
        signIn: (config: any) => Promise<any>
      }
    }
    
    // Service Worker
    workbox?: any
  }
}

export {} 