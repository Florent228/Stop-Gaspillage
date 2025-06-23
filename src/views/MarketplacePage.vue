<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
    <!-- Header avec titre et statistiques -->
    <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white py-12">
      <div class="container mx-auto px-6">
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold mb-4">🛒 Marketplace Anti-Gaspillage</h1>
          <p class="text-xl text-green-100 max-w-3xl mx-auto">
            Découvrez des produits de qualité à prix réduits et participez à la lutte contre le gaspillage alimentaire
          </p>
        </div>
        
        <!-- Statistiques rapides -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-center border border-white border-opacity-30">
            <div class="text-2xl font-bold">{{ filteredOffers.length }}</div>
            <div class="text-sm text-green-100">Offres disponibles</div>
          </div>
          <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-center border border-white border-opacity-30">
            <div class="text-2xl font-bold">{{ averageDiscount }}%</div>
            <div class="text-sm text-green-100">Réduction moyenne</div>
          </div>
          <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-center border border-white border-opacity-30">
            <div class="text-2xl font-bold">{{ nearbyOffers }}</div>
            <div class="text-sm text-green-100">À proximité</div>
          </div>
          <div class="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-4 text-center border border-white border-opacity-30">
            <div class="text-2xl font-bold">2.3kg</div>
            <div class="text-sm text-green-100">CO₂ évité/commande</div>
          </div>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-6 py-8">
      <!-- Barre de recherche et filtres -->
      <div class="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">
        <!-- Recherche principale -->
        <div class="mb-6">
          <div class="relative">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Rechercher un produit, commerçant ou lieu..."
              class="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 text-lg"
            >
            <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl">🔍</span>
            <button 
              v-if="currentLocation"
              @click="useCurrentLocation"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
            >
              📍 Près de moi
            </button>
          </div>
          <p class="text-sm text-gray-600 mt-2">
            {{ currentLocation ? `📍 Position actuelle : ${currentLocation}` : '📍 Position non détectée' }}
          </p>
        </div>

        <!-- Filtres avancés -->
        <div class="grid md:grid-cols-5 gap-4">
          <!-- Catégorie -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">🏷️ Catégorie</label>
            <select 
              v-model="filters.category"
              class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none bg-white"
            >
              <option value="">Toutes</option>
              <option value="fruits-vegetables">🥬 Fruits & Légumes</option>
              <option value="bakery">🥖 Boulangerie</option>
              <option value="dairy">🥛 Produits laitiers</option>
              <option value="prepared-meals">🍽️ Plats préparés</option>
              <option value="grocery">🛒 Épicerie</option>
            </select>
          </div>

          <!-- Prix maximum -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">💰 Prix max</label>
            <select 
              v-model="filters.maxPrice"
              class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none bg-white"
            >
              <option value="">Tous prix</option>
              <option value="5">Moins de 5€</option>
              <option value="10">Moins de 10€</option>
              <option value="20">Moins de 20€</option>
              <option value="50">Moins de 50€</option>
            </select>
          </div>

          <!-- Caractéristiques -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">✨ Caractéristiques</label>
            <select 
              v-model="filters.features"
              class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none bg-white"
            >
              <option value="">Toutes</option>
              <option value="bio">🌱 Bio</option>
              <option value="local">🏘️ Local</option>
              <option value="vegan">🌿 Végan</option>
              <option value="gluten-free">🚫 Sans gluten</option>
            </select>
          </div>

          <!-- Disponibilité -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">⏰ Disponibilité</label>
            <select 
              v-model="filters.availability"
              class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none bg-white"
            >
              <option value="">Tous</option>
              <option value="today">Aujourd'hui</option>
              <option value="tomorrow">Demain</option>
              <option value="week">Cette semaine</option>
            </select>
          </div>

          <!-- Rayon -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">📍 Rayon</label>
            <select 
              v-model="filters.radius"
              class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none bg-white"
            >
              <option value="5">5 km</option>
              <option value="10">10 km</option>
              <option value="25">25 km</option>
              <option value="50">50 km</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Options de vue et tri -->
      <div class="flex flex-col sm:flex-row justify-between items-center mb-6 bg-white rounded-xl shadow-md p-4 border border-gray-200">
        <div class="flex items-center space-x-4 mb-4 sm:mb-0">
          <span class="text-gray-700 font-medium">{{ filteredOffers.length }} offres trouvées</span>
          <div class="flex bg-gray-100 rounded-lg p-1">
            <button 
              @click="viewMode = 'grid'"
              :class="viewMode === 'grid' ? 'bg-green-500 text-white' : 'text-gray-600 hover:text-green-600'"
              class="px-3 py-2 rounded-md transition-colors text-sm font-medium"
            >
              🔲 Grille
            </button>
            <button 
              @click="viewMode = 'list'"
              :class="viewMode === 'list' ? 'bg-green-500 text-white' : 'text-gray-600 hover:text-green-600'"
              class="px-3 py-2 rounded-md transition-colors text-sm font-medium"
            >
              📋 Liste
            </button>
          </div>
        </div>

        <div class="flex items-center space-x-4">
          <!-- Tri -->
          <div class="flex items-center space-x-2">
            <span class="text-gray-700 font-medium">📊 Trier par :</span>
            <select 
              v-model="sortBy"
              class="border border-gray-300 rounded-lg px-3 py-2 focus:border-green-500 focus:outline-none bg-white"
            >
              <option value="distance">Distance</option>
              <option value="price">Prix croissant</option>
              <option value="discount">Réduction</option>
              <option value="date">Plus récent</option>
            </select>
          </div>

          <!-- Mode carte -->
          <button 
            @click="showMap = !showMap"
            :class="showMap ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'"
            class="px-4 py-2 rounded-lg transition-colors font-medium"
          >
            🗺️ {{ showMap ? 'Masquer' : 'Voir' }} carte
          </button>
        </div>
      </div>

      <!-- Carte interactive -->
      <div v-if="showMap" class="mb-8">
        <OffersMap :offers="filteredOffers" />
      </div>

      <!-- Liste des offres -->
      <div v-if="filteredOffers.length > 0">
        <!-- Vue grille -->
        <div v-if="viewMode === 'grid'" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <OfferCard 
            v-for="offer in sortedOffers" 
            :key="offer.id" 
            :offer="offer"
            @reserve="handleReservation"
            @favorite="toggleFavorite"
          />
        </div>

        <!-- Vue liste -->
        <div v-else class="space-y-4">
          <OfferListItem 
            v-for="offer in sortedOffers" 
            :key="offer.id" 
            :offer="offer"
            @reserve="handleReservation"
            @favorite="toggleFavorite"
          />
        </div>

        <!-- Pagination -->
        <div class="mt-12 flex justify-center">
          <div class="bg-white rounded-xl shadow-md p-4 border border-gray-200">
            <div class="flex items-center space-x-2">
              <button 
                :disabled="currentPage === 1"
                @click="currentPage--"
                :class="currentPage === 1 ? 'bg-gray-200 text-gray-400' : 'bg-green-500 text-white hover:bg-green-600'"
                class="px-4 py-2 rounded-lg transition-colors font-medium"
              >
                ← Précédent
              </button>
              
              <span class="px-4 py-2 text-gray-700 font-medium">
                Page {{ currentPage }} sur {{ totalPages }}
              </span>
              
              <button 
                :disabled="currentPage === totalPages"
                @click="currentPage++"
                :class="currentPage === totalPages ? 'bg-gray-200 text-gray-400' : 'bg-green-500 text-white hover:bg-green-600'"
                class="px-4 py-2 rounded-lg transition-colors font-medium"
              >
                Suivant →
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Aucun résultat -->
      <div v-else class="text-center py-16">
        <div class="bg-white rounded-2xl shadow-lg p-12 border border-gray-200">
          <div class="text-6xl mb-4">🔍</div>
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Aucune offre trouvée</h3>
          <p class="text-gray-600 mb-6 max-w-md mx-auto">
            Essayez de modifier vos critères de recherche ou d'élargir votre zone géographique.
          </p>
          <button 
            @click="resetFilters"
            class="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-colors font-medium"
          >
            🔄 Réinitialiser les filtres
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useOffersStore } from '@/stores/offers'
import OfferCard from '@/components/marketplace/OfferCard.vue'
import OfferListItem from '@/components/marketplace/OfferListItem.vue'
import OffersMap from '@/components/marketplace/OffersMap.vue'
import type { MarketplaceOffer as Offer } from '@/types/offers'

