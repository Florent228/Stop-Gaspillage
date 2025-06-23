<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    
    <div class="container mx-auto px-6 py-8">
      <div class="max-w-7xl mx-auto">
        <!-- En-tête Admin -->
        <div class="flex items-center justify-between mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-900 mb-2">🛠️ Administration</h1>
            <p class="text-gray-600">Tableau de bord administrateur - Stop-Gaspillage</p>
          </div>
          
          <!-- Actions rapides -->
          <div class="flex space-x-3">
            <button 
              @click="exportData"
              class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              📊 Exporter données
            </button>
            <button 
              @click="generateReport"
              class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              📄 Rapport mensuel
            </button>
          </div>
        </div>

        <!-- Métriques globales -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center">
              <div class="p-3 bg-blue-100 rounded-lg">
                <span class="text-2xl">👥</span>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">Utilisateurs totaux</p>
                <p class="text-2xl font-bold text-gray-900">{{ globalStats.totalUsers }}</p>
                <p class="text-xs text-green-600">+{{ globalStats.newUsersThisMonth }} ce mois</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center">
              <div class="p-3 bg-green-100 rounded-lg">
                <span class="text-2xl">🛒</span>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">Offres actives</p>
                <p class="text-2xl font-bold text-gray-900">{{ globalStats.activeOffers }}</p>
                <p class="text-xs text-blue-600">{{ globalStats.offersToday }} aujourd'hui</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center">
              <div class="p-3 bg-orange-100 rounded-lg">
                <span class="text-2xl">💰</span>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">Économies totales</p>
                <p class="text-2xl font-bold text-gray-900">{{ globalStats.totalSavings }}€</p>
                <p class="text-xs text-orange-600">{{ globalStats.savingsThisMonth }}€ ce mois</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-sm p-6">
            <div class="flex items-center">
              <div class="p-3 bg-red-100 rounded-lg">
                <span class="text-2xl">🌱</span>
              </div>
              <div class="ml-4">
                <p class="text-sm text-gray-600">CO₂ évité</p>
                <p class="text-2xl font-bold text-gray-900">{{ globalStats.totalCO2 }}kg</p>
                <p class="text-xs text-red-600">{{ globalStats.co2ThisMonth }}kg ce mois</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation tabs -->
        <div class="bg-white rounded-xl shadow-sm mb-8">
          <div class="border-b border-gray-200">
            <nav class="flex space-x-8 px-6">
              <button
                v-for="tab in tabs"
                :key="tab.id"
                @click="activeTab = tab.id"
                :class="activeTab === tab.id ? 'border-forest-500 text-forest-600' : 'border-transparent text-gray-500 hover:text-gray-700'"
                class="py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap"
              >
                {{ tab.icon }} {{ tab.name }}
              </button>
            </nav>
          </div>
        </div>

        <!-- Contenu des tabs -->
        <div class="space-y-8">
          <!-- Tab: Dashboard -->
          <div v-if="activeTab === 'dashboard'">
            <div class="grid lg:grid-cols-3 gap-8">
              <!-- Graphique principal -->
              <div class="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                <div class="flex items-center justify-between mb-6">
                  <h2 class="text-xl font-semibold text-gray-900">📈 Évolution des métriques</h2>
                  <select 
                    v-model="chartPeriod"
                    class="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="7d">7 derniers jours</option>
                    <option value="30d">30 derniers jours</option>
                    <option value="90d">3 derniers mois</option>
                    <option value="1y">1 an</option>
                  </select>
                </div>
                
                <!-- Placeholder graphique -->
                <div class="bg-gray-50 rounded-lg h-80 flex items-center justify-center border border-gray-200">
                  <div class="text-center">
                    <div class="text-6xl mb-4">📊</div>
                    <p class="text-gray-600 font-medium">Graphiques interactifs</p>
                    <p class="text-sm text-gray-500">Chart.js / D3.js en développement</p>
                  </div>
                </div>
              </div>

              <!-- Statistiques rapides -->
              <div class="space-y-6">
                <!-- Top utilisateurs -->
                <div class="bg-white rounded-xl shadow-sm p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">🏆 Top utilisateurs</h3>
                  <div class="space-y-3">
                    <div v-for="user in topUsers" :key="user.id" class="flex items-center space-x-3">
                      <div class="w-8 h-8 bg-forest-100 rounded-full flex items-center justify-center">
                        <span class="text-sm font-medium">{{ user.initials }}</span>
                      </div>
                      <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate">{{ user.name }}</p>
                        <p class="text-xs text-gray-500">{{ user.reservations }} réservations</p>
                      </div>
                      <div class="text-sm font-medium text-forest-600">{{ user.savings }}€</div>
                    </div>
                  </div>
                </div>

                <!-- Alertes système -->
                <div class="bg-white rounded-xl shadow-sm p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">⚠️ Alertes</h3>
                  <div class="space-y-3">
                    <div v-for="alert in systemAlerts" :key="alert.id" class="flex items-start space-x-3">
                      <div 
                        :class="getAlertColor(alert.type)"
                        class="w-2 h-2 rounded-full mt-2"
                      ></div>
                      <div class="flex-1">
                        <p class="text-sm font-medium text-gray-900">{{ alert.title }}</p>
                        <p class="text-xs text-gray-500">{{ alert.time }}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Actions rapides -->
                <div class="bg-white rounded-xl shadow-sm p-6">
                  <h3 class="text-lg font-semibold text-gray-900 mb-4">⚡ Actions rapides</h3>
                  <div class="space-y-2">
                    <button 
                      @click="moderateOffers"
                      class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      🔍 Modérer les offres en attente ({{ pendingOffers }})
                    </button>
                    <button 
                      @click="reviewReports"
                      class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      📢 Examiner les signalements ({{ reports }})
                    </button>
                    <button 
                      @click="sendNewsletter"
                      class="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      📧 Envoyer newsletter hebdomadaire
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab: Utilisateurs -->
          <div v-if="activeTab === 'users'">
            <div class="bg-white rounded-xl shadow-sm">
              <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between">
                  <h2 class="text-xl font-semibold text-gray-900">👥 Gestion des utilisateurs</h2>
                  
                  <!-- Filtres et recherche -->
                  <div class="flex space-x-3">
                    <input
                      v-model="userSearch"
                      type="text"
                      placeholder="Rechercher un utilisateur..."
                      class="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    />
                    <select 
                      v-model="userFilter"
                      class="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="">Tous les statuts</option>
                      <option value="active">Actifs</option>
                      <option value="inactive">Inactifs</option>
                      <option value="banned">Bannis</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Tableau utilisateurs -->
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Utilisateur</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Réservations</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Économies</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inscription</th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-gray-50">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="w-10 h-10 bg-forest-100 rounded-full flex items-center justify-center">
                            <span class="font-medium text-forest-700">{{ user.initials }}</span>
                          </div>
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                            <div class="text-sm text-gray-500">{{ user.email }}</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span 
                          :class="getUserStatusColor(user.status)"
                          class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                        >
                          {{ getUserStatusLabel(user.status) }}
                        </span>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ user.reservations }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {{ user.savings }}€
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {{ formatDate(user.createdAt) }}
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button 
                          @click="viewUser(user.id)"
                          class="text-forest-600 hover:text-forest-900"
                        >
                          Voir
                        </button>
                        <button 
                          @click="editUser(user.id)"
                          class="text-blue-600 hover:text-blue-900"
                        >
                          Modifier
                        </button>
                        <button 
                          v-if="user.status !== 'banned'"
                          @click="banUser(user.id)"
                          class="text-red-600 hover:text-red-900"
                        >
                          Bannir
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Pagination utilisateurs -->
              <div class="px-6 py-4 border-t border-gray-200">
                <div class="flex items-center justify-between">
                  <div class="text-sm text-gray-700">
                    Affichage de {{ (currentUserPage - 1) * usersPerPage + 1 }} à {{ Math.min(currentUserPage * usersPerPage, filteredUsers.length) }} sur {{ filteredUsers.length }} utilisateurs
                  </div>
                  <div class="flex space-x-2">
                    <button
                      v-for="page in userPaginationPages"
                      :key="page"
                      @click="currentUserPage = page"
                      :class="page === currentUserPage ? 'bg-forest-600 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'"
                      class="px-3 py-2 border border-gray-300 rounded-lg text-sm transition-colors"
                    >
                      {{ page }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab: Offres -->
          <div v-if="activeTab === 'offers'">
            <div class="bg-white rounded-xl shadow-sm">
              <div class="p-6 border-b border-gray-200">
                <div class="flex items-center justify-between">
                  <h2 class="text-xl font-semibold text-gray-900">🛒 Gestion des offres</h2>
                  
                  <!-- Filtres offres -->
                  <div class="flex space-x-3">
                    <select 
                      v-model="offerStatusFilter"
                      class="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="">Tous les statuts</option>
                      <option value="active">Actives</option>
                      <option value="pending">En attente</option>
                      <option value="expired">Expirées</option>
                      <option value="rejected">Rejetées</option>
                    </select>
                    <select 
                      v-model="offerCategoryFilter"
                      class="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                    >
                      <option value="">Toutes catégories</option>
                      <option value="fruits-legumes">Fruits & Légumes</option>
                      <option value="pain-viennoiseries">Pain & Viennoiseries</option>
                      <option value="produits-laitiers">Produits laitiers</option>
                    </select>
                  </div>
                </div>
              </div>

              <!-- Liste des offres -->
              <div class="divide-y divide-gray-200">
                <div v-for="offer in paginatedOffers" :key="offer.id" class="p-6 hover:bg-gray-50">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center space-x-4">
                      <div class="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                        <span class="text-2xl">{{ getCategoryEmoji(offer.category) }}</span>
                      </div>
                      <div>
                        <h3 class="text-lg font-medium text-gray-900">{{ offer.title }}</h3>
                        <p class="text-sm text-gray-600">{{ offer.merchant }} • {{ offer.location }}</p>
                        <div class="flex items-center space-x-4 mt-1">
                          <span class="text-sm text-gray-500">{{ offer.price }}€</span>
                          <span 
                            :class="getOfferStatusColor(offer.status)"
                            class="px-2 py-1 text-xs font-medium rounded-full"
                          >
                            {{ getOfferStatusLabel(offer.status) }}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div class="flex items-center space-x-3">
                      <button 
                        v-if="offer.status === 'pending'"
                        @click="approveOffer(offer.id)"
                        class="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                      >
                        Approuver
                      </button>
                      <button 
                        v-if="offer.status === 'pending'"
                        @click="rejectOffer(offer.id)"
                        class="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                      >
                        Rejeter
                      </button>
                      <button 
                        @click="viewOffer(offer.id)"
                        class="px-3 py-1 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors"
                      >
                        Détails
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Tab: Rapports -->
          <div v-if="activeTab === 'reports'">
            <div class="grid lg:grid-cols-2 gap-8">
              <!-- Métriques détaillées -->
              <div class="bg-white rounded-xl shadow-sm p-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-6">📊 Métriques détaillées</h2>
                
                <div class="space-y-6">
                  <div>
                    <h3 class="font-medium text-gray-900 mb-3">Impact environnemental</h3>
                    <div class="space-y-3">
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">CO₂ total évité</span>
                        <span class="font-semibold text-green-600">{{ detailedMetrics.totalCO2 }}kg</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">Eau économisée</span>
                        <span class="font-semibold text-blue-600">{{ detailedMetrics.totalWater }}L</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">Nourriture sauvée</span>
                        <span class="font-semibold text-orange-600">{{ detailedMetrics.foodSaved }}kg</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 class="font-medium text-gray-900 mb-3">Activité plateforme</h3>
                    <div class="space-y-3">
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">Taux de conversion</span>
                        <span class="font-semibold text-purple-600">{{ detailedMetrics.conversionRate }}%</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">Satisfaction moyenne</span>
                        <span class="font-semibold text-yellow-600">{{ detailedMetrics.satisfaction }}/5</span>
                      </div>
                      <div class="flex items-center justify-between">
                        <span class="text-sm text-gray-600">Temps moyen/session</span>
                        <span class="font-semibold text-indigo-600">{{ detailedMetrics.avgSessionTime }}min</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Export et rapports -->
              <div class="bg-white rounded-xl shadow-sm p-6">
                <h2 class="text-xl font-semibold text-gray-900 mb-6">📄 Rapports et exports</h2>
                
                <div class="space-y-4">
                  <button 
                    @click="downloadReport('monthly')"
                    class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div class="flex items-center">
                      <span class="mr-3">📊</span>
                      <div class="text-left">
                        <div class="font-medium text-gray-900">Rapport mensuel</div>
                        <div class="text-sm text-gray-500">Statistiques complètes du mois</div>
                      </div>
                    </div>
                    <span class="text-gray-400">→</span>
                  </button>

                  <button 
                    @click="downloadReport('impact')"
                    class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div class="flex items-center">
                      <span class="mr-3">🌱</span>
                      <div class="text-left">
                        <div class="font-medium text-gray-900">Rapport d'impact</div>
                        <div class="text-sm text-gray-500">Bilan environnemental détaillé</div>
                      </div>
                    </div>
                    <span class="text-gray-400">→</span>
                  </button>

                  <button 
                    @click="downloadReport('users')"
                    class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div class="flex items-center">
                      <span class="mr-3">👥</span>
                      <div class="text-left">
                        <div class="font-medium text-gray-900">Données utilisateurs</div>
                        <div class="text-sm text-gray-500">Export anonymisé des données</div>
                      </div>
                    </div>
                    <span class="text-gray-400">→</span>
                  </button>

                  <button 
                    @click="downloadReport('financial')"
                    class="w-full flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div class="flex items-center">
                      <span class="mr-3">💰</span>
                      <div class="text-left">
                        <div class="font-medium text-gray-900">Rapport financier</div>
                        <div class="text-sm text-gray-500">Économies et transactions</div>
                      </div>
                    </div>
                    <span class="text-gray-400">→</span>
                  </button>
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
import AppHeader from '@/components/layout/AppHeader.vue'

// État
const activeTab = ref('dashboard')
const chartPeriod = ref('30d')
const userSearch = ref('')
const userFilter = ref('')
const offerStatusFilter = ref('')
const offerCategoryFilter = ref('')
const currentUserPage = ref(1)
const usersPerPage = 10
const pendingOffers = ref(12)
const reports = ref(3)

// Tabs
const tabs = [
  { id: 'dashboard', name: 'Tableau de bord', icon: '📊' },
  { id: 'users', name: 'Utilisateurs', icon: '👥' },
  { id: 'offers', name: 'Offres', icon: '🛒' },
  { id: 'reports', name: 'Rapports', icon: '📄' }
]

// Données globales
const globalStats = ref({
  totalUsers: 12847,
  newUsersThisMonth: 1205,
  activeOffers: 346,
  offersToday: 28,
  totalSavings: 45782,
  savingsThisMonth: 4521,
  totalCO2: 2847,
  co2ThisMonth: 287
})

const detailedMetrics = ref({
  totalCO2: 2847,
  totalWater: 18956,
  foodSaved: 1423,
  conversionRate: 68,
  satisfaction: 4.7,
  avgSessionTime: 12
})

// Top utilisateurs
const topUsers = ref([
  { id: 1, name: 'Marie Dubois', initials: 'MD', reservations: 45, savings: 187 },
  { id: 2, name: 'Pierre Martin', initials: 'PM', reservations: 38, savings: 156 },
  { id: 3, name: 'Sophie Leroy', initials: 'SL', reservations: 35, savings: 142 },
  { id: 4, name: 'Antoine Blanc', initials: 'AB', reservations: 32, savings: 134 },
  { id: 5, name: 'Emma Garcia', initials: 'EG', reservations: 28, savings: 98 }
])

// Alertes système
const systemAlerts = ref([
  { id: 1, type: 'warning', title: 'Serveur de paiement lent', time: 'Il y a 15 min' },
  { id: 2, type: 'info', title: 'Mise à jour planifiée ce soir', time: 'Il y a 2h' },
  { id: 3, type: 'error', title: 'Erreur API géolocalisation', time: 'Il y a 3h' },
  { id: 4, type: 'success', title: 'Sauvegarde complétée', time: 'Il y a 6h' }
])

// Données utilisateurs
const users = ref([
  {
    id: 1,
    name: 'Marie Dubois',
    email: 'marie.dubois@email.com',
    initials: 'MD',
    status: 'active',
    reservations: 45,
    savings: 187,
    createdAt: new Date('2023-06-15')
  },
  {
    id: 2,
    name: 'Pierre Martin',
    email: 'pierre.martin@email.com',
    initials: 'PM',
    status: 'active',
    reservations: 38,
    savings: 156,
    createdAt: new Date('2023-07-22')
  },
  {
    id: 3,
    name: 'Sophie Leroy',
    email: 'sophie.leroy@email.com',
    initials: 'SL',
    status: 'inactive',
    reservations: 35,
    savings: 142,
    createdAt: new Date('2023-08-10')
  }
])

// Données offres
const offers = ref([
  {
    id: 1,
    title: 'Pain complet bio',
    merchant: 'Boulangerie Martin',
    location: 'Paris 11e',
    category: 'pain-viennoiseries',
    price: 1.50,
    status: 'active'
  },
  {
    id: 2,
    title: 'Légumes de saison',
    merchant: 'Ferme Dubois',
    location: 'Vincennes',
    category: 'fruits-legumes',
    price: 6.00,
    status: 'pending'
  }
])

// Filtrage utilisateurs
const filteredUsers = computed(() => {
  let result = users.value

  if (userSearch.value) {
    const search = userSearch.value.toLowerCase()
    result = result.filter(user => 
      user.name.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search)
    )
  }

  if (userFilter.value) {
    result = result.filter(user => user.status === userFilter.value)
  }

  return result
})

