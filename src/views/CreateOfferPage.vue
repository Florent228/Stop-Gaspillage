<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    
    <div class="container mx-auto px-6 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- En-tête avec progression -->
        <div class="mb-8">
          <div class="flex items-center mb-4">
            <button @click="$router.back()" class="text-gray-500 hover:text-gray-700 mr-4">
              ← Retour
            </button>
            <h1 class="text-3xl font-bold text-gray-900">Créer une nouvelle offre</h1>
          </div>
          
          <!-- Barre de progression -->
          <div class="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div class="bg-forest-600 h-2 rounded-full transition-all duration-300" 
                 :style="{ width: `${(currentStep / totalSteps) * 100}%` }"></div>
          </div>
          
          <div class="flex justify-between text-sm text-gray-600">
            <span :class="currentStep >= 1 ? 'text-forest-600 font-medium' : ''">1. Informations</span>
            <span :class="currentStep >= 2 ? 'text-forest-600 font-medium' : ''">2. Localisation</span>
            <span :class="currentStep >= 3 ? 'text-forest-600 font-medium' : ''">3. Photos</span>
            <span :class="currentStep >= 4 ? 'text-forest-600 font-medium' : ''">4. Analyse IA</span>
          </div>
        </div>

        <!-- Formulaire multi-étapes -->
        <form @submit.prevent="handleSubmit" class="bg-white rounded-xl shadow-sm p-8">
          
          <!-- Étape 1: Informations de base -->
          <div v-if="currentStep === 1" class="space-y-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">📝 Informations de base</h2>
            
            <div class="grid md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Titre de l'offre *</label>
                <input
                  v-model="form.title"
                  type="text"
                  required
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  placeholder="Ex: Pain complet du jour, Fruits bio de saison..."
                />
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  v-model="form.description"
                  rows="4"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  placeholder="Décrivez votre offre en détail..."
                ></textarea>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Catégorie *</label>
                <select
                  v-model="form.category"
                  required
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                >
                  <option value="">Sélectionnez une catégorie</option>
                  <option value="fruits-legumes">🥬 Fruits & Légumes</option>
                  <option value="pain-viennoiseries">🥖 Pain & Viennoiseries</option>
                  <option value="produits-laitiers">🥛 Produits laitiers</option>
                  <option value="viandes-poissons">🍗 Viandes & Poissons</option>
                  <option value="epicerie">🛒 Épicerie</option>
                  <option value="plats-prepares">🍽️ Plats préparés</option>
                </select>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Quantité *</label>
                <div class="flex">
                  <input
                    v-model="form.quantity"
                    type="number"
                    min="1"
                    required
                    class="flex-1 p-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                    placeholder="1"
                  />
                  <select
                    v-model="form.unit"
                    class="p-3 border border-l-0 border-gray-300 rounded-r-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  >
                    <option value="pieces">pièces</option>
                    <option value="kg">kg</option>
                    <option value="liters">litres</option>
                    <option value="portions">portions</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Prix original *</label>
                <div class="relative">
                  <input
                    v-model="form.originalPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    class="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                  <span class="absolute left-3 top-3 text-gray-500">€</span>
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Prix réduit *</label>
                <div class="relative">
                  <input
                    v-model="form.discountedPrice"
                    type="number"
                    step="0.01"
                    min="0"
                    required
                    class="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                  <span class="absolute left-3 top-3 text-gray-500">€</span>
                </div>
              </div>

              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Date limite de récupération *</label>
                <input
                  v-model="form.expirationDate"
                  type="datetime-local"
                  required
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                />
              </div>
            </div>

            <!-- Calcul de la réduction -->
            <div v-if="discountPercentage > 0" class="p-4 bg-green-50 rounded-lg border border-green-200">
              <div class="flex items-center">
                <span class="text-green-600 mr-2">💰</span>
                <p class="text-green-700">
                  Réduction de <strong>{{ discountPercentage }}%</strong> 
                  ({{ discountAmount }}€ d'économie pour le client)
                </p>
              </div>
            </div>

            <!-- Caractéristiques spéciales -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-3">Caractéristiques spéciales</label>
              <div class="flex flex-wrap gap-4">
                <label class="flex items-center">
                  <input v-model="form.isVegan" type="checkbox" class="mr-2 text-forest-600" />
                  <span class="text-sm">🌱 Végane</span>
                </label>
                <label class="flex items-center">
                  <input v-model="form.isOrganic" type="checkbox" class="mr-2 text-forest-600" />
                  <span class="text-sm">🌿 Bio</span>
                </label>
                <label class="flex items-center">
                  <input v-model="form.isGlutenFree" type="checkbox" class="mr-2 text-forest-600" />
                  <span class="text-sm">🚫 Sans gluten</span>
                </label>
                <label class="flex items-center">
                  <input v-model="form.isLocal" type="checkbox" class="mr-2 text-forest-600" />
                  <span class="text-sm">📍 Production locale</span>
                </label>
              </div>
            </div>
          </div>

          <!-- Étape 2: Localisation -->
          <div v-if="currentStep === 2" class="space-y-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">📍 Localisation et récupération</h2>
            
            <div class="grid md:grid-cols-2 gap-6">
              <div class="md:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-2">Adresse complète *</label>
                <input
                  v-model="form.address"
                  type="text"
                  required
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  placeholder="123 Rue de l'Exemple"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Ville *</label>
                <input
                  v-model="form.city"
                  type="text"
                  required
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  placeholder="Paris"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Code postal *</label>
                <input
                  v-model="form.postalCode"
                  type="text"
                  required
                  pattern="[0-9]{5}"
                  class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  placeholder="75001"
                />
              </div>
            </div>

            <!-- Instructions de récupération -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Instructions de récupération</label>
              <textarea
                v-model="form.pickupInstructions"
                rows="3"
                class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                placeholder="Sonnez à l'interphone, parking disponible, etc."
              ></textarea>
            </div>
          </div>

          <!-- Étape 3: Photos -->
          <div v-if="currentStep === 3" class="space-y-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">📷 Photos de l'offre</h2>
            
            <!-- Zone de drop des fichiers -->
            <div 
              class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-forest-500 transition-colors"
            >
              <input
                ref="fileInput"
                type="file"
                multiple
                accept="image/*"
                @change="handleFileSelect"
                class="hidden"
              />
              
              <div class="space-y-4">
                <div class="text-6xl">📷</div>
                <div>
                  <button
                    type="button"
                    @click="fileInput?.click()"
                    class="text-forest-600 hover:text-forest-700 font-medium"
                  >
                    Cliquez pour ajouter des photos
                  </button>
                  <p class="text-gray-500 text-sm mt-1">ou glissez-déposez vos images ici</p>
                  <p class="text-gray-400 text-xs">PNG, JPG jusqu'à 5MB chacune (maximum 5 photos)</p>
                </div>
              </div>
            </div>
            
            <!-- Aperçu des images -->
            <div v-if="selectedFiles.length" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <div v-for="(file, index) in selectedFiles" :key="index" 
                   class="relative aspect-square bg-gray-100 rounded-lg overflow-hidden group">
                <img :src="file.preview" alt="Preview" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    type="button"
                    @click="removeFile(index)"
                    class="bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Étape 4: Analyse IA -->
          <div v-if="currentStep === 4" class="space-y-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">🤖 Analyse d'impact environnemental</h2>
            
            <div v-if="isAnalyzing" class="text-center py-12">
              <div class="animate-spin rounded-full h-16 w-16 border-b-2 border-forest-500 mx-auto mb-4"></div>
              <p class="text-gray-600">Analyse IA en cours...</p>
              <p class="text-sm text-gray-500">Calcul de l'impact environnemental de votre offre</p>
            </div>

            <div v-else-if="impactAnalysis" class="space-y-6">
              <!-- Résumé de l'impact -->
              <div class="bg-forest-50 rounded-xl p-6 border border-forest-200">
                <h3 class="text-lg font-semibold text-forest-800 mb-4">📊 Impact environnemental calculé</h3>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div class="text-center">
                    <div class="text-3xl font-bold text-forest-600">{{ impactAnalysis.co2 }}kg</div>
                    <div class="text-sm text-gray-600">CO₂ évité</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-blue-600">{{ impactAnalysis.water }}L</div>
                    <div class="text-sm text-gray-600">Eau économisée</div>
                  </div>
                  <div class="text-center">
                    <div class="text-3xl font-bold text-orange-600">{{ impactAnalysis.score }}/100</div>
                    <div class="text-sm text-gray-600">Score d'impact</div>
                  </div>
                </div>

                <!-- Barre de score -->
                <div class="mb-4">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-medium text-gray-700">Score d'impact global</span>
                    <span class="text-sm font-bold text-forest-600">{{ impactAnalysis.score }}/100</span>
                  </div>
                  <div class="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      class="bg-gradient-to-r from-forest-400 to-forest-600 h-3 rounded-full transition-all duration-1000"
                      :style="{ width: `${impactAnalysis.score}%` }"
                    ></div>
                  </div>
                </div>

                <!-- Équivalences -->
                <div class="grid grid-cols-2 gap-4">
                  <div class="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span class="text-sm text-gray-700">🌳 Équivaut à planter</span>
                    <span class="font-semibold text-forest-600">{{ impactAnalysis.trees }} arbres</span>
                  </div>
                  <div class="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span class="text-sm text-gray-700">🚗 Évite un trajet de</span>
                    <span class="font-semibold text-forest-600">{{ impactAnalysis.carKm }} km</span>
                  </div>
                </div>
              </div>

              <!-- Recommandations IA -->
              <div class="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 class="text-lg font-semibold text-blue-800 mb-4">💡 Recommandations pour optimiser l'impact</h3>
                <ul class="space-y-2">
                  <li v-for="recommendation in impactAnalysis.recommendations" :key="recommendation"
                      class="flex items-start">
                    <span class="text-blue-600 mr-2">•</span>
                    <span class="text-sm text-blue-700">{{ recommendation }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Boutons de navigation -->
          <div class="flex justify-between pt-8 border-t border-gray-200">
            <button
              v-if="currentStep > 1"
              type="button"
              @click="previousStep"
              class="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              ← Précédent
            </button>
            <div v-else></div>

            <div class="space-x-3">
              <button
                v-if="currentStep < totalSteps"
                type="button"
                @click="nextStep"
                :disabled="!canProceed"
                class="px-6 py-3 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Suivant →
              </button>
              
              <button
                v-if="currentStep === totalSteps"
                type="submit"
                :disabled="isSubmitting || !canSubmit"
                class="px-6 py-3 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors disabled:opacity-50"
              >
                {{ isSubmitting ? 'Création...' : 'Créer l\'offre' }}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/layout/AppHeader.vue'

const router = useRouter()

// État du formulaire
const currentStep = ref(1)
const totalSteps = 4
const isSubmitting = ref(false)
const isAnalyzing = ref(false)
const fileInput = ref<HTMLInputElement>()

// Données du formulaire
const form = ref({
  title: '',
  description: '',
  category: '',
  quantity: 1,
  unit: 'pieces',
  originalPrice: '',
  discountedPrice: '',
  expirationDate: '',
  address: '',
  city: '',
  postalCode: '',
  pickupInstructions: '',
  isVegan: false,
  isOrganic: false,
  isGlutenFree: false,
  isLocal: false
})

const selectedFiles = ref<Array<{ file: File; preview: string }>>([])
const impactAnalysis = ref<{
  co2: number
  water: number
  score: number
  trees: number
  carKm: number
  recommendations: string[]
} | null>(null)

// Calculs de prix
const discountPercentage = computed(() => {
  const original = parseFloat(form.value.originalPrice)
  const discounted = parseFloat(form.value.discountedPrice)
  if (original && discounted && original > discounted) {
    return Math.round(((original - discounted) / original) * 100)
  }
  return 0
})

const discountAmount = computed(() => {
  const original = parseFloat(form.value.originalPrice)
  const discounted = parseFloat(form.value.discountedPrice)
  if (original && discounted) {
    return (original - discounted).toFixed(2)
  }
  return '0.00'
})

// Validation des étapes
const canProceed = computed(() => {
  switch (currentStep.value) {
    case 1:
      return form.value.title && form.value.category && form.value.quantity && 
             form.value.originalPrice && form.value.discountedPrice && form.value.expirationDate
    case 2:
      return form.value.address && form.value.city && form.value.postalCode
    case 3:
      return true // Photos optionnelles
    case 4:
      return impactAnalysis.value !== null
    default:
      return false
  }
})

const canSubmit = computed(() => {
  return canProceed.value && impactAnalysis.value !== null
})

// Navigation entre étapes
const nextStep = async () => {
  if (currentStep.value === 3 && !impactAnalysis.value) {
    await runImpactAnalysis()
  }
  if (currentStep.value < totalSteps) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

// Gestion des fichiers
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files) {
    processFiles(Array.from(target.files))
  }
}

const processFiles = (files: File[]) => {
  files.forEach(file => {
    if (file.type.startsWith('image/') && selectedFiles.value.length < 5) {
      const reader = new FileReader()
      reader.onload = (e) => {
        selectedFiles.value.push({
          file,
          preview: e.target?.result as string
        })
      }
      reader.readAsDataURL(file)
    }
  })
}

const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1)
}

