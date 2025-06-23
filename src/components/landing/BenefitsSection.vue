<template>
  <!-- Section des 3 cartes de bénéfices -->
  <section id="benefits" class="py-16 lg:py-24 bg-white animate-on-scroll">
    <div class="container-eco">
      
      <!-- En-tête de section -->
      <div class="text-center mb-16">
        <h2 class="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
          Pourquoi choisir 
          <span class="text-eco-green">Stop-Gaspillage</span> ?
        </h2>
        <p class="text-lg lg:text-xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
          Une plateforme complète pour révolutionner votre rapport au gaspillage alimentaire 
          avec l'aide de l'intelligence artificielle.
        </p>
      </div>

      <!-- Grille des 3 cartes principales -->
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-gradient-to-br from-green-100 to-emerald-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-green-200">
          <div class="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center mb-6 shadow-md">
            <span class="text-3xl">💰</span>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Économisez jusqu'à 70%</h3>
          <p class="text-gray-700 mb-6">
            Achetez des produits de qualité à prix réduits et réalisez des économies 
            significatives sur vos courses alimentaires.
          </p>
          <div class="bg-white bg-opacity-80 p-4 rounded-xl border border-green-300">
            <div class="text-center">
              <div class="text-3xl font-bold text-green-600">159€</div>
              <div class="text-sm text-gray-600">économisés par foyer/an</div>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-blue-100 to-teal-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-200">
          <div class="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-md">
            <span class="text-3xl">🌍</span>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Sauvez la planète</h3>
          <p class="text-gray-700 mb-6">
            Chaque achat contribue à réduire le gaspillage alimentaire et l'impact 
            environnemental de notre consommation.
          </p>
          <div class="bg-white bg-opacity-80 p-4 rounded-xl border border-blue-300">
            <div class="text-center">
              <div class="text-3xl font-bold text-blue-600">2.3kg</div>
              <div class="text-sm text-gray-600">CO₂ évité par commande</div>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-br from-purple-100 to-pink-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-200">
          <div class="w-16 h-16 bg-purple-500 rounded-2xl flex items-center justify-center mb-6 shadow-md">
            <span class="text-3xl">🤝</span>
          </div>
          <h3 class="text-2xl font-bold text-gray-800 mb-4">Soutenez le commerce local</h3>
          <p class="text-gray-700 mb-6">
            Aidez les commerçants locaux à écouler leurs invendus et renforcez 
            l'économie de proximité.
          </p>
          <div class="bg-white bg-opacity-80 p-4 rounded-xl border border-purple-300">
            <div class="text-center">
              <div class="text-3xl font-bold text-purple-600">500+</div>
              <div class="text-sm text-gray-600">commerçants partenaires</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Call-to-action supplémentaire -->
      <div class="text-center mt-16">
        <p class="text-gray-700 mb-6 font-medium">Prêt à rejoindre la révolution anti-gaspi ?</p>
        <RouterLink 
          to="/auth" 
          class="btn-primary text-lg px-8 py-4 inline-flex items-center shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
          </svg>
          Démarrer maintenant
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
/* Animations spécifiques aux cartes */
.card {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.card-hover:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
}

/* Animation de l'icône au hover de la carte */
.group:hover .w-20 {
  animation: pulse-scale 0.6s ease-in-out;
}

@keyframes pulse-scale {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

/* Effet de survol sur les listes */
li:hover {
  color: theme('colors.eco-green');
  transition: color 0.2s ease-out;
}
</style> 