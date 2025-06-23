<template>
  <!-- Conteneur de notifications globales -->
  <div class="fixed top-4 right-4 z-[100] space-y-4 max-w-sm">
    <TransitionGroup
      name="notification"
      tag="div"
      class="space-y-4"
    >
      <div
        v-for="notification in notifications"
        :key="notification.id"
        :class="[
          'p-4 rounded-lg shadow-lg border-l-4 backdrop-blur-sm',
          'transform transition-all duration-300 ease-out',
          getNotificationClasses(notification.type)
        ]"
      >
        <div class="flex items-start">
          <!-- Icône selon le type -->
          <div class="flex-shrink-0 mr-3">
            <svg 
              v-if="notification.type === 'success'" 
              class="w-5 h-5 text-eco-green" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
            </svg>
            <svg 
              v-else-if="notification.type === 'error'" 
              class="w-5 h-5 text-red-500" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
            <svg 
              v-else-if="notification.type === 'warning'" 
              class="w-5 h-5 text-eco-orange" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
            </svg>
            <svg 
              v-else 
              class="w-5 h-5 text-eco-blue" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"/>
            </svg>
          </div>

          <!-- Contenu de la notification -->
          <div class="flex-1 min-w-0">
            <p 
              v-if="notification.title"
              class="text-sm font-semibold text-eco-gray"
            >
              {{ notification.title }}
            </p>
            <p class="text-sm text-eco-gray/80 mt-1">
              {{ notification.message }}
            </p>
          </div>

          <!-- Bouton de fermeture -->
          <button
            @click="removeNotification(notification.id)"
            class="flex-shrink-0 ml-2 text-eco-gray/50 hover:text-eco-gray transition-colors duration-200"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
            </svg>
          </button>
        </div>

        <!-- Barre de progression pour l'auto-suppression -->
        <div 
          v-if="notification.autoRemove"
          class="mt-3 h-1 bg-gray-200 rounded-full overflow-hidden"
        >
          <div 
            class="h-full bg-current opacity-50 rounded-full transition-all duration-300 ease-linear"
            :style="{ 
              width: `${getProgressWidth(notification)}%`,
              animationDuration: `${notification.duration}ms`
            }"
          />
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useNotificationStore } from '@/stores/notifications'

// Interface pour les notifications
interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
  autoRemove?: boolean
  createdAt: number
}

// Store des notifications
const notificationStore = useNotificationStore()

// Notifications réactives
const notifications = computed(() => notificationStore.notifications)

/**
 * Suppression d'une notification
 */
const removeNotification = (id: string) => {
  notificationStore.removeNotification(id)
}

/**
 * Classes CSS selon le type de notification
 */
const getNotificationClasses = (type: string) => {
  const baseClasses = 'bg-white/95'
  
  switch (type) {
    case 'success':
      return `${baseClasses} border-l-eco-green`
    case 'error':
      return `${baseClasses} border-l-red-500`
    case 'warning':
      return `${baseClasses} border-l-eco-orange`
    case 'info':
    default:
      return `${baseClasses} border-l-eco-blue`
  }
}

/**
 * Largeur de la barre de progression
 */
const getProgressWidth = (notification: Notification) => {
  if (!notification.duration || !notification.autoRemove) return 100
  
  const elapsed = Date.now() - notification.createdAt
  const progress = Math.max(0, (notification.duration - elapsed) / notification.duration * 100)
  
  return progress
}
</script>

<style scoped>
/* Animations pour les transitions */
.notification-enter-active {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.notification-leave-active {
  transition: all 0.3s ease-in;
}

.notification-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.notification-leave-to {
  opacity: 0;
  transform: translateX(100%) scale(0.8);
}

.notification-move {
  transition: transform 0.3s ease;
}

/* Animation de la barre de progression */
.progress-bar {
  animation: progress-countdown linear;
}

@keyframes progress-countdown {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
</style> 