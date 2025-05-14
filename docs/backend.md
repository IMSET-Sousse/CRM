# Backend (Django + DRF)

## Models
- **Client**
  - nom: CharField (obligatoire)
  - société: CharField (optionnel)
  - email: EmailField (obligatoire, unique)
  - téléphone: CharField (optionnel)
  - notes: TextField (optionnel)
  - catégorie: CharField avec choix ou ForeignKey vers modèle Catégorie
  - date_création: DateTimeField (auto_now_add)
  - dernière_modification: DateTimeField (auto_now)

- **Projet**
  - client: ForeignKey vers Client (obligatoire)
  - titre: CharField (obligatoire)
  - description: TextField (optionnel)
  - statut: CharField avec choix ["À faire", "En cours", "Terminé"] (obligatoire)
  - date_début: DateField (obligatoire)
  - date_fin: DateField (optionnel)
  - budget: DecimalField (optionnel)
  - devis_associé: ForeignKey vers Devis (optionnel)
  - date_création: DateTimeField (auto_now_add)
  - dernière_modification: DateTimeField (auto_now)

- **Opportunité**
  - client: ForeignKey vers Client (obligatoire)
  - nom: CharField (obligatoire)
  - montant: DecimalField (obligatoire)
  - probabilité: IntegerField (0-100%) (obligatoire)
  - étape: CharField avec choix ["prospect", "qualification", "proposition", "négociation", "conclusion"] (obligatoire)
  - date_création: DateTimeField (auto_now_add)
  - date_conclusion_estimée: DateField (optionnel)
  - notes: TextField (optionnel)
  - dernière_modification: DateTimeField (auto_now)

- **Tâche**
  - titre: CharField (obligatoire)
  - description: TextField (optionnel)
  - assigné_à: ForeignKey vers User (obligatoire)
  - client_associé: ForeignKey vers Client (optionnel)
  - projet_associé: ForeignKey vers Projet (optionnel)
  - priorité: CharField avec choix ["Basse", "Moyenne", "Haute", "Urgente"] (obligatoire)
  - date_échéance: DateTimeField (obligatoire)
  - statut: CharField avec choix ["À faire", "En cours", "Terminée"] (obligatoire)
  - date_création: DateTimeField (auto_now_add)
  - dernière_modification: DateTimeField (auto_now)

- **Devis**
  - opportunité: ForeignKey vers Opportunité (obligatoire)
  - montant: DecimalField (obligatoire)
  - date_création: DateTimeField (auto_now_add)
  - statut: CharField avec choix ["Brouillon", "Envoyé", "Consulté", "Accepté", "Refusé"] (obligatoire)
  - version: IntegerField (pour suivi des versions) (obligatoire)
  - contenu: JSONField ou TextField (pour stocker le contenu détaillé) (obligatoire)
  - date_dernière_modification: DateTimeField (auto_now)

- **User (Django)**
  - Extension du modèle Django User avec:
  - is_admin: BooleanField (autorisations complètes)
  - is_staff: BooleanField (autorisations limitées)
  - autres champs personnalisés (photo de profil, titre, etc.)

## API Endpoints

### Clients
- `GET /api/clients/` - Liste paginée des clients avec filtres (nom, email, catégorie)
- `POST /api/clients/` - Création d'un nouveau client
- `GET /api/clients/{id}/` - Détails d'un client spécifique
- `PUT/PATCH /api/clients/{id}/` - Mise à jour d'un client
- `DELETE /api/clients/{id}/` - Suppression d'un client
- `GET /api/clients/{id}/projets/` - Liste des projets liés à un client
- `GET /api/clients/{id}/opportunites/` - Liste des opportunités liées à un client
- `GET /api/clients/{id}/taches/` - Liste des tâches associées à un client

### Projets
- `GET /api/projets/` - Liste paginée des projets avec filtres (statut, client, dates)
- `POST /api/projets/` - Création d'un nouveau projet
- `GET /api/projets/{id}/` - Détails d'un projet spécifique
- `PUT/PATCH /api/projets/{id}/` - Mise à jour d'un projet
- `DELETE /api/projets/{id}/` - Suppression d'un projet
- `GET /api/projets/{id}/taches/` - Liste des tâches associées à un projet
- `POST /api/projets/{id}/taches/` - Ajout rapide d'une tâche liée au projet

### Opportunités
- `GET /api/opportunites/` - Liste paginée des opportunités avec filtres (étape, client, montant)
- `POST /api/opportunites/` - Création d'une nouvelle opportunité
- `GET /api/opportunites/{id}/` - Détails d'une opportunité spécifique
- `PUT/PATCH /api/opportunites/{id}/` - Mise à jour d'une opportunité
- `DELETE /api/opportunites/{id}/` - Suppression d'une opportunité
- `GET /api/opportunites/{id}/devis/` - Liste des devis associés à une opportunité
- `POST /api/opportunites/{id}/devis/` - Création d'un devis lié à l'opportunité
- `PATCH /api/opportunites/{id}/etape/` - Mise à jour rapide de l'étape (pour drag & drop du pipeline)

