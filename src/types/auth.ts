// Types pour l'authentification et la gestion des utilisateurs

export interface User {
  id: string
  email: string
  name: string
  type: 'particulier' | 'commerçant' | 'association'
  role: 'user' | 'admin' | 'moderator'
  avatar?: string
  phone?: string
  address?: string
  createdAt: string
  updatedAt: string
  isVerified: boolean
  preferences?: UserPreferences
}

export interface UserPreferences {
  notifications: {
    email: boolean
    push: boolean
    sms: boolean
  }
  privacy: {
    profileVisible: boolean
    locationSharing: boolean
  }
  language: 'fr' | 'en'
  theme: 'light' | 'dark' | 'auto'
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
  type: 'particulier' | 'commerçant' | 'association'
  phone?: string
  address?: string
  acceptTerms: boolean
  acceptPrivacy: boolean
}

export interface AuthResponse {
  user: User
  token: string
  refreshToken: string
  expiresIn: number
}

export interface PasswordResetData {
  email: string
}

export interface PasswordUpdateData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export interface ProfileUpdateData {
  name?: string
  phone?: string
  address?: string
  avatar?: File
  preferences?: Partial<UserPreferences>
}

// Types pour OAuth2 PKCE
export interface OAuthConfig {
  clientId: string
  redirectUri: string
  scope: string
  codeChallenge: string
  codeChallengeMethod: 'S256'
  state: string
}

export interface OAuthTokenResponse {
  accessToken: string
  tokenType: string
  expiresIn: number
  refreshToken?: string
  scope: string
}

export interface GoogleAuthResponse extends AuthResponse {
  provider: 'google'
  providerId: string
}

export interface AppleAuthResponse extends AuthResponse {
  provider: 'apple'
  providerId: string
} 