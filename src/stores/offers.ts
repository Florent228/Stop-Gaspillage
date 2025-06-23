import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { MarketplaceOffer as Offer, CreateOfferData, OfferFilters } from '@/types/offers'
import { offersService } from '@/services/offersService'

export const useOffersStore = defineStore('offers', () => {
  // État réactif des offres
  const offers = ref<Offer[]>([])
  const currentOffer = ref<Offer | null>(null)
  const userOffers = ref<Offer[]>([])
  const reservedOffers = ref<Offer[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const filters = ref<OfferFilters>({
    category: '',
    distance: 10,
    availability: 'all'
  })

  // Mode test avec données d'exemple pour Toulouse
  const isTestMode = ref(true)

  // Données d'exemple pour Toulouse
  const toulouseOffers: Offer[] = [
    {
      id: 'toulouse-1',
      title: 'Pain artisanal de la veille',
      description: 'Baguettes tradition et pains de campagne de notre boulangerie artisanale. Encore frais et délicieux !',
      category: 'bakery',
      originalPrice: 8.50,
      discountedPrice: 3.50,
      discountPercentage: 59,
      quantity: 12,
      availableQuantity: 8,
      expiryDate: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6h
      images: ['/images/pain-artisanal.jpg'],
      merchant: {
        id: 'boulangerie-capitole',
        name: 'Boulangerie du Capitole',
        address: '2 Place du Capitole, 31000 Toulouse',
        distance: 0.8,
        rating: 4.8,
        totalReviews: 156,
        coordinates: {
          lat: 43.6043,
          lng: 1.4437
        }
      },
      pickupWindow: {
        start: '16:00',
        end: '19:00'
      },
      isOrganic: true,
      isVegan: true,
      isGlutenFree: false,
      isLocal: true,
      status: 'available',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      distance: 0.8,
      tags: ['artisanal', 'tradition', 'bio'],
      allergens: ['gluten']
    },
    {
      id: 'toulouse-2',
      title: 'Fruits et légumes de saison',
      description: 'Assortiment de fruits et légumes frais de nos producteurs locaux. Pommes, poires, carottes, courgettes.',
      category: 'fruits-vegetables',
      originalPrice: 15.00,
      discountedPrice: 7.50,
      discountPercentage: 50,
      quantity: 6,
      availableQuantity: 4,
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 jours
      images: ['/images/fruits-legumes.jpg'],
      merchant: {
        id: 'marche-victor-hugo',
        name: 'Marché Victor Hugo - Stand Bio',
        address: 'Place Victor Hugo, 31000 Toulouse',
        distance: 1.2,
        rating: 4.6,
        totalReviews: 89,
        coordinates: {
          lat: 43.6009,
          lng: 1.4453
        }
      },
      pickupWindow: {
        start: '17:00',
        end: '20:00'
      },
      isOrganic: true,
      isVegan: true,
      isGlutenFree: true,
      isLocal: true,
      status: 'available',
      createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
      distance: 1.2,
      tags: ['bio', 'local', 'saison'],
      allergens: []
    },
    {
      id: 'toulouse-3',
      title: 'Sandwich et salades du midi',
      description: 'Sandwichs gourmets et salades fraîches préparés ce matin. Parfait pour un déjeuner tardif !',
      category: 'prepared-meals',
      originalPrice: 12.90,
      discountedPrice: 5.90,
      discountPercentage: 54,
      quantity: 8,
      availableQuantity: 5,
      expiryDate: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4h
      images: ['/images/sandwichs-salades.jpg'],
      merchant: {
        id: 'fresh-corner',
        name: 'Fresh Corner Esquirol',
        address: '15 Rue d\'Esquirol, 31000 Toulouse',
        distance: 0.5,
        rating: 4.4,
        totalReviews: 234,
        coordinates: {
          lat: 43.6021,
          lng: 1.4419
        }
      },
      pickupWindow: {
        start: '15:30',
        end: '18:30'
      },
      isOrganic: false,
      isVegan: false,
      isGlutenFree: false,
      isLocal: false,
      status: 'available',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      distance: 0.5,
      tags: ['frais', 'fait-maison'],
      allergens: ['gluten', 'lactose']
    },
    {
      id: 'toulouse-4',
      title: 'Pâtisseries et viennoiseries',
      description: 'Croissants, pains au chocolat, éclairs et tartelettes de notre pâtisserie. Un délice à prix doux !',
      category: 'bakery',
      originalPrice: 18.00,
      discountedPrice: 8.00,
      discountPercentage: 56,
      quantity: 15,
      availableQuantity: 12,
      expiryDate: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(), // 8h
      images: ['/images/patisseries.jpg'],
      merchant: {
        id: 'patisserie-saint-sernin',
        name: 'Pâtisserie Saint-Sernin',
        address: '8 Rue du Taur, 31000 Toulouse',
        distance: 1.0,
        rating: 4.9,
        totalReviews: 312,
        coordinates: {
          lat: 43.6081,
          lng: 1.4414
        }
      },
      pickupWindow: {
        start: '16:00',
        end: '19:30'
      },
      isOrganic: false,
      isVegan: false,
      isGlutenFree: false,
      isLocal: true,
      status: 'available',
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
      distance: 1.0,
      tags: ['artisanal', 'fait-maison'],
      allergens: ['gluten', 'lactose', 'oeufs']
    },
    {
      id: 'toulouse-5',
      title: 'Fromages fermiers du Sud-Ouest',
      description: 'Sélection de fromages fermiers : Roquefort, Cantal, chèvre frais. Directement de nos producteurs locaux.',
      category: 'dairy',
      originalPrice: 22.50,
      discountedPrice: 12.00,
      discountPercentage: 47,
      quantity: 4,
      availableQuantity: 3,
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 jours
      images: ['/images/fromages-fermiers.jpg'],
      merchant: {
        id: 'fromagerie-des-carmes',
        name: 'Fromagerie des Carmes',
        address: '3 Place des Carmes, 31000 Toulouse',
        distance: 0.7,
        rating: 4.7,
        totalReviews: 145,
        coordinates: {
          lat: 43.5989,
          lng: 1.4422
        }
      },
      pickupWindow: {
        start: '17:00',
        end: '19:00'
      },
      isOrganic: true,
      isVegan: false,
      isGlutenFree: true,
      isLocal: true,
      status: 'available',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      distance: 0.7,
      tags: ['fermier', 'local', 'AOC'],
      allergens: ['lactose']
    },
    {
      id: 'toulouse-6',
      title: 'Plats cuisinés maison',
      description: 'Cassoulet toulousain, confit de canard, et ratatouille. Cuisine traditionnelle faite maison.',
      category: 'prepared-meals',
      originalPrice: 28.00,
      discountedPrice: 14.50,
      discountPercentage: 48,
      quantity: 6,
      availableQuantity: 4,
      expiryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 jours
      images: ['/images/plats-maison.jpg'],
      merchant: {
        id: 'chez-mamie-toulouse',
        name: 'Chez Mamie Toulouse',
        address: '12 Rue Saint-Rome, 31000 Toulouse',
        distance: 0.6,
        rating: 4.8,
        totalReviews: 198,
        coordinates: {
          lat: 43.6032,
          lng: 1.4429
        }
      },
      pickupWindow: {
        start: '18:00',
        end: '20:30'
      },
      isOrganic: false,
      isVegan: false,
      isGlutenFree: false,
      isLocal: true,
      status: 'available',
      createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
      distance: 0.6,
      tags: ['traditionnel', 'fait-maison', 'cassoulet'],
      allergens: ['gluten']
    },
    {
      id: 'toulouse-7',
      title: 'Fruits exotiques et de saison',
      description: 'Mangues, avocats, kiwis et agrumes. Parfait pour vitaminer votre fin de journée !',
      category: 'fruits-vegetables',
      originalPrice: 16.80,
      discountedPrice: 8.90,
      discountPercentage: 47,
      quantity: 10,
      availableQuantity: 7,
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 jours
      images: ['/images/fruits-exotiques.jpg'],
      merchant: {
        id: 'primeur-jeanne-darc',
        name: 'Primeur Jeanne d\'Arc',
        address: '25 Rue Jeanne d\'Arc, 31000 Toulouse',
        distance: 1.4,
        rating: 4.5,
        totalReviews: 167,
        coordinates: {
          lat: 43.6156,
          lng: 1.4394
        }
      },
      pickupWindow: {
        start: '16:30',
        end: '19:30'
      },
      isOrganic: false,
      isVegan: true,
      isGlutenFree: true,
      isLocal: false,
      status: 'available',
      createdAt: new Date(Date.now() - 7 * 60 * 60 * 1000).toISOString(),
      distance: 1.4,
      tags: ['exotique', 'vitaminé'],
      allergens: []
    },
    {
      id: 'toulouse-8',
      title: 'Épicerie fine et conserves',
      description: 'Tapenades, confitures artisanales, miels du Gers et huiles d\'olive. Produits du terroir à découvrir.',
      category: 'grocery',
      originalPrice: 31.50,
      discountedPrice: 18.90,
      discountPercentage: 40,
      quantity: 8,
      availableQuantity: 6,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 jours
      images: ['/images/epicerie-fine.jpg'],
      merchant: {
        id: 'epicerie-du-terroir',
        name: 'L\'Épicerie du Terroir',
        address: '5 Rue de la Pomme, 31000 Toulouse',
        distance: 0.9,
        rating: 4.6,
        totalReviews: 203,
        coordinates: {
          lat: 43.6054,
          lng: 1.4401
        }
      },
      pickupWindow: {
        start: '15:00',
        end: '19:00'
      },
      isOrganic: true,
      isVegan: true,
      isGlutenFree: true,
      isLocal: true,
      status: 'available',
      createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      distance: 0.9,
      tags: ['terroir', 'artisanal', 'conserves'],
      allergens: []
    }
  ]

  // Getters calculés
  const availableOffers = computed(() => 
    offers.value.filter(offer => offer.status === 'available')
  )
  
  const expiringSoonOffers = computed(() => 
    offers.value.filter(offer => {
      const now = new Date()
      const expiryDate = new Date(offer.expiryDate)
      const hoursDiff = (expiryDate.getTime() - now.getTime()) / (1000 * 60 * 60)
      return hoursDiff <= 24 && hoursDiff > 0
    })
  )

  const filteredOffers = computed(() => {
    let filtered = availableOffers.value

    if (filters.value.category) {
      filtered = filtered.filter(offer => offer.category === filters.value.category)
    }

    if (filters.value.distance) {
      filtered = filtered.filter(offer => offer.distance <= filters.value.distance)
    }

    return filtered
  })

  // Actions pour la gestion des offres

  /**
   * Récupération de toutes les offres disponibles
   */
  const fetchOffers = async (): Promise<void> => {
    isLoading.value = true
    error.value = null
    
    try {
      if (isTestMode.value) {
        // Mode test : utiliser les données d'exemple de Toulouse
        console.log('🧪 Mode test : Chargement des offres de Toulouse')
        await new Promise(resolve => setTimeout(resolve, 500)) // Simulation de latence
        offers.value = [...toulouseOffers]
      } else {
        // Mode normal : appel API réel
        const fetchedOffers = await offersService.getAllOffers()
        offers.value = fetchedOffers
      }
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors du chargement des offres'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Récupération d'une offre spécifique par son ID
   */
  const fetchOfferById = async (offerId: string): Promise<Offer> => {
    isLoading.value = true
    error.value = null
    
    try {
      if (isTestMode.value) {
        // Mode test : chercher dans les données d'exemple
        console.log('🧪 Mode test : Recherche de l\'offre', offerId)
        await new Promise(resolve => setTimeout(resolve, 300))
        const offer = toulouseOffers.find(o => o.id === offerId)
        if (!offer) {
          throw new Error('Offre non trouvée')
        }
        currentOffer.value = offer
        return offer
      } else {
        // Mode normal : appel API réel
        const offer = await offersService.getOfferById(offerId)
        currentOffer.value = offer
        return offer
      }
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors du chargement de l\'offre'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Création d'une nouvelle offre
   */
  const createOffer = async (offerData: CreateOfferData): Promise<Offer> => {
    isLoading.value = true
    error.value = null
    
    try {
      const newOffer = await offersService.createOffer(offerData)
      
      // Ajout de la nouvelle offre aux listes
      offers.value.unshift(newOffer)
      userOffers.value.unshift(newOffer)
      
      return newOffer
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la création de l\'offre'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Réservation d'une offre
   */
  const reserveOffer = async (offerId: string): Promise<void> => {
    isLoading.value = true
    error.value = null
    
    try {
      const reservedOffer = await offersService.reserveOffer(offerId)
      
      // Mise à jour du statut de l'offre
      const offerIndex = offers.value.findIndex(offer => offer.id === offerId)
      if (offerIndex !== -1) {
        offers.value[offerIndex] = reservedOffer
      }
      
      // Ajout aux offres réservées
      reservedOffers.value.push(reservedOffer)
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la réservation'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Confirmation de récupération d'une offre réservée
   */
  const confirmPickup = async (offerId: string): Promise<void> => {
    isLoading.value = true
    error.value = null
    
    try {
      await offersService.confirmPickup(offerId)
      
      // Mise à jour du statut
      const offerIndex = offers.value.findIndex(offer => offer.id === offerId)
      if (offerIndex !== -1) {
        offers.value[offerIndex].status = 'completed'
      }
      
      const reservedIndex = reservedOffers.value.findIndex(offer => offer.id === offerId)
      if (reservedIndex !== -1) {
        reservedOffers.value[reservedIndex].status = 'completed'
      }
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la confirmation'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Récupération des offres de l'utilisateur connecté
   */
  const fetchUserOffers = async (): Promise<void> => {
    isLoading.value = true
    error.value = null
    
    try {
      const offers = await offersService.getUserOffers()
      userOffers.value = offers
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors du chargement de vos offres'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Récupération des offres réservées par l'utilisateur
   */
  const fetchReservedOffers = async (): Promise<void> => {
    isLoading.value = true
    error.value = null
    
    try {
      const offers = await offersService.getReservedOffers()
      reservedOffers.value = offers
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors du chargement des réservations'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Suppression d'une offre
   */
  const deleteOffer = async (offerId: string): Promise<void> => {
    isLoading.value = true
    error.value = null
    
    try {
      await offersService.deleteOffer(offerId)
      
      // Suppression des listes locales
      offers.value = offers.value.filter(offer => offer.id !== offerId)
      userOffers.value = userOffers.value.filter(offer => offer.id !== offerId)
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la suppression'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Mise à jour des filtres de recherche
   */
  const updateFilters = (newFilters: Partial<OfferFilters>): void => {
    filters.value = { ...filters.value, ...newFilters }
  }

  /**
   * Recherche d'offres par terme de recherche
   */
  const searchOffers = async (searchTerm: string): Promise<Offer[]> => {
    isLoading.value = true
    error.value = null
    
    try {
      const results = await offersService.searchOffers(searchTerm)
      return results
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la recherche'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Réinitialisation des erreurs
   */
  const clearError = (): void => {
    error.value = null
  }

  /**
   * Réinitialisation de l'offre courante
   */
  const clearCurrentOffer = (): void => {
    currentOffer.value = null
  }

  return {
    // État
    offers,
    currentOffer,
    userOffers,
    reservedOffers,
    isLoading,
    error,
    filters,
    
    // Getters
    availableOffers,
    expiringSoonOffers,
    filteredOffers,
    
    // Actions
    fetchOffers,
    fetchOfferById,
    createOffer,
    reserveOffer,
    confirmPickup,
    fetchUserOffers,
    fetchReservedOffers,
    deleteOffer,
    updateFilters,
    searchOffers,
    clearError,
    clearCurrentOffer
  }
}) 