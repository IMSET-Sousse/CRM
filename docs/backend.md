# Backend (Django + DRF)

## Models
- **Client**: nom, société, email, téléphone, notes, catégorie
- **Projet**: client, titre, description, statut, date_début, date_fin, budget, devis_associé
- **Opportunité**: client, nom, montant, probabilité, étape, date_création, date_conclusion_estimée, notes
- **Tâche**: titre, description, assigné_à, client_associé, projet_associé, priorité, date_échéance, statut
- **Devis**: opportunité, montant, date_création, statut, version, contenu
- **User (Django)**: rôle (is_staff, is_admin)

## API Endpoints
- `/api/clients/` - CRUD des clients
- `/api/projets/` - CRUD des projets
- `/api/opportunites/` - CRUD des opportunités
- `/api/taches/` - CRUD des tâches
- `/api/devis/` - CRUD des devis
- `/api/dashboard/` - Stats et données résumées
- `/api/rapports/` - Génération de rapports personnalisés
- `/api/auth/` - Authentification (login/logout/token)

## Authentication
- Token JWT (via djangorestframework-simplejwt) ou sessions
- Permissions DRF: IsAuthenticated, IsAdminUser, custom permissions

## Technical Requirements
- Performance optimization for API responses
- Secure authentication system
- Proper permission handling
- Clean code architecture with Django best practices
- Comprehensive test coverage
