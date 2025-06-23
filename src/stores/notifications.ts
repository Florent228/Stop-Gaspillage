import { defineStore } from 'pinia'
import { ref } from 'vue'

// Interface pour les notifications
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message: string
  duration?: number
  autoRemove?: boolean
  createdAt: number
}

export const useNotificationStore = defineStore('notifications', () => {
  // État réactif des notifications
  const notifications = ref<Notification[]>([])

  // Durées par défaut selon le type
  const defaultDurations = {
    success: 4000,
    info: 5000,
    warning: 6000,
    error: 8000
  }

  /**
   * Ajout d'une nouvelle notification
   */
  const addNotification = (
    type: Notification['type'],
    message: string,
    options: {
      title?: string
      duration?: number
      autoRemove?: boolean
    } = {}
  ): string => {
    const id = generateId()
    const duration = options.duration ?? defaultDurations[type]
    const autoRemove = options.autoRemove ?? true

    const notification: Notification = {
      id,
      type,
      title: options.title,
      message,
      duration,
      autoRemove,
      createdAt: Date.now()
    }

    notifications.value.push(notification)

    // Auto-suppression après la durée spécifiée
    if (autoRemove && duration > 0) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }

    return id
  }

  /**
   * Suppression d'une notification par ID
   */
  const removeNotification = (id: string): void => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index > -1) {
      notifications.value.splice(index, 1)
    }
  }

  /**
   * Suppression de toutes les notifications
   */
  const clearAllNotifications = (): void => {
    notifications.value = []
  }

  /**
   * Suppression des notifications d'un type spécifique
   */
  const clearNotificationsByType = (type: Notification['type']): void => {
    notifications.value = notifications.value.filter(n => n.type !== type)
  }

  // Méthodes de convenance pour chaque type de notification

  /**
   * Notification de succès
   */
  const success = (message: string, options?: { title?: string; duration?: number }): string => {
    return addNotification('success', message, options)
  }

  /**
   * Notification d'erreur
   */
  const error = (message: string, options?: { title?: string; duration?: number }): string => {
    return addNotification('error', message, options)
  }

  /**
   * Notification d'avertissement
   */
  const warning = (message: string, options?: { title?: string; duration?: number }): string => {
    return addNotification('warning', message, options)
  }

  /**
   * Notification d'information
   */
  const info = (message: string, options?: { title?: string; duration?: number }): string => {
    return addNotification('info', message, options)
  }

  /**
   * Notification persistante (sans auto-suppression)
   */
  const persistent = (
    type: Notification['type'],
    message: string,
    title?: string
  ): string => {
    return addNotification(type, message, {
      title,
      autoRemove: false
    })
  }

  /**
   * Génération d'un ID unique pour les notifications
   */
  const generateId = (): string => {
    return `notification-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  return {
    // État
    notifications,

    // Actions
    addNotification,
    removeNotification,
    clearAllNotifications,
    clearNotificationsByType,

    // Méthodes de convenance
    success,
    error,
    warning,
    info,
    persistent
  }
}) 