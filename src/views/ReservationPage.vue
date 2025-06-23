<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    
    <div class="container mx-auto px-6 py-8">
      <div class="max-w-6xl mx-auto">
        <!-- Fil d'Ariane -->
        <nav class="mb-6 text-sm">
          <div class="flex items-center space-x-2 text-gray-600">
            <router-link to="/marketplace" class="hover:text-forest-600">Marketplace</router-link>
            <span>→</span>
            <span class="text-gray-900 font-medium">{{ offer?.title || 'Réservation' }}</span>
          </div>
        </nav>

        <!-- Alert temps restant -->
        <div v-if="offer && timeUrgency" class="mb-6">
          <div 
            :class="timeUrgency.color"
            class="p-4 rounded-xl border flex items-center"
          >
            <span class="text-2xl mr-3">{{ timeUrgency.icon }}</span>
            <div>
              <p class="font-semibold">{{ timeUrgency.title }}</p>
              <p class="text-sm opacity-90">{{ timeUrgency.message }}</p>
            </div>
          </div>
        </div>

        <div v-if="!offer" class="text-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-forest-500 mx-auto mb-4"></div>
          <p class="text-gray-600">Chargement de l'offre...</p>
        </div>

        <div v-else class="grid lg:grid-cols-3 gap-8">
          <!-- Détails de l'offre -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Galerie d'images -->
            <div class="bg-white rounded-xl shadow-sm overflow-hidden">
              <div class="aspect-video bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center relative">
                <span class="text-6xl">{{ categoryEmoji }}</span>
                
                <!-- Badge réduction -->
                <div class="absolute top-4 left-4">
                  <span class="bg-red-500 text-white px-3 py-2 rounded-lg font-semibold">
                    -{{ offer.discount }}%
                  </span>
                </div>
                
                <!-- Badge temps restant -->
                <div class="absolute top-4 right-4">
                  <span 
                    :class="timeLeftColor"
                    class="px-3 py-2 rounded-lg font-medium"
                  >
                    {{ timeLeft }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Informations principales -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <!-- En-tête avec merchant -->
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-3">
                  <div class="w-12 h-12 bg-forest-100 rounded-full flex items-center justify-center">
                    <span class="text-xl">🏪</span>
                  </div>
                  <div>
                    <h3 class="font-semibold text-gray-900">{{ offer.merchant }}</h3>
                    <div class="flex items-center text-sm text-gray-600">
                      <span class="text-yellow-500 mr-1">⭐</span>
                      <span>{{ offer.rating }}</span>
                      <span class="ml-2 text-gray-400">•</span>
                      <span class="ml-2">{{ offer.distance }}km</span>
                    </div>
                  </div>
                </div>
                
                <button class="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <span class="text-xl">❤️</span>
                </button>
              </div>

              <!-- Titre et description -->
              <h1 class="text-2xl font-bold text-gray-900 mb-3">{{ offer.title }}</h1>
              <p class="text-gray-600 mb-6">{{ offer.description }}</p>

              <!-- Caractéristiques -->
              <div class="flex flex-wrap gap-2 mb-6">
                <span v-if="offer.isOrganic" class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  🌿 Bio
                </span>
                <span v-if="offer.isVegan" class="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  🌱 Végane
                </span>
                <span v-if="offer.isGlutenFree" class="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                  🚫 Sans gluten
                </span>
                <span v-if="offer.isLocal" class="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  📍 Production locale
                </span>
              </div>

              <!-- Détails produit -->
              <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 class="font-semibold text-gray-900 mb-3">📦 Informations produit</h4>
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Catégorie:</span>
                      <span class="font-medium">{{ categoryLabel }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Quantité:</span>
                      <span class="font-medium">{{ offer.quantity }} {{ offer.unit }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Prix original:</span>
                      <span class="font-medium line-through text-gray-500">{{ offer.originalPrice.toFixed(2) }}€</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Prix réduit:</span>
                      <span class="font-semibold text-forest-600 text-lg">{{ offer.discountedPrice.toFixed(2) }}€</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 class="font-semibold text-gray-900 mb-3">⏰ Disponibilité</h4>
                  <div class="space-y-2 text-sm">
                    <div class="flex justify-between">
                      <span class="text-gray-600">Date limite:</span>
                      <span class="font-medium">{{ formatDate(offer.expiresAt) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Heure limite:</span>
                      <span class="font-medium">{{ formatTime(offer.expiresAt) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-gray-600">Temps restant:</span>
                      <span :class="timeLeft === 'Expiré' ? 'text-red-600 font-semibold' : 'text-forest-600 font-medium'">
                        {{ timeLeft }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Impact environnemental -->
              <div class="bg-forest-50 rounded-xl p-6 border border-forest-200">
                <h4 class="font-semibold text-forest-800 mb-4 flex items-center">
                  <span class="mr-2">🌱</span>
                  Impact environnemental de cette réservation
                </h4>
                
                <div class="grid grid-cols-3 gap-4 mb-4">
                  <div class="text-center">
                    <div class="text-2xl font-bold text-forest-600">{{ environmentalImpact.co2 }}kg</div>
                    <div class="text-sm text-gray-600">CO₂ évité</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-blue-600">{{ environmentalImpact.water }}L</div>
                    <div class="text-sm text-gray-600">Eau économisée</div>
                  </div>
                  <div class="text-center">
                    <div class="text-2xl font-bold text-orange-600">{{ environmentalImpact.score }}/100</div>
                    <div class="text-sm text-gray-600">Score impact</div>
                  </div>
                </div>

                <div class="grid grid-cols-2 gap-3 text-sm">
                  <div class="flex items-center justify-between p-2 bg-white rounded">
                    <span class="text-gray-700">🌳 Équivaut à planter</span>
                    <span class="font-semibold text-forest-600">{{ environmentalImpact.trees }} arbres</span>
                  </div>
                  <div class="flex items-center justify-between p-2 bg-white rounded">
                    <span class="text-gray-700">🚗 Évite un trajet de</span>
                    <span class="font-semibold text-forest-600">{{ environmentalImpact.carKm }} km</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Localisation et récupération -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">📍 Récupération</h3>
              
              <!-- Adresse -->
              <div class="mb-6">
                <h4 class="font-medium text-gray-900 mb-2">Adresse</h4>
                <p class="text-gray-600">{{ offer.address }}</p>
                <button class="text-forest-600 hover:text-forest-700 text-sm mt-1 font-medium">
                  📍 Ouvrir dans Maps
                </button>
              </div>

              <!-- Instructions -->
              <div v-if="offer.pickupInstructions" class="mb-6">
                <h4 class="font-medium text-gray-900 mb-2">Instructions spéciales</h4>
                <p class="text-gray-600 bg-gray-50 p-3 rounded-lg">{{ offer.pickupInstructions }}</p>
              </div>

              <!-- Carte placeholder -->
              <div class="bg-gray-100 rounded-lg h-48 flex items-center justify-center border border-gray-300">
                <div class="text-center">
                  <div class="text-4xl mb-2">🗺️</div>
                  <p class="text-gray-600">Carte interactive</p>
                  <p class="text-sm text-gray-500">Fonctionnalité en développement</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Sidebar réservation -->
          <div class="space-y-6">
            <!-- Récapitulatif commande -->
            <div class="bg-white rounded-xl shadow-sm p-6 sticky top-4">
              <h3 class="text-xl font-semibold text-gray-900 mb-4">💳 Réservation</h3>
              
              <!-- Récapitulatif prix -->
              <div class="space-y-3 mb-6">
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Prix original</span>
                  <span class="line-through text-gray-500">{{ offer.originalPrice.toFixed(2) }}€</span>
                </div>
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Réduction (-{{ offer.discount }}%)</span>
                  <span class="text-green-600 font-medium">-{{ (offer.originalPrice - offer.discountedPrice).toFixed(2) }}€</span>
                </div>
                <div class="border-t pt-3">
                  <div class="flex justify-between">
                    <span class="font-semibold text-gray-900">Total à payer</span>
                    <span class="font-bold text-forest-600 text-xl">{{ offer.discountedPrice.toFixed(2) }}€</span>
                  </div>
                </div>
              </div>

              <!-- Formulaire de réservation -->
              <form @submit.prevent="processReservation" class="space-y-4">
                <!-- Informations client -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Nom complet *</label>
                  <input
                    v-model="reservationForm.name"
                    type="text"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                    placeholder="Jean Dupont"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    v-model="reservationForm.email"
                    type="email"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                    placeholder="jean@example.com"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Téléphone *</label>
                  <input
                    v-model="reservationForm.phone"
                    type="tel"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                    placeholder="06 12 34 56 78"
                  />
                </div>

                <!-- Créneau de récupération -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Créneau de récupération *</label>
                  <select
                    v-model="reservationForm.pickupSlot"
                    required
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  >
                    <option value="">Sélectionnez un créneau</option>
                    <option v-for="slot in availableSlots" :key="slot.value" :value="slot.value">
                      {{ slot.label }}
                    </option>
                  </select>
                </div>

                <!-- Notes spéciales -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Notes (optionnel)</label>
                  <textarea
                    v-model="reservationForm.notes"
                    rows="3"
                    class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent resize-none"
                    placeholder="Informations complémentaires..."
                  ></textarea>
                </div>

                <!-- Conditions -->
                <div class="flex items-start space-x-2">
                  <input
                    v-model="reservationForm.acceptTerms"
                    type="checkbox"
                    required
                    class="mt-1 text-forest-600"
                  />
                  <label class="text-sm text-gray-700">
                    J'accepte les <a href="#" class="text-forest-600 hover:text-forest-700 underline">conditions d'utilisation</a> 
                    et la <a href="#" class="text-forest-600 hover:text-forest-700 underline">politique de confidentialité</a>
                  </label>
                </div>

                <!-- Bouton de réservation -->
                <button
                  type="submit"
                  :disabled="isProcessing || !canReserve"
                  class="w-full bg-forest-600 text-white py-3 px-4 rounded-lg hover:bg-forest-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {{ isProcessing ? 'Traitement...' : 'Confirmer la réservation' }}
                </button>

                <!-- Garanties -->
                <div class="mt-4 space-y-2 text-xs text-gray-600">
                  <div class="flex items-center">
                    <span class="mr-2">✅</span>
                    <span>Paiement sécurisé</span>
                  </div>
                  <div class="flex items-center">
                    <span class="mr-2">🔒</span>
                    <span>Données protégées</span>
                  </div>
                  <div class="flex items-center">
                    <span class="mr-2">📱</span>
                    <span>Confirmation instantanée</span>
                  </div>
                </div>
              </form>
            </div>

            <!-- Contact marchand -->
            <div class="bg-white rounded-xl shadow-sm p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">💬 Contacter le marchand</h3>
              <p class="text-sm text-gray-600 mb-4">
                Une question sur ce produit ? Contactez directement {{ offer.merchant }}.
              </p>
              <div class="space-y-2">
                <button class="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <span class="mr-2">📞</span>
                  <span class="text-sm">Appeler</span>
                </button>
                <button class="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <span class="mr-2">💬</span>
                  <span class="text-sm">Envoyer un message</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmation -->
    <div v-if="showConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-8 max-w-lg w-full">
        <div class="text-center">
          <div class="text-6xl mb-4">🎉</div>
          <h2 class="text-2xl font-bold text-gray-900 mb-2">Réservation confirmée !</h2>
          <p class="text-gray-600 mb-6">
            Votre réservation pour "{{ offer?.title }}" a été confirmée. 
            Vous recevrez un email de confirmation sous peu.
          </p>
          
          <div class="space-y-3">
            <button 
              @click="goToDashboard"
              class="w-full bg-forest-600 text-white py-3 px-4 rounded-lg hover:bg-forest-700 transition-colors font-medium"
            >
              Voir mes réservations
            </button>
            <button 
              @click="showConfirmation = false"
              class="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Continuer les achats
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'

const route = useRoute()
const router = useRouter()

// État
const isProcessing = ref(false)
const showConfirmation = ref(false)

// Données de l'offre (simulation)
const offer = ref({
  id: '1',
  title: 'Pain complet bio du jour',
  description: 'Délicieux pain complet bio fraîchement sorti du four. Préparé avec des ingrédients biologiques de première qualité, ce pain artisanal est parfait pour accompagner vos repas.',
  category: 'pain-viennoiseries',
  originalPrice: 3.50,
  discountedPrice: 1.50,
  discount: 57,
  quantity: 1,
  unit: 'pièce',
  merchant: 'Boulangerie Martin',
  address: '123 Rue de la Paix, 75001 Paris',
  distance: 0.8,
  expiresAt: new Date(Date.now() + 6 * 60 * 60 * 1000),
  isOrganic: true,
  isVegan: false,
  isGlutenFree: false,
  isLocal: true,
  rating: 4.8,
  pickupInstructions: 'Sonnez à l\'interphone "Boulangerie". Parking disponible devant le magasin.'
})

// Formulaire de réservation
const reservationForm = ref({
  name: '',
  email: '',
  phone: '',
  pickupSlot: '',
  notes: '',
  acceptTerms: false
})

// Créneaux disponibles
const availableSlots = computed(() => {
  const slots = []
  const now = new Date()
  const expiry = offer.value.expiresAt
  
  // Générer des créneaux d'1h jusqu'à l'expiration
  for (let time = new Date(now.getTime() + 60 * 60 * 1000); time < expiry; time.setHours(time.getHours() + 1)) {
    slots.push({
      value: time.toISOString(),
      label: `${time.toLocaleDateString('fr-FR')} de ${time.getHours()}h à ${time.getHours() + 1}h`
    })
  }
  
  return slots
})

// Calculs
const categoryEmojiMap: Record<string, string> = {
  'fruits-legumes': '🥬',
  'pain-viennoiseries': '🥖',
  'produits-laitiers': '🥛',
  'viandes-poissons': '🍗',
  'epicerie': '🛒',
  'plats-prepares': '🍽️'
}

const categoryLabels: Record<string, string> = {
  'fruits-legumes': 'Fruits & Légumes',
  'pain-viennoiseries': 'Pain & Viennoiseries',
  'produits-laitiers': 'Produits laitiers',
  'viandes-poissons': 'Viandes & Poissons',
  'epicerie': 'Épicerie',
  'plats-prepares': 'Plats préparés'
}

const categoryEmoji = computed(() => categoryEmojiMap[offer.value.category] || '🛒')
const categoryLabel = computed(() => categoryLabels[offer.value.category] || 'Autre')

const timeLeft = computed(() => {
  const now = new Date()
  const expires = offer.value.expiresAt
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
  const expires = offer.value.expiresAt
  const diff = expires.getTime() - now.getTime()
  const hours = diff / (1000 * 60 * 60)
  
  if (hours <= 0) return 'bg-red-500 text-white'
  if (hours <= 2) return 'bg-orange-500 text-white'
  if (hours <= 6) return 'bg-yellow-500 text-white'
  return 'bg-green-500 text-white'
})

const timeUrgency = computed(() => {
  const now = new Date()
  const expires = offer.value.expiresAt
  const diff = expires.getTime() - now.getTime()
  const hours = diff / (1000 * 60 * 60)
  
  if (hours <= 0) return {
    color: 'bg-red-50 border-red-200 text-red-800',
    icon: '⚠️',
    title: 'Offre expirée',
    message: 'Cette offre n\'est plus disponible'
  }
  
  if (hours <= 1) return {
    color: 'bg-orange-50 border-orange-200 text-orange-800',
    icon: '⏰',
    title: 'Dernière chance !',
    message: 'Cette offre expire dans moins d\'1 heure'
  }
  
  if (hours <= 3) return {
    color: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    icon: '⚡',
    title: 'Dépêchez-vous !',
    message: 'Plus que quelques heures pour réserver'
  }
  
  return null
})

const environmentalImpact = computed(() => {
  // Calcul basé sur la catégorie et quantité
  const impactFactors: Record<string, { co2: number; water: number; score: number }> = {
    'fruits-legumes': { co2: 0.3, water: 2, score: 85 },
    'pain-viennoiseries': { co2: 0.8, water: 1.5, score: 75 },
    'produits-laitiers': { co2: 1.2, water: 3, score: 70 },
    'viandes-poissons': { co2: 2.5, water: 8, score: 60 },
    'epicerie': { co2: 0.5, water: 1, score: 80 },
    'plats-prepares': { co2: 1.5, water: 2.5, score: 65 }
  }
  
  const factor = impactFactors[offer.value.category] || { co2: 1, water: 2, score: 70 }
  const qty = offer.value.quantity
  
  const co2 = Number((factor.co2 * qty).toFixed(1))
  const water = Math.round(factor.water * qty)
  const trees = Number((co2 / 0.5).toFixed(1))
  const carKm = Math.round(co2 * 4.2)
  
  let score = factor.score
  if (offer.value.isOrganic) score += 5
  if (offer.value.isLocal) score += 3
  if (offer.value.isVegan) score += 2
  
  return {
    co2,
    water,
    score: Math.min(100, score),
    trees,
    carKm
  }
})

const canReserve = computed(() => {
  return reservationForm.value.name &&
         reservationForm.value.email &&
         reservationForm.value.phone &&
         reservationForm.value.pickupSlot &&
         reservationForm.value.acceptTerms &&
         timeLeft.value !== 'Expiré'
})

// Méthodes
const formatDate = (date: Date) => {
  return date.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const formatTime = (date: Date) => {
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const processReservation = async () => {
  if (!canReserve.value) return
  
  isProcessing.value = true
  
  try {
    // Simulation du processus de réservation
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    showConfirmation.value = true
    
  } catch (error) {
    console.error('Erreur réservation:', error)
  } finally {
    isProcessing.value = false
  }
}

const goToDashboard = () => {
  showConfirmation.value = false
  router.push('/dashboard')
}

onMounted(() => {
  // Charger l'offre depuis l'API avec l'ID de la route
  // loadOffer(route.params.id)
})
</script> 