// Analyse IA de l'impact
const runImpactAnalysis = async () => {
  isAnalyzing.value = true
  
  try {
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    // Calculs basés sur la catégorie et quantité
    const impactFactors: Record<string, { co2: number; water: number; score: number }> = {
      'fruits-legumes': { co2: 0.3, water: 2, score: 85 },
      'pain-viennoiseries': { co2: 0.8, water: 1.5, score: 75 },
      'produits-laitiers': { co2: 1.2, water: 3, score: 70 },
      'viandes-poissons': { co2: 2.5, water: 8, score: 60 },
      'epicerie': { co2: 0.5, water: 1, score: 80 },
      'plats-prepares': { co2: 1.5, water: 2.5, score: 65 }
    }
    
    const factor = impactFactors[form.value.category] || { co2: 1, water: 2, score: 70 }
    const qty = form.value.quantity
    
    const co2 = Number((factor.co2 * qty).toFixed(1))
    const water = Math.round(factor.water * qty)
    const trees = Number((co2 / 0.5).toFixed(1))
    const carKm = Math.round(co2 * 4.2)
    
    // Bonus pour caractéristiques spéciales
    let scoreBonus = 0
    if (form.value.isOrganic) scoreBonus += 5
    if (form.value.isLocal) scoreBonus += 3
    if (form.value.isVegan) scoreBonus += 2
    
    const score = Math.min(100, factor.score + scoreBonus)
    
    impactAnalysis.value = {
      co2,
      water,
      score,
      trees,
      carKm,
      recommendations: [
        'Proposez des créneaux de récupération flexibles pour maximiser les chances',
        'Communiquez sur les caractéristiques bio/local pour attirer plus d\'acheteurs',
        'Fixez un prix attractif pour éviter le gaspillage',
        'Ajoutez des photos appétissantes pour augmenter l\'attractivité'
      ]
    }
    
  } catch (error) {
    console.error('Erreur analyse IA:', error)
  } finally {
    isAnalyzing.value = false
  }
}

// Soumission du formulaire
const handleSubmit = async () => {
  if (!canSubmit.value) return
  
  isSubmitting.value = true
  
  try {
    // Simulation de création
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    router.push('/dashboard')
    
  } catch (error) {
    console.error('Erreur création offre:', error)
  } finally {
    isSubmitting.value = false
  }
}

onMounted(() => {
  // Pré-remplir la date d'expiration (24h par défaut)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(18, 0, 0, 0)
  form.value.expirationDate = tomorrow.toISOString().slice(0, 16)
})
</script> 