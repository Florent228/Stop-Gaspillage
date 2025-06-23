import { apiService } from './api'
import type { 
  LoginCredentials, 
  RegisterData, 
  AuthResponse, 
  User,
  GoogleAuthResponse,
  AppleAuthResponse
} from '@/types/auth'

/**
 * Service d'authentification avec support OAuth2 PKCE
 */
class AuthService {
  
  /**
   * Connexion avec email/mot de passe
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/login', credentials)
  }

  /**
   * Inscription d'un nouvel utilisateur
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/register', data)
  }

  /**
   * Connexion via Google OAuth2 PKCE
   */
  async loginWithGoogle(): Promise<GoogleAuthResponse> {
    // TODO: Implémenter l'authentification Google OAuth2 PKCE
    return apiService.post<GoogleAuthResponse>('/auth/google', {})
  }

  /**
   * Connexion via Apple OAuth2 PKCE
   */
  async loginWithApple(): Promise<AppleAuthResponse> {
    // TODO: Implémenter l'authentification Apple OAuth2 PKCE
    return apiService.post<AppleAuthResponse>('/auth/apple', {})
  }

  /**
   * Déconnexion
   */
  async logout(): Promise<void> {
    return apiService.post<void>('/auth/logout')
  }

  /**
   * Vérification de la validité du token
   */
  async verifyToken(token: string): Promise<User> {
    return apiService.get<User>('/auth/verify', {
      headers: { Authorization: `Bearer ${token}` }
    })
  }

  /**
   * Mise à jour du profil utilisateur
   */
  async updateProfile(profileData: Partial<User>): Promise<User> {
    return apiService.patch<User>('/auth/profile', profileData)
  }

  /**
   * Réinitialisation du mot de passe
   */
  async resetPassword(email: string): Promise<void> {
    return apiService.post<void>('/auth/reset-password', { email })
  }

  /**
   * Rafraîchissement du token
   */
  async refreshToken(refreshToken: string): Promise<AuthResponse> {
    return apiService.post<AuthResponse>('/auth/refresh', { refreshToken })
  }
}

// Export de l'instance singleton
export const authService = new AuthService() 