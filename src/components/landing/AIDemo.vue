<template>
  <section id="demo-ia" class="py-20 bg-gradient-to-br from-forest-50 to-beige-50">
    <div class="container mx-auto px-6">
      <!-- En-tête de section -->
      <div class="text-center mb-16">
        <span class="inline-block px-4 py-2 bg-forest-100 text-forest-700 text-sm font-medium rounded-full mb-4">
          🤖 Technologie IA
        </span>
        <h2 class="text-4xl font-bold text-gray-900 mb-6">
          Analysez l'impact environnemental en temps réel
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Notre IA calcule instantanément l'empreinte carbone et l'impact écologique 
          de chaque aliment sauvé pour vous motiver à agir pour la planète.
        </p>
      </div>

      <div class="max-w-6xl mx-auto">
        <div class="bg-white bg-opacity-95 rounded-3xl shadow-2xl p-8 lg:p-12 border border-green-200">
          <!-- Sélecteur de catégorie -->
          <div class="mb-8">
            <h3 class="text-2xl font-bold text-gray-800 mb-6 text-center">
              Choisissez une catégorie pour voir son impact :
            </h3>
            
            <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
              <button
                v-for="category in categories"
                :key="category.id"
                @click="selectedCategory = category.id"
                :class="selectedCategory === category.id 
                  ? 'bg-gradient-to-br from-green-500 to-emerald-500 text-white shadow-lg scale-105' 
                  : 'bg-gradient-to-br from-gray-100 to-gray-200 text-gray-700 hover:from-green-100 hover:to-emerald-100 hover:text-green-700'"
                class="p-4 rounded-xl transition-all duration-300 text-center font-medium border-2"
                :style="selectedCategory === category.id ? 'border-color: #10B981' : 'border-color: #E5E7EB'"
              >
                <div class="text-3xl mb-2">{{ category.emoji }}</div>
                <div class="text-sm">{{ category.name }}</div>
              </button>
            </div>
          </div>

          <!-- Métriques d'impact -->
          <div class="grid md:grid-cols-3 gap-6 mb-8">
            <div class="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl text-center border border-green-200">
              <div class="text-4xl mb-2">🌱</div>
              <div class="text-3xl font-bold text-green-600 mb-1">{{ animatedValues.co2 }}kg</div>
              <div class="text-sm text-green-700 font-medium">CO₂ évité</div>
              <div class="text-xs text-gray-600 mt-2">Équivaut à {{ Math.round(animatedValues.co2 * 2) }} km en voiture</div>
            </div>
            
            <div class="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl text-center border border-blue-200">
              <div class="text-4xl mb-2">💧</div>
              <div class="text-3xl font-bold text-blue-600 mb-1">{{ animatedValues.water }}L</div>
              <div class="text-sm text-blue-700 font-medium">Eau économisée</div>
              <div class="text-xs text-gray-600 mt-2">{{ Math.round(animatedValues.water / 150) }} douches de 10 min</div>
            </div>
            
            <div class="bg-gradient-to-br from-orange-50 to-red-50 p-6 rounded-2xl text-center border border-orange-200">
              <div class="text-4xl mb-2">🏆</div>
              <div class="text-3xl font-bold text-orange-600 mb-1">{{ animatedValues.score }}/100</div>
              <div class="text-sm text-orange-700 font-medium">Score d'impact</div>
              <div class="text-xs text-gray-600 mt-2">{{ getScoreLabel(animatedValues.score) }}</div>
            </div>
          </div>

          <!-- Barre de score avec animation -->
          <div class="mb-8">
            <div class="flex justify-between items-center mb-3">
              <span class="text-lg font-semibold text-gray-800">Impact environnemental global</span>
              <span class="text-lg font-bold text-green-600">{{ animatedValues.score }}/100</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
              <div 
                class="h-4 rounded-full transition-all duration-1000 ease-out bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500"
                :style="{ width: `${animatedValues.score}%` }"
              ></div>
            </div>
          </div>

          <!-- Équivalences visuelles -->
          <div class="grid md:grid-cols-2 gap-6 mb-8">
            <div class="bg-gradient-to-br from-emerald-50 to-green-50 p-6 rounded-2xl border border-emerald-200">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <span class="text-3xl mr-4">🌳</span>
                  <div>
                    <div class="text-lg font-semibold text-gray-800">Arbres plantés (équivalent)</div>
                    <div class="text-sm text-gray-600">Impact CO₂ compensé</div>
                  </div>
                </div>
                <div class="text-3xl font-bold text-emerald-600">{{ trees }}</div>
              </div>
            </div>
            
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl border border-purple-200">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <span class="text-3xl mr-4">🚗</span>
                  <div>
                    <div class="text-lg font-semibold text-gray-800">Kilomètres évités</div>
                    <div class="text-sm text-gray-600">En voiture thermique</div>
                  </div>
                </div>
                <div class="text-3xl font-bold text-purple-600">{{ carKm }}km</div>
              </div>
            </div>
          </div>

          <!-- Appel à l'action -->
          <div class="text-center bg-gradient-to-r from-green-500 to-emerald-500 p-8 rounded-2xl text-white">
            <h3 class="text-2xl font-bold mb-4">Prêt à faire la différence ?</h3>
            <p class="text-green-100 mb-6 text-lg">
              Rejoignez notre communauté et commencez à sauver la planète dès aujourd'hui !
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                @click="$router.push('/auth')"
                class="bg-white text-green-600 px-8 py-3 rounded-xl font-semibold hover:bg-green-50 transition-colors shadow-lg"
              >
                Commencer maintenant
              </button>
              <button 
                @click="$router.push('/marketplace')"
                class="bg-green-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-green-700 transition-colors border-2 border-white"
              >
                Explorer la marketplace
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// État réactif
const selectedCategory = ref('fruits-legumes')

