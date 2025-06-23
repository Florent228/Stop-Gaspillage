<template>
  <footer class="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white">
    <div class="container mx-auto px-6 py-16">
      <div class="grid md:grid-cols-4 gap-8">
        <!-- Section entreprise -->
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
              <span class="text-xl font-bold">🌱</span>
            </div>
            <h3 class="text-xl font-bold text-white">Stop-Gaspillage</h3>
          </div>
          <p class="text-gray-300 leading-relaxed">
            La plateforme qui révolutionne la lutte contre le gaspillage alimentaire 
            grâce à l'intelligence artificielle et la communauté.
          </p>
          <div class="flex space-x-4">
            <a href="#" class="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
              <span class="text-lg">📘</span>
            </a>
            <a href="#" class="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
              <span class="text-lg">🐦</span>
            </a>
            <a href="#" class="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors">
              <span class="text-lg">📷</span>
            </a>
            <a href="#" class="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
              <span class="text-lg">📺</span>
            </a>
          </div>
        </div>

        <!-- Liens utiles -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-green-400">Liens utiles</h4>
          <ul class="space-y-3">
            <li><router-link to="/marketplace" class="text-gray-300 hover:text-green-400 transition-colors">🛒 Marketplace</router-link></li>
            <li><router-link to="/education" class="text-gray-300 hover:text-green-400 transition-colors">📚 Éducation</router-link></li>
            <li><router-link to="/dashboard" class="text-gray-300 hover:text-green-400 transition-colors">📊 Tableau de bord</router-link></li>
            <li><router-link to="/create-offer" class="text-gray-300 hover:text-green-400 transition-colors">➕ Créer une offre</router-link></li>
            <li><a href="#" class="text-gray-300 hover:text-green-400 transition-colors">📱 App mobile</a></li>
          </ul>
        </div>

        <!-- Support -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-blue-400">Support</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-gray-300 hover:text-blue-400 transition-colors">❓ Centre d'aide</a></li>
            <li><a href="#" class="text-gray-300 hover:text-blue-400 transition-colors">💬 Chat en ligne</a></li>
            <li><a href="#" class="text-gray-300 hover:text-blue-400 transition-colors">📧 Contact</a></li>
            <li><a href="#" class="text-gray-300 hover:text-blue-400 transition-colors">🐛 Signaler un bug</a></li>
            <li><a href="#" class="text-gray-300 hover:text-blue-400 transition-colors">💡 Suggérer une idée</a></li>
          </ul>
        </div>

        <!-- Informations légales -->
        <div class="space-y-4">
          <h4 class="text-lg font-semibold text-purple-400">Légal</h4>
          <ul class="space-y-3">
            <li><a href="#" class="text-gray-300 hover:text-purple-400 transition-colors">📋 Conditions d'utilisation</a></li>
            <li><a href="#" class="text-gray-300 hover:text-purple-400 transition-colors">🔒 Politique de confidentialité</a></li>
            <li><a href="#" class="text-gray-300 hover:text-purple-400 transition-colors">🍪 Gestion des cookies</a></li>
            <li><a href="#" class="text-gray-300 hover:text-purple-400 transition-colors">⚖️ Mentions légales</a></li>
            <li><a href="#" class="text-gray-300 hover:text-purple-400 transition-colors">♿ Accessibilité</a></li>
          </ul>
        </div>
      </div>

      <!-- Newsletter -->
      <div class="mt-12 pt-8 border-t border-gray-700">
        <div class="max-w-2xl mx-auto text-center">
          <h3 class="text-2xl font-bold text-white mb-4">📬 Restez informé</h3>
          <p class="text-gray-300 mb-6">
            Recevez nos dernières actualités et conseils anti-gaspillage directement dans votre boîte mail.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input 
              type="email" 
              placeholder="Votre adresse email"
              class="flex-1 px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
            >
            <button class="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg">
              S'abonner
            </button>
          </div>
        </div>
      </div>

      <!-- Statistiques d'impact -->
      <div class="mt-12 pt-8 border-t border-gray-700">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="bg-gradient-to-br from-green-600 to-emerald-600 p-6 rounded-2xl">
            <div class="text-3xl font-bold text-white mb-1">50k+</div>
            <div class="text-green-100 text-sm">Utilisateurs actifs</div>
          </div>
          <div class="bg-gradient-to-br from-blue-600 to-cyan-600 p-6 rounded-2xl">
            <div class="text-3xl font-bold text-white mb-1">1M+</div>
            <div class="text-blue-100 text-sm">Repas sauvés</div>
          </div>
          <div class="bg-gradient-to-br from-purple-600 to-pink-600 p-6 rounded-2xl">
            <div class="text-3xl font-bold text-white mb-1">200t</div>
            <div class="text-purple-100 text-sm">CO₂ évité</div>
          </div>
          <div class="bg-gradient-to-br from-orange-600 to-red-600 p-6 rounded-2xl">
            <div class="text-3xl font-bold text-white mb-1">€2.1M</div>
            <div class="text-orange-100 text-sm">Économies réalisées</div>
          </div>
        </div>
      </div>

      <!-- Ligne de séparation et copyright -->
      <div class="mt-12 pt-8 border-t border-gray-700 text-center">
        <div class="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p class="text-gray-400 text-sm">
            © 2024 Stop-Gaspillage. Tous droits réservés. 
            <span class="text-green-400">Fabriqué avec ❤️ pour la planète</span>
          </p>
          <div class="flex items-center space-x-4 text-sm text-gray-400">
            <span>🇫🇷 Français</span>
            <span>•</span>
            <span>🌍 Disponible en Europe</span>
            <span>•</span>
            <span class="text-green-400 font-medium">Version 2.1.0</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer complet avec couleurs améliorées
</script> 