// Pagination utilisateurs
const userTotalPages = computed(() => Math.ceil(filteredUsers.value.length / usersPerPage))

const paginatedUsers = computed(() => {
  const start = (currentUserPage.value - 1) * usersPerPage
  return filteredUsers.value.slice(start, start + usersPerPage)
})

const userPaginationPages = computed(() => {
  const pages = []
  for (let i = 1; i <= userTotalPages.value; i++) {
    pages.push(i)
  }
  return pages
})

// Filtrage offres
const paginatedOffers = computed(() => {
  let result = offers.value

  if (offerStatusFilter.value) {
    result = result.filter(offer => offer.status === offerStatusFilter.value)
  }

  if (offerCategoryFilter.value) {
    result = result.filter(offer => offer.category === offerCategoryFilter.value)
  }

  return result
})

// Méthodes utilitaires
const getAlertColor = (type: string) => {
  const colors = {
    error: 'bg-red-400',
    warning: 'bg-yellow-400',
    info: 'bg-blue-400',
    success: 'bg-green-400'
  }
  return colors[type as keyof typeof colors] || 'bg-gray-400'
}

const getUserStatusColor = (status: string) => {
  const colors = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-yellow-100 text-yellow-800',
    banned: 'bg-red-100 text-red-800'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

const getUserStatusLabel = (status: string) => {
  const labels = {
    active: 'Actif',
    inactive: 'Inactif',
    banned: 'Banni'
  }
  return labels[status as keyof typeof labels] || 'Inconnu'
}

const getOfferStatusColor = (status: string) => {
  const colors = {
    active: 'bg-green-100 text-green-800',
    pending: 'bg-yellow-100 text-yellow-800',
    expired: 'bg-gray-100 text-gray-800',
    rejected: 'bg-red-100 text-red-800'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800'
}

const getOfferStatusLabel = (status: string) => {
  const labels = {
    active: 'Active',
    pending: 'En attente',
    expired: 'Expirée',
    rejected: 'Rejetée'
  }
  return labels[status as keyof typeof labels] || 'Inconnu'
}

const getCategoryEmoji = (category: string) => {
  const emojis = {
    'fruits-legumes': '🥬',
    'pain-viennoiseries': '🥖',
    'produits-laitiers': '🥛',
    'viandes-poissons': '🍗',
    'epicerie': '🛒',
    'plats-prepares': '🍽️'
  }
  return emojis[category as keyof typeof emojis] || '🛒'
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('fr-FR')
}

// Actions
const exportData = () => {
  console.log('Export des données...')
  alert('Export des données en cours...')
}

const generateReport = () => {
  console.log('Génération du rapport...')
  alert('Génération du rapport mensuel...')
}

const moderateOffers = () => {
  activeTab.value = 'offers'
  offerStatusFilter.value = 'pending'
}

const reviewReports = () => {
  console.log('Examen des signalements...')
  alert('Redirection vers les signalements...')
}

const sendNewsletter = () => {
  console.log('Envoi newsletter...')
  alert('Newsletter envoyée à tous les utilisateurs !')
}

const viewUser = (userId: number) => {
  console.log('Voir utilisateur:', userId)
}

const editUser = (userId: number) => {
  console.log('Modifier utilisateur:', userId)
}

const banUser = (userId: number) => {
  if (confirm('Êtes-vous sûr de vouloir bannir cet utilisateur ?')) {
    const user = users.value.find(u => u.id === userId)
    if (user) {
      user.status = 'banned'
    }
  }
}

const approveOffer = (offerId: number) => {
  const offer = offers.value.find(o => o.id === offerId)
  if (offer) {
    offer.status = 'active'
    pendingOffers.value--
  }
}

const rejectOffer = (offerId: number) => {
  if (confirm('Êtes-vous sûr de vouloir rejeter cette offre ?')) {
    const offer = offers.value.find(o => o.id === offerId)
    if (offer) {
      offer.status = 'rejected'
      pendingOffers.value--
    }
  }
}

const viewOffer = (offerId: number) => {
  console.log('Voir offre:', offerId)
}

const downloadReport = (type: string) => {
  console.log('Téléchargement rapport:', type)
  alert(`Téléchargement du rapport ${type}...`)
}

onMounted(() => {
  // Charger les données depuis l'API
})
</script> 