<template>
  <div class="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group">
    <!-- Image avec badges -->
    <div class="relative h-48 overflow-hidden">
      <img 
        :src="offer.image" 
        :alt="offer.title"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      >
      
      <!-- Badge réduction -->
      <div class="absolute top-3 left-3">
        <span class="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
          -{{ offer.discount }}%
        </span>
      </div>
      
      <!-- Badge temps restant -->
      <div class="absolute top-3 right-3">
        <span 
          :class="getTimeRemainingClass(offer.timeRemaining)"
          class="px-3 py-1 rounded-full text-sm font-bold shadow-lg"
        >
          ⏰ {{ offer.timeRemaining }}
        </span>
      </div>
      
      <!-- Badge favori -->
      <button 
        @click="$emit('favorite', offer.id)"
        class="absolute bottom-3 right-3 w-10 h-10 bg-white bg-opacity-90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all shadow-lg"
      >
        <span :class="offer.isFavorite ? 'text-red-500' : 'text-gray-400'" class="text-xl">
          {{ offer.isFavorite ? '❤️' : '🤍' }}
        </span>
      </button>
    </div>

    <!-- Contenu -->
    <div class="p-6">
      <!-- Titre et description -->
      <div class="mb-4">
        <h3 class="text-xl font-bold text-gray-800 mb-2 line-clamp-2">{{ offer.title }}</h3>
        <p class="text-gray-600 text-sm line-clamp-2">{{ offer.description }}</p>
      </div>

      <!-- Caractéristiques -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="feature in offer.features" 
          :key="feature"
          :class="getFeatureBadgeClass(feature)"
          class="px-2 py-1 rounded-full text-xs font-medium"
        >
          {{ getFeatureLabel(feature) }}
        </span>
      </div>

      <!-- Informations commerçant -->
      <div class="flex items-center justify-between mb-4 p-3 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl border border-gray-200">
        <div class="flex items-center">
          <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
            {{ offer.merchant.name.charAt(0) }}
          </div>
          <div>
            <div class="font-semibold text-gray-800 text-sm">{{ offer.merchant.name }}</div>
            <div class="text-xs text-gray-600">📍 {{ offer.distance }}km • ⭐ {{ offer.merchant.rating }}/5</div>
          </div>
        </div>
      </div>

      <!-- Prix et action -->
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <span class="text-2xl font-bold text-green-600">{{ offer.discountedPrice }}€</span>
          <span class="text-lg text-gray-400 line-through">{{ offer.originalPrice }}€</span>
        </div>
        
        <button 
          @click="$emit('reserve', offer.id)"
          class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Réserver
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Offer } from '@/types/offers'

interface Props {
  offer: Offer
}

defineProps<Props>()
defineEmits<{
  reserve: [id: string]
  favorite: [id: string]
}>()

// Classes pour badge temps restant
const getTimeRemainingClass = (timeRemaining: string) => {
  if (timeRemaining.includes('heure') || timeRemaining.includes('minute')) {
    return 'bg-gradient-to-r from-red-500 to-orange-500 text-white'
  }
  if (timeRemaining.includes('jour') && parseInt(timeRemaining) <= 2) {
    return 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
  }
  return 'bg-gradient-to-r from-green-500 to-blue-500 text-white'
}

// Classes pour badges caractéristiques
const getFeatureBadgeClass = (feature: string) => {
  const classes = {
    'bio': 'bg-green-100 text-green-800 border border-green-200',
    'local': 'bg-blue-100 text-blue-800 border border-blue-200',
    'vegan': 'bg-purple-100 text-purple-800 border border-purple-200',
    'gluten-free': 'bg-orange-100 text-orange-800 border border-orange-200'
  }
  return classes[feature as keyof typeof classes] || 'bg-gray-100 text-gray-800 border border-gray-200'
}

// Labels pour caractéristiques
const getFeatureLabel = (feature: string) => {
  const labels = {
    'bio': '🌱 Bio',
    'local': '🏘️ Local',
    'vegan': '🌿 Végan',
    'gluten-free': '🚫 Sans gluten'
  }
  return labels[feature as keyof typeof labels] || feature
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