import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { ImpactData, ImpactAnalysis, EcoMetrics } from '@/types/impact'
import { impactService } from '@/services/impactService'

export const useImpactStore = defineStore('impact', () => {
  // État réactif de l'impact environnemental
  const userImpact = ref<EcoMetrics>({
    co2Saved: 0,
    waterSaved: 0,
    mealsSaved: 0,
    totalImpactScore: 0
  })
  
  const impactHistory = ref<ImpactData[]>([])
  const currentAnalysis = ref<ImpactAnalysis | null>(null)
  const isAnalyzing = ref(false)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters calculés pour les statistiques d'impact
  const monthlyImpact = computed(() => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()
    
    return impactHistory.value.filter(impact => {
      const impactDate = new Date(impact.date)
      return impactDate.getMonth() === currentMonth && 
             impactDate.getFullYear() === currentYear
    }).reduce((acc, impact) => ({
      co2Saved: acc.co2Saved + impact.co2Saved,
      waterSaved: acc.waterSaved + impact.waterSaved,
      mealsSaved: acc.mealsSaved + impact.mealsSaved,
      totalImpactScore: acc.totalImpactScore + impact.impactScore
    }), { co2Saved: 0, waterSaved: 0, mealsSaved: 0, totalImpactScore: 0 })
  })

  const weeklyTrend = computed(() => {
    const last7Days = impactHistory.value
      .filter(impact => {
        const impactDate = new Date(impact.date)
        const weekAgo = new Date()
        weekAgo.setDate(weekAgo.getDate() - 7)
        return impactDate >= weekAgo
      })
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    
    return last7Days
  })

  const impactLevel = computed(() => {
    const score = userImpact.value.totalImpactScore
    if (score >= 1000) return { level: 'expert', label: 'Expert Éco', color: 'eco-dark-green' }
    if (score >= 500) return { level: 'advanced', label: 'Éco-Warrior', color: 'eco-green' }
    if (score >= 100) return { level: 'intermediate', label: 'Éco-Actif', color: 'eco-light-green' }
    return { level: 'beginner', label: 'Éco-Débutant', color: 'eco-orange' }
  })

  // Actions pour l'analyse d'impact

  /**
   * Analyse d'impact IA pour une offre alimentaire
   */
  const analyzeOfferImpact = async (offerData: {
    product: string
    quantity: number
    category: string
    expiryDate: string
  }): Promise<ImpactAnalysis> => {
    isAnalyzing.value = true
    error.value = null
    
    try {
      // Appel à l'API IA pour l'analyse d'impact
      const analysis = await impactService.analyzeImpact(offerData)
      currentAnalysis.value = analysis
      
      return analysis
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de l\'analyse d\'impact'
      throw err
    } finally {
      isAnalyzing.value = false
    }
  }

  /**
   * Calcul de l'impact d'une réservation
   */
  const calculateReservationImpact = async (offerId: string): Promise<ImpactData> => {
    isLoading.value = true
    error.value = null
    
    try {
      const impact = await impactService.calculateReservationImpact(offerId)
      
      // Mise à jour des métriques utilisateur
      userImpact.value.co2Saved += impact.co2Saved
      userImpact.value.waterSaved += impact.waterSaved
      userImpact.value.mealsSaved += impact.mealsSaved
      userImpact.value.totalImpactScore += impact.impactScore
      
      // Ajout à l'historique
      impactHistory.value.unshift(impact)
      
      return impact
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors du calcul d\'impact'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Récupération de l'impact total de l'utilisateur
   */
  const fetchUserImpact = async (): Promise<void> => {
    isLoading.value = true
    error.value = null
    
    try {
      const impact = await impactService.getUserImpact()
      userImpact.value = impact
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors du chargement de l\'impact'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Récupération de l'historique d'impact
   */
  const fetchImpactHistory = async (): Promise<void> => {
    isLoading.value = true
    error.value = null
    
    try {
      const history = await impactService.getImpactHistory()
      impactHistory.value = history
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors du chargement de l\'historique'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Simulation d'impact pour des produits spécifiques
   */
  const simulateImpact = async (products: Array<{
    name: string
    quantity: number
    category: string
  }>): Promise<ImpactAnalysis> => {
    isAnalyzing.value = true
    error.value = null
    
    try {
      const simulation = await impactService.simulateImpact(products)
      return simulation
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la simulation'
      throw err
    } finally {
      isAnalyzing.value = false
    }
  }

  /**
   * Récupération des données pour les graphiques d'impact
   */
  const getImpactChartData = (period: 'week' | 'month' | 'year') => {
    const now = new Date()
    let filteredData: ImpactData[] = []
    
    switch (period) {
      case 'week':
        const weekAgo = new Date()
        weekAgo.setDate(now.getDate() - 7)
        filteredData = impactHistory.value.filter(
          impact => new Date(impact.date) >= weekAgo
        )
        break
        
      case 'month':
        const monthAgo = new Date()
        monthAgo.setMonth(now.getMonth() - 1)
        filteredData = impactHistory.value.filter(
          impact => new Date(impact.date) >= monthAgo
        )
        break
        
      case 'year':
        const yearAgo = new Date()
        yearAgo.setFullYear(now.getFullYear() - 1)
        filteredData = impactHistory.value.filter(
          impact => new Date(impact.date) >= yearAgo
        )
        break
    }
    
    // Agrégation des données par période
    const grouped = filteredData.reduce((acc, impact) => {
      const date = new Date(impact.date).toDateString()
      if (!acc[date]) {
        acc[date] = { co2: 0, water: 0, meals: 0 }
      }
      acc[date].co2 += impact.co2Saved
      acc[date].water += impact.waterSaved
      acc[date].meals += impact.mealsSaved
      return acc
    }, {} as Record<string, { co2: number, water: number, meals: number }>)
    
    return Object.entries(grouped).map(([date, values]) => ({
      date,
      ...values
    })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  /**
   * Génération de badges de progression basés sur l'impact
   */
  const generateProgressBadges = () => {
    const badges = []
    const { co2Saved, waterSaved, mealsSaved } = userImpact.value
    
    // Badges CO2
    if (co2Saved >= 100) badges.push({ 
      id: 'co2-expert', 
      name: 'Protecteur du Climat', 
      description: '100kg de CO2 économisés',
      icon: '🌍',
      rarity: 'legendary'
    })
    else if (co2Saved >= 50) badges.push({ 
      id: 'co2-warrior', 
      name: 'Guerrier du Carbone', 
      description: '50kg de CO2 économisés',
      icon: '🌱',
      rarity: 'epic'
    })
    
    // Badges Eau
    if (waterSaved >= 10000) badges.push({ 
      id: 'water-guardian', 
      name: 'Gardien de l\'Eau', 
      description: '10 000 litres d\'eau économisés',
      icon: '💧',
      rarity: 'legendary'
    })
    
    // Badges Repas
    if (mealsSaved >= 100) badges.push({ 
      id: 'meal-hero', 
      name: 'Héros Anti-Gaspi', 
      description: '100 repas sauvés',
      icon: '🍽️',
      rarity: 'legendary'
    })
    
    return badges
  }

  /**
   * Réinitialisation des erreurs
   */
  const clearError = (): void => {
    error.value = null
  }

  /**
   * Réinitialisation de l'analyse courante
   */
  const clearCurrentAnalysis = (): void => {
    currentAnalysis.value = null
  }

  return {
    // État
    userImpact,
    impactHistory,
    currentAnalysis,
    isAnalyzing,
    isLoading,
    error,
    
    // Getters
    monthlyImpact,
    weeklyTrend,
    impactLevel,
    
    // Actions
    analyzeOfferImpact,
    calculateReservationImpact,
    fetchUserImpact,
    fetchImpactHistory,
    simulateImpact,
    getImpactChartData,
    generateProgressBadges,
    clearError,
    clearCurrentAnalysis
  }
}) 