// Données des catégories avec facteurs d'impact
const categories = [
  {
    id: 'fruits-legumes',
    name: 'Fruits & Légumes',
    emoji: '🥬',
    co2Factor: 0.5,
    waterFactor: 3,
    baseScore: 85
  },
  {
    id: 'pain-viennoiseries',
    name: 'Pain & Viennoiseries',
    emoji: '🥖',
    co2Factor: 1.2,
    waterFactor: 2,
    baseScore: 75
  },
  {
    id: 'produits-laitiers',
    name: 'Produits laitiers',
    emoji: '🥛',
    co2Factor: 2.1,
    waterFactor: 8,
    baseScore: 65
  },
  {
    id: 'viandes-poissons',
    name: 'Viandes & Poissons',
    emoji: '🍗',
    co2Factor: 4.5,
    waterFactor: 15,
    baseScore: 55
  },
  {
    id: 'plats-prepares',
    name: 'Plats préparés',
    emoji: '🍽️',
    co2Factor: 2.8,
    waterFactor: 6,
    baseScore: 70
  }
]

// Valeurs animées
const animatedValues = ref({
  co2: 0,
  water: 0,
  score: 0
})

// Calcul des équivalences
const trees = computed(() => Math.round(animatedValues.value.co2 / 0.5))
const carKm = computed(() => Math.round(animatedValues.value.co2 * 4.2))

// Animation des valeurs
const animateToValue = (target: { co2: number; water: number; score: number }) => {
  const duration = 1500
  const steps = 60
  const stepDuration = duration / steps
  
  const startValues = { ...animatedValues.value }
  const differences = {
    co2: target.co2 - startValues.co2,
    water: target.water - startValues.water,
    score: target.score - startValues.score
  }
  
  let currentStep = 0
  
  const interval = setInterval(() => {
    currentStep++
    const progress = Math.min(currentStep / steps, 1)
    
    // Fonction d'easing pour une animation plus naturelle
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
    const easedProgress = easeOutCubic(progress)
    
    animatedValues.value = {
      co2: Math.round((startValues.co2 + differences.co2 * easedProgress) * 10) / 10,
      water: Math.round(startValues.water + differences.water * easedProgress),
      score: Math.round(startValues.score + differences.score * easedProgress)
    }
    
    if (progress >= 1) {
      clearInterval(interval)
    }
  }, stepDuration)
}

// Calcul de l'impact basé sur la catégorie sélectionnée
const calculateImpact = () => {
  const category = categories.find(c => c.id === selectedCategory.value)
  if (!category) return
  
  // Simulation d'une portion moyenne
  const quantity = 1
  
  const newValues = {
    co2: Number((category.co2Factor * quantity).toFixed(1)),
    water: Math.round(category.waterFactor * quantity),
    score: category.baseScore
  }
  
  animateToValue(newValues)
}

// Label du score
const getScoreLabel = (score: number) => {
  if (score >= 80) return '🌟 Excellent impact'
  if (score >= 60) return '👍 Bon impact'
  if (score >= 40) return '⚠️ Impact modéré'
  return '❌ Impact faible'
}

// Watchers
watch(selectedCategory, calculateImpact)

// Initialisation
onMounted(() => {
  calculateImpact()
})
</script>

<style scoped>
.slider::-webkit-slider-thumb {
  appearance: none;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #2E7D32;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.slider::-moz-range-thumb {
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #2E7D32;
  cursor: pointer;
  border: 2px solid #ffffff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
</style> 