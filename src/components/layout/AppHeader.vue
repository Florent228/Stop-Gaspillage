<template>
  <!-- Header sticky avec navigation principale -->
  <header class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
    <div class="container-eco">
      <div class="flex items-center justify-between h-16 lg:h-20">
        
        <!-- Logo et nom de l'application -->
        <div class="flex items-center space-x-3">
          <RouterLink to="/" class="flex items-center space-x-3 group">
            <!-- Icône logo SVG -->
            <div class="w-10 h-10 lg:w-12 lg:h-12 bg-eco-green rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform duration-200">
              <svg class="w-6 h-6 lg:w-7 lg:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </div>
            <!-- Nom de l'app -->
            <div class="hidden sm:block">
              <h1 class="text-xl lg:text-2xl font-bold text-eco-green">Stop-Gaspillage</h1>
              <p class="text-xs text-gray-700 font-medium">Luttez contre le gaspillage</p>
            </div>
          </RouterLink>
        </div>

        <!-- Navigation principale (desktop) -->
        <nav class="hidden lg:flex items-center space-x-8">

          <a 
            href="#benefits" 
            class="text-eco-gray hover:text-eco-green font-medium transition-colors duration-200"
          >
            Avantages
          </a>
          <a 
            href="#demo-ia" 
            class="text-eco-gray hover:text-eco-green font-medium transition-colors duration-200"
          >
            IA Impact
          </a>

          <RouterLink 
            to="/education" 
            class="text-eco-gray hover:text-eco-green font-medium transition-colors duration-200"
          >
            Sensibilisation
          </RouterLink>

          <RouterLink 
            to="/marketplace" 
            class="text-eco-gray hover:text-eco-green font-medium transition-colors duration-200"
          >
            Marketplace
          </RouterLink>
        </nav>

        <!-- Boutons d'action et menu mobile -->
        <div class="flex items-center space-x-4">
          
          <!-- Indicateur de mode test -->
          <div v-if="authStore.isTestMode" class="hidden sm:flex items-center px-3 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full border border-orange-200">
            <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"/>
            </svg>
            Mode Test
          </div>
          
          <!-- Bouton de connexion/dashboard -->
          <div v-if="!authStore.isAuthenticated || authStore.isTestMode" class="hidden sm:flex items-center space-x-3">
            <!-- En mode test, toujours montrer le bouton dashboard -->
            <RouterLink 
              v-if="authStore.isTestMode" 
              to="/dashboard" 
              class="btn-primary text-sm px-4 py-2"
            >
              Dashboard (Test)
            </RouterLink>
            <RouterLink 
              v-else
              to="/auth" 
              class="btn-outline text-sm px-4 py-2"
            >
              Se connecter
            </RouterLink>
            <RouterLink 
              v-if="!authStore.isTestMode"
              to="/auth" 
              class="btn-primary text-sm px-4 py-2"
            >
              Commencer
            </RouterLink>
          </div>

          <!-- Menu utilisateur connecté (mode normal uniquement) -->
          <div v-else-if="authStore.isAuthenticated && !authStore.isTestMode" class="hidden sm:flex items-center space-x-3">
            <RouterLink 
              to="/dashboard" 
              class="btn-primary text-sm px-4 py-2"
            >
              Tableau de bord
            </RouterLink>
            <UserMenu />
          </div>

          <!-- Menu utilisateur en mode test -->
          <div v-if="authStore.isTestMode" class="hidden sm:flex items-center space-x-3">
            <div class="flex items-center space-x-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
              <div class="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center text-xs font-bold">
                T
              </div>
              <span class="text-sm font-medium">{{ authStore.currentUser?.firstName || 'Invité' }}</span>
            </div>
            <button 
              @click="authStore.toggleTestMode(false)"
              class="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded"
              title="Désactiver le mode test"
            >
              ✕
            </button>
          </div>

          <!-- Bouton menu mobile -->
          <button 
            @click="toggleMobileMenu"
            class="lg:hidden p-2 rounded-lg text-eco-gray hover:text-eco-green hover:bg-gray-50 transition-colors duration-200"
            aria-label="Menu de navigation"
          >
            <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
            </svg>
            <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Menu mobile -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="transform opacity-0 -translate-y-4"
      enter-to-class="transform opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="transform opacity-100 translate-y-0"
      leave-to-class="transform opacity-0 -translate-y-4"
    >
      <div v-if="isMobileMenuOpen" class="lg:hidden bg-white border-t border-gray-100">
        <div class="container-eco py-4">
          <nav class="flex flex-col space-y-4">
            <RouterLink 
              to="/marketplace" 
              @click="closeMobileMenu"
              class="text-eco-gray hover:text-eco-green font-medium transition-colors duration-200 py-2"
            >
              Marketplace
            </RouterLink>
            <RouterLink 
              to="/education" 
              @click="closeMobileMenu"
              class="text-eco-gray hover:text-eco-green font-medium transition-colors duration-200 py-2"
            >
              Sensibilisation
            </RouterLink>
            <a 
              href="#benefits" 
              @click="closeMobileMenu"
              class="text-eco-gray hover:text-eco-green font-medium transition-colors duration-200 py-2"
            >
              Avantages
            </a>
            <a 
              href="#demo-ia" 
              @click="closeMobileMenu"
              class="text-eco-gray hover:text-eco-green font-medium transition-colors duration-200 py-2"
            >
              IA Impact
            </a>
            
            <!-- Actions mobile -->
            <div class="pt-4 border-t border-gray-100 space-y-3">
              <!-- Indicateur mode test mobile -->
              <div v-if="authStore.isTestMode" class="flex items-center justify-between px-3 py-2 bg-orange-50 text-orange-800 text-sm rounded-lg border border-orange-200">
                <div class="flex items-center space-x-2">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"/>
                  </svg>
                  <span class="font-medium">Mode Test Activé</span>
                </div>
                <button 
                  @click="authStore.toggleTestMode(false)"
                  class="text-orange-600 hover:text-orange-800 px-2 py-1 rounded"
                >
                  ✕
                </button>
              </div>
              
              <!-- Utilisateur en mode test -->
              <div v-if="authStore.isTestMode" class="flex items-center space-x-3 px-3 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
                <div class="w-8 h-8 bg-green-200 rounded-full flex items-center justify-center text-sm font-bold">
                  T
                </div>
                <div>
                  <p class="font-medium">{{ authStore.currentUser?.firstName || 'Invité' }}</p>
                  <p class="text-xs text-green-600">Mode Test</p>
                </div>
              </div>
              
              <!-- Actions de connexion (mode normal) -->
              <div v-if="!authStore.isAuthenticated && !authStore.isTestMode" class="flex flex-col space-y-3">
                <RouterLink 
                  to="/auth" 
                  @click="closeMobileMenu"
                  class="btn-outline text-center"
                >
                  Se connecter
                </RouterLink>
                <RouterLink 
                  to="/auth" 
                  @click="closeMobileMenu"
                  class="btn-primary text-center"
                >
                  Commencer
                </RouterLink>
              </div>
              
              <!-- Dashboard -->
              <div v-if="authStore.isAuthenticated || authStore.isTestMode">
                <RouterLink 
                  to="/dashboard" 
                  @click="closeMobileMenu"
                  class="btn-primary text-center block"
                >
                  {{ authStore.isTestMode ? 'Dashboard (Test)' : 'Tableau de bord' }}
                </RouterLink>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import UserMenu from '@/components/common/UserMenu.vue'

// Store d'authentification pour vérifier l'état de connexion
const authStore = useAuthStore()

// État du menu mobile
const isMobileMenuOpen = ref(false)

// Gestion du menu mobile
const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

// Fermeture du menu mobile lors du clic à l'extérieur
const handleClickOutside = (event: Event) => {
  const target = event.target as Element
  if (!target.closest('header') && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

// Fermeture du menu mobile lors du redimensionnement
const handleResize = () => {
  if (window.innerWidth >= 1024 && isMobileMenuOpen.value) {
    closeMobileMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
/* Styles spécifiques au header */
header {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* Animation du logo au hover */
.group:hover .w-10,
.group:hover .w-12 {
  transform: scale(1.05);
}

/* Effet de survol pour les liens de navigation */
nav a::after {
  content: '';
  display: block;
  width: 0;
  height: 2px;
  background: #2E7D32;
  transition: width 0.2s ease-out;
  margin-top: 2px;
}

nav a:hover::after {
  width: 100%;
}
</style> 