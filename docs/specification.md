# Spécifications : Projet de Mini CRM – "CRM"
 ## Description du Projet
CRM est une application web de gestion de la relation client (CRM) destinée aux petites équipes commerciales et aux freelances. Elle permet de gérer des clients, des projets associés et leur statut, le tout dans une interface simple, rapide et fluide.
L'application repose sur Next.js (frontend) et Django + DRF (backend API sécurisée).
L'objectif est de fournir un outil minimal mais efficace, extensible à terme vers des fonctionnalités plus avancées (suivi de rendez-vous, rappels, notifications...).


## Besoins Fonctionnels
### Page d'Accueil / Dashboard
La page d'accueil du CRM servira de tableau de bord pour afficher un résumé des informations les plus pertinentes.

#### Résumé des derniers clients ajoutés :

Afficher une liste des derniers clients ajoutés, avec des informations telles que leur nom, l'email, et la date d'ajout.

Limiter cette section aux 5 ou 10 derniers clients ajoutés.

Ces données sont récupérées via l'API Django et affichées sous forme de cartes ou d'une liste simple dans le frontend.

#### Projets récents ou en cours :

Liste des projets en cours ou récents, avec des détails comme le nom du projet, son statut (À faire, En cours, Terminé), et les dates de début et fin.

Afficher un maximum de 5 projets récents ou en cours pour une vue d'ensemble rapide.

#### Statistiques simples :

Total Clients : Nombre total de clients dans le CRM.

Total Projets : Nombre total de projets dans le CRM.

Projets Terminés : Nombre de projets ayant le statut "Terminé".

Projets En Cours : Nombre de projets ayant le statut "En cours".

Opportunités actives : Nombre d'opportunités en cours de négociation.

Taux de conversion : Pourcentage des opportunités converties en projets.

Ces statistiques sont mises à jour en temps réel ou via des appels d'API réguliers pour fournir des données actualisées.

Les statistiques peuvent être affichées sous forme de cartes ou de graphiques simples (par exemple, des compteurs ou des diagrammes à barres).

#### Tableaux de bord analytiques :

Visualisation des performances commerciales.

Suivi des objectifs de vente.

Prévisions de vente basées sur le pipeline actuel.

Analyse du cycle de vente.

### Gestion des Clients
#### Liste paginée, tri et recherche :
Pagination : La liste des clients doit être paginée pour gérer un grand nombre de clients. Chaque page contiendra un nombre fixe de clients (par exemple, 10 clients par page).

Tri : Les utilisateurs doivent pouvoir trier la liste des clients par nom, email, ou date d'ajout.

Recherche : Un champ de recherche permettra de filtrer les clients par nom ou email. Le filtre sera dynamique, offrant des suggestions au fur et à mesure que l'utilisateur tape.

Segmentation : Possibilité de segmenter les clients par catégories personnalisées et d'utiliser l'IA pour une segmentation intelligente de la clientèle.

#### Fiche Client :
Lorsqu'un utilisateur clique sur un client dans la liste, une page de détails s'ouvrira avec les informations suivantes :

Nom du client

Nom de la société (si applicable)

Email (modifiable)

Téléphone (modifiable)

Notes : Des notes personnalisées sur le client, qui peuvent être mises à jour.

Historique des interactions : Journal des communications et interactions avec le client.

Catégorie client : Classification du client selon des critères définis.

#### CRUD Clients :
Créer un client :

Un formulaire permet de saisir les informations du client (nom, email, téléphone, adresse, notes). Ce formulaire sera accessible via un bouton "Ajouter un client".

Modifier un client :

L'utilisateur peut modifier les informations d'un client en accédant à la fiche du client et en cliquant sur un bouton "Modifier".

Supprimer un client :

Un bouton "Supprimer" permettra de supprimer le client et toutes les données associées (projets, notes, etc.). Une confirmation sera demandée avant suppression.

Consulter un client :

Les utilisateurs peuvent consulter les informations du client à partir de la liste des clients.

## Gestion des Projets
### Chaque projet est lié à un client :
Lors de la création d'un projet, l'utilisateur doit associer ce projet à un client existant. Une liste déroulante permettra de sélectionner le client concerné.

