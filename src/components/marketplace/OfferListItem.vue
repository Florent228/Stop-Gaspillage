<template>
  <div class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer overflow-hidden group">
    <div class="flex">
      <!-- Image -->
      <div class="w-32 h-32 flex-shrink-0 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative">
        <span class="text-3xl">{{ categoryEmoji }}</span>
        
        <!-- Badge réduction -->
        <div class="absolute top-2 left-2">
          <span class="bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            -{{ offer.discount }}%
          </span>
        </div>
      </div>

      <!-- Contenu -->
      <div class="flex-1 p-4">
        <div class="flex items-start justify-between">
          <!-- Informations principales -->
          <div class="flex-1 mr-4">
            <!-- En-tête -->
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center text-sm text-gray-600">
                <span class="mr-1">🏪</span>
                <span>{{ offer.merchant }}</span>
                <span class="mx-2">•</span>
                <span class="flex items-center text-yellow-600">
                  <span class="mr-1">⭐</span>
                  {{ offer.rating }}
                </span>
              </div>
              
              <!-- Badge temps restant -->
              <span 
                :class="timeLeftColor"
                class="px-2 py-1 rounded text-xs font-medium"
              >
                {{ timeLeft }}
              </span>
            </div>

            <!-- Titre -->
            <h3 class="font-semibold text-gray-900 mb-2 group-hover:text-forest-600 transition-colors">
              {{ offer.title }}
            </h3>

            <!-- Description -->
            <p class="text-sm text-gray-600 mb-3 line-clamp-2">
              {{ offer.description }}
            </p>

            <!-- Badges caractéristiques -->
            <div class="flex flex-wrap gap-2 mb-3">
              <span v-if="offer.isOrganic" class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                🌿 Bio
              </span>
              <span v-if="offer.isVegan" class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                🌱 Végan
              </span>
              <span v-if="offer.isLocal" class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                📍 Local
              </span>
            </div>

            <!-- Adresse et distance -->
            <div class="flex items-center text-sm text-gray-500">
              <span class="mr-1">📍</span>
              <span class="truncate mr-2">{{ offer.address }}</span>
              <span class="font-medium text-gray-700">{{ offer.distance }}km</span>
            </div>
          </div>

          <!-- Prix et action -->
          <div class="flex flex-col items-end justify-between h-full min-h-[120px]">
            <!-- Prix -->
            <div class="text-right mb-4">
              <div class="flex items-center space-x-2 mb-1">
                <span class="text-2xl font-bold text-forest-600">{{ offer.discountedPrice.toFixed(2) }}€</span>
                <span class="text-sm text-gray-500 line-through">{{ offer.originalPrice.toFixed(2) }}€</span>
              </div>
              <p class="text-xs text-gray-600">{{ offer.quantity }} {{ offer.unit }}</p>
              <p class="text-xs text-gray-500 mt-1">Expire à {{ formatTime(offer.expiresAt) }}</p>
            </div>

            <!-- Bouton d'action -->
            <button 
              @click.stop="$emit('reserve')"
              class="bg-forest-600 text-white py-2 px-6 rounded-lg hover:bg-forest-700 transition-colors font-medium whitespace-nowrap"
            >
              Réserver
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Offer {
  id: string
  title: string
  description: string
  category: string
  originalPrice: number
  discountedPrice: number
  discount: number
  quantity: number
  unit: string
  merchant: string
  address: string
  distance: number
  expiresAt: Date
  isOrganic?: boolean
  isVegan?: boolean
  isLocal?: boolean
  rating: number
}

interface Props {
  offer: Offer
}

const props = defineProps<Props>()
const emit = defineEmits<{
  reserve: []
}>()

const categoryEmojiMap: Record<string, string> = {
  'fruits-legumes': '🥬',
  'pain-viennoiseries': '🥖',
  'produits-laitiers': '🥛',
  'viandes-poissons': '🍗',
  'epicerie': '🛒',
  'plats-prepares': '🍽️'
}

const categoryEmoji = computed(() => categoryEmojiMap[props.offer.category] || '🛒')

const timeLeft = computed(() => {
  const now = new Date()
  const expires = props.offer.expiresAt
  const diff = expires.getTime() - now.getTime()
  
  if (diff <= 0) return 'Expiré'
  
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
  
  if (hours > 24) {
    const days = Math.floor(hours / 24)
    return `${days}j ${hours % 24}h`
  } else if (hours > 0) {
    return `${hours}h ${minutes}m`
  } else {
    return `${minutes}m`
  }
})

const timeLeftColor = computed(() => {
  const now = new Date()
  const expires = props.offer.expiresAt
  const diff = expires.getTime() - now.getTime()
  const hours = diff / (1000 * 60 * 60)
  
  if (hours <= 0) return 'bg-red-500 text-white'
  if (hours <= 2) return 'bg-orange-500 text-white'
  if (hours <= 6) return 'bg-yellow-500 text-white'
  return 'bg-green-500 text-white'
})

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('fr-FR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  })
}
</script>

<style scoped>
.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style> 