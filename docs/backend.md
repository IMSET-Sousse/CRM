# Backend (Django + DRF)

## Models
### Client
- **Champs**: id, nom, société, email, téléphone, notes, catégorie, date_création, date_modification
- **Relations**: OneToMany avec Projet, OneToMany avec Opportunité, OneToMany avec Tâche
- **Validations**: Email unique, format téléphone valide, nom obligatoire
- **Méthodes**: get_projets_actifs(), get_opportunites_actives(), calculate_valeur_client()

### Projet
- **Champs**: id, titre, description, statut (choix: "À faire", "En cours", "Terminé"), date_début, date_fin, budget, devis_associé, date_création, date_modification
- **Relations**: ManyToOne avec Client, OneToMany avec Tâche
- **Validations**: Titre obligatoire, date_fin > date_début, client obligatoire
- **Méthodes**: get_duree(), get_taches_associees(), is_en_retard()

### Opportunité
- **Champs**: id, nom, client, montant, probabilité, étape (choix: "prospect", "qualification", "proposition", "négociation", "conclusion"), date_création, date_conclusion_estimée, notes, date_modification
- **Relations**: ManyToOne avec Client, OneToMany avec Devis
- **Validations**: Nom obligatoire, client obligatoire, probabilité entre 0-100%
- **Méthodes**: calculate_valeur_ponderee(), get_devis_actif(), advance_stage()

### Tâche
- **Champs**: id, titre, description, assigné_à, client_associé, projet_associé, priorité (choix: "Basse", "Moyenne", "Haute", "Urgente"), date_échéance, statut (choix: "À faire", "En cours", "Terminée"), date_création, date_modification
- **Relations**: ManyToOne avec User, ManyToOne avec Client, ManyToOne avec Projet (optionnel)
- **Validations**: Titre obligatoire, date_échéance obligatoire, priorité obligatoire
- **Méthodes**: mark_completed(), is_overdue(), reassign_to(user)

### Devis
- **Champs**: id, opportunité, montant, date_création, statut (choix: "Brouillon", "Envoyé", "Consulté", "Accepté", "Refusé"), version, contenu, date_modification
- **Relations**: ManyToOne avec Opportunité
- **Validations**: Opportunité obligatoire, montant > 0
- **Méthodes**: generate_pdf(), send_to_client(), create_new_version()

### User (Django)
- **Champs**: Standard Django User + rôle (is_staff, is_admin), département, téléphone
- **Relations**: OneToMany avec Tâche (assigné_à)
- **Permissions**: Basées sur groupes et permissions Django

## API Endpoints
### Clients
- `GET /api/clients/` - Liste des clients (filtrable, paginée)
- `POST /api/clients/` - Création d'un client
- `GET /api/clients/{id}/` - Détail d'un client
- `PUT /api/clients/{id}/` - Mise à jour complète d'un client
- `PATCH /api/clients/{id}/` - Mise à jour partielle d'un client
- `DELETE /api/clients/{id}/` - Suppression d'un client
- `GET /api/clients/{id}/projets/` - Liste des projets d'un client
- `GET /api/clients/{id}/opportunites/` - Liste des opportunités d'un client
- `GET /api/clients/{id}/taches/` - Liste des tâches associées à un client

### Projets
- `GET /api/projets/` - Liste des projets (filtrable, paginée)
- `POST /api/projets/` - Création d'un projet
- `GET /api/projets/{id}/` - Détail d'un projet
- `PUT /api/projets/{id}/` - Mise à jour complète d'un projet
- `PATCH /api/projets/{id}/` - Mise à jour partielle d'un projet
- `DELETE /api/projets/{id}/` - Suppression d'un projet
- `GET /api/projets/{id}/taches/` - Liste des tâches associées à un projet

### Opportunités
- `GET /api/opportunites/` - Liste des opportunités (filtrable par étape, paginée)
- `POST /api/opportunites/` - Création d'une opportunité
- `GET /api/opportunites/{id}/` - Détail d'une opportunité
- `PUT /api/opportunites/{id}/` - Mise à jour complète d'une opportunité
- `PATCH /api/opportunites/{id}/` - Mise à jour partielle d'une opportunité
- `DELETE /api/opportunites/{id}/` - Suppression d'une opportunité
- `GET /api/opportunites/{id}/devis/` - Liste des devis d'une opportunité
- `POST /api/opportunites/{id}/avancer-etape/` - Avancer l'étape d'une opportunité

