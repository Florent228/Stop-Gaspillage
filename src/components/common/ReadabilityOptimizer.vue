<template>
  <!-- Bouton d'optimisation de la lisibilité -->
  <div class="fixed bottom-20 right-4 z-40">
    <button 
      @click="toggleHighContrast"
      :class="[
        'p-3 rounded-full shadow-lg transition-all duration-300 border-2',
        isHighContrastMode 
          ? 'bg-black text-white border-gray-800 hover:bg-gray-900' 
          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
      ]"
      :title="isHighContrastMode ? 'Désactiver le mode contraste élevé' : 'Activer le mode contraste élevé'"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          stroke-width="2" 
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
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
        class="absolute bottom-16 right-0 bg-white p-3 rounded-lg shadow-lg border min-w-[220px]"
      >
        <div class="flex items-center space-x-2">
          <div :class="[
            'w-3 h-3 rounded-full',
            isHighContrastMode ? 'bg-black' : 'bg-gray-400'
          ]"></div>
          <span class="text-sm font-medium">
            Contraste {{ isHighContrastMode ? 'élevé' : 'normal' }}
          </span>
        </div>
        <p class="text-xs text-gray-500 mt-1">
          {{ isHighContrastMode 
            ? 'Tous les textes sont optimisés pour une meilleure lisibilité' 
            : 'Mode d\'affichage standard rétabli'
          }}
        </p>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

// État du mode contraste élevé
const isHighContrastMode = ref(false)
const showNotification = ref(false)

// Fonction pour basculer le mode contraste élevé
const toggleHighContrast = () => {
  isHighContrastMode.value = !isHighContrastMode.value
  
  // Sauvegarder la préférence
  localStorage.setItem('highContrastMode', isHighContrastMode.value.toString())
  
  // Afficher la notification
  showNotification.value = true
  
  // Masquer la notification après 3 secondes
  setTimeout(() => {
    showNotification.value = false
  }, 3000)
}

// Appliquer le mode contraste élevé
const applyHighContrastMode = () => {
  const body = document.body
  
  if (isHighContrastMode.value) {
    body.classList.add('high-contrast-mode')
  } else {
    body.classList.remove('high-contrast-mode')
  }
}

// Charger la préférence au montage
onMounted(() => {
  const savedMode = localStorage.getItem('highContrastMode')
  if (savedMode === 'true') {
    isHighContrastMode.value = true
  }
  
  // Ajouter les styles CSS au head
  addHighContrastStyles()
  addBaseReadabilityStyles()
})

// Surveiller les changements et appliquer
watch(isHighContrastMode, applyHighContrastMode, { immediate: true })

// Ajouter les styles CSS pour le mode contraste élevé
const addHighContrastStyles = () => {
  const existingStyle = document.getElementById('high-contrast-styles')
  if (existingStyle) return
  
  const style = document.createElement('style')
  style.id = 'high-contrast-styles'
  style.textContent = `
    /* Mode contraste élevé pour une meilleure lisibilité */
    .high-contrast-mode {
      --eco-gray: #000000 !important;
      --readable-text: #000000 !important;
    }
    
    .high-contrast-mode h1,
    .high-contrast-mode h2,
    .high-contrast-mode h3,
    .high-contrast-mode h4,
    .high-contrast-mode h5,
    .high-contrast-mode h6 {
      color: #000000 !important;
      font-weight: 700 !important;
      text-shadow: none !important;
    }
    
    .high-contrast-mode p,
    .high-contrast-mode span,
    .high-contrast-mode div,
    .high-contrast-mode .text-gray-400,
    .high-contrast-mode .text-gray-500,
    .high-contrast-mode .text-gray-600 {
      color: #1F2937 !important;
      font-weight: 500 !important;
    }
    
    .high-contrast-mode .text-eco-gray,
    .high-contrast-mode .text-gray-600,
    .high-contrast-mode .text-gray-700 {
      color: #000000 !important;
      font-weight: 600 !important;
    }
    
    .high-contrast-mode .text-eco-gray\/70,
    .high-contrast-mode .text-eco-gray\/80,
    .high-contrast-mode .text-gray-500 {
      color: #1F2937 !important;
      font-weight: 500 !important;
    }
    
    .high-contrast-mode .bg-eco-beige,
    .high-contrast-mode .bg-gray-50 {
      background-color: #FFFFFF !important;
      border: 2px solid #E5E7EB !important;
    }
    
    .high-contrast-mode .border-gray-100,
    .high-contrast-mode .border-gray-200 {
      border-color: #9CA3AF !important;
      border-width: 2px !important;
    }
    
    .high-contrast-mode .btn-outline,
    .high-contrast-mode .btn-secondary {
      border-width: 3px !important;
      font-weight: 600 !important;
    }
    
    .high-contrast-mode .shadow-sm,
    .high-contrast-mode .shadow-md,
    .high-contrast-mode .shadow-lg {
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
    }
    
    /* Force la lisibilité des textes sur fonds colorés */
    .high-contrast-mode .bg-gradient-to-br,
    .high-contrast-mode .bg-gradient-to-r,
    .high-contrast-mode [class*="bg-gradient"] {
      color: white !important;
      font-weight: 600 !important;
      text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5) !important;
    }
    
    /* Améliorer la visibilité des liens */
    .high-contrast-mode a {
      color: #2563EB !important;
      font-weight: 600 !important;
      text-decoration: underline !important;
    }
    
    .high-contrast-mode a:hover {
      color: #1D4ED8 !important;
      text-decoration: underline !important;
    }
    
    /* Prix barrés plus lisibles */
    .high-contrast-mode .line-through {
      color: #6B7280 !important;
      font-weight: 500 !important;
    }
    
    /* Placeholders plus lisibles */
    .high-contrast-mode ::placeholder {
      color: #4B5563 !important;
      opacity: 1 !important;
    }
  `
  
  document.head.appendChild(style)
}

// Ajouter aussi des styles globaux de lisibilité de base
const addBaseReadabilityStyles = () => {
  const existingStyle = document.getElementById('base-readability-styles')
  if (existingStyle) return
  
  const style = document.createElement('style')
  style.id = 'base-readability-styles'
  style.textContent = `
    /* Styles de base pour améliorer la lisibilité globale */
    .text-gray-400:not(.icon):not([class*="bg-"]) {
      color: #6B7280 !important; /* gray-500 */
    }
    
    .text-gray-500:not(.icon):not([class*="bg-"]) {
      color: #6B7280 !important; /* gray-500 */
    }
    
    .line-through {
      color: #6B7280 !important;
    }
    
    ::placeholder {
      color: #6B7280 !important;
      opacity: 1 !important;
    }
  `
  
  document.head.appendChild(style)
}

// Nettoyer au démontage
onUnmounted(() => {
  const style = document.getElementById('high-contrast-styles')
  if (style) {
    style.remove()
  }
})
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