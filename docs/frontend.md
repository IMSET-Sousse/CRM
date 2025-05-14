# Frontend (Next.js)

## Pages
- `/login` - Formulaire d'authentification
- `/dashboard` - Accès restreint aux utilisateurs connectés
- `/clients` - Liste + recherche + lien fiche
- `/clients/[id]` - Détail et projets liés
- `/projets` - Liste de tous les projets
- `/opportunites` - Pipeline de vente visuel
- `/opportunites/[id]` - Détail d'une opportunité
- `/taches` - Calendrier et liste des tâches
- `/rapports` - Génération de rapports personnalisés

## Composants clés
- Table de clients/projets (avec tri et pagination)
- Pipeline visuel pour les opportunités
- Calendrier des tâches
- Modale d'ajout rapide
- Bouton "statut" dynamique (ex: switcher En cours → Terminé)
- Générateur de rapports personnalisables
- Layout sécurisé avec getServerSideProps ou middleware

## UI
- TailwindCSS
- Toasts (confirmation, erreurs)
- Skeleton loaders
- Drag and drop pour le pipeline d'opportunités

## Fonctionnalités principales
- Dashboard avec statistiques et visualisations
- Gestion complète des clients et projets
- Pipeline de vente interactif
- Calendrier des tâches et activités
- Génération de rapports personnalisés
- Interface responsive et intuitive
