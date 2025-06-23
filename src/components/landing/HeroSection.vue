<template>
  <!-- Hero Section avec illustration et call-to-action principal -->
  <section class="relative pt-20 pb-16 lg:pt-32 lg:pb-24 bg-gradient-to-br from-eco-beige via-white to-eco-beige overflow-hidden">
    
    <!-- Décoration d'arrière-plan -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-20 left-10 w-32 h-32 bg-eco-green rounded-full blur-3xl animate-pulse-soft"></div>
      <div class="absolute bottom-20 right-10 w-40 h-40 bg-eco-orange rounded-full blur-3xl animate-pulse-soft" style="animation-delay: 1s;"></div>
    </div>

    <div class="container-eco relative">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        
        <!-- Contenu textuel -->
        <div class="lg:pr-8">
          <!-- Badge de présentation -->
          <div class="inline-flex items-center px-4 py-2 bg-eco-green/10 text-eco-green rounded-full text-sm font-medium mb-6 animate-fade-in">
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
            </svg>
            Révolutionnez votre impact environnemental
          </div>

          <!-- Titre principal -->
          <h1 class="text-4xl lg:text-6xl xl:text-7xl font-bold text-gray-900 leading-tight mb-6">
            Stop au 
            <span class="text-eco-green relative">
              gaspillage
              <!-- Soulignement animé -->
              <svg class="absolute bottom-2 left-0 w-full h-3 text-eco-green/30" viewBox="0 0 300 12" fill="none">
                <path d="M5 6C100 2 200 10 295 6" stroke="currentColor" stroke-width="3" stroke-linecap="round" class="animate-pulse"/>
              </svg>
            </span>
            <br>
            alimentaire
          </h1>

          <!-- Sous-titre descriptif -->
          <p class="text-lg lg:text-xl text-gray-700 mb-8 leading-relaxed font-medium">
            Rejoignez la révolution écologique avec notre plateforme intelligente qui connecte 
            consommateurs et commerçants pour <strong class="text-eco-green">réduire le gaspillage alimentaire</strong> 
            et calculer votre impact environnemental en temps réel.
          </p>

          <!-- Statistiques impressionnantes -->
          <div class="grid grid-cols-3 gap-6 mb-8 py-6 border-y border-gray-200">
            <div class="text-center">
              <div class="text-2xl lg:text-3xl font-bold text-eco-green mb-1" ref="statsRef1">0</div>
              <div class="text-sm text-gray-600 font-medium">tonnes sauvées</div>
            </div>
            <div class="text-center">
              <div class="text-2xl lg:text-3xl font-bold text-eco-green mb-1" ref="statsRef2">0</div>
              <div class="text-sm text-gray-600 font-medium">kg CO₂ évités</div>
            </div>
            <div class="text-center">
              <div class="text-2xl lg:text-3xl font-bold text-eco-green mb-1" ref="statsRef3">0</div>
              <div class="text-sm text-gray-600 font-medium">utilisateurs actifs</div>
            </div>
          </div>

          <!-- Boutons d'action -->
          <div class="flex flex-col sm:flex-row gap-4 mb-8">
            <RouterLink to="/marketplace" class="btn-primary text-lg px-8 py-4 shadow-lg hover:shadow-xl">
              <span class="flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                </svg>
                Explorer les offres
              </span>
            </RouterLink>
            
            <RouterLink to="/education" class="btn-secondary text-lg px-8 py-4 shadow-lg hover:shadow-xl">
              <span class="flex items-center justify-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                </svg>
                En savoir plus
              </span>
            </RouterLink>
          </div>

          <!-- Social proof -->
          <div class="flex items-center text-sm text-gray-700">
            <div class="flex -space-x-2 mr-3">
              <div class="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold">M</div>
              <div class="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-r from-green-400 to-green-600 flex items-center justify-center text-white text-xs font-bold">L</div>
              <div class="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center text-white text-xs font-bold">A</div>
              <div class="w-8 h-8 rounded-full border-2 border-white bg-eco-green text-white flex items-center justify-center text-xs font-bold">+</div>
            </div>
            <span class="font-medium">Rejoint par <strong class="text-eco-green">2 847</strong> éco-warriors</span>
          </div>
        </div>

        <!-- Illustration principale -->
        <div class="relative lg:pl-8">
          <!-- Container de l'illustration avec animation flottante -->
          <div class="relative animate-float">
            
            <!-- Illustration SVG du gaspillage alimentaire -->
            <div class="relative bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
              <!-- Contenu de l'illustration -->
              <div class="text-center">
                <!-- Icône principale -->
                <div class="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-eco-green to-eco-light-green rounded-2xl flex items-center justify-center shadow-lg">
                  <svg class="w-20 h-20 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                </div>
                
                <!-- Texte de l'illustration -->
                <h3 class="text-xl font-bold text-gray-900 mb-2">IA d'analyse d'impact</h3>
                <p class="text-gray-700 mb-4 font-medium">Calcul automatique de votre empreinte carbone</p>
                
                <!-- Métriques visuelles -->
                <div class="space-y-3">
                  <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <span class="text-sm text-gray-800 font-medium">CO₂ économisé</span>
                    <span class="font-bold text-eco-green">+12.5 kg</span>
                  </div>
                  <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <span class="text-sm text-gray-800 font-medium">Eau sauvée</span>
                    <span class="font-bold text-eco-blue">+850 L</span>
                  </div>
                  <div class="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3">
                    <span class="text-sm text-gray-800 font-medium">Score impact</span>
                    <span class="font-bold text-eco-orange">94/100</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Éléments décoratifs flottants -->
            <div class="absolute -top-4 -right-4 w-16 h-16 bg-eco-orange rounded-full opacity-20 animate-bounce" style="animation-delay: 0.5s;"></div>
            <div class="absolute -bottom-6 -left-6 w-12 h-12 bg-eco-blue rounded-full opacity-30 animate-bounce" style="animation-delay: 1.5s;"></div>
            <div class="absolute top-1/2 -right-8 w-8 h-8 bg-eco-light-green rounded-full opacity-40 animate-bounce" style="animation-delay: 2s;"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Flèche de scroll vers le bas -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <button 
        @click="scrollToNext"
        class="text-gray-600 hover:text-eco-green transition-colors duration-200 p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl"
        aria-label="Défiler vers le bas"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
        </svg>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