### Champs d'un projet :
Nom du projet : Titre du projet.

Description : Description détaillée du projet.

Statut : Le statut du projet (options : "À faire", "En cours", "Terminé").

Date de début et de fin : Ces dates permettent de suivre les périodes des projets.

Budget : Montant prévu pour le projet.

Devis associé : Lien vers le devis ou la proposition commerciale.

### CRUD Projets :
Créer un projet :

Un formulaire permet de saisir les informations du projet et de l'associer à un client.

Modifier un projet :

L'utilisateur peut modifier les informations du projet (nom, description, statut, dates de début et de fin).

Supprimer un projet :

Un bouton de suppression sera disponible sur la fiche d'un projet pour supprimer le projet. Une confirmation sera demandée avant de supprimer définitivement le projet.

Consulter les projets :

Les projets seront affichés dans une liste paginée et triable. On pourra consulter les détails d'un projet en cliquant dessus.

## Gestion des Opportunités
### Pipeline de vente :
Visualisation des opportunités commerciales par étapes (prospect, qualification, proposition, négociation, conclusion).

Déplacement intuitif des opportunités entre les différentes étapes du pipeline.

Calcul automatique des probabilités de conversion basé sur l'étape et l'historique.

### Champs d'une opportunité :
Nom de l'opportunité

Client associé

Montant estimé

Probabilité de conversion

Étape actuelle dans le pipeline

Date de création et date estimée de conclusion

Notes et commentaires

### Gestion des devis et propositions :
Création et édition de devis liés aux opportunités.

Historique des versions des propositions.

Suivi du statut (envoyé, consulté, accepté, refusé).

## Gestion des Tâches
### Planification d'activités :
Création et assignation de tâches liées aux clients ou projets.

Définition de priorités et d'échéances.

Rappels et notifications automatiques.

### Suivi des tâches :
Vue calendrier des activités planifiées.

Marquage des tâches comme complétées.

Historique des tâches réalisées par client/projet.

## Authentification & Permissions
### Connexion / Déconnexion :
L'utilisateur devra se connecter à l'application via un formulaire de connexion avec email et mot de passe.

Déconnexion : Un bouton de déconnexion sera disponible pour mettre fin à la session de l'utilisateur.

### Rôles :
Admin : L'admin aura un accès complet à toutes les fonctionnalités du CRM, y compris la gestion des clients et des projets, et la suppression de données.

Staff : Le staff aura un accès limité. Par exemple, un membre du staff pourra gérer les clients et les projets, mais ne pourra pas supprimer de clients ou de projets.

Les rôles sont définis via un système de permissions au niveau de l'API, permettant de restreindre l'accès aux routes et actions en fonction du rôle de l'utilisateur.

Routes protégées côté Next.js selon rôle :
Admin : Accès complet à toutes les pages et actions du CRM (création, modification, suppression de clients et projets).

Staff : Accès à la gestion des clients et projets, mais aucune suppression autorisée. L'accès à certaines routes sensibles (comme la suppression d'un client ou d'un projet) sera bloqué pour les utilisateurs staff.

## Reporting et Analyses
### Tableaux de bord analytiques :
Visualisation des performances commerciales.

Suivi des objectifs de vente.

Analyse du cycle de vente.

### Rapports personnalisables :
Génération de rapports sur les clients, projets et opportunités.

Filtres avancés pour personnaliser les rapports.

Export des données en différents formats (CSV, PDF, Excel).

### Prévisions de vente :
Calcul des prévisions basé sur le pipeline d'opportunités.

Analyse des tendances.

## Besoins Non Fonctionnels
### Performance
Chargement des pages < 1.5s : Optimisation des performances pour un chargement rapide des pages et des données.

Lazy loading : Les listes de clients et de projets seront chargées de manière progressive (lazy loading) pour ne pas surcharger la page initiale et améliorer l'expérience utilisateur.

### Accessibilité
Responsive : Le CRM sera optimisé pour les appareils mobiles et tablettes, assurant une bonne expérience utilisateur quel que soit le périphérique utilisé.

