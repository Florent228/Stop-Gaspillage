<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
    <AppHeader />
    
    <div class="container mx-auto px-6 py-8">
      <div class="max-w-6xl mx-auto">
        <!-- Hero Section -->
        <div class="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl text-white p-8 mb-8">
          <div class="max-w-3xl">
            <h1 class="text-4xl font-bold mb-4">🌍 Apprendre ensemble</h1>
            <p class="text-xl text-green-100 mb-6">
              Découvrez l'impact du gaspillage alimentaire et comment nous pouvons tous contribuer 
              à un avenir plus durable pour notre planète.
            </p>
            <div class="flex flex-wrap gap-6 text-sm text-white">
              <div class="flex items-center bg-white bg-opacity-20 px-3 py-2 rounded-lg">
                <span class="mr-2">📚</span>
                <span>{{ articles.length }} articles</span>
              </div>
              <div class="flex items-center bg-white bg-opacity-20 px-3 py-2 rounded-lg">
                <span class="mr-2">🎥</span>
                <span>{{ videos.length }} vidéos</span>
              </div>
              <div class="flex items-center bg-white bg-opacity-20 px-3 py-2 rounded-lg">
                <span class="mr-2">💡</span>
                <span>{{ tips.length }} conseils pratiques</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation des sections -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8 border border-gray-200">
          <div class="flex flex-wrap gap-4">
            <button
              v-for="section in sections"
              :key="section.id"
              @click="activeSection = section.id"
              :class="activeSection === section.id 
                ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg' 
                : 'bg-gray-100 text-gray-700 hover:bg-green-50 hover:text-green-700'"
              class="px-4 py-2 rounded-lg transition-all duration-300 font-medium"
            >
              {{ section.icon }} {{ section.title }}
            </button>
          </div>
        </div>

        <!-- Section: Impact du gaspillage -->
        <div v-if="activeSection === 'impact'" class="space-y-8">
          <!-- Statistiques choquantes -->
          <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">📊 Le gaspillage alimentaire en chiffres</h2>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div class="text-center p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200 shadow-md">
                <div class="text-4xl font-bold text-red-600 mb-2">1/3</div>
                <div class="text-sm text-red-800 font-medium">de la nourriture produite est gaspillée</div>
              </div>
              <div class="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 shadow-md">
                <div class="text-4xl font-bold text-blue-600 mb-2">8%</div>
                <div class="text-sm text-blue-800 font-medium">des émissions mondiales de GES</div>
              </div>
              <div class="text-center p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 shadow-md">
                <div class="text-4xl font-bold text-orange-600 mb-2">20kg</div>
                <div class="text-sm text-orange-800 font-medium">gaspillés par personne et par an</div>
              </div>
              <div class="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200 shadow-md">
                <div class="text-4xl font-bold text-purple-600 mb-2">159€</div>
                <div class="text-sm text-purple-800 font-medium">perdus par foyer français</div>
              </div>
            </div>

            <!-- Infographie interactive -->
            <div class="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200 shadow-md">
              <h3 class="text-xl font-semibold text-gray-800 mb-4">🌍 Impact environnemental global</h3>
              
              <div class="grid md:grid-cols-3 gap-6">
                <div class="text-center bg-white rounded-lg p-4 shadow-sm">
                  <div class="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-3xl">💧</span>
                  </div>
                  <h4 class="font-semibold text-gray-800 mb-2">Gaspillage d'eau</h4>
                  <p class="text-sm text-gray-600 mb-2">25% de l'eau douce utilisée pour produire de la nourriture gaspillée</p>
                  <div class="text-lg font-bold text-blue-600">250 km³/an</div>
                </div>
                
                <div class="text-center bg-white rounded-lg p-4 shadow-sm">
                  <div class="w-20 h-20 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-3xl">🌱</span>
                  </div>
                  <h4 class="font-semibold text-gray-800 mb-2">Émissions CO₂</h4>
                  <p class="text-sm text-gray-600 mb-2">Si le gaspillage était un pays, il serait le 3ème émetteur mondial</p>
                  <div class="text-lg font-bold text-green-600">3.3 Gt CO₂/an</div>
                </div>
                
                <div class="text-center bg-white rounded-lg p-4 shadow-sm">
                  <div class="w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-3xl">🌾</span>
                  </div>
                  <h4 class="font-semibold text-gray-800 mb-2">Terres agricoles</h4>
                  <p class="text-sm text-gray-600 mb-2">1.4 milliard d'hectares utilisés pour rien</p>
                  <div class="text-lg font-bold text-yellow-600">28% surfaces</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Causes du gaspillage -->
          <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">🔍 Où se produit le gaspillage ?</h2>
            
            <div class="space-y-6">
              <div v-for="stage in wasteStages" :key="stage.id" class="border border-gray-200 rounded-xl p-6 bg-gradient-to-r from-gray-50 to-white shadow-sm">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-red-400 to-red-500 rounded-xl flex items-center justify-center">
                    <span class="text-2xl">{{ stage.icon }}</span>
                  </div>
                  <div class="flex-1">
                    <div class="flex items-center justify-between mb-2">
                      <h3 class="text-lg font-semibold text-gray-800">{{ stage.name }}</h3>
                      <span class="text-lg font-bold text-red-600">{{ stage.percentage }}%</span>
                    </div>
                    <p class="text-gray-700 mb-3">{{ stage.description }}</p>
                    <div class="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        class="bg-gradient-to-r from-red-400 to-red-600 h-3 rounded-full transition-all duration-1000"
                        :style="{ width: `${stage.percentage}%` }"
                      ></div>
                    </div>
                    <div class="mt-3">
                      <h4 class="font-medium text-gray-800 mb-2">Principales causes :</h4>
                      <ul class="text-sm text-gray-600 space-y-1">
                        <li v-for="cause in stage.causes" :key="cause" class="flex items-start">
                          <span class="mr-2 text-red-500">•</span>
                          <span>{{ cause }}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section: Solutions -->
        <div v-if="activeSection === 'solutions'" class="space-y-8">
          <!-- Actions individuelles -->
          <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">✨ Ce que VOUS pouvez faire</h2>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div v-for="tip in individualTips" :key="tip.id" class="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50">
                <div class="text-center mb-4">
                  <div class="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3">
                    <span class="text-3xl">{{ tip.icon }}</span>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-800">{{ tip.title }}</h3>
                </div>
                <p class="text-gray-600 text-sm mb-4">{{ tip.description }}</p>
                <div class="space-y-2">
                  <h4 class="font-medium text-gray-800 text-sm">Actions concrètes :</h4>
                  <ul class="text-xs text-gray-600 space-y-1">
                    <li v-for="action in tip.actions" :key="action" class="flex items-start">
                      <span class="mr-2 text-green-500">✓</span>
                      <span>{{ action }}</span>
                    </li>
                  </ul>
                </div>
                <div class="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
                  <div class="text-center">
                    <div class="text-sm font-medium text-green-800">Impact potentiel</div>
                    <div class="text-lg font-bold text-green-600">{{ tip.impact }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Technologies innovantes -->
          <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">🚀 Innovations contre le gaspillage</h2>
            
            <div class="grid md:grid-cols-2 gap-6">
              <div v-for="innovation in innovations" :key="innovation.id" class="border border-gray-200 rounded-xl p-6 bg-gradient-to-br from-white to-blue-50 hover:shadow-md transition-all duration-300">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                    <span class="text-2xl text-white">{{ innovation.icon }}</span>
                  </div>
                  <div class="flex-1">
                    <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ innovation.title }}</h3>
                    <p class="text-gray-600 text-sm mb-3">{{ innovation.description }}</p>
                    <div class="flex items-center text-xs text-gray-500">
                      <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">{{ innovation.category }}</span>
                      <span class="ml-2 text-gray-700">{{ innovation.impact }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section: Calculateur -->
        <div v-if="activeSection === 'calculator'" class="space-y-8">
          <!-- Calculateur d'impact personnel -->
          <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">🧮 Calculateur d'impact personnel</h2>
            
            <div class="grid md:grid-cols-2 gap-8">
              <!-- Formulaire -->
              <div class="space-y-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">
                    Taille de votre foyer
                  </label>
                  <select 
                    v-model="calculator.householdSize"
                    class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none bg-white"
                  >
                    <option value="1">1 personne</option>
                    <option value="2">2 personnes</option>
                    <option value="3">3 personnes</option>
                    <option value="4">4 personnes</option>
                    <option value="5">5+ personnes</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">
                    Type de régime alimentaire
                  </label>
                  <select 
                    v-model="calculator.dietType"
                    class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none bg-white"
                  >
                    <option value="omnivore">Omnivore</option>
                    <option value="vegetarien">Végétarien</option>
                    <option value="vegan">Végan</option>
                    <option value="flexitarien">Flexitarien</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">
                    Fréquence des courses
                  </label>
                  <select 
                    v-model="calculator.shoppingFrequency"
                    class="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none bg-white"
                  >
                    <option value="daily">Quotidienne</option>
                    <option value="weekly">Hebdomadaire</option>
                    <option value="biweekly">Bi-hebdomadaire</option>
                    <option value="monthly">Mensuelle</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-3">
                    Estimation de votre gaspillage alimentaire actuel
                  </label>
                  <div class="space-y-2">
                    <div class="flex items-center justify-between">
                      <span class="text-sm text-gray-600">Très peu (5%)</span>
                      <span class="text-sm text-gray-600">Beaucoup (30%)</span>
                    </div>
                    <input
                      v-model.number="calculator.wasteLevel"
                      type="range"
                      min="5"
                      max="30"
                      class="w-full accent-green-500"
                    />
                    <div class="text-center text-sm font-medium text-gray-700">
                      {{ calculator.wasteLevel }}% de gaspillage
                    </div>
                  </div>
                </div>

                <button
                  @click="calculateImpact"
                  class="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 px-4 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-medium shadow-lg"
                >
                  Calculer mon impact
                </button>
              </div>

              <!-- Résultats -->
              <div v-if="calculatorResults" class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h3 class="text-xl font-semibold text-green-800 mb-6">📊 Vos résultats annuels</h3>
                
                <div class="space-y-4">
                  <div class="bg-white rounded-lg p-4 shadow-sm">
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm text-gray-700">🍽️ Nourriture gaspillée</span>
                      <span class="font-bold text-red-600">{{ calculatorResults.wastedFood }}kg</span>
                    </div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm text-gray-700">💰 Argent perdu</span>
                      <span class="font-bold text-red-600">{{ calculatorResults.moneyLost }}€</span>
                    </div>
                    <div class="flex items-center justify-between mb-2">
                      <span class="text-sm text-gray-700">🌱 CO₂ émis</span>
                      <span class="font-bold text-red-600">{{ calculatorResults.co2Emitted }}kg</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <span class="text-sm text-gray-700">💧 Eau gaspillée</span>
                      <span class="font-bold text-red-600">{{ calculatorResults.waterWasted }}L</span>
                    </div>
                  </div>

                  <div class="bg-white rounded-lg p-4 border-l-4 border-green-500 shadow-sm">
                    <h4 class="font-semibold text-green-800 mb-2">🎯 Si vous réduisiez de 50% :</h4>
                    <div class="space-y-1 text-sm">
                      <div class="flex justify-between">
                        <span class="text-gray-700">Économies:</span>
                        <span class="font-medium text-green-600">{{ (calculatorResults.moneyLost / 2).toFixed(0) }}€</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-700">CO₂ évité:</span>
                        <span class="font-medium text-green-600">{{ (calculatorResults.co2Emitted / 2).toFixed(1) }}kg</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-gray-700">Eau économisée:</span>
                        <span class="font-medium text-green-600">{{ (calculatorResults.waterWasted / 2).toFixed(0) }}L</span>
                      </div>
                    </div>
                  </div>

                  <div class="text-center pt-4">
                    <p class="text-sm text-green-700 mb-4">
                      Rejoignez Stop-Gaspillage pour réduire votre impact !
                    </p>
                    <button
                      @click="$router.push('/auth')"
                      class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-medium shadow-md"
                    >
                      Commencer maintenant
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Section: Articles -->
        <div v-if="activeSection === 'articles'" class="space-y-8">
          <!-- Articles éducatifs -->
          <div class="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
            <h2 class="text-2xl font-bold text-gray-800 mb-6">📚 Articles éducatifs</h2>
            
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <article v-for="article in articles" :key="article.id" class="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-white to-gray-50">
                <div class="aspect-video bg-gradient-to-br from-green-100 to-blue-100 rounded-lg mb-4 flex items-center justify-center">
                  <span class="text-4xl">{{ article.icon }}</span>
                </div>
                <div class="space-y-3">
                  <div class="flex items-center text-xs text-gray-500">
                    <span class="bg-green-100 text-green-800 px-2 py-1 rounded">{{ article.category }}</span>
                    <span class="ml-2">{{ article.readTime }} min</span>
                  </div>
                  <h3 class="text-lg font-semibold text-gray-800">{{ article.title }}</h3>
                  <p class="text-sm text-gray-600">{{ article.excerpt }}</p>
                  <div class="flex items-center justify-between pt-2">
                    <span class="text-xs text-gray-500">{{ article.date }}</span>
                    <button class="text-green-600 hover:text-green-700 text-sm font-medium">
                      Lire la suite →
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'

const router = useRouter()

// État
const activeSection = ref('impact')

// Sections de navigation
const sections = [
  { id: 'impact', title: 'Impact du gaspillage', icon: '📊' },
  { id: 'solutions', title: 'Solutions', icon: '✨' },
  { id: 'calculator', title: 'Calculateur', icon: '🧮' },
  { id: 'articles', title: 'Articles', icon: '📚' }
]

// Données éducatives
const wasteStages = [
  {
    id: 'production',
    name: 'Production agricole',
    icon: '🌾',
    percentage: 24,
    description: 'Pertes lors de la récolte, du stockage et du transport depuis les exploitations.',
    causes: [
      'Conditions météorologiques défavorables',
      'Maladies et parasites des cultures',
      'Manque d\'infrastructures de stockage',
      'Standards esthétiques trop stricts'
    ]
  },
  {
    id: 'processing',
    name: 'Transformation et distribution',
    icon: '🏭',
    percentage: 35,
    description: 'Gaspillage dans les usines de transformation et les circuits de distribution.',
    causes: [
      'Défauts de calibrage et d\'emballage',
      'Dates de péremption trop courtes',
      'Ruptures de la chaîne du froid',
      'Surproduction par rapport à la demande'
    ]
  },
  {
    id: 'retail',
    name: 'Commerce de détail',
    icon: '🏪',
    percentage: 23,
    description: 'Pertes dans les supermarchés, magasins et restaurants.',
    causes: [
      'Surstockage pour maintenir l\'abondance',
      'Promotions inadéquates',
      'Gestion défaillante des stocks',
      'Préférences esthétiques des consommateurs'
    ]
  },
  {
    id: 'consumption',
    name: 'Consommation',
    icon: '🏠',
    percentage: 18,
    description: 'Gaspillage au niveau des consommateurs et foyers.',
    causes: [
      'Achats impulsifs et surconsommation',
      'Mauvaise planification des repas',
      'Conservation inadéquate',
      'Portions trop importantes'
    ]
  }
]

const individualTips = [
  {
    id: 'planning',
    title: 'Planification intelligente',
    icon: '📋',
    description: 'Organisez vos achats et repas pour éviter le gaspillage.',
    actions: [
      'Faire une liste de courses précise',
      'Planifier les menus de la semaine',
      'Vérifier les stocks avant d\'acheter',
      'Cuisiner en quantités adaptées'
    ],
    impact: '30% de réduction'
  },
  {
    id: 'storage',
    title: 'Conservation optimale',
    icon: '❄️',
    description: 'Stockez correctement vos aliments pour maximiser leur durée de vie.',
    actions: [
      'Respecter les zones de température du frigo',
      'Utiliser des contenants hermétiques',
      'Appliquer la règle "premier entré, premier sorti"',
      'Congeler les excédents rapidement'
    ],
    impact: '25% de réduction'
  },
  {
    id: 'creativity',
    title: 'Cuisine créative',
    icon: '👨‍🍳',
    description: 'Transformez vos restes en délicieux repas.',
    actions: [
      'Cuisiner les légumes "moches"',
      'Préparer des soupes avec les restes',
      'Faire des smoothies avec fruits trop mûrs',
      'Composer des salades créatives'
    ],
    impact: '40% de réduction'
  },
  {
    id: 'sharing',
    title: 'Partage et don',
    icon: '🤝',
    description: 'Partagez vos excédents avec votre entourage ou des associations.',
    actions: [
      'Organiser des repas partagés',
      'Donner aux associations locales',
      'Utiliser des apps de partage alimentaire',
      'Créer un réseau de voisinage'
    ],
    impact: '50% de réduction'
  },
  {
    id: 'local',
    title: 'Achat responsable',
    icon: '🌱',
    description: 'Privilégiez les circuits courts et les produits de saison.',
    actions: [
      'Acheter directement chez les producteurs',
      'Choisir des produits de saison',
      'Préférer les marchés locaux',
      'Soutenir l\'agriculture biologique'
    ],
    impact: '20% de réduction'
  },
  {
    id: 'composting',
    title: 'Compostage',
    icon: '♻️',
    description: 'Transformez vos déchets organiques en compost nutritif.',
    actions: [
      'Installer un composteur domestique',
      'Participer au compostage collectif',
      'Apprendre les bonnes pratiques',
      'Utiliser le compost pour jardiner'
    ],
    impact: '100% valorisation'
  }
]

const innovations = [
  {
    id: 'ai-prediction',
    title: 'IA prédictive',
    icon: '🤖',
    description: 'Intelligence artificielle pour prédire la demande et optimiser les stocks.',
    category: 'Technologie',
    impact: 'Réduction 25% gaspillage retail'
  },
  {
    id: 'smart-packaging',
    title: 'Emballages intelligents',
    icon: '📦',
    description: 'Capteurs qui indiquent l\'état de fraîcheur des aliments en temps réel.',
    category: 'Innovation',
    impact: 'Extension durée de vie 30%'
  },
  {
    id: 'blockchain',
    title: 'Traçabilité blockchain',
    icon: '⛓️',
    description: 'Suivi transparent de la chaîne alimentaire pour réduire les pertes.',
    category: 'Blockchain',
    impact: 'Réduction 15% pertes transport'
  },
  {
    id: 'apps',
    title: 'Applications mobiles',
    icon: '📱',
    description: 'Plateformes de mise en relation pour lutter contre le gaspillage.',
    category: 'Mobile',
    impact: '1M tonnes sauvées/an'
  }
]

const articles = [
  {
    id: 'global-impact',
    title: 'L\'impact global du gaspillage alimentaire',
    icon: '🌍',
    category: 'Environnement',
    excerpt: 'Découvrez comment le gaspillage alimentaire affecte notre planète et contribue au changement climatique.',
    readTime: 8,
    date: '15 Jan 2024'
  },
  {
    id: 'france-stats',
    title: 'Le gaspillage alimentaire en France',
    icon: '🇫🇷',
    category: 'Société',
    excerpt: 'Analyse détaillée de la situation française et des initiatives gouvernementales.',
    readTime: 6,
    date: '12 Jan 2024'
  },
  {
    id: 'zero-waste',
    title: 'Guide du zéro déchet alimentaire',
    icon: '♻️',
    category: 'Pratique',
    excerpt: 'Conseils pratiques pour réduire drastiquement vos déchets alimentaires.',
    readTime: 10,
    date: '10 Jan 2024'
  }
]

const videos = [
  { id: 'documentary', title: 'Documentaire : Global Waste' },
  { id: 'tips', title: 'Astuces anti-gaspillage' },
  { id: 'interview', title: 'Interview d\'experts' }
]

const tips = [
  { id: 'fridge', title: 'Organiser son frigo' },
  { id: 'dates', title: 'Comprendre les dates' },
  { id: 'portions', title: 'Calculer les portions' }
]

// Calculateur
const calculator = ref({
  householdSize: 2,
  dietType: 'omnivore',
  shoppingFrequency: 'weekly',
  wasteLevel: 15
})

const calculatorResults = ref<{
  wastedFood: number
  moneyLost: number
  co2Emitted: number
  waterWasted: number
} | null>(null)

// Méthodes
const calculateImpact = () => {
  // Calculs basés sur des données réelles
  const baseWastePerPerson = 20 // kg/an moyenne française
  const dietMultiplier = {
    omnivore: 1.0,
    vegetarian: 0.8,
    vegan: 0.6
  }
  
  const frequencyMultiplier = {
    daily: 1.2,
    weekly: 0.9,
    biweekly: 0.8,
    monthly: 0.8
  }
  
  const wastedFood = Math.round(
    baseWastePerPerson * 
    calculator.value.householdSize * 
    (calculator.value.wasteLevel / 15) * 
    dietMultiplier[calculator.value.dietType as keyof typeof dietMultiplier] * 
    frequencyMultiplier[calculator.value.shoppingFrequency as keyof typeof frequencyMultiplier]
  )
  
  const moneyLost = Math.round(wastedFood * 7.5) // 7.5€/kg moyenne
  const co2Emitted = Number((wastedFood * 2.3).toFixed(1)) // 2.3kg CO₂/kg nourriture
  const waterWasted = Math.round(wastedFood * 170) // 170L/kg moyenne
  
  calculatorResults.value = {
    wastedFood,
    moneyLost,
    co2Emitted,
    waterWasted
  }
}
</script> 