const router = useRouter()

// État de la page
const offersStore = useOffersStore()
const searchQuery = ref('')
const viewMode = ref<'grid' | 'list'>('grid')
const showMap = ref(true) // Afficher la carte par défaut
const sortBy = ref('distance')
const currentLocation = ref<string>('')

// Filtres
const filters = ref({
  category: '',
  maxPrice: '',
  features: '',
  availability: '',
  radius: '10'
})

// Pagination
const currentPage = ref(1)
const itemsPerPage = 12

// Computed
const filteredOffers = computed(() => {
  let offers = offersStore.filteredOffers
  
  // Recherche textuelle
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    offers = offers.filter(offer => 
      offer.title.toLowerCase().includes(query) ||
      offer.description.toLowerCase().includes(query) ||
      offer.merchant.name.toLowerCase().includes(query) ||
      offer.merchant.address.toLowerCase().includes(query)
    )
  }
  
  // Filtres par catégorie
  if (filters.value.category) {
    offers = offers.filter(offer => offer.category === filters.value.category)
  }
  
  // Filtres par prix
  if (filters.value.maxPrice) {
    const maxPrice = parseFloat(filters.value.maxPrice)
    offers = offers.filter(offer => offer.discountedPrice <= maxPrice)
  }
  
  // Filtres par caractéristiques
  if (filters.value.features) {
    switch (filters.value.features) {
      case 'bio':
        offers = offers.filter(offer => offer.isOrganic)
        break
      case 'local':
        offers = offers.filter(offer => offer.isLocal)
        break
      case 'vegan':
        offers = offers.filter(offer => offer.isVegan)
        break
      case 'gluten-free':
        offers = offers.filter(offer => offer.isGlutenFree)
        break
    }
  }
  
  // Tri des résultats
  switch (sortBy.value) {
    case 'price':
      return [...offers].sort((a, b) => a.discountedPrice - b.discountedPrice)
    case 'discount':
      return [...offers].sort((a, b) => b.discountPercentage - a.discountPercentage)
    case 'date':
      return [...offers].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    case 'distance':
    default:
      return [...offers].sort((a, b) => a.distance - b.distance)
  }
})

