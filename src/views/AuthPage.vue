<template>
  <div class="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 flex items-center justify-center p-6">
    <div class="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden">
      <!-- Header avec onglets -->
      <div class="bg-gradient-to-r from-green-500 to-emerald-500 p-8 text-center">
        <div class="w-16 h-16 bg-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span class="text-3xl">🌱</span>
        </div>
        <h1 class="text-2xl font-bold text-white mb-2">Stop-Gaspillage</h1>
        <p class="text-green-100">Rejoignez la révolution anti-gaspillage</p>
      </div>

      <!-- Onglets -->
      <div class="bg-gray-50 border-b">
        <div class="flex">
          <button 
            @click="activeTab = 'login'"
            :class="activeTab === 'login' 
              ? 'bg-white text-green-600 border-b-2 border-green-500 font-semibold' 
              : 'text-gray-600 hover:text-green-600'"
            class="flex-1 py-4 text-center transition-colors"
          >
            Se connecter
          </button>
          <button 
            @click="activeTab = 'register'"
            :class="activeTab === 'register' 
              ? 'bg-white text-green-600 border-b-2 border-green-500 font-semibold' 
              : 'text-gray-600 hover:text-green-600'"
            class="flex-1 py-4 text-center transition-colors"
          >
            S'inscrire
          </button>
        </div>
      </div>

      <!-- Contenu -->
      <div class="p-8">
        <!-- Formulaire de connexion -->
        <div v-if="activeTab === 'login'">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Bon retour ! 👋</h2>
          
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">📧 Adresse email</label>
              <input
                v-model="loginForm.email"
                type="email"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                placeholder="votre@email.com"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">🔒 Mot de passe</label>
              <div class="relative">
                <input
                  v-model="loginForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all pr-12"
                  placeholder="Votre mot de passe"
                >
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {{ showPassword ? '🙈' : '👁️' }}
                </button>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <label class="flex items-center">
                <input
                  v-model="loginForm.rememberMe"
                  type="checkbox"
                  class="rounded border-gray-300 text-green-600 focus:ring-green-500"
                >
                <span class="ml-2 text-sm text-gray-600">Se souvenir de moi</span>
              </label>
              <a href="#" class="text-sm text-green-600 hover:text-green-700 font-medium">
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isLoading ? '⏳ Connexion...' : '🚀 Se connecter' }}
            </button>
          </form>
        </div>

        <!-- Formulaire d'inscription -->
        <div v-if="activeTab === 'register'">
          <h2 class="text-2xl font-bold text-gray-800 mb-6 text-center">Rejoignez-nous ! 🎉</h2>
          
          <form @submit.prevent="handleRegister" class="space-y-6">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">👤 Prénom</label>
                <input
                  v-model="registerForm.firstName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                  placeholder="Votre prénom"
                >
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">👤 Nom</label>
                <input
                  v-model="registerForm.lastName"
                  type="text"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                  placeholder="Votre nom"
                >
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">📧 Adresse email</label>
              <input
                v-model="registerForm.email"
                type="email"
                required
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all"
                placeholder="votre@email.com"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">🔒 Mot de passe</label>
              <div class="relative">
                <input
                  v-model="registerForm.password"
                  :type="showPassword ? 'text' : 'password'"
                  required
                  class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all pr-12"
                  placeholder="Choisissez un mot de passe"
                >
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {{ showPassword ? '🙈' : '👁️' }}
                </button>
              </div>
              <div class="mt-2">
                <div class="text-xs text-gray-600 mb-1">Force du mot de passe :</div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    :class="getPasswordStrengthClass()"
                    class="h-2 rounded-full transition-all duration-300"
                    :style="{ width: `${getPasswordStrength()}%` }"
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">📍 Type de compte</label>
              <select
                v-model="registerForm.userType"
                class="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all bg-white"
              >
                <option value="consumer">🛒 Consommateur</option>
                <option value="merchant">🏪 Commerçant</option>
              </select>
            </div>

            <div class="space-y-3">
              <label class="flex items-start">
                <input
                  v-model="registerForm.acceptTerms"
                  type="checkbox"
                  required
                  class="rounded border-gray-300 text-green-600 focus:ring-green-500 mt-0.5"
                >
                <span class="ml-2 text-sm text-gray-600">
                  J'accepte les 
                  <a href="#" class="text-green-600 hover:text-green-700 font-medium">conditions d'utilisation</a>
                  et la 
                  <a href="#" class="text-green-600 hover:text-green-700 font-medium">politique de confidentialité</a>
                </span>
              </label>
              
              <label class="flex items-start">
                <input
                  v-model="registerForm.newsletter"
                  type="checkbox"
                  class="rounded border-gray-300 text-green-600 focus:ring-green-500 mt-0.5"
                >
                <span class="ml-2 text-sm text-gray-600">
                  Je souhaite recevoir les actualités et conseils anti-gaspillage
                </span>
              </label>
            </div>

            <button
              type="submit"
              :disabled="isLoading || !registerForm.acceptTerms"
              class="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ isLoading ? '⏳ Création...' : '🎯 Créer mon compte' }}
            </button>
          </form>
        </div>

        <!-- Séparateur et connexion sociale -->
        <div class="mt-8">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">Ou continuez avec</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-4">
            <button
              @click="signInWithGoogle"
              class="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-gray-700"
            >
              🔵 Google
            </button>
            <button
              @click="signInWithApple"
              class="w-full flex items-center justify-center px-4 py-3 border-2 border-gray-300 rounded-xl hover:border-gray-700 hover:bg-gray-50 transition-all font-medium text-gray-700"
            >
              🍎 Apple
            </button>
          </div>
        </div>

        <!-- Avantages -->
        <div class="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200">
          <h3 class="font-semibold text-gray-800 mb-4 text-center">🎁 Pourquoi nous rejoindre ?</h3>
          <div class="space-y-3 text-sm">
            <div class="flex items-center text-gray-700">
              <span class="text-green-500 mr-3">✅</span>
              <span>Économisez jusqu'à 70% sur vos courses</span>
            </div>
            <div class="flex items-center text-gray-700">
              <span class="text-green-500 mr-3">✅</span>
              <span>Réduisez votre impact environnemental</span>
            </div>
            <div class="flex items-center text-gray-700">
              <span class="text-green-500 mr-3">✅</span>
              <span>Soutenez le commerce local</span>
            </div>
            <div class="flex items-center text-gray-700">
              <span class="text-green-500 mr-3">✅</span>
              <span>100% gratuit, sans engagement</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const isLogin = ref(true)
