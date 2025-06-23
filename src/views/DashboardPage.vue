<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <AppHeader />
    
    <div class="container mx-auto px-6 py-8">
      <!-- Titre et salutation -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Bon retour, {{ authStore.user?.name }} ! 🌱
        </h1>
        <p class="text-gray-600">
          Découvrez votre impact écologique et explorez les nouvelles offres
        </p>
      </div>

      <!-- KPI Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div v-for="kpi in kpis" :key="kpi.label" 
             class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">{{ kpi.label }}</p>
              <p class="text-2xl font-bold text-gray-900">{{ kpi.value }}</p>
              <p class="text-sm" :class="kpi.trend > 0 ? 'text-green-600' : 'text-red-600'">
                {{ kpi.trend > 0 ? '+' : '' }}{{ kpi.trend }}% ce mois
              </p>
            </div>
            <div class="text-3xl">{{ kpi.icon }}</div>
          </div>
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Graphique principal -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              📈 Évolution de votre impact écologique
            </h3>
            <div class="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <p class="text-gray-500">Graphique d'impact (Chart.js à intégrer)</p>
            </div>
          </div>
        </div>

        <!-- Actions rapides -->
        <div class="space-y-6">
          <!-- Nouvelle offre -->
          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              ⚡ Actions rapides
            </h3>
            <div class="space-y-3">
              <router-link 
                to="/create-offer"
                class="block w-full bg-forest-600 text-white text-center py-2 px-4 rounded-lg hover:bg-forest-700 transition-colors"
              >
                + Créer une offre
              </router-link>
              <router-link 
                to="/marketplace"
                class="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                🛒 Explorer la marketplace
              </router-link>
            </div>
          </div>

          <!-- Badges récents -->
          <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">
              🏆 Badges récents
            </h3>
            <div class="space-y-3">
              <div v-for="badge in recentBadges" :key="badge.id"
                   class="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <span class="text-2xl">{{ badge.icon }}</span>
                <div>
                  <p class="font-medium text-gray-900">{{ badge.name }}</p>
                  <p class="text-sm text-gray-600">{{ badge.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Offres récentes -->
      <div class="mt-8">
        <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-semibold text-gray-900">
              🍎 Nouvelles offres près de chez vous
            </h3>
            <router-link to="/marketplace" class="text-forest-600 hover:text-forest-700 text-sm font-medium">
              Voir toutes →
            </router-link>
          </div>
          
          <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div v-for="offer in nearbyOffers" :key="offer.id"
                 class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div class="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                <span class="text-gray-500">📷</span>
              </div>
              <h4 class="font-medium text-gray-900 mb-1">{{ offer.title }}</h4>
              <p class="text-sm text-gray-600 mb-2">{{ offer.location }}</p>
              <div class="flex justify-between items-center">
                <span class="text-lg font-bold text-forest-600">{{ offer.price }}€</span>
                <span class="text-sm text-gray-500">{{ offer.distance }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import AppHeader from '@/components/layout/AppHeader.vue'

const authStore = useAuthStore()

const kpis = ref([
  { label: 'CO₂ évité', value: '47kg', trend: 12, icon: '🌍' },
  { label: 'Offres créées', value: '8', trend: 25, icon: '📦' },
  { label: 'Économies', value: '156€', trend: 8, icon: '💰' },
  { label: 'Score impact', value: '87/100', trend: 5, icon: '⭐' }
])

const recentBadges = ref([
  { id: 1, name: 'Éco-Warrior', icon: '🌿', description: '50kg CO₂ évité' },
  { id: 2, name: 'Partageur', icon: '🤝', description: '10 offres créées' }
])

const nearbyOffers = ref([
  { id: 1, title: 'Pain du jour', location: 'Boulangerie Martin', price: '2.50', distance: '0.8km' },
  { id: 2, title: 'Fruits bio', location: 'Épicerie Bio+', price: '4.00', distance: '1.2km' },
  { id: 3, title: 'Yaourts nature', location: 'Ferme Dubois', price: '3.20', distance: '2.1km' }
])
</script> 