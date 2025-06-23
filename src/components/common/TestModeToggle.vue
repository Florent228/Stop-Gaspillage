<template>
  <!-- Bouton flottant pour basculer le mode test -->
  <div class="fixed bottom-4 right-4 z-50">
    <button 
      @click="toggleTestMode"
      :class="[
        'p-3 rounded-full shadow-lg transition-all duration-300 border-2',
        authStore.isTestMode 
          ? 'bg-orange-500 text-white border-orange-400 hover:bg-orange-600' 
          : 'bg-gray-100 text-gray-600 border-gray-300 hover:bg-gray-200'
      ]"
      :title="authStore.isTestMode ? 'Désactiver le mode test' : 'Activer le mode test'"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          v-if="authStore.isTestMode"
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
        <path 
          v-else
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"
        />
      </svg>
    </button>
    
    <!-- Notification du changement de mode -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="transform opacity-0 scale-75 translate-y-2"
      enter-to-class="transform opacity-100 scale-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="transform opacity-100 scale-100 translate-y-0"
      leave-to-class="transform opacity-0 scale-75 translate-y-2"
    >
      <div 
        v-if="showNotification" 
        class="absolute bottom-16 right-0 bg-white p-3 rounded-lg shadow-lg border min-w-[200px]"
      >
        <div class="flex items-center space-x-2">
          <div :class="[
            'w-3 h-3 rounded-full',
            authStore.isTestMode ? 'bg-orange-500' : 'bg-gray-400'
          ]"></div>
          <span class="text-sm font-medium">
            Mode test {{ authStore.isTestMode ? 'activé' : 'désactivé' }}
          </span>
        </div>
        <p class="text-xs text-gray-500 mt-1">
          {{ authStore.isTestMode 
            ? 'Toutes les fonctionnalités sont accessibles sans authentification' 
            : 'Authentification requise pour certaines pages'
          }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

// État de la notification
const showNotification = ref(false)

// Fonction pour basculer le mode test
const toggleTestMode = () => {
  authStore.toggleTestMode(!authStore.isTestMode)
  
  // Afficher la notification
  showNotification.value = true
  
  // Masquer la notification après 3 secondes
  setTimeout(() => {
    showNotification.value = false
  }, 3000)
}
</script>

<style scoped>
/* Effet de pulsation pour attirer l'attention */
@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

button:hover {
  animation: pulse 2s infinite;
}
</style> 