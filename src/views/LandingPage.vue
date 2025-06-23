<template>
  <!-- Landing Page - Page d'accueil Stop-Gaspillage -->
  <div class="min-h-screen bg-eco-beige">
    
    <!-- Header sticky avec navigation -->
    <AppHeader />
    
    <!-- Hero Section avec illustration et call-to-action principal -->
    <HeroSection />
    
    <!-- Section des 3 cartes de bénéfices -->
    <section class="py-20 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">
            Pourquoi choisir Stop-Gaspillage ?
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Rejoignez la révolution contre le gaspillage alimentaire et découvrez tous les avantages 
            de notre plateforme innovante.
          </p>
        </div>
        
        <BenefitsSection />
      </div>
    </section>
    
    <!-- Démonstration de l'IA avec animation -->
    <section class="py-20 bg-gradient-to-br from-forest-600 via-green-600 to-emerald-600">
      <div class="container mx-auto px-6">
        <!-- <div class="text-center mb-16">
          <h2 class="text-4xl font-bold  mb-4">
            Découvrez l'impact de vos achats
          </h2>
          <p class="text-xl text-white font-medium max-w-3xl mx-auto">
            Notre intelligence artificielle calcule en temps réel l'impact environnemental 
            de chaque produit sauvé du gaspillage.
          </p>
        </div> -->
        
        <AIDemo />
      </div>
    </section>
    
    <!-- Section témoignages et statistiques -->
    <section class="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div class="container mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">
            Ils nous font confiance
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les témoignages de notre communauté engagée contre le gaspillage alimentaire.
          </p>
        </div>
        
        <TestimonialsSection />
      </div>
    </section>
    
    <!-- Call-to-action final -->
    <section class="py-20 bg-gradient-to-r from-orange-400 via-red-400 to-pink-400">
      <div class="container mx-auto px-6">
        <CTASection />
      </div>
    </section>
    
    <!-- Footer complet -->
    <AppFooter />
    
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/landing/HeroSection.vue'
import BenefitsSection from '@/components/landing/BenefitsSection.vue'
import AIDemo from '@/components/landing/AIDemo.vue'
import TestimonialsSection from '@/components/landing/TestimonialsSection.vue'
import CTASection from '@/components/landing/CTASection.vue'

// Ajout d'animations au scroll lors du montage du composant
onMounted(() => {
  // Observer pour les animations au scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-slide-up')
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  // Application de l'observer aux sections
  const sections = document.querySelectorAll('.animate-on-scroll')
  sections.forEach((section) => observer.observe(section))
})
</script>

<style scoped>
/* Styles spécifiques pour la landing page */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease-out;
}

.animate-on-scroll.animate-slide-up {
  opacity: 1;
  transform: translateY(0);
}
</style> 