<template>
  <section class="py-20 bg-white">
    <div class="container mx-auto px-6">
      <!-- En-tête -->
      <div class="text-center mb-16">
        <span class="inline-block px-4 py-2 bg-forest-100 text-forest-700 text-sm font-medium rounded-full mb-4">
          💬 Témoignages
        </span>
        <h2 class="text-4xl font-bold text-gray-900 mb-6">
          Ils agissent déjà pour la planète
        </h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto">
          Découvrez comment nos utilisateurs sauvent la planète un repas à la fois
        </p>
      </div>

      <!-- Statistiques -->
      <div class="grid md:grid-cols-4 gap-6 mb-16">
        <div class="text-center bg-gradient-to-br from-indigo-100 to-purple-100 p-8 rounded-2xl border border-indigo-200 shadow-lg">
          <div class="text-4xl font-bold text-indigo-600 mb-2">50 000+</div>
          <div class="text-lg font-semibold text-gray-800 mb-1">Utilisateurs actifs</div>
          <div class="text-sm text-gray-600">Communauté engagée</div>
        </div>
        
        <div class="text-center bg-gradient-to-br from-emerald-100 to-green-100 p-8 rounded-2xl border border-emerald-200 shadow-lg">
          <div class="text-4xl font-bold text-emerald-600 mb-2">200t</div>
          <div class="text-lg font-semibold text-gray-800 mb-1">CO₂ évité</div>
          <div class="text-sm text-gray-600">Impact environnemental</div>
        </div>
        
        <div class="text-center bg-gradient-to-br from-amber-100 to-orange-100 p-8 rounded-2xl border border-amber-200 shadow-lg">
          <div class="text-4xl font-bold text-amber-600 mb-2">1M+</div>
          <div class="text-lg font-semibold text-gray-800 mb-1">Repas sauvés</div>
          <div class="text-sm text-gray-600">Lutte contre le gaspillage</div>
        </div>
        
        <div class="text-center bg-gradient-to-br from-rose-100 to-pink-100 p-8 rounded-2xl border border-rose-200 shadow-lg">
          <div class="text-4xl font-bold text-rose-600 mb-2">€2.1M</div>
          <div class="text-lg font-semibold text-gray-800 mb-1">Économies totales</div>
          <div class="text-sm text-gray-600">Pouvoir d'achat préservé</div>
        </div>
      </div>

      <!-- Témoignages -->
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl border border-blue-200 shadow-lg">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
              MC
            </div>
            <div class="ml-4">
              <div class="font-semibold text-gray-800">Marie Coustel</div>
              <div class="text-sm text-blue-600">Utilisatrice depuis 2 ans</div>
            </div>
          </div>
          
          <div class="text-yellow-400 mb-4">
            ⭐⭐⭐⭐⭐
          </div>
          
          <p class="text-gray-700 italic mb-4">
            "Incroyable ! J'ai économisé plus de 300€ cette année tout en aidant l'environnement. 
            L'application est intuitive et les commerçants sont adorables."
          </p>
          
          <div class="flex items-center text-sm text-gray-600">
            <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-2">💰 340€ économisés</span>
            <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full">🌱 18kg CO₂ évité</span>
          </div>
        </div>

        <div class="bg-gradient-to-br from-emerald-50 to-green-50 p-8 rounded-2xl border border-emerald-200 shadow-lg">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
              JM
            </div>
            <div class="ml-4">
              <div class="font-semibold text-gray-800">Jean Martin</div>
              <div class="text-sm text-emerald-600">Boulanger partenaire</div>
            </div>
          </div>
          
          <div class="text-yellow-400 mb-4">
            ⭐⭐⭐⭐⭐
          </div>
          
          <p class="text-gray-700 italic mb-4">
            "Grâce à Stop-Gaspillage, je vends mes invendus rapidement. 
            C'est écologique et ça me permet de fidéliser une nouvelle clientèle !"
          </p>
          
          <div class="flex items-center text-sm text-gray-600">
            <span class="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full mr-2">🏪 +25% clients</span>
            <span class="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">♻️ 0% gaspillage</span>
          </div>
        </div>

        <div class="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl border border-purple-200 shadow-lg">
          <div class="flex items-center mb-6">
            <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              SL
            </div>
            <div class="ml-4">
              <div class="font-semibold text-gray-800">Sophie Leroux</div>
              <div class="text-sm text-purple-600">Étudiante engagée</div>
            </div>
          </div>
          
          <div class="text-yellow-400 mb-4">
            ⭐⭐⭐⭐⭐
          </div>
          
          <p class="text-gray-700 italic mb-4">
            "Parfait pour mon budget étudiant ! Je mange bien pour moins cher 
            et je contribue à un monde plus durable. Que demander de mieux ?"
          </p>
          
          <div class="flex items-center text-sm text-gray-600">
            <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full mr-2">🎓 -50% budget courses</span>
            <span class="bg-teal-100 text-teal-800 px-3 py-1 rounded-full">🌍 Planète préservée</span>
          </div>
        </div>
      </div>

      <!-- Call-to-action social proof -->
      <div class="mt-16 text-center bg-gradient-to-r from-cyan-50 to-blue-50 p-8 rounded-2xl border border-cyan-200">
        <h3 class="text-2xl font-bold text-gray-800 mb-4">
          Rejoignez des milliers d'utilisateurs satisfaits !
        </h3>
        <p class="text-gray-600 mb-6 text-lg">
          Note moyenne de <span class="font-bold text-yellow-600">4.8/5</span> sur les stores
        </p>
        
        <div class="flex justify-center items-center space-x-8 mb-6">
          <div class="flex items-center">
            <span class="text-3xl mr-2">📱</span>
            <div class="text-left">
              <div class="font-semibold text-gray-800">App Store</div>
              <div class="text-yellow-400">⭐⭐⭐⭐⭐ 4.9/5</div>
            </div>
          </div>
          
          <div class="flex items-center">
            <span class="text-3xl mr-2">🤖</span>
            <div class="text-left">
              <div class="font-semibold text-gray-800">Google Play</div>
              <div class="text-yellow-400">⭐⭐⭐⭐⭐ 4.7/5</div>
            </div>
          </div>
        </div>
        
        <div class="text-sm text-gray-500">
          Plus de 2 500 avis vérifiés
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// Section témoignages avec statistiques sociales
</script> 