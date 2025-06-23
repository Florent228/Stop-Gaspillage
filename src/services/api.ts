import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

// Configuration de base pour l'API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'

// Instance Axios configurée
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Intercepteur pour ajouter le token d'authentification
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Intercepteur pour gérer les réponses et erreurs
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response
  },
  (error) => {
    // Gestion des erreurs globales
    if (error.response?.status === 401) {
      // Token expiré ou invalide
      localStorage.removeItem('auth_token')
      window.location.href = '/auth'
    }
    
    // Formatage des erreurs pour l'affichage utilisateur
    const errorMessage = error.response?.data?.message || 
                        error.response?.data?.error || 
                        error.message || 
                        'Une erreur inattendue s\'est produite'
    
    return Promise.reject(new Error(errorMessage))
  }
)

// Interface pour les réponses API standardisées
export interface ApiResponse<T = any> {
  data: T
  message?: string
  success: boolean
  errors?: string[]
}

// Interface pour les réponses paginées
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Service API principal
export class ApiService {
  private client: AxiosInstance

  constructor() {
    this.client = apiClient
  }

  /**
   * Requête GET générique
   */
  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.get<ApiResponse<T>>(endpoint, config)
    return response.data.data
  }

  /**
   * Requête POST générique
   */
  async post<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.post<ApiResponse<T>>(endpoint, data, config)
    return response.data.data
  }

  /**
   * Requête PUT générique
   */
  async put<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.put<ApiResponse<T>>(endpoint, data, config)
    return response.data.data
  }

  /**
   * Requête PATCH générique
   */
  async patch<T>(endpoint: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.patch<ApiResponse<T>>(endpoint, data, config)
    return response.data.data
  }

  /**
   * Requête DELETE générique
   */
  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.client.delete<ApiResponse<T>>(endpoint, config)
    return response.data.data
  }

  /**
   * Upload de fichiers avec gestion de la progression
   */
  async uploadFile<T>(
    endpoint: string, 
    file: File, 
    onUploadProgress?: (progressEvent: ProgressEvent) => void
  ): Promise<T> {
    const formData = new FormData()
    formData.append('file', file)

    const response = await this.client.post<ApiResponse<T>>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    })
    
    return response.data.data
  }

  /**
   * Upload de plusieurs fichiers
   */
  async uploadFiles<T>(
    endpoint: string, 
    files: File[], 
    onUploadProgress?: (progressEvent: ProgressEvent) => void
  ): Promise<T> {
    const formData = new FormData()
    files.forEach((file, index) => {
      formData.append(`files[${index}]`, file)
    })

    const response = await this.client.post<ApiResponse<T>>(endpoint, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress
    })
    
    return response.data.data
  }

  /**
   * Requête avec pagination
   */
  async getPaginated<T>(
    endpoint: string, 
    page: number = 1, 
    limit: number = 20,
    config?: AxiosRequestConfig
  ): Promise<PaginatedResponse<T>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString()
    })

    const response = await this.client.get<PaginatedResponse<T>>(
      `${endpoint}?${params.toString()}`, 
      config
    )
    return response.data
  }

  /**
   * Mise à jour du token d'authentification
   */
  setAuthToken(token: string): void {
    localStorage.setItem('auth_token', token)
    this.client.defaults.headers.Authorization = `Bearer ${token}`
  }

  /**
   * Suppression du token d'authentification
   */
  clearAuthToken(): void {
    localStorage.removeItem('auth_token')
    delete this.client.defaults.headers.Authorization
  }

  /**
   * Vérification de la santé de l'API
   */
  async healthCheck(): Promise<{ status: string, timestamp: string }> {
    return this.get('/health')
  }
}

// Instance singleton du service API
export const apiService = new ApiService()

// Export de l'instance Axios pour des cas d'usage spécifiques
export { apiClient } 