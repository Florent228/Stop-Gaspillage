# 🌱 Stop-Gaspillage

**Plateforme de lutte contre le gaspillage alimentaire avec analyse d'impact environnemental par IA**

Une application web Vue.js moderne et épurée qui révolutionne la façon dont nous abordons le gaspillage alimentaire en utilisant l'intelligence artificielle pour mesurer et optimiser notre impact environnemental.

## 📋 Table des matières

- [🎯 Fonctionnalités](#-fonctionnalités)
- [🏗️ Architecture](#️-architecture)
- [🚀 Installation](#-installation)
- [💻 Développement](#-développement)
- [🧪 Tests](#-tests)
- [📱 PWA](#-pwa)
- [🎨 Design System](#-design-system)
- [🔧 API](#-api)
- [📊 Performances](#-performances)
- [🤝 Contribution](#-contribution)

## 🎯 Fonctionnalités

### 🏠 **Landing Page**
- Header sticky avec navigation fluide
- Hero section avec animations de compteurs en temps réel
- 3 cartes de bénéfices avec interactions au hover
- Démonstration IA interactive
- Footer complet avec liens utiles

### 🔐 **Authentification**
- Connexion/Inscription avec validation en temps réel
- OAuth2 PKCE (Google & Apple)
- Types de compte : Particulier, Commerçant, Association
- Micro-copies rassurantes et UX optimisée

### 📊 **Tableau de bord utilisateur**
- KPI environnementaux avec graphiques animés
- Courbes d'évolution temporelle (Chart.js)
- Dernières offres et réservations
- Système de badges gamifiés

### ➕ **Création d'offres**
- Formulaire multi-étapes avec progression visuelle
- Upload d'images avec prévisualisation
- Analyse d'impact IA en temps réel
- Jauge d'impact circulaire dynamique

### 🛒 **Marketplace**
- Recherche et filtres avancés
- Carte interactive avec clustering (Leaflet)
- Cards d'offres avec informations détaillées
- Modal de détails avec réservation

### 📋 **Réservation & Confirmation**
- Récapitulatif complet de l'offre
- Détails logistiques et contact
- Calcul d'impact de la réservation
- Confirmation avec code de récupération

### 📈 **Historique & Impact**
- Timeline verticale des actions
- Graphiques d'impact cumulé
- Badges de progression visuels
- Comparaison communautaire

### 🛡️ **Administration**
- Gestion des utilisateurs et modération
- Suivi des offres signalées
- Statistiques globales détaillées
- Tableau de bord administrateur

### 🎓 **Sensibilisation écologique**
- Quiz interactifs sur le gaspillage
- Infographies animées
- Simulateur d'impact personnalisé
- Contenu éducatif vidéo

## 🏗️ Architecture

### **Frontend Stack**
- **Vue 3** avec Composition API
- **TypeScript** pour le typage statique
- **Pinia** pour la gestion d'état
- **Vue Router** pour la navigation
- **TailwindCSS** pour les styles
- **Vite** comme bundler et serveur de dev

### **Bibliothèques principales**
- **Chart.js + vue-chartjs** - Graphiques et visualisations
- **Leaflet + vue3-leaflet** - Cartes interactives
- **Axios** - Requêtes HTTP avec intercepteurs
- **VeeValidate + Yup** - Validation de formulaires
- **HeadlessUI** - Composants accessibles
- **HeroIcons** - Icônes SVG optimisées

### **Structure du projet**
```
src/
├── assets/           # Images, styles globaux
├── components/       # Composants réutilisables
│   ├── common/      # Composants génériques
│   ├── forms/       # Composants de formulaires
│   ├── landing/     # Composants de la landing page
│   └── layout/      # Composants de mise en page
├── composables/     # Logique réutilisable
├── router/          # Configuration des routes
├── services/        # Services API et utilitaires
├── stores/          # Stores Pinia (état global)
├── types/           # Définitions TypeScript
├── utils/           # Fonctions utilitaires
└── views/           # Pages de l'application
```

## 🚀 Installation

### Prérequis
- **Node.js** 18+ 
- **npm** ou **pnpm**
- **Git**

### Installation des dépendances
```bash
# Cloner le repository
git clone https://github.com/votre-org/stop-gaspillage.git
cd stop-gaspillage

# Installer les dépendances
npm install
# ou
pnpm install
```

### Variables d'environnement
Créer un fichier `.env.local` :
```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_APPLE_CLIENT_ID=your_apple_client_id
VITE_MAP_API_KEY=your_map_api_key
```

## 💻 Développement

### Commandes disponibles

```bash
# Démarrer le serveur de développement
npm run dev

# Build de production
npm run build

# Aperçu du build
npm run preview

# Linting et formatage
npm run lint

# Tests unitaires
npm run test

# Tests E2E
npm run test:e2e
```

### Standards de développement

#### **Code Style**
- **ES6+** : utilisation de let/const, arrow functions, spread operator
- **Composition API** pour tous les composants Vue
- **TypeScript strict** avec typage explicite
- **Commentaires en français** pour la logique complexe

#### **Conventions de nommage**
- **camelCase** pour variables et fonctions
- **PascalCase** pour composants et types
- **kebab-case** pour fichiers et dossiers
- **SCREAMING_SNAKE_CASE** pour constantes

#### **Structure des composants**
```vue
<template>
  <!-- Template HTML avec classes TailwindCSS -->
</template>

<script setup lang="ts">
// Imports
// Types et interfaces
// Props et émissions
// Stores et services
// État réactif
// Computed
// Méthodes
// Lifecycle hooks
</script>

<style scoped>
/* Styles spécifiques si nécessaire */
</style>
```

## 🧪 Tests

### Tests unitaires (Vitest)
```bash
# Lancer les tests
npm run test

# Mode watch
npm run test:watch

# Coverage
npm run test:coverage
```

### Tests E2E (Playwright)
```bash
# Installation des navigateurs
npx playwright install

# Lancer les tests E2E
npm run test:e2e

# Interface UI
npm run test:e2e:ui
```

### Structure des tests
- Tests unitaires dans `src/**/__tests__/`
- Tests E2E dans `tests/e2e/`
- Fixtures et mocks dans `tests/fixtures/`

## 📱 PWA

L'application est configurée comme PWA avec :

- **Manifest** pour l'installation
- **Service Worker** pour le cache
- **Offline support** pour les fonctionnalités critiques
- **Push notifications** pour les alertes

### Configuration PWA
- Icônes adaptatives (192x192, 512x512)
- Thème couleur éco-responsable
- Mode standalone
- Cache des assets statiques

## 🎨 Design System

### Palette de couleurs éco-responsables
```css
:root {
  --eco-green: #2E7D32;      /* Vert forêt principal */
  --eco-beige: #FAF7F0;      /* Beige neutre */
  --eco-gray: #444444;       /* Gris foncé */
  --eco-orange: #FF8A65;     /* Orange doux */
  --eco-blue: #64B5F6;       /* Bleu doux */
  --eco-light-green: #81C784;/* Vert clair */
  --eco-dark-green: #1B5E20; /* Vert sombre */
}
```

### Typographie
- **Font principale** : Inter (sans-serif)
- **Font secondaire** : Nunito (sans-serif)
- **Hiérarchie** : h1 (4xl-7xl) → h6 (lg)
- **Line-height** : 1.5 pour le corps, 1.2 pour les titres

### Composants de base
- **Boutons** : `.btn-primary`, `.btn-secondary`, `.btn-outline`
- **Cards** : `.card` avec variants hover
- **Inputs** : `.input-primary` avec focus states
- **Animations** : 200ms ease-out pour les transitions

### Spacing et layout
- **Container** : `.container-eco` (max-w-7xl, padding responsive)
- **Spacing scale** : 4px base (1-128)
- **Breakpoints** : sm(640px), md(768px), lg(1024px), xl(1280px)

## 🔧 API

### Structure des endpoints
```
/api/v1/
├── /auth              # Authentification
├── /users             # Gestion utilisateurs
├── /offers            # Offres alimentaires
├── /reservations      # Réservations
├── /impact            # Analyse d'impact IA
└── /admin             # Administration
```

### Formats de réponse
```typescript
interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
  errors?: string[]
}

interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
```

### Authentification
- **JWT Bearer tokens** dans les headers
- **Refresh tokens** automatiques
- **OAuth2 PKCE** pour Google/Apple
- **Rate limiting** et protection CSRF

## 📊 Performances

### Objectifs Lighthouse
- **Performance** : ≥ 90
- **Accessibility** : ≥ 95
- **Best Practices** : ≥ 90
- **SEO** : ≥ 90

### Optimisations
- **LCP** ≤ 2.5s (Hero section optimisée)
- **CLS** < 0.10 (Layout shifts minimisés)
- **Bundle size** < 170kB (Tree shaking + code splitting)
- **Images** : WebP + lazy loading
- **Fonts** : Préchargement + font-display: swap

### Monitoring
- **Analyse bundle** : `npm run analyze`
- **Performance audit** : Lighthouse CI
- **Error tracking** : Sentry (optionnel)

## 🌍 Accessibilité (RGAA AA)

- **Contraste** : Ratio 4.5:1 minimum
- **Navigation clavier** : Tab, Enter, Escape
- **Screen readers** : ARIA labels et descriptions
- **Focus management** : Visible et logique
- **Responsive** : 320px → 1440px+

## 🤝 Contribution

### Workflow Git
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push vers la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

### Standards de commit
```
feat: nouvelle fonctionnalité
fix: correction de bug
docs: mise à jour documentation
style: formatage code
refactor: refactoring
test: ajout/modification tests
chore: tâches de maintenance
```

### Code Review
- Tests requis pour nouveaux features
- Coverage minimum 80%
- Respect des standards ESLint
- Design review pour nouveaux composants

---

## 📞 Support

- **Documentation** : [docs.stop-gaspillage.fr](https://docs.stop-gaspillage.fr)
- **Issues** : [GitHub Issues](https://github.com/votre-org/stop-gaspillage/issues)
- **Discussions** : [GitHub Discussions](https://github.com/votre-org/stop-gaspillage/discussions)

---

**Développé avec ❤️ pour un monde plus durable** 🌍♻️

---

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails. 