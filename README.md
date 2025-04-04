# Application Mosquées à Proximité

Cette application web progressive (PWA) permet de trouver les mosquées à proximité de votre position actuelle. Elle utilise uniquement des services gratuits et est optimisée pour les appareils mobiles.

## Fonctionnalités

- Géolocalisation de l'utilisateur
- Affichage des mosquées dans un rayon de 5 km avec des icônes représentatives de mosquées
- Liste des mosquées triées par distance
- Possibilité de voir la position sur la carte
- Informations détaillées sur chaque mosquée (nom, adresse, distance)
- Bouton d'itinéraire vers chaque mosquée (via Google Maps)
- Fonctionne hors ligne après le premier chargement
- Installation possible sur l'écran d'accueil (PWA)
- Support complet des appareils mobiles

## Technologies utilisées

- HTML, CSS, JavaScript
- Leaflet.js pour la cartographie
- OpenStreetMap comme fournisseur de cartes
- Overpass API pour trouver les points d'intérêt (mosquées)
- API Geolocation du navigateur
- Progressive Web App (PWA) pour l'installation sur mobile

## Optimisations mobiles

- Interface adaptative qui s'ajuste à différentes tailles d'écran
- Gestion des orientations portrait et paysage
- Détection automatique des appareils (Android, iOS)
- Zones tactiles agrandies pour une meilleure expérience utilisateur
- Support de swipe pour naviguer entre la carte et la liste de résultats
- Bannière d'installation personnalisée pour les utilisateurs mobiles
- Bouton d'itinéraire pour une intégration avec les applications de navigation

## Installation

1. Clonez ce dépôt
2. Ouvrez `index.html` dans un navigateur ou utilisez un serveur web local
3. Pour une expérience complète, déployez l'application sur un serveur web avec HTTPS
4. Sur mobile, vous pouvez installer l'application sur votre écran d'accueil

## Utilisation

1. Autorisez l'accès à votre localisation lorsque demandé
2. L'application affichera automatiquement les mosquées à proximité
3. Cliquez sur "Voir" pour centrer la carte sur une mosquée spécifique
4. Utilisez le bouton "Itinéraire" pour obtenir un itinéraire vers la mosquée choisie
5. Utilisez le bouton "Actualiser la position" pour mettre à jour votre position
6. Sur mobile, vous pouvez faire glisser vers le haut/bas pour naviguer entre la carte et la liste

## Personnalisation

L'application inclut plusieurs options d'icônes de mosquées dans les fichiers `alternative-icons.js` et `more-icons.js`. Vous pouvez facilement changer l'icône en remplaçant le code SVG dans le fichier `app.js`.

Pour changer l'icône :

1. Ouvrez `more-icons.js` ou `alternative-icons.js`
2. Choisissez l'icône qui vous convient
3. Copiez le code SVG
4. Dans `app.js`, recherchez les occurrences de l'actuelle icône SVG et remplacez-les

## Déploiement

Vous pouvez déployer cette application sur n'importe quel service d'hébergement gratuit :

- GitHub Pages
- Netlify
- Vercel
- Render

Aucune configuration serveur n'est nécessaire car l'application fonctionne entièrement côté client.

## Remarque

Cette application est 100% gratuite et ne nécessite aucun service payant comme Google Maps API. Elle est compatible avec tous les appareils mobiles modernes.

## Optimisations futures possibles

- Ajout d'un thème sombre
- Choix de la distance de recherche
- Informations sur les horaires de prière
- Ajout de filtres (distance, services disponibles, etc.)
- Possibilité d'ajouter des commentaires et évaluations
- Version multilingue
- Amélioration des performances sur les appareils moins puissants

## Licence

Libre d'utilisation