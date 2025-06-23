<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    
    <div class="container mx-auto px-6 py-8">
      <div class="max-w-7xl mx-auto">
        <!-- En-tête -->
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">📚 Mon historique</h1>
          <p class="text-gray-600">Suivez vos réservations et votre impact environnemental</p>
        </div>

        <!-- Statistiques globales -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center">
              <div class="p-3 bg-forest-100 rounded-lg">
                <span class="text-2xl">🛒</span>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">Total réservations</p>
                <p class="text-2xl font-bold text-gray-900">{{ stats.totalReservations }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 rounded-lg">
                <span class="text-2xl">💰</span>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">Économies totales</p>
                <p class="text-2xl font-bold text-green-600">{{ stats.totalSavings }}€</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center">
              <div class="p-3 bg-blue-100 rounded-lg">
                <span class="text-2xl">🌱</span>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">CO₂ évité</p>
                <p class="text-2xl font-bold text-blue-600">{{ stats.totalCO2 }}kg</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center">
              <div class="p-3 bg-orange-100 rounded-lg">
                <span class="text-2xl">🏆</span>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">Score impact</p>
                <p class="text-2xl font-bold text-orange-600">{{ stats.impactScore }}/100</p>
              </div>
            </div>
          </div>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          <!-- Timeline et filtres -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Filtres -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <div class="flex flex-col md:flex-row gap-4">
                <div class="flex-1">
                  <label class="block text-sm font-medium text-gray-700 mb-2">Rechercher</label>
                  <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Nom du produit, marchand..."
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                  <select 
                    v-model="statusFilter"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  >
                    <option value="">Tous les statuts</option>
                    <option value="completed">Récupéré</option>
                    <option value="confirmed">Confirmé</option>
                    <option value="cancelled">Annulé</option>
                    <option value="expired">Expiré</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Période</label>
                  <select 
                    v-model="periodFilter"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  >
                    <option value="all">Toute la période</option>
                    <option value="week">Cette semaine</option>
                    <option value="month">Ce mois</option>
                    <option value="quarter">Ce trimestre</option>
                    <option value="year">Cette année</option>
                  </select>
                </div>
              </div>
            </div>

            <!-- Timeline des réservations -->
            <div class="bg-white rounded-xl shadow-sm">
              <div class="p-6 border-b border-gray-200">
                <h2 class="text-xl font-semibold text-gray-900">🕒 Timeline des réservations</h2>
              </div>

              <div class="p-6">
                <div v-if="filteredReservations.length === 0" class="text-center py-12">
                  <div class="text-6xl mb-4">📭</div>
                  <h3 class="text-lg font-semibold text-gray-900 mb-2">Aucune réservation trouvée</h3>
                  <p class="text-gray-600">Modifiez vos critères de recherche ou explorez la marketplace</p>
                </div>

                <div v-else class="space-y-6">
                  <div
                    v-for="(reservation, index) in paginatedReservations"
                    :key="reservation.id"
                    class="relative"
                  >
                    <!-- Ligne de timeline -->
                    <div 
                      v-if="index < paginatedReservations.length - 1"
                      class="absolute left-6 top-16 w-0.5 h-20 bg-gray-200"
                    ></div>

                    <!-- Item de timeline -->
                    <div class="flex items-start space-x-4">
                      <!-- Badge statut -->
                      <div 
                        :class="getStatusColor(reservation.status)"
                        class="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                      >
                        <span class="text-lg">{{ getStatusIcon(reservation.status) }}</span>
                      </div>

                      <!-- Contenu -->
                      <div class="flex-1 bg-gray-50 rounded-lg p-4">
                        <div class="flex items-start justify-between mb-3">
                          <div>
                            <h3 class="font-semibold text-gray-900">{{ reservation.productName }}</h3>
                            <p class="text-sm text-gray-600">{{ reservation.merchantName }}</p>
                          </div>
                          <div class="text-right">
                            <p class="font-semibold text-forest-600">{{ reservation.price.toFixed(2) }}€</p>
                            <p class="text-xs text-gray-500">{{ formatDate(reservation.date) }}</p>
                          </div>
                        </div>

                        <div class="flex items-center justify-between">
                          <div>
                            <span 
                              :class="getStatusBadgeColor(reservation.status)"
                              class="px-2 py-1 rounded-full text-xs font-medium"
                            >
                              {{ getStatusLabel(reservation.status) }}
                            </span>
                            
                            <span v-if="reservation.savings > 0" class="ml-2 text-sm text-green-600">
                              💰 {{ reservation.savings.toFixed(2) }}€ économisés
                            </span>
                          </div>

                          <div class="flex space-x-2">
                            <button 
                              v-if="reservation.status === 'completed'"
                              @click="downloadReceipt(reservation.id)"
                              class="text-sm text-gray-600 hover:text-gray-800"
                            >
                              📄 Reçu
                            </button>
                            <button 
                              v-if="reservation.status === 'confirmed'"
                              @click="viewReservation(reservation.id)"
                              class="text-sm text-forest-600 hover:text-forest-700"
                            >
                              👁️ Voir
                            </button>
                            <button 
                              v-if="canCancel(reservation)"
                              @click="cancelReservation(reservation.id)"
                              class="text-sm text-red-600 hover:text-red-700"
                            >
                              ❌ Annuler
                            </button>
                          </div>
                        </div>

                        <!-- Impact environnemental -->
                        <div v-if="reservation.impact" class="mt-3 pt-3 border-t border-gray-200">
                          <div class="flex items-center text-xs text-gray-600 space-x-4">
                            <span>🌱 {{ reservation.impact.co2 }}kg CO₂ évité</span>
                            <span>💧 {{ reservation.impact.water }}L eau économisée</span>
                            <span>🌳 {{ reservation.impact.trees }} arbres équivalents</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Pagination -->
                <div v-if="totalPages > 1" class="flex justify-center mt-8">
                  <div class="flex space-x-2">
                    <button
                      v-for="page in paginationPages"
                      :key="page"
                      @click="currentPage = page"
                      :class="page === currentPage ? 'bg-forest-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                      class="px-4 py-2 border border-gray-300 rounded-lg transition-colors"
                    >
                      {{ page }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar Analytics -->
          <div class="space-y-6">
            <!-- Graphique mensuel -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">📊 Évolution mensuelle</h3>
              
              <!-- Graphique placeholder -->
              <div class="bg-gray-50 rounded-lg h-48 flex items-center justify-center border border-gray-200 mb-4">
                <div class="text-center">
                  <div class="text-4xl mb-2">📈</div>
                  <p class="text-gray-600">Graphique interactif</p>
                  <p class="text-sm text-gray-500">Chart.js en développement</p>
                </div>
              </div>

              <!-- Métriques du mois -->
              <div class="grid grid-cols-2 gap-3 text-sm">
                <div class="text-center p-3 bg-gray-50 rounded">
                  <div class="font-semibold text-forest-600">{{ monthlyStats.reservations }}</div>
                  <div class="text-gray-600">Réservations</div>
                </div>
                <div class="text-center p-3 bg-gray-50 rounded">
                  <div class="font-semibold text-green-600">{{ monthlyStats.savings }}€</div>
                  <div class="text-gray-600">Économies</div>
                </div>
              </div>
            </div>

            <!-- Impact environnemental -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">🌱 Impact total</h3>
              
              <div class="space-y-4">
                <!-- Score global -->
                <div>
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-sm text-gray-700">Score d'impact</span>
                    <span class="font-semibold text-forest-600">{{ stats.impactScore }}/100</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      class="bg-gradient-to-r from-forest-400 to-forest-600 h-3 rounded-full transition-all duration-1000"
                      :style="{ width: `${stats.impactScore}%` }"
                    ></div>
                  </div>
                </div>

                <!-- Métriques détaillées -->
                <div class="space-y-3">
                  <div class="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div class="flex items-center">
                      <span class="text-blue-600 mr-2">🌊</span>
                      <span class="text-sm text-blue-800">Eau économisée</span>
                    </div>
                    <span class="font-semibold text-blue-600">{{ stats.totalWater }}L</span>
                  </div>

                  <div class="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div class="flex items-center">
                      <span class="text-green-600 mr-2">🌳</span>
                      <span class="text-sm text-green-800">Arbres équivalents</span>
                    </div>
                    <span class="font-semibold text-green-600">{{ stats.totalTrees }}</span>
                  </div>

                  <div class="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                    <div class="flex items-center">
                      <span class="text-orange-600 mr-2">🚗</span>
                      <span class="text-sm text-orange-800">KM de trajet évités</span>
                    </div>
                    <span class="font-semibold text-orange-600">{{ stats.totalCarKm }}km</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Badges et achievements -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">🏆 Badges obtenus</h3>
              
              <div class="grid grid-cols-2 gap-3">
                <div 
                  v-for="badge in earnedBadges" 
                  :key="badge.id"
                  class="text-center p-3 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200"
                >
                  <div class="text-2xl mb-1">{{ badge.icon }}</div>
                  <div class="text-xs font-medium text-gray-800">{{ badge.name }}</div>
                  <div class="text-xs text-gray-600">{{ badge.description }}</div>
                </div>
              </div>

              <div v-if="nextBadge" class="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div class="text-center">
                  <div class="text-xl mb-1 opacity-50">{{ nextBadge.icon }}</div>
                  <div class="text-xs font-medium text-gray-700">Prochain badge: {{ nextBadge.name }}</div>
                  <div class="text-xs text-gray-600">{{ nextBadge.progress }}/{{ nextBadge.target }} {{ nextBadge.unit }}</div>
                  <div class="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      class="bg-forest-400 h-2 rounded-full"
                      :style="{ width: `${(nextBadge.progress / nextBadge.target) * 100}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'

const router = useRouter()

// État
const searchQuery = ref('')
const statusFilter = ref('')
const periodFilter = ref('all')
const currentPage = ref(1)
const itemsPerPage = 10

// Données simulées
const stats = ref({
  totalReservations: 47,
  totalSavings: 142.50,
  totalCO2: 18.7,
  totalWater: 245,
  totalTrees: 37,
  totalCarKm: 78,
  impactScore: 87
})

const monthlyStats = ref({
  reservations: 8,
  savings: 28.50
})

const reservations = ref([
  {
    id: 'r1',
    productName: 'Pain complet bio du jour',
    merchantName: 'Boulangerie Martin',
    price: 1.50,
    originalPrice: 3.50,
    savings: 2.00,
    date: new Date('2024-01-15T14:30:00'),
    status: 'completed',
    impact: {
      co2: 0.8,
      water: 1.5,
      trees: 1.6
    }
  },
  {
    id: 'r2',
    productName: 'Légumes bio de saison',
    merchantName: 'Ferme Bio Dubois',
    price: 6.00,
    originalPrice: 12.00,
    savings: 6.00,
    date: new Date('2024-01-14T16:15:00'),
    status: 'completed',
    impact: {
      co2: 0.6,
      water: 4.0,
      trees: 1.2
    }
  },
  {
    id: 'r3',
    productName: 'Fromages artisanaux',
    merchantName: 'Fromagerie Delacroix',
    price: 12.00,
    originalPrice: 18.00,
    savings: 6.00,
    date: new Date('2024-01-12T18:45:00'),
    status: 'confirmed',
    impact: {
      co2: 2.4,
      water: 6.0,
      trees: 4.8
    }
  },
  {
    id: 'r4',
    productName: 'Plats préparés végétariens',
    merchantName: 'Cuisine Verte',
    price: 8.50,
    originalPrice: 15.00,
    savings: 6.50,
    date: new Date('2024-01-10T12:20:00'),
    status: 'cancelled',
    impact: {
      co2: 1.5,
      water: 2.5,
      trees: 3.0
    }
  }
])

const earnedBadges = ref([
  {
    id: 'eco-warrior',
    name: 'Éco-Guerrier',
    description: '10 réservations',
    icon: '🌱'
  },
  {
    id: 'money-saver',
    name: 'Économe',
    description: '100€ économisés',
    icon: '💰'
  },
  {
    id: 'carbon-fighter',
    name: 'Anti-CO₂',
    description: '10kg CO₂ évité',
    icon: '🌍'
  },
  {
    id: 'local-hero',
    name: 'Héros Local',
    description: '5 produits locaux',
    icon: '📍'
  }
])

const nextBadge = ref({
  id: 'master-saver',
  name: 'Maître Économe',
  description: '50 réservations',
  icon: '🏆',
  progress: 47,
  target: 50,
  unit: 'réservations'
})

// Filtrage
const filteredReservations = computed(() => {
  let result = reservations.value

  // Recherche textuelle
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(r => 
      r.productName.toLowerCase().includes(query) ||
      r.merchantName.toLowerCase().includes(query)
    )
  }

  // Filtre par statut
  if (statusFilter.value) {
    result = result.filter(r => r.status === statusFilter.value)
  }

  // Filtre par période
  if (periodFilter.value !== 'all') {
    const now = new Date()
    const filterDate = new Date()
    
    switch (periodFilter.value) {
      case 'week':
        filterDate.setDate(now.getDate() - 7)
        break
      case 'month':
        filterDate.setMonth(now.getMonth() - 1)
        break
      case 'quarter':
        filterDate.setMonth(now.getMonth() - 3)
        break
      case 'year':
        filterDate.setFullYear(now.getFullYear() - 1)
        break
    }
    
    result = result.filter(r => r.date >= filterDate)
  }

  return result.sort((a, b) => b.date.getTime() - a.date.getTime())
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredReservations.value.length / itemsPerPage))

const paginatedReservations = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredReservations.value.slice(start, start + itemsPerPage)
})

