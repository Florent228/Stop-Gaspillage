<template>
  <div class="offers-map-container">
    <!-- Header de la carte -->
    <div class="bg-white p-4 border-b border-gray-200">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold text-gray-900">🗺️ Carte des offres - Toulouse</h3>
        <div class="flex items-center space-x-3">
          <button
            @click="centerOnToulouse"
            class="px-3 py-2 text-sm bg-eco-green text-white rounded-lg hover:bg-eco-dark-green transition-colors"
            title="Centrer sur Toulouse"
          >
            📍 Toulouse
          </button>
          <button
            @click="toggleMapSize"
            class="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {{ isFullscreen ? '🔽 Réduire' : '🔼 Agrandir' }}
          </button>
        </div>
      </div>
      
      <!-- Légende -->
      <div class="flex flex-wrap gap-4 text-sm">
        <div class="flex items-center">
          <div class="w-4 h-4 bg-eco-green rounded-full mr-2 border-2 border-white shadow"></div>
          <span class="text-gray-600">Disponible</span>
        </div>
        <div class="flex items-center">
          <div class="w-4 h-4 bg-orange-500 rounded-full mr-2 border-2 border-white shadow"></div>
          <span class="text-gray-600">Expire bientôt</span>
        </div>
        <div class="flex items-center">
          <span class="text-gray-600">{{ offers.length }} offre(s) trouvée(s)</span>
        </div>
      </div>
    </div>

    <!-- Carte Leaflet -->
    <div 
      ref="mapContainer" 
      :class="[
        'map-wrapper transition-all duration-300',
        isFullscreen ? 'h-96' : 'h-64'
      ]"
    >
      <div id="offers-map" class="w-full h-full rounded-b-lg"></div>
    </div>
    
    <!-- Informations de l'offre sélectionnée -->
    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="transform translate-y-full opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-full opacity-0"
    >
      <div v-if="selectedOffer" class="bg-white border-t border-gray-200 p-4">
        <div class="flex items-start space-x-4">
          <div class="flex-shrink-0">
            <div class="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
              <span class="text-2xl">{{ getCategoryIcon(selectedOffer.category) }}</span>
            </div>
          </div>
          
          <div class="flex-1 min-w-0">
            <h4 class="text-lg font-semibold text-gray-900 mb-1">{{ selectedOffer.title }}</h4>
            <p class="text-sm text-gray-600 mb-2">{{ selectedOffer.merchant.name }}</p>
            <p class="text-sm text-gray-500 mb-3">📍 {{ selectedOffer.merchant.address }}</p>
            
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-3">
                <div class="text-lg font-bold text-eco-green">{{ selectedOffer.discountedPrice }}€</div>
                <div class="text-sm text-gray-500 line-through">{{ selectedOffer.originalPrice }}€</div>
                <div class="text-sm bg-red-100 text-red-700 px-2 py-1 rounded-full">
                  -{{ selectedOffer.discountPercentage }}%
                </div>
              </div>
              
              <RouterLink 
                :to="`/reservation/${selectedOffer.id}`"
                class="px-4 py-2 bg-eco-green text-white text-sm rounded-lg hover:bg-eco-dark-green transition-colors"
              >
                Réserver
              </RouterLink>
            </div>
          </div>
          
          <button
            @click="selectedOffer = null"
            class="text-gray-400 hover:text-gray-600 p-1"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink } from 'vue-router'
import type { MarketplaceOffer as Offer } from '@/types/offers'

interface Props {
  offers: Offer[]
}

const props = defineProps<Props>()

// Import dynamique de Leaflet pour éviter les problèmes SSR
let L: any = null

// État du composant
const mapContainer = ref<HTMLElement>()
const map = ref<any>(null)
const markers = ref<any[]>([])
const selectedOffer = ref<Offer | null>(null)
const isFullscreen = ref(false)

// Coordonnées du centre de Toulouse
const TOULOUSE_CENTER = { lat: 43.6047, lng: 1.4442 }

// Fonction pour obtenir l'icône selon la catégorie
const getCategoryIcon = (category: string): string => {
  const icons: Record<string, string> = {
    'bakery': '🥖',
    'fruits-vegetables': '🥕',
    'prepared-meals': '🍽️',
    'dairy': '🧀',
    'grocery': '🛒',
    'meat': '🥩',
    'seafood': '🐟',
    'beverages': '🥤',
    'desserts': '🍰'
  }
  return icons[category] || '🛍️'
}

