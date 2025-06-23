import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Import des pages principales
import LandingPage from '@/views/LandingPage.vue'
import AuthPage from '@/views/AuthPage.vue'
import DashboardPage from '@/views/DashboardPage.vue'
import CreateOfferPage from '@/views/CreateOfferPage.vue'
import MarketplacePage from '@/views/MarketplacePage.vue'
import ReservationPage from '@/views/ReservationPage.vue'
import HistoryPage from '@/views/HistoryPage.vue'
import AdminPage from '@/views/AdminPage.vue'
import EducationPage from '@/views/EducationPage.vue'

// Configuration des routes de l'application
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Page d'accueil (Landing Page)
    {
      path: '/',
      name: 'landing',
      component: LandingPage,
      meta: { 
        title: 'Stop-Gaspillage - Luttez contre le gaspillage alimentaire',
        requiresAuth: false 
      }
    },
    
    // Page de connexion et inscription
    {
      path: '/auth',
      name: 'auth',
      component: AuthPage,
      meta: { 
        title: 'Connexion - Stop-Gaspillage',
        requiresAuth: false,
        redirectIfAuth: false // Désactivé pour les tests
      }
    },
    
    // Tableau de bord utilisateur (ACCESSIBLE SANS AUTH POUR TESTS)
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardPage,
      meta: { 
        title: 'Tableau de bord - Stop-Gaspillage',
        requiresAuth: false // Modifié pour les tests
      }
    },
    
    // Création d'une offre (ACCESSIBLE SANS AUTH POUR TESTS)
    {
      path: '/create-offer',
      name: 'create-offer',
      component: CreateOfferPage,
      meta: { 
        title: 'Créer une offre - Stop-Gaspillage',
        requiresAuth: false // Modifié pour les tests
      }
    },
    
    // Marketplace des offres (ACCESSIBLE SANS AUTH POUR TESTS)
    {
      path: '/marketplace',
      name: 'marketplace',
      component: MarketplacePage,
      meta: { 
        title: 'Marketplace - Stop-Gaspillage',
        requiresAuth: false // Modifié pour les tests
      }
    },
    
    // Page de réservation avec ID dynamique (ACCESSIBLE SANS AUTH POUR TESTS)
    {
      path: '/reservation/:offerId',
      name: 'reservation',
      component: ReservationPage,
      meta: { 
        title: 'Réservation - Stop-Gaspillage',
        requiresAuth: false // Modifié pour les tests
      },
      props: true
    },
    
    // Historique personnel (ACCESSIBLE SANS AUTH POUR TESTS)
    {
      path: '/history',
      name: 'history',
      component: HistoryPage,
      meta: { 
        title: 'Historique - Stop-Gaspillage',
        requiresAuth: false // Modifié pour les tests
      }
    },
    
    // Administration (ACCESSIBLE SANS AUTH POUR TESTS)
    {
      path: '/admin',
      name: 'admin',
      component: AdminPage,
      meta: { 
        title: 'Administration - Stop-Gaspillage',
        requiresAuth: false, // Modifié pour les tests
        requiresAdmin: false // Modifié pour les tests
      }
    },
    
    // Page de sensibilisation écologique
    {
      path: '/education',
      name: 'education',
      component: EducationPage,
      meta: { 
        title: 'Sensibilisation - Stop-Gaspillage',
        requiresAuth: false 
      }
    },
    
    // Redirection 404 vers la page d'accueil
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ],
  
  // Comportement de défilement pour les transitions de page
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Guard de navigation SIMPLIFIÉ pour les tests
router.beforeEach(async (to, from, next) => {
  // Mise à jour du titre de la page
  if (to.meta.title) {
    document.title = to.meta.title as string
  }
  
  // MODE TEST : Authentification désactivée
  // Toutes les routes sont accessibles sans restriction
  console.log('🧪 Mode test activé - Authentification optionnelle')
  
  next()
})

export default router 