const averageDiscount = computed(() => {
  if (filteredOffers.value.length === 0) return 0
  const total = filteredOffers.value.reduce((sum, offer) => sum + offer.discountPercentage, 0)
  return Math.round(total / filteredOffers.value.length)
})

const nearbyOffers = computed(() => {
  const radius = parseFloat(filters.value.radius)
  return filteredOffers.value.filter(offer => offer.distance <= radius).length
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredOffers.value.length / itemsPerPage))

const sortedOffers = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredOffers.value.slice(start, start + itemsPerPage)
})

// Actions
const useCurrentLocation = () => {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        currentLocation.value = `${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`
        // Ici, nous pourrions mettre à jour les filtres par distance
      },
      (error) => {
        console.error('Erreur de géolocalisation:', error)
      }
    )
  }
}

const resetFilters = () => {
  searchQuery.value = ''
  filters.value = {
    category: '',
    maxPrice: '',
    features: '',
    availability: '',
    radius: '10'
  }
  currentPage.value = 1
}

const handleReservation = (offerId: string) => {
  router.push(`/reservation/${offerId}`)
}

const toggleFavorite = (offerId: string) => {
  // TODO: Implémenter la logique des favoris
  console.log('Toggle favorite for offer:', offerId)
}

// Lifecycle
onMounted(async () => {
  // Charger les offres
  await offersStore.fetchOffers()
  
  // Détecter la position
  useCurrentLocation()
})
</script> 