Navigation au clavier : La navigation doit être entièrement accessible via le clavier, ce qui inclut la possibilité de naviguer entre les champs des formulaires, les listes, et les boutons d'action.

Contrastes respectés : L'interface respectera les normes de contraste afin d'assurer que l'application est accessible aux personnes malvoyantes.

### Interface utilisateur
Design intuitif : Interface claire et facile à utiliser.

Tableau de bord personnalisable : Permettre aux utilisateurs d'ajuster leur dashboard selon leurs besoins.

Mobile First : Conception prioritaire pour les appareils mobiles.

### Sécurité
Authentification sécurisée (JWT ou session) : Utilisation de JSON Web Tokens (JWT) ou de sessions sécurisées pour garantir l'authentification des utilisateurs.

API protégée par permissions DRF : Les routes de l'API Django sont sécurisées en fonction des rôles des utilisateurs, avec des permissions bien définies pour contrôler les accès aux données.

CORS : Les échanges entre le frontend Next.js et le backend Django respecteront les règles CORS afin de garantir la sécurité des données entre les différentes applications.

### Scalabilité
Ajout de modules futurs : L'architecture du projet permettra l'intégration facile de nouveaux modules comme la gestion d'un calendrier, des rappels pour les projets, ou un système de gestion de fichiers.

Architecture claire : Le frontend et le backend seront séparés, ce qui facilitera l'évolution du projet et l'intégration de nouveaux services à l'avenir.



## Spécifications Techniques
### Backend (Django + DRF)
#### Modèles
Client : nom, société, email, téléphone, notes, catégorie.

Projet : client, titre, description, statut, date_début, date_fin, budget, devis_associé.

Opportunité : client, nom, montant, probabilité, étape, date_création, date_conclusion_estimée, notes.

Tâche : titre, description, assigné_à, client_associé, projet_associé, priorité, date_échéance, statut.

Devis : opportunité, montant, date_création, statut, version, contenu.

User (Django) : rôle (is_staff, is_admin).

#### API Endpoints
/api/clients/ : CRUD des clients.

/api/projets/ : CRUD des projets.

/api/opportunites/ : CRUD des opportunités.

/api/taches/ : CRUD des tâches.

/api/devis/ : CRUD des devis.

/api/dashboard/ : Stats et données résumées.

/api/rapports/ : Génération de rapports personnalisés.

/api/auth/ : Authentification (login/logout/token).

#### Auth
Token JWT (via djangorestframework-simplejwt) ou sessions.

Permissions DRF : IsAuthenticated, IsAdminUser, custom.

## Frontend (Next.js)
### Pages
/login : Formulaire d'auth.

/dashboard : Accès restreint aux utilisateurs connectés.

/clients : Liste + recherche + lien fiche.

/clients/[id] : Détail et projets liés.

/projets : Liste de tous les projets.

/opportunites : Pipeline de vente visuel.

/opportunites/[id] : Détail d'une opportunité.

/taches : Calendrier et liste des tâches.

/rapports : Génération de rapports personnalisés.

#### Composants clés
Table de clients/projets (avec tri et pagination).

Pipeline visuel pour les opportunités.

Calendrier des tâches.

Modale d'ajout rapide.

Bouton "statut" dynamique (ex: switcher En cours → Terminé).

Générateur de rapports personnalisables.

Layout sécurisé avec getServerSideProps ou middleware.

#### UI
TailwindCSS.

Toasts (confirmation, erreurs).

Skeleton loaders.

Drag and drop pour le pipeline d'opportunités.

## Livrables
### Application Fonctionnelle
Authentification et gestion des permissions.

CRUD complet côté clients/projets/opportunités/tâches.

Interface responsive et intuitive.

Dashboard avec statistiques et visualisations.

Pipeline de vente visuel.

Système de génération de rapports.

### Documentation
README avec instructions de déploiement.

Documentation API (DRF + Swagger ou Redoc).

Guide utilisateur (PDF ou page /docs).

### Code Source
Organisation claire :

pages/, components/, services/ (Next.js)

apps/clients/, apps/projets/, apps/opportunites/, apps/taches/ (Django)

Git avec branches de fonctionnalités.

Conventions PEP8 (backend) et ESLint/Prettier (frontend).
