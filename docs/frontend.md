# Frontend (Next.js)

## Pages
- `/login` - Formulaire d'authentification avec email et mot de passe, validation des champs, gestion des erreurs et redirection après connexion réussie
- `/dashboard` - Accès restreint aux utilisateurs connectés, affichage de statistiques clés (clients, projets, opportunités), derniers clients ajoutés (5-10), projets récents/en cours, et graphiques analytiques
- `/clients` - Liste paginée des clients avec fonctionnalités de recherche par nom/email, tri par colonnes (nom, email, date d'ajout), et bouton d'ajout de nouveau client
- `/clients/[id]` - Détail d'un client avec informations complètes (nom, société, email, téléphone, notes), liste des projets associés, boutons de modification et suppression
- `/projets` - Liste de tous les projets avec pagination, filtres par statut, tri par dates ou client, et affichage du statut visuel (À faire, En cours, Terminé)
- `/projets/[id]` - Détail d'un projet incluant toutes les informations (client associé, description, statut, dates, budget) et options de mise à jour
- `/opportunites` - Pipeline de vente visuel avec colonnes par étape (prospect, qualification, proposition, négociation, conclusion) et fonctionnalité drag-and-drop
- `/opportunites/[id]` - Détail d'une opportunité avec informations complètes (client, montant, probabilité, étape, dates) et gestion des devis associés
- `/taches` - Calendrier interactif et liste des tâches avec filtres par priorité, date d'échéance, statut et client/projet associé
- `/rapports` - Générateur de rapports personnalisés avec filtres, options d'export (CSV, PDF, Excel) et visualisations graphiques

## Composants clés
- Layout principal - Conteneur avec navbar, sidebar et système d'authentification intégré
- Tableau de données - Composant réutilisable pour afficher clients/projets avec tri, pagination et recherche
- Formulaires CRUD - Composants de formulaires pour création/édition de clients, projets, opportunités et tâches
- Pipeline visuel - Tableau kanban interactif pour les opportunités avec colonnes par étape et cartes déplaçables
- Calendrier des tâches - Composant calendrier avec vue mensuelle, hebdomadaire, quotidienne et marqueurs d'événements
- Modale d'ajout rapide - Fenêtre modale pour ajouter rapidement un client, projet, opportunité ou tâche sans changer de page
- Bouton "statut" dynamique - Composant pour changer visuellement et facilement le statut d'un projet/tâche
- Charts analytiques - Composants graphiques pour visualisation des données (barres, camemberts, lignes)
- Générateur de rapports - Interface interactive pour personnaliser et générer des rapports
- Layout sécurisé - HOC ou middleware Next.js pour protéger les routes en fonction du rôle utilisateur

## UI
- TailwindCSS - Framework CSS pour design cohérent et responsive
- Palette de couleurs - Couleurs primaires, secondaires, d'accentuation et sémantiques (succès, erreur, avertissement)
- Toasts - Notifications temporaires pour confirmations et erreurs
- Skeleton loaders - Placeholders animés pendant le chargement des données
- Drag and drop - Interaction intuitive pour le pipeline d'opportunités
- Responsive design - Interface adaptative pour mobile, tablette et desktop
- Dark mode - Option de thème sombre/clair
- Accessibilité - Contraste adéquat, navigation au clavier, attributs ARIA

## Fonctionnalités principales
- Dashboard avec statistiques et visualisations
  - Widgets personnalisables
  - KPIs clés (clients, projets, opportunités)
  - Graphiques de tendances
  - Alertes et rappels
- Gestion complète des clients et projets
  - CRUD complet
  - Recherche avancée
  - Filtres et tri multiples
  - Export de données
- Pipeline de vente interactif
  - Visualisation par étapes
  - Calcul automatique des probabilités
  - Statistiques par étape
  - Prévisions de vente
- Calendrier des tâches et activités
  - Vues multiples (jour, semaine, mois)
  - Rappels et notifications
  - Assignation et suivi
  - Historique des tâches par client/projet
- Génération de rapports personnalisés
  - Filtres avancés
  - Export multi-formats
  - Graphiques dynamiques
  - Modèles de rapports réutilisables
- Interface responsive et intuitive
  - Mobile-first design
  - Performance optimisée (< 1.5s de chargement)
  - Navigation fluide
  - Lazy loading des listes

## Sécurité et Performance
- Protection des routes - Middleware Next.js avec vérification JWT/session
- Permissions par rôle - Affichage conditionnel et restrictions d'accès selon le rôle utilisateur
- Optimisation des performances - Code splitting, lazy loading, mise en cache des données
- Validations frontend - Vérification des entrées utilisateur avant envoi API

