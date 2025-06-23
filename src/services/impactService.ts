import { apiService } from './api'
import type { 
  ImpactData, 
  ImpactAnalysis, 
  EcoMetrics,
  ImpactAggregation 
} from '@/types/impact'

/**
 * Service d'analyse d'impact environnemental par IA
 */
class ImpactService {

  /**
   * Analyse d'impact IA d'une offre alimentaire
   */
  async analyzeOfferImpact(offerData: ImpactData): Promise<ImpactAnalysis> {
    return apiService.post<ImpactAnalysis>('/v1/impact', offerData)
  }

  /**
   * Récupération des métriques éco-responsables d'un utilisateur
   */
  async getUserMetrics(userId: string, period?: string): Promise<EcoMetrics> {
    const params = period ? `?period=${period}` : ''
    return apiService.get<EcoMetrics>(`/impact/users/${userId}/metrics${params}`)
  }

  /**
   * Récupération de l'impact global de l'utilisateur
   */
  async getUserTotalImpact(userId: string): Promise<ImpactAggregation> {
    return apiService.get<ImpactAggregation>(`/impact/users/${userId}/total`)
  }

  /**
   * Calcul des équivalences d'impact (arbres, trajets voiture, etc.)
   */
  async getImpactEquivalents(co2Saved: number): Promise<{
    trees: number
    carKm: number
    showers: number
    smartphone: number
  }> {
    return apiService.get(`/impact/equivalents?co2=${co2Saved}`)
  }

  /**
   * Récupération des badges obtenus par l'utilisateur
   */
  async getUserBadges(userId: string): Promise<Array<{
    id: string
    name: string
    description: string
    icon: string
    unlockedAt: Date
    level: 'bronze' | 'silver' | 'gold' | 'diamond'
  }>> {
    return apiService.get(`/impact/users/${userId}/badges`)
  }

  /**
   * Simulation d'impact avant création d'offre
   */
  async simulateImpact(offerData: Pick<ImpactData, 'productType' | 'quantity' | 'expirationDate'>): Promise<{
    estimatedCo2: number
    estimatedWater: number
    impactScore: number
  }> {
    return apiService.post('/impact/simulate', offerData)
  }

  /**
   * Statistiques d'impact globales de la plateforme
   */
  async getPlatformStats(): Promise<{
    totalCo2Saved: number
    totalWaterSaved: number
    totalOffersCreated: number
    totalUsersActive: number
    monthlyGrowth: number
  }> {
    return apiService.get('/impact/platform/stats')
  }

  /**
   * Comparaison d'impact entre utilisateurs (leaderboard)
   */
  async getLeaderboard(period = 'month'): Promise<Array<{
    userId: string
    username: string
    avatar?: string
    totalCo2Saved: number
    totalWaterSaved: number
    rank: number
  }>> {
    return apiService.get(`/impact/leaderboard?period=${period}`)
  }

  /**
   * Récupération des tendances d'impact mensuel
   */
  async getImpactTrends(userId: string, months = 12): Promise<Array<{
    month: string
    co2Saved: number
    waterSaved: number
    offerCount: number
  }>> {
    return apiService.get(`/impact/users/${userId}/trends?months=${months}`)
  }

  /**
   * Calcul d'objectifs personnalisés d'impact
   */
  async setPersonalGoals(userId: string, goals: {
    monthlyCo2Target: number
    monthlyWaterTarget: number
    monthlyOffersTarget: number
  }): Promise<void> {
    return apiService.post(`/impact/users/${userId}/goals`, goals)
  }

  /**
   * Vérification de l'atteinte des objectifs
   */
  async checkGoalsProgress(userId: string): Promise<{
    co2Progress: number
    waterProgress: number
    offersProgress: number
    achievedGoals: string[]
  }> {
    return apiService.get(`/impact/users/${userId}/goals/progress`)
  }
}

// Export de l'instance singleton
export const impactService = new ImpactService() 