### Tâches
- `GET /api/taches/` - Liste des tâches (filtrable, paginée)
- `POST /api/taches/` - Création d'une tâche
- `GET /api/taches/{id}/` - Détail d'une tâche
- `PUT /api/taches/{id}/` - Mise à jour complète d'une tâche
- `PATCH /api/taches/{id}/` - Mise à jour partielle d'une tâche
- `DELETE /api/taches/{id}/` - Suppression d'une tâche
- `PATCH /api/taches/{id}/complete/` - Marquer une tâche comme terminée

### Devis
- `GET /api/devis/` - Liste des devis (filtrable, paginée)
- `POST /api/devis/` - Création d'un devis
- `GET /api/devis/{id}/` - Détail d'un devis
- `PUT /api/devis/{id}/` - Mise à jour complète d'un devis
- `PATCH /api/devis/{id}/` - Mise à jour partielle d'un devis
- `DELETE /api/devis/{id}/` - Suppression d'un devis
- `POST /api/devis/{id}/envoyer/` - Envoyer un devis au client
- `POST /api/devis/{id}/nouvelle-version/` - Créer une nouvelle version d'un devis

### Dashboard
- `GET /api/dashboard/stats/` - Statistiques globales (total clients, projets, etc.)
- `GET /api/dashboard/projets-recents/` - Liste des projets récents
- `GET /api/dashboard/clients-recents/` - Liste des clients récemment ajoutés
- `GET /api/dashboard/opportunites-actives/` - Liste des opportunités actives
- `GET /api/dashboard/taches-a-venir/` - Liste des tâches à venir
- `GET /api/dashboard/performance/` - Données de performance (taux de conversion, etc.)

### Rapports
- `GET /api/rapports/clients/` - Rapport sur les clients (filtrable)
- `GET /api/rapports/projets/` - Rapport sur les projets (filtrable)
- `GET /api/rapports/opportunites/` - Rapport sur les opportunités (filtrable)
- `GET /api/rapports/pipeline/` - Rapport sur le pipeline de vente
- `GET /api/rapports/performances/` - Rapport sur les performances commerciales
- `POST /api/rapports/export/` - Exporter un rapport en CSV/Excel/PDF

### Authentication
- `POST /api/auth/login/` - Connexion (obtention de token JWT)
- `POST /api/auth/refresh/` - Rafraîchissement du token JWT
- `POST /api/auth/logout/` - Déconnexion (invalidation du token)
- `GET /api/auth/user/` - Informations sur l'utilisateur connecté
- `PUT /api/auth/password/change/` - Changement de mot de passe

## Authentication & Sécurité
- Token JWT (via djangorestframework-simplejwt)
  - Durée de validité: Access token (15min), Refresh token (7 jours)
  - Stockage sécurisé côté client (httpOnly cookies)
- Permissions DRF:
  - IsAuthenticated - Pour toutes les routes
  - IsAdminUser - Pour les opérations sensibles (suppression)
  - CustomPermissions - Pour la gestion des rôles spécifiques
- Sécurité:
  - Validation des données d'entrée
  - Protection CSRF
  - Rate limiting sur les endpoints sensibles
  - Logging des actions sensibles
  - Sanitization des données utilisateur
  - Filtrage des données selon le rôle de l'utilisateur

## Architecture et Performance
- Structure modulaire par applications Django (clients, projets, opportunites, taches, devis)
- Utilisation de serializers pour validation et transformation des données
- Optimisation des requêtes avec select_related() et prefetch_related()
- Mise en cache des données fréquemment accédées
- Pagination pour limiter la taille des réponses API
- Filtrage côté serveur pour réduire le volume de données transférées
- Documentation API automatique avec Swagger/OpenAPI

## Validation et Gestion des Erreurs
- Validation des données via serializers DRF
- Gestion centralisée des exceptions avec des réponses d'erreur standardisées
- Messages d'erreur explicites et localisés
- Journalisation des erreurs avec différents niveaux de gravité
- Tests unitaires et d'intégration pour les cas limites

## Base de Données
- Migrations Django pour la gestion du schéma
- Indexation des champs fréquemment recherchés
- Transactions pour les opérations critiques
- Contraintes d'intégrité au niveau de la base de données
- Sauvegarde régulière des données
 