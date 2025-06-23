<template>
  <!-- Menu utilisateur avec dropdown -->
  <div class="relative" ref="menuRef">
    <!-- Bouton d'ouverture du menu -->
    <button
      @click="toggleMenu"
      class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200 focus:ring-2 focus:ring-eco-green focus:ring-offset-2"
      :class="{ 'bg-gray-50': isOpen }"
    >
      <!-- Avatar utilisateur -->
      <div class="w-8 h-8 rounded-full bg-eco-green flex items-center justify-center text-white font-semibold text-sm">
        {{ userInitials }}
      </div>
      
      <!-- Nom utilisateur (desktop seulement) -->
      <span class="hidden lg:block text-sm font-medium text-eco-gray max-w-24 truncate">
        {{ authStore.user?.name }}
      </span>
      
      <!-- Icône de dropdown -->
      <svg 
        class="w-4 h-4 text-eco-gray transition-transform duration-200"
        :class="{ 'rotate-180': isOpen }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
      </svg>
    </button>

    <!-- Menu dropdown -->
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50"
      >
        <!-- Informations utilisateur -->
        <div class="px-4 py-3 border-b border-gray-100">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 rounded-full bg-eco-green flex items-center justify-center text-white font-semibold">
              {{ userInitials }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-semibold text-eco-gray truncate">
                {{ authStore.user?.name }}
              </p>
              <p class="text-xs text-eco-gray/70 truncate">
                {{ authStore.user?.email }}
              </p>
              <span class="inline-flex px-2 py-1 text-xs rounded-full bg-eco-green/10 text-eco-green mt-1">
                {{ userTypeLabel }}
              </span>
            </div>
          </div>
        </div>

        <!-- Navigation du menu -->
        <nav class="py-2">
          <!-- Tableau de bord -->
          <RouterLink
            to="/dashboard"
            @click="closeMenu"
            class="flex items-center px-4 py-2 text-sm text-eco-gray hover:bg-gray-50 transition-colors duration-200"
          >
            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0H8v0z"/>
            </svg>
            Tableau de bord
          </RouterLink>

          <!-- Mes offres -->
          <RouterLink
            to="/my-offers"
            @click="closeMenu"
            class="flex items-center px-4 py-2 text-sm text-eco-gray hover:bg-gray-50 transition-colors duration-200"
          >
            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
            </svg>
            Mes offres
          </RouterLink>

          <!-- Historique -->
          <RouterLink
            to="/history"
            @click="closeMenu"
            class="flex items-center px-4 py-2 text-sm text-eco-gray hover:bg-gray-50 transition-colors duration-200"
          >
            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Historique
          </RouterLink>

          <!-- Impact environnemental -->
          <RouterLink
            to="/impact"
            @click="closeMenu"
            class="flex items-center px-4 py-2 text-sm text-eco-gray hover:bg-gray-50 transition-colors duration-200"
          >
            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
            </svg>
            Mon impact
          </RouterLink>

          <div class="border-t border-gray-100 my-2"></div>

          <!-- Paramètres -->
          <RouterLink
            to="/settings"
            @click="closeMenu"
            class="flex items-center px-4 py-2 text-sm text-eco-gray hover:bg-gray-50 transition-colors duration-200"
          >
            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            Paramètres
          </RouterLink>

          <!-- Administration (si admin) -->
          <RouterLink
            v-if="authStore.isAdmin"
            to="/admin"
            @click="closeMenu"
            class="flex items-center px-4 py-2 text-sm text-eco-gray hover:bg-gray-50 transition-colors duration-200"
          >
            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            Administration
          </RouterLink>

          <div class="border-t border-gray-100 my-2"></div>

          <!-- Aide et support -->
          <a
            href="#"
            @click="closeMenu"
            class="flex items-center px-4 py-2 text-sm text-eco-gray hover:bg-gray-50 transition-colors duration-200"
          >
            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            Aide & Support
          </a>

          <!-- Déconnexion -->
          <button
            @click="handleLogout"
            class="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
          >
            <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
            </svg>
            Se déconnecter
          </button>
        </nav>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useNotificationStore } from '@/stores/notifications'

// Stores
const authStore = useAuthStore()
const notificationStore = useNotificationStore()
const router = useRouter()

// État local
const isOpen = ref(false)
const menuRef = ref<HTMLElement>()

// Calculs réactifs
const userInitials = computed(() => {
  const name = authStore.user?.name || ''
  return name
    .split(' ')
    .map(word => word.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2)
})

const userTypeLabel = computed(() => {
  const type = authStore.user?.type
  switch (type) {
    case 'particulier':
      return 'Particulier'
    case 'commerçant':
      return 'Commerçant'
    case 'association':
      return 'Association'
    default:
      return 'Utilisateur'
  }
})

// Méthodes
const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}

const handleLogout = async () => {
  try {
    await authStore.logout()
    notificationStore.success('Déconnexion réussie', {
      title: 'À bientôt !'
    })
    router.push('/')
  } catch (error) {
    notificationStore.error('Erreur lors de la déconnexion')
  }
  closeMenu()
}

// Fermeture du menu lors du clic à l'extérieur
const handleClickOutside = (event: Event) => {
  if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
    closeMenu()
  }
}

// Fermeture du menu avec la touche Escape
const handleEscapeKey = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && isOpen.value) {
    closeMenu()
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleEscapeKey)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleEscapeKey)
})
</script>

<style scoped>
/* Animation de rotation pour l'icône dropdown */
.rotate-180 {
  transform: rotate(180deg);
}

/* Styles pour les liens actifs */
.router-link-active {
  @apply bg-eco-green/10 text-eco-green;
}

.router-link-active svg {
  @apply text-eco-green;
}
</style> 