// Fonction pour obtenir la couleur du marqueur selon l'urgence
const getMarkerColor = (offer: Offer): string => {
  const now = new Date()
  const expiryDate = new Date(offer.expiryDate)
  const hoursDiff = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60)
  
  if (hoursDiff <= 6) return '#ef4444' // Rouge pour très urgent
  if (hoursDiff <= 12) return '#f97316' // Orange pour urgent
  return '#22c55e' // Vert pour normal
}

// Créer une icône personnalisée pour les marqueurs
const createCustomIcon = (offer: Offer): any => {
  if (!L) return null
  
  const color = getMarkerColor(offer)
  const icon = getCategoryIcon(offer.category)
  
  return L.divIcon({
    html: `
      <div class="custom-marker" style="
        background-color: ${color};
        width: 40px;
        height: 40px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        cursor: pointer;
        transition: transform 0.2s ease;
      ">
        ${icon}
      </div>
    `,
    className: 'custom-div-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  })
}

// Initialiser la carte
const initMap = async () => {
  if (!mapContainer.value) return

  try {
    // Import dynamique de Leaflet
    L = (await import('leaflet')).default
    
    // Import du CSS
    await import('leaflet/dist/leaflet.css')

    // Créer la carte centrée sur Toulouse
    map.value = L.map('offers-map').setView([TOULOUSE_CENTER.lat, TOULOUSE_CENTER.lng], 14)

    // Ajouter les tuiles OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map.value)

    // Ajouter les marqueurs
    addOfferMarkers()

    console.log('🗺️ Carte Leaflet initialisée avec succès')
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la carte:', error)
  }
}

// Ajouter les marqueurs des offres
const addOfferMarkers = () => {
  if (!map.value || !L) return

  // Supprimer les anciens marqueurs
  markers.value.forEach(marker => marker.remove())
  markers.value = []

  // Ajouter un marqueur pour chaque offre
  props.offers.forEach(offer => {
    if (!offer.merchant.coordinates) return

    const marker = L.marker(
      [offer.merchant.coordinates.lat, offer.merchant.coordinates.lng],
      { icon: createCustomIcon(offer) }
    )

    // Popup au clic
    const popupContent = `
      <div class="min-w-[200px] font-sans">
        <h4 class="font-semibold text-gray-900 mb-2">${offer.title}</h4>
        <p class="text-sm text-gray-600 mb-2">${offer.merchant.name}</p>
        <div class="flex items-center justify-between mb-3">
          <span class="text-lg font-bold text-green-600">${offer.discountedPrice}€</span>
          <span class="text-sm bg-red-100 text-red-700 px-2 py-1 rounded">-${offer.discountPercentage}%</span>
        </div>
        <p class="text-xs text-gray-500 mb-2">📍 ${offer.merchant.address}</p>
        <div class="text-xs text-gray-500 mb-3">⏰ ${offer.pickupWindow.start} - ${offer.pickupWindow.end}</div>
      </div>
    `

    marker.bindPopup(popupContent, {
      maxWidth: 250,
      className: 'custom-popup'
    })
    
    marker.addTo(map.value!)
    markers.value.push(marker)

    // Événement de clic sur le marqueur
    marker.on('click', () => {
      selectedOffer.value = offer
    })
  })

  console.log(`🗺️ ${markers.value.length} marqueurs ajoutés à la carte`)
}

// Centrer sur Toulouse
const centerOnToulouse = () => {
  if (map.value) {
    map.value.setView([TOULOUSE_CENTER.lat, TOULOUSE_CENTER.lng], 14)
  }
}

// Basculer la taille de la carte
const toggleMapSize = () => {
  isFullscreen.value = !isFullscreen.value
  
  // Redimensionner la carte après l'animation
  setTimeout(() => {
    if (map.value) {
      map.value.invalidateSize()
    }
  }, 300)
}

// Surveiller les changements d'offres
watch(() => props.offers, () => {
  if (map.value && L) {
    addOfferMarkers()
  }
}, { immediate: false })

// Lifecycle hooks
onMounted(() => {
  setTimeout(() => {
    initMap()
  }, 100)
})

onUnmounted(() => {
  if (map.value) {
    map.value.remove()
  }
})
</script>

<style scoped>
.offers-map-container {
  @apply bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200;
}

.map-wrapper {
  position: relative;
}

/* Styles globaux pour Leaflet */
:deep(.custom-div-icon) {
  background: transparent !important;
  border: none !important;
}

:deep(.leaflet-popup-content-wrapper) {
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
}

:deep(.leaflet-popup-content) {
  margin: 12px;
  font-size: 14px;
}

:deep(.custom-popup .leaflet-popup-tip) {
  background-color: white;
}
</style> 