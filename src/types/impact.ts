// Types pour l'analyse d'impact environnemental par IA

export interface EcoMetrics {
  co2Saved: number // en kg
  waterSaved: number // en litres
  mealsSaved: number // nombre de repas
  totalImpactScore: number // score calculé par l'IA
}

export interface ImpactData extends EcoMetrics {
  id: string
  userId: string
  offerId?: string
  date: string
  impactScore: number
  category: string
  description: string
  calculationMethod: 'ai' | 'manual' | 'estimated'
}

export interface ImpactAnalysis {
  productName: string
  category: string
  quantity: number
  unit: string
  expiryDate: string
  co2Impact: {
    production: number
    transport: number
    packaging: number
    waste: number
    total: number
  }
  waterImpact: {
    production: number
    processing: number
    total: number
  }
  landImpact: {
    areaUsed: number // en m²
    biodiversityScore: number
  }
  nutritionalValue: {
    calories: number
    proteins: number
    vitamins: string[]
    minerals: string[]
  }
  recommendations: string[]
  confidenceScore: number // 0-100, confiance de l'IA
  impactScore: number // Score global 0-100
  equivalences: ImpactEquivalence[]
}

export interface ImpactEquivalence {
  type: 'transport' | 'energy' | 'nature'
  description: string
  value: number
  unit: string
  icon: string
}

// Types pour les données historiques et graphiques
export interface ImpactTrend {
  period: string
  co2Saved: number
  waterSaved: number
  mealsSaved: number
  impactScore: number
}

export interface ImpactComparison {
  user: EcoMetrics
  community: EcoMetrics
  national: EcoMetrics
  percentile: number // Position de l'utilisateur (0-100)
}

// Types pour les badges et gamification
export interface EcoBadge {
  id: string
  name: string
  description: string
  icon: string
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
  unlockedAt?: string
  progress?: {
    current: number
    target: number
    unit: string
  }
}

export interface ImpactGoal {
  id: string
  type: 'co2' | 'water' | 'meals' | 'score'
  title: string
  description: string
  target: number
  current: number
  unit: string
  deadline: string
  reward?: EcoBadge
  isCompleted: boolean
}

// Types pour les suggestions et recommandations IA
export interface AISuggestion {
  type: 'product' | 'action' | 'education'
  title: string
  description: string
  impact: Partial<EcoMetrics>
  difficulty: 'easy' | 'medium' | 'hard'
  category: string
  isPersonalized: boolean
}

export interface EducationalContent {
  id: string
  type: 'article' | 'video' | 'infographic' | 'quiz'
  title: string
  description: string
  content: string
  estimatedReadTime: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  tags: string[]
  impactTopics: string[]
  isCompleted?: boolean
}

// Types pour les simulations d'impact
export interface ImpactSimulationInput {
  products: Array<{
    name: string
    category: string
    quantity: number
    unit: string
    expiryDate?: string
  }>
  scenario: 'rescue' | 'waste' | 'optimize'
  location?: string
}

export interface ImpactSimulationResult extends ImpactAnalysis {
  scenarios: Array<{
    name: string
    impact: EcoMetrics
    probability: number
    recommendations: string[]
  }>
  optimizationSuggestions: AISuggestion[]
}

// Types pour les données agrégées et statistiques
export interface CommunityImpact {
  totalUsers: number
  totalOffersCompleted: number
  aggregatedImpact: EcoMetrics
  topContributors: Array<{
    userId: string
    userName: string
    impact: EcoMetrics
    rank: number
  }>
  impactByCategory: Array<{
    category: string
    impact: EcoMetrics
    percentage: number
  }>
}

export interface RegionalImpact {
  region: string
  population: number
  impact: EcoMetrics
  ranking: number
  comparisonToNational: number // percentage
}

// Type pour l'agrégation d'impact
export interface ImpactAggregation {
  totalCo2Saved: number
  totalWaterSaved: number
  totalOffersCreated: number
  totalItemsSaved: number
  ecoScore: number
  badges: EcoBadge[]
  rank: number
  monthlyTrend: {
    co2: number
    water: number
    offers: number
  }
} 