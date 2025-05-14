# CRM - Backend API

Ce projet constitue la partie backend (API) de l'application CRM, développée avec Django et Django REST Framework.

## Configuration de l'environnement

### Prérequis
- Python 3.8+
- pip (gestionnaire de paquets Python)
- virtualenv (recommandé)

### Installation

1. Cloner le dépôt :
```bash
git clone <url-du-depot>
cd CRM/api
```

2. Créer et activer un environnement virtuel :
```bash
# Sur Windows
python -m venv env
env\Scripts\activate

# Sur macOS/Linux
python -m venv env
source env/bin/activate
```

3. Installer les dépendances :
```bash
pip install -r requirements.txt
```

4. Créer un fichier `.env` à la racine du projet avec les variables suivantes :
```
DEBUG=True
SECRET_KEY=votre-cle-secrete
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8000
DATABASE_URL=sqlite:///db.sqlite3
```

5. Appliquer les migrations :
```bash
python manage.py migrate
```

6. Créer un superutilisateur :
```bash
python manage.py createsuperuser
```

7. Lancer le serveur de développement :
```bash
python manage.py runserver
```

L'API sera accessible à l'adresse : http://localhost:8000/api/

## Structure du projet

- `core/` - Configuration principale du projet Django
- `apps/` - Applications Django modulaires
  - `users/` - Gestion des utilisateurs et authentification
  - `clients/` - Gestion des clients
  - `projets/` - Gestion des projets
  - `opportunites/` - Gestion des opportunités et devis
  - `taches/` - Gestion des tâches
  - `dashboard/` - Tableau de bord et statistiques
  - `rapports/` - Génération de rapports

## Documentation API

La documentation de l'API est générée automatiquement et accessible aux URL suivantes :
- Schéma OpenAPI : `/api/schema/`
- Documentation Swagger : `/api/docs/`

## Commandes utiles

- `python manage.py runserver` - Démarrer le serveur de développement
- `python manage.py migrate` - Appliquer les migrations
- `python manage.py makemigrations` - Créer de nouvelles migrations
- `python manage.py test` - Exécuter les tests
- `python manage.py shell` - Ouvrir un shell Django

## Fonctionnalités

- Gestion complète des clients, projets, opportunités, tâches et devis
- API RESTful avec authentification JWT
- Tableau de bord avec statistiques et KPIs
- Système de rapports détaillés et exports
- Sécurité et permissions avancées

## API Endpoints

### Principaux endpoints

- `/api/auth/login/` - Authentification (JWT)
- `/api/auth/refresh/` - Rafraîchissement du token JWT
- `/api/clients/` - Gestion des clients
- `/api/projets/` - Gestion des projets
- `/api/opportunites/` - Gestion des opportunités
- `/api/taches/` - Gestion des tâches
- `/api/dashboard/stats/` - Statistiques du tableau de bord
- `/api/rapports/` - Rapports et exports

## Sécurité

- Authentification JWT avec tokens de courte durée
- Permissions basées sur les rôles
- Protection CSRF
- Headers de sécurité
- Validation des données
- Rate limiting

## Tests

Exécution des tests:

```bash
python manage.py test
```

## Déploiement

Instructions pour le déploiement en production:

1. Configurer les variables d'environnement de production
2. Utiliser une base de données PostgreSQL
3. Configurer HTTPS avec un certificat SSL valide
4. Utiliser Gunicorn comme serveur WSGI
5. Servir les fichiers statiques avec Nginx ou un CDN

## Licence

Ce projet est sous licence MIT.