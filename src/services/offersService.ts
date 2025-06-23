import { apiService } from './api'
import type { 
  Offer, 
  CreateOfferData, 
  OfferFilters, 
  Reservation,
  OfferUpdate 
} from '@/types/offers'

/**
 * Service de gestion des offres alimentaires
 */
class OffersService {

  /**
   * Récupération de toutes les offres avec filtres
   */
  async getOffers(filters?: OfferFilters): Promise<Offer[]> {
    const params = new URLSearchParams()
    
    if (filters?.category) params.append('category', filters.category)
    if (filters?.priceRange) {
      params.append('minPrice', filters.priceRange.min.toString())
      params.append('maxPrice', filters.priceRange.max.toString())
    }
    if (filters?.location) {
      params.append('lat', filters.location.lat.toString())
      params.append('lng', filters.location.lng.toString())
      if (filters.radius) params.append('radius', filters.radius.toString())
    }
    if (filters?.isVegan) params.append('isVegan', 'true')
    if (filters?.isOrganic) params.append('isOrganic', 'true')
    if (filters?.isGlutenFree) params.append('isGlutenFree', 'true')

    return apiService.get<Offer[]>(`/offers?${params.toString()}`)
  }

  /**
   * Récupération d'une offre par ID
   */
  async getOfferById(id: string): Promise<Offer> {
    return apiService.get<Offer>(`/offers/${id}`)
  }

  /**
   * Création d'une nouvelle offre
   */
  async createOffer(offerData: CreateOfferData): Promise<Offer> {
    return apiService.post<Offer>('/offers', offerData)
  }

  /**
   * Mise à jour d'une offre
   */
  async updateOffer(id: string, updates: OfferUpdate): Promise<Offer> {
    return apiService.patch<Offer>(`/offers/${id}`, updates)
  }

  /**
   * Suppression d'une offre
   */
  async deleteOffer(id: string): Promise<void> {
    return apiService.delete(`/offers/${id}`)
  }

  /**
   * Réservation d'une offre
   */
  async reserveOffer(offerId: string, quantity: number): Promise<Reservation> {
    return apiService.post<Reservation>(`/offers/${offerId}/reserve`, { quantity })
  }

  /**
   * Annulation d'une réservation
   */
  async cancelReservation(reservationId: string): Promise<void> {
    return apiService.delete(`/reservations/${reservationId}`)
  }

  /**
   * Récupération des réservations de l'utilisateur
   */
  async getUserReservations(): Promise<Reservation[]> {
    return apiService.get<Reservation[]>('/reservations/user')
  }

  /**
   * Upload d'images pour une offre
   */
  async uploadOfferImages(files: File[]): Promise<string[]> {
    const uploadPromises = files.map(file => 
      apiService.uploadFile('/uploads/offers', file)
    )
    return Promise.all(uploadPromises)
  }

  /**
   * Recherche d'offres par géolocalisation
   */
  async searchNearby(lat: number, lng: number, radius = 5): Promise<Offer[]> {
    return apiService.get<Offer[]>(`/offers/nearby?lat=${lat}&lng=${lng}&radius=${radius}`)
  }

  /**
   * Recherche textuelle d'offres
   */
  async searchOffers(query: string): Promise<Offer[]> {
    return apiService.get<Offer[]>(`/offers/search?q=${encodeURIComponent(query)}`)
  }

  /**
   * Récupération des offres favorites
   */
  async getFavorites(): Promise<Offer[]> {
    return apiService.get<Offer[]>('/offers/favorites')
  }

  /**
   * Ajout/suppression d'une offre aux favoris
   */
  async toggleFavorite(offerId: string): Promise<boolean> {
    const response = await apiService.post<{ isFavorite: boolean }>(`/offers/${offerId}/favorite`)
    return response.isFavorite
  }

  /**
   * Signalement d'une offre
   */
  async reportOffer(offerId: string, reason: string): Promise<void> {
    return apiService.post(`/offers/${offerId}/report`, { reason })
  }
}

// Export de l'instance singleton
export const offersService = new OffersService() 