// Types pour les offres alimentaires et la marketplace

export interface Offer {
  id: string
  title: string
  description: string
  category: FoodCategory
  quantity: number
  unit: 'kg' | 'pieces' | 'liters' | 'portions'
  expiryDate: string
  location: Location
  distance?: number
  images: string[]
  status: 'available' | 'reserved' | 'completed' | 'expired' | 'cancelled'
  createdAt: string
  updatedAt: string
  userId: string
  userName: string
  userType: 'particulier' | 'commerçant' | 'association'
  pickupDetails: PickupDetails
  reservedBy?: string
  reservedAt?: string
  completedAt?: string
  impactScore?: number
}

// Type pour les offres du marketplace (structure simplifiée pour demo)
export interface MarketplaceOffer {
  id: string
  title: string
  description: string
  category: MarketplaceCategory
  originalPrice: number
  discountedPrice: number
  discountPercentage: number
  quantity: number
  availableQuantity: number
  expiryDate: string
  images: string[]
  merchant: {
    id: string
    name: string
    address: string
    distance: number
    rating: number
    totalReviews: number
    coordinates: {
      lat: number
      lng: number
    }
  }
  pickupWindow: {
    start: string
    end: string
  }
  isOrganic: boolean
  isVegan: boolean
  isGlutenFree: boolean
  isLocal: boolean
  status: 'available' | 'reserved' | 'completed' | 'expired' | 'cancelled'
  createdAt: string
  distance: number
  tags: string[]
  allergens: string[]
}

export type MarketplaceCategory = 
  | 'fruits-vegetables'
  | 'bakery'
  | 'dairy'
  | 'prepared-meals'
  | 'grocery'
  | 'meat'
  | 'seafood'
  | 'beverages'
  | 'desserts'

export type FoodCategory = 
  | 'fruits-legumes'
  | 'pain-viennoiseries' 
  | 'produits-laitiers'
  | 'viandes-poissons'
  | 'epicerie'
  | 'plats-prepares'
  | 'boissons'
  | 'autres'

export interface Location {
  address: string
  city: string
  postalCode: string
  coordinates: {
    lat: number
    lng: number
  }
}

export interface PickupDetails {
  timeSlots: TimeSlot[]
  instructions?: string
  contactMethod: 'phone' | 'email' | 'app'
  contactInfo?: string
  isFlexible: boolean
}

export interface TimeSlot {
  id: string
  startTime: string
  endTime: string
  date: string
  isAvailable: boolean
}

export interface CreateOfferData {
  title: string
  description: string
  category: FoodCategory
  quantity: number
  unit: 'kg' | 'pieces' | 'liters' | 'portions'
  expiryDate: string
  location: Omit<Location, 'coordinates'>
  images: File[]
  pickupDetails: Omit<PickupDetails, 'timeSlots'> & {
    timeSlots: Omit<TimeSlot, 'id' | 'isAvailable'>[]
  }
}

export interface OfferUpdate {
  title?: string
  description?: string
  quantity?: number
  expiryDate?: string
  pickupDetails?: Partial<PickupDetails>
}

export interface OfferFilters {
  category: string
  distance: number
  availability: 'all' | 'today' | 'tomorrow' | 'this-week'
  location?: string
  keywords?: string
}

export interface ReservationData {
  offerId: string
  selectedTimeSlot: string
  message?: string
  contactPreference: 'phone' | 'email' | 'app'
}

export interface Reservation {
  id: string
  offerId: string
  offer: Offer
  userId: string
  userName: string
  selectedTimeSlot: TimeSlot
  message?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
  confirmationCode?: string
}

// Types pour la recherche et les suggestions
export interface SearchSuggestion {
  type: 'category' | 'location' | 'keyword'
  value: string
  label: string
  count?: number
}

export interface OfferSearchResult {
  offers: Offer[]
  total: number
  page: number
  limit: number
  suggestions: SearchSuggestion[]
}

// Types pour les statistiques d'offres
export interface OfferStats {
  totalCreated: number
  totalReserved: number
  totalCompleted: number
  totalExpired: number
  successRate: number
  averagePickupTime: number
  popularCategories: Array<{
    category: FoodCategory
    count: number
    percentage: number
  }>
}

// Types pour les notifications liées aux offres
export interface OfferNotification {
  id: string
  type: 'new-reservation' | 'reservation-confirmed' | 'pickup-reminder' | 'offer-expired'
  offerId: string
  offerTitle: string
  message: string
  isRead: boolean
  createdAt: string
} 