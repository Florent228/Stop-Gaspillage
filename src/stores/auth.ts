import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User, LoginCredentials, RegisterData } from '@/types/auth'
import { authService } from '@/services/authService'

export const useAuthStore = defineStore('auth', () => {
  // État réactif de l'authentification
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('auth_token'))
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  
  // MODE TEST : Utilisateur invité par défaut
  const guestUser = ref<User>({
    id: 'guest-user',
    email: 'guest@stop-gaspillage.com',
    name: 'Utilisateur Invité',
    firstName: 'Utilisateur',
    lastName: 'Invité',
    type: 'consumer',
    role: 'user',
    avatar: null,
    phone: null,
    address: null,
    preferences: {
      notifications: true,
      newsletter: false,
      language: 'fr'
    },
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    lastLoginAt: new Date().toISOString()
  })
  
  // Mode test activé par défaut
  const isTestMode = ref(true)

  // Getters calculés
  const isAuthenticated = computed(() => {
    if (isTestMode.value) {
      return true // En mode test, toujours considéré comme authentifié
    }
    return !!token.value && !!user.value
  })
  
  const isAdmin = computed(() => {
    if (isTestMode.value) {
      return true // En mode test, toujours admin pour accéder à toutes les fonctionnalités
    }
    return user.value?.role === 'admin'
  })
  
  const userType = computed(() => {
    if (isTestMode.value) {
      return guestUser.value.type
    }
    return user.value?.type
  })
  
  const currentUser = computed(() => {
    if (isTestMode.value) {
      return guestUser.value
    }
    return user.value
  })

  // Actions pour l'authentification

  /**
   * Activer/Désactiver le mode test
   */
  const toggleTestMode = (enabled: boolean = true): void => {
    isTestMode.value = enabled
    console.log(`🧪 Mode test ${enabled ? 'activé' : 'désactivé'}`)
  }

  /**
   * Connexion avec email/mot de passe
   */
  const login = async (credentials: LoginCredentials): Promise<void> => {
    if (isTestMode.value) {
      // En mode test, simulation d'une connexion réussie
      console.log('🧪 Mode test : Simulation de connexion')
      user.value = {
        ...guestUser.value,
        email: credentials.email,
        name: credentials.email.split('@')[0],
        firstName: credentials.email.split('@')[0],
        lastName: 'Test'
      }
      token.value = 'test-token-' + Date.now()
      return
    }
    
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authService.login(credentials)
      
      // Stockage du token et des données utilisateur
      token.value = response.token
      user.value = response.user
      localStorage.setItem('auth_token', response.token)
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la connexion'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Inscription d'un nouvel utilisateur
   */
  const register = async (data: RegisterData): Promise<void> => {
    if (isTestMode.value) {
      // En mode test, simulation d'une inscription réussie
      console.log('🧪 Mode test : Simulation d\'inscription')
      user.value = {
        ...guestUser.value,
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        firstName: data.firstName,
        lastName: data.lastName,
        type: data.userType
      }
      token.value = 'test-token-' + Date.now()
      return
    }
    
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authService.register(data)
      
      // Connexion automatique après inscription réussie
      token.value = response.token
      user.value = response.user
      localStorage.setItem('auth_token', response.token)
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de l\'inscription'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Connexion via Google OAuth2 PKCE
   */
  const loginWithGoogle = async (): Promise<void> => {
    if (isTestMode.value) {
      console.log('🧪 Mode test : Simulation de connexion Google')
      user.value = {
        ...guestUser.value,
        email: 'test@gmail.com',
        name: 'Test Google',
        firstName: 'Test',
        lastName: 'Google'
      }
      token.value = 'test-google-token-' + Date.now()
      return
    }
    
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authService.loginWithGoogle()
      
      token.value = response.token
      user.value = response.user
      localStorage.setItem('auth_token', response.token)
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la connexion Google'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Connexion via Apple OAuth2 PKCE
   */
  const loginWithApple = async (): Promise<void> => {
    if (isTestMode.value) {
      console.log('🧪 Mode test : Simulation de connexion Apple')
      user.value = {
        ...guestUser.value,
        email: 'test@icloud.com',
        name: 'Test Apple',
        firstName: 'Test',
        lastName: 'Apple'
      }
      token.value = 'test-apple-token-' + Date.now()
      return
    }
    
    isLoading.value = true
    error.value = null
    
    try {
      const response = await authService.loginWithApple()
      
      token.value = response.token
      user.value = response.user
      localStorage.setItem('auth_token', response.token)
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la connexion Apple'
      throw err
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Déconnexion de l'utilisateur
   */
  const logout = async (): Promise<void> => {
    if (isTestMode.value) {
      console.log('🧪 Mode test : Simulation de déconnexion')
      // En mode test, on peut revenir à l'utilisateur invité
      user.value = null
      token.value = null
      return
    }
    
    try {
      await authService.logout()
    } catch (err) {
      // On continue même en cas d'erreur côté serveur
      console.warn('Erreur lors de la déconnexion côté serveur:', err)
    }
    
    // Nettoyage local
    user.value = null
    token.value = null
    localStorage.removeItem('auth_token')
    error.value = null
  }

  /**
   * Vérification de l'état d'authentification au démarrage
   */
  const checkAuthState = async (): Promise<void> => {
    if (isTestMode.value) {
      console.log('🧪 Mode test : Utilisateur invité automatiquement connecté')
      return
    }
    
    const storedToken = localStorage.getItem('auth_token')
    
    if (!storedToken) {
      return
    }
    
    isLoading.value = true
    
    try {
      // Vérification de la validité du token et récupération des données utilisateur
      const userData = await authService.verifyToken(storedToken)
      
      token.value = storedToken
      user.value = userData
      
    } catch (err) {
      // Token invalide, nettoyage
      localStorage.removeItem('auth_token')
      token.value = null
      user.value = null
    } finally {
      isLoading.value = false
    }
  }

  /**
   * Mise à jour du profil utilisateur
   */
  const updateProfile = async (profileData: Partial<User>): Promise<void> => {
    if (isTestMode.value) {
      console.log('🧪 Mode test : Simulation de mise à jour profil')
      if (user.value) {
        user.value = { ...user.value, ...profileData }
      } else {
        guestUser.value = { ...guestUser.value, ...profileData }
      }
      return
    }
    
    isLoading.value = true
    error.value = null
    
    try {
      const updatedUser = await authService.updateProfile(profileData)
      user.value = { ...user.value, ...updatedUser }
      
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la mise à jour du profil'
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

  return {
    // État
    user,
    token,
    isLoading,
    error,
    guestUser,
    isTestMode,
    
    // Getters
    isAuthenticated,
    isAdmin,
    userType,
    currentUser,
    
    // Actions
    toggleTestMode,
    login,
    register,
    loginWithGoogle,
    loginWithApple,
    logout,
    checkAuthState,
    updateProfile,
    clearError
  }
}) 