const paginationPages = computed(() => {
  const pages = []
  for (let i = 1; i <= totalPages.value; i++) {
    pages.push(i)
  }
  return pages
})

// Méthodes
const getStatusColor = (status: string) => {
  const colors = {
    completed: 'bg-green-100 text-green-600',
    confirmed: 'bg-blue-100 text-blue-600',
    cancelled: 'bg-red-100 text-red-600',
    expired: 'bg-gray-100 text-gray-600'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-600'
}

const getStatusBadgeColor = (status: string) => {
  const colors = {
    completed: 'bg-green-100 text-green-800',
    confirmed: 'bg-blue-100 text-blue-800',
    cancelled: 'bg-red-100 text-red-800',
    expired: 'bg-gray-100 text-gray-800'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

const getStatusIcon = (status: string) => {
  const icons = {
    completed: '✅',
    confirmed: '⏳',
    cancelled: '❌',
    expired: '⏰'
  }
  return icons[status as keyof typeof icons] || '❓'
}

const getStatusLabel = (status: string) => {
  const labels = {
    completed: 'Récupéré',
    confirmed: 'Confirmé',
    cancelled: 'Annulé',
    expired: 'Expiré'
  }
  return labels[status as keyof typeof labels] || 'Inconnu'
}

const canCancel = (reservation: any) => {
  return reservation.status === 'confirmed' && 
         new Date() < new Date(reservation.date.getTime() + 60 * 60 * 1000) // 1h avant
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('fr-FR', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const downloadReceipt = (reservationId: string) => {
  // Simulation téléchargement reçu
  console.log('Téléchargement reçu:', reservationId)
}

const viewReservation = (reservationId: string) => {
  router.push(`/reservation/${reservationId}`)
}

const cancelReservation = (reservationId: string) => {
  if (confirm('Êtes-vous sûr de vouloir annuler cette réservation ?')) {
    const reservation = reservations.value.find(r => r.id === reservationId)
    if (reservation) {
      reservation.status = 'cancelled'
    }
  }
}

onMounted(() => {
  // Charger les données depuis l'API
})
</script> 