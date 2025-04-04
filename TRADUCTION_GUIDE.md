# Guide de traduction de l'application Mosquées en arabe

Ce document explique comment j'ai traduit l'application Mosquées en arabe et comment l'utiliser.

## Fichiers traduits

Les fichiers suivants ont été créés ou modifiés pour la version arabe :

1. `index_ar.html` - Version arabe de la page d'accueil
2. `app_ar.js` - Code JavaScript traduit avec toutes les fonctionnalités
3. `enhanced-popups_ar.js` - Fichier pour les popups en arabe
4. `manifest_ar.json` - Manifeste PWA en arabe
5. `rtl-style.css` - Feuille de style spécifique pour le support de l'écriture de droite à gauche (RTL)
6. `README_AR.md` - Documentation en arabe

## Adaptations pour l'arabe

### Changements RTL (Right-to-Left)

L'arabe s'écrit de droite à gauche, ce qui nécessite plusieurs ajustements :

1. Ajout de `dir="rtl"` et `lang="ar"` à l'élément HTML
2. Création d'une feuille de style spécifique RTL (`rtl-style.css`) qui :
   - Définit `direction: rtl` et `text-align: right`
   - Inverse les marges et les espacements
   - Modifie l'emplacement des boutons et contrôles
   - Ajuste la disposition des éléments flexibles

### Adaptations culturelles

1. Utilisation du terme "المساجد" (Al-Masajid) pour "Mosquées"
2. Adaptation des mesures de distance en utilisant "كم" (km)
3. Maintien des icônes de croissant de lune pour représenter les mosquées

### Polices et typographie

L'application utilise la police Google Fonts 'Cairo', spécialement conçue pour l'arabe et le latin, offrant une excellente lisibilité et une esthétique moderne. Cette police est intégrée via :

1. Une importation dans le fichier HTML (`<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">`)
2. Une application dans la feuille de style RTL avec différentes variantes de poids :
   - Normal (400) pour le texte général
   - Semi-gras (600) pour les boutons et les noms de mosquées
   - Gras (700) pour les titres et en-têtes

## Comment utiliser la version arabe

1. Ouvrez le fichier `index_ar.html` dans votre navigateur
2. Autorisez l'accès à votre localisation quand demandé
3. L'application affichera les mosquées à proximité avec l'interface en arabe
4. Vous pouvez utiliser les boutons "عرض" (Voir) et "الاتجاهات" (Itinéraire) pour interagir avec les résultats

## Déploiement

Pour déployer la version arabe sur un serveur web :

1. Téléchargez tous les fichiers, y compris les fichiers arabes et originaux
2. Placez-les dans le même répertoire sur votre serveur
3. Assurez-vous que le serveur prend en charge les caractères UTF-8

## Passage entre les versions française et arabe

Vous pouvez implémenter un bouton de changement de langue qui redirigerait entre :
- `index.html` pour la version française
- `index_ar.html` pour la version arabe

## Notes techniques

- Le code utilise toujours la même API Overpass pour récupérer les données des mosquées
- Les noms des mosquées seront affichés de préférence en arabe s'ils sont disponibles (`name:ar`), sinon en français
- Les positions des contrôles de la carte (zoom, échelle) ont été inversées pour s'adapter à l'interface RTL

## Améliorations possibles

1. Ajouter d'autres langues (turc, ourdou, etc.)
2. Implémenter un sélecteur de langue dans l'interface
3. Améliorer la prise en charge des caractères non-latins dans les noms des mosquées
4. Ajouter des informations spécifiques aux mosquées (heures de prière, informations sur l'imam, etc.)