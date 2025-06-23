<template>
  <!-- Application principale Stop-Gaspillage -->
  <div id="app" class="min-h-screen bg-eco-beige">
    <!-- Vue Router : Affichage des pages selon la route -->
    <RouterView />
    
    <!-- Notifications globales -->
    <NotificationContainer />
    
    <!-- Bouton flottant pour basculer le mode test -->
    <TestModeToggle />
    
    <!-- Optimiseur de lisibilité -->
    <ReadabilityOptimizer />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import NotificationContainer from '@/components/common/NotificationContainer.vue'
import TestModeToggle from '@/components/common/TestModeToggle.vue'
import ReadabilityOptimizer from '@/components/common/ReadabilityOptimizer.vue'
import { useAuthStore } from '@/stores/auth'

// Store d'authentification pour vérifier l'état de connexion au démarrage
const authStore = useAuthStore()

onMounted(() => {
  // Vérification du token d'authentification au démarrage de l'app
  authStore.checkAuthState()
})
</script>

<style scoped>
/* Styles spécifiques au composant App */
#app {
  font-family: 'Inter', 'Nunito', sans-serif;
}
</style> 