### Tâches
- `GET /api/taches/` - Liste paginée des tâches avec filtres (statut, priorité, dates, assignation)
- `POST /api/taches/` - Création d'une nouvelle tâche
- `GET /api/taches/{id}/` - Détails d'une tâche spécifique
- `PUT/PATCH /api/taches/{id}/` - Mise à jour d'une tâche
- `DELETE /api/taches/{id}/` - Suppression d'une tâche
- `PATCH /api/taches/{id}/statut/` - Mise à jour rapide du statut d'une tâche
- `GET /api/taches/calendar/` - Vue calendrier des tâches (format adapté)

### Devis
- `GET /api/devis/` - Liste paginée des devis avec filtres (statut, client, montant)
- `POST /api/devis/` - Création d'un nouveau devis
- `GET /api/devis/{id}/` - Détails d'un devis spécifique
- `PUT/PATCH /api/devis/{id}/` - Mise à jour d'un devis
- `DELETE /api/devis/{id}/` - Suppression d'un devis
- `PATCH /api/devis/{id}/statut/` - Mise à jour rapide du statut d'un devis
- `POST /api/devis/{id}/duplicate/` - Création d'une nouvelle version d'un devis existant

### Dashboard
- `GET /api/dashboard/stats/` - Statistiques générales (compteurs, KPIs)
- `GET /api/dashboard/clients-recents/` - Liste des derniers clients ajoutés
- `GET /api/dashboard/projets-recents/` - Liste des projets récents ou en cours
- `GET /api/dashboard/opportunites-pipeline/` - Distribution des opportunités par étape
- `GET /api/dashboard/revenus/` - Données de revenus (réalisés, prévus)
- `GET /api/dashboard/taches-a-venir/` - Tâches à venir (7 prochains jours)

### Rapports
- `GET /api/rapports/clients/` - Rapport détaillé sur les clients avec filtres personnalisés
- `GET /api/rapports/projets/` - Rapport détaillé sur les projets avec filtres personnalisés
- `GET /api/rapports/opportunites/` - Rapport sur les opportunités et le pipeline de vente
- `GET /api/rapports/revenus/` - Rapport d'analyse des revenus (périodes, tendances)
- `POST /api/rapports/export/` - Export de données filtrées en CSV, PDF ou Excel

### Authentication
- `POST /api/auth/login/` - Authentification et génération de token JWT
- `POST /api/auth/logout/` - Déconnexion (invalidation de token)
- `POST /api/auth/refresh/` - Rafraîchissement d'un token expiré
- `GET /api/auth/me/` - Informations sur l'utilisateur connecté
- `PATCH /api/auth/password/` - Changement de mot de passe

## Authentication
- **Token JWT** (via djangorestframework-simplejwt)
  - Durée de validité: access token 15 minutes, refresh token 7 jours
  - Stockage sécurisé côté client (httpOnly cookies ou localStorage avec précautions)
  - Rotation des tokens de rafraîchissement pour éviter les compromissions
  
- **Permissions DRF**
  - IsAuthenticated - Base pour toutes les routes d'API
  - IsAdminUser - Pour les opérations sensibles (suppression, export massif)
  - Permissions personnalisées:
    - IsOwnerOrReadOnly - Pour les ressources appartenant à un utilisateur spécifique
    - IsStaffOrAdmin - Pour les actions autorisées aux équipes internes
    - CanViewClient/Project - Pour les permissions granulaires basées sur les rôles

## Sécurité
- Protection CSRF pour les requêtes non-GET
- Validation stricte des données d'entrée
- Rate limiting pour prévenir les attaques par force brute
- Sanitisation des données sensibles dans les réponses API
- Cryptage des données sensibles en base de données
- Journalisation des actions sensibles (audit trail)
- Headers de sécurité configurés (HSTS, Content-Security-Policy, etc.)

## Performance
- Optimisation des requêtes avec select_related() et prefetch_related()
- Mise en cache des réponses API fréquemment demandées
- Pagination pour les listes volumineuses
- Utilisation de APIView ou ViewSets selon les besoins d'optimisation
- Monitoring des performances et temps de réponse
- Optimisation des requêtes N+1 avec Django Debug Toolbar
- Indexation correcte des champs fréquemment recherchés

## Structure du Projet
- Organisation par apps Django fonctionnelles:
  - `apps/clients/` - Modèles, vues, sérialiseurs pour clients
  - `apps/projets/` - Modèles, vues, sérialiseurs pour projets
  - `apps/opportunites/` - Modèles, vues, sérialiseurs pour opportunités et devis
  - `apps/taches/` - Modèles, vues, sérialiseurs pour tâches et calendrier
  - `apps/users/` - Extension du modèle User et authentification
  - `apps/dashboard/` - Vues agrégées pour le tableau de bord
  - `apps/rapports/` - Génération et export de rapports

## Tests
- Tests unitaires pour modèles et logique métier
- Tests d'intégration pour l'API avec APITestCase
- Tests de sécurité pour les points d'entrée sensibles
- Couverture de code minimale de 80%
- Tests de performance pour les endpoints critiques

## Documentation
- Documentation API automatique avec drf-spectacular ou drf-yasg (Swagger/OpenAPI)
- Documentation interne des fonctions et classes avec docstrings
- README détaillé pour setup et développement
- Commentaires pour les sections complexes du code
