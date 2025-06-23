<template>
  <section class="py-20 bg-gradient-to-br from-forest-600 via-forest-700 to-forest-800">
    <div class="container mx-auto px-6 text-center">
      <div class="max-w-4xl mx-auto">
        <div class="bg-white bg-opacity-95 rounded-3xl shadow-2xl p-8 lg:p-12 border border-orange-200">
          <!-- Titre accrocheur -->
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            🚀 Prêt à révolutionner vos courses ?
          </h2>
          
          <p class="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            Rejoignez la communauté Stop-Gaspillage et transformez votre façon de consommer. 
            <span class="font-semibold text-orange-600">Plus économique, plus écologique, plus local !</span>
          </p>

          <!-- Avantages rapides -->
          <div class="grid md:grid-cols-3 gap-6 mb-10">
            <div class="bg-gradient-to-br from-green-100 to-emerald-100 p-6 rounded-2xl border border-green-200">
              <div class="text-3xl mb-3">💰</div>
              <div class="font-semibold text-gray-800 mb-2">Économisez immédiatement</div>
              <div class="text-sm text-gray-600">Jusqu'à 70% de réduction sur vos courses</div>
            </div>
            
            <div class="bg-gradient-to-br from-blue-100 to-cyan-100 p-6 rounded-2xl border border-blue-200">
              <div class="text-3xl mb-3">⚡</div>
              <div class="font-semibold text-gray-800 mb-2">Démarrage instantané</div>
              <div class="text-sm text-gray-600">Inscription en 30 secondes, achat en 2 clics</div>
            </div>
            
            <div class="bg-gradient-to-br from-purple-100 to-pink-100 p-6 rounded-2xl border border-purple-200">
              <div class="text-3xl mb-3">🌍</div>
              <div class="font-semibold text-gray-800 mb-2">Impact immédiat</div>
              <div class="text-sm text-gray-600">Chaque achat sauve la planète</div>
            </div>
          </div>

          <!-- Boutons d'action -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button 
              @click="$router.push('/auth')"
              class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🎯 Commencer gratuitement
            </button>
            
            <button 
              @click="$router.push('/marketplace')"
              class="bg-gradient-to-r from-orange-400 to-red-400 text-white px-10 py-4 rounded-2xl font-bold text-lg hover:from-orange-500 hover:to-red-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              🛒 Explorer la marketplace
            </button>
          </div>

          <!-- Garanties et réassurance -->
          <div class="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div class="flex items-center justify-center">
              <span class="text-green-500 mr-2">✅</span>
              <span class="font-medium">100% gratuit</span>
            </div>
            
            <div class="flex items-center justify-center">
              <span class="text-green-500 mr-2">✅</span>
              <span class="font-medium">Sans engagement</span>
            </div>
            
            <div class="flex items-center justify-center">
              <span class="text-green-500 mr-2">✅</span>
              <span class="font-medium">Support 7j/7</span>
            </div>
          </div>

          <!-- Urgence et social proof -->
          <div class="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl border border-yellow-200">
            <div class="flex items-center justify-center mb-4">
              <span class="text-2xl mr-2">🔥</span>
              <span class="font-bold text-gray-800">Offre limitée</span>
            </div>
            
            <p class="text-gray-700 mb-4">
              <span class="font-semibold text-orange-600">+500 nouveaux utilisateurs</span> nous ont rejoints cette semaine !
            </p>
            
            <div class="flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div class="flex items-center">
                <span class="text-yellow-400 mr-1">⭐</span>
                <span>4.8/5 (2,500+ avis)</span>
              </div>
              
              <div class="flex items-center">
                <span class="text-green-500 mr-1">👥</span>
                <span>50,000+ utilisateurs</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Badge de confiance -->
      <div class="mt-16 flex flex-col items-center">
        <div class="bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 mb-4">
          <span class="text-forest-100 text-sm">
            ⭐ Noté 4.9/5 par 10,000+ utilisateurs
          </span>
        </div>
        
        <!-- Logos partenaires simulés -->
        <div class="flex items-center space-x-8 opacity-70">
          <div class="text-white/60 text-sm">Partenaires :</div>
          <div class="text-white/60 font-medium">EcoTech</div>
          <div class="text-white/60 font-medium">GreenAI</div>
          <div class="text-white/60 font-medium">FoodTech</div>
        </div>
      </div>
    </div>

    <!-- Élément décoratif -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-40 -right-40 w-80 h-80 bg-white/5 rounded-full"></div>
      <div class="absolute -bottom-40 -left-40 w-80 h-80 bg-white/5 rounded-full"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped>
section {
  position: relative;
}
</style> 