// Références pour les animations de compteurs
const statsRef1 = ref<HTMLElement>()
const statsRef2 = ref<HTMLElement>()
const statsRef3 = ref<HTMLElement>()

// Animation des statistiques au montage
onMounted(() => {
  // Animation des compteurs
  animateCounter(statsRef1.value, 247, 2000, 'tonnes')
  animateCounter(statsRef2.value, 15420, 2500, 'kg')
  animateCounter(statsRef3.value, 2847, 2200, 'users')
})

/**
 * Animation de compteur pour les statistiques
 */
const animateCounter = (element: HTMLElement | undefined, target: number, duration: number, suffix: string) => {
  if (!element) return
  
  const start = 0
  const increment = target / (duration / 16)
  let current = start

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }
    element.textContent = Math.floor(current).toLocaleString()
  }, 16)
}

/**
 * Scroll vers la section démo IA
 */
const scrollToDemo = () => {
  const demoSection = document.getElementById('demo-ia')
  if (demoSection) {
    demoSection.scrollIntoView({ behavior: 'smooth' })
  }
}

/**
 * Scroll vers la section suivante
 */
const scrollToNext = () => {
  const nextSection = document.getElementById('benefits')
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
/* Animation de flottement personnalisée */
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px);
  }
  50% { 
    transform: translateY(-20px);
  }
}

/* Animation du soulignement */
.animate-pulse path {
  stroke-dasharray: 300;
  stroke-dashoffset: 300;
  animation: draw 3s ease-in-out infinite;
}

@keyframes draw {
  0% {
    stroke-dashoffset: 300;
  }
  50% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -300;
  }
}

/* Effet de parallaxe léger pour les éléments décoratifs */
.animate-bounce {
  animation-duration: 3s;
}
</style> 