const isLoading = ref(false)

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const toggleMode = () => {
  isLogin.value = !isLogin.value
  // Réinitialiser le formulaire
  Object.assign(form, {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
}

const handleSubmit = async () => {
  isLoading.value = true
  
  try {
    if (isLogin.value) {
      await authStore.login({
        email: form.email,
        password: form.password
      })
    } else {
      if (form.password !== form.confirmPassword) {
        throw new Error('Les mots de passe ne correspondent pas')
      }
      
      await authStore.register({
        name: form.name,
        email: form.email,
        password: form.password
      })
    }
    
    // Redirection vers le dashboard ou la page demandée
    const redirect = router.currentRoute.value.query.redirect as string
    router.push(redirect || '/dashboard')
    
  } catch (error) {
    console.error('Erreur d\'authentification:', error)
    // TODO: Afficher une notification d'erreur
  } finally {
    isLoading.value = false
  }
}

const loginWithGoogle = async () => {
  try {
    await authStore.loginWithGoogle()
    router.push('/dashboard')
  } catch (error) {
    console.error('Erreur Google OAuth:', error)
  }
}

const loginWithApple = async () => {
  try {
    await authStore.loginWithApple()
    router.push('/dashboard')
  } catch (error) {
    console.error('Erreur Apple OAuth:', error)
  }
}
</script> 