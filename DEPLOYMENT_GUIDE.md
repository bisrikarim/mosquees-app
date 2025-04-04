# Guide de déploiement de l'application Mosquées

Ce guide explique comment déployer l'application Mosquées sur GitHub Pages pour la rendre accessible à tous les utilisateurs.

## Structure des fichiers multilingues

L'application est désormais configurée avec une structure multilingue :

- `index.html` - Page d'accueil avec sélecteur de langue
- `index_fr.html` - Version française de l'application
- `index_ar.html` - Version arabe de l'application
- `app.js` - Code JavaScript pour la version française
- `app_ar.js` - Code JavaScript pour la version arabe
- `manifest.json` - Manifeste PWA principal
- `manifest_ar.json` - Manifeste PWA pour la version arabe

## Étapes de déploiement sur GitHub Pages

### 1. Créer un compte GitHub

Si vous n'avez pas encore de compte GitHub, créez-en un sur [github.com](https://github.com).

### 2. Créer un nouveau dépôt

1. Connectez-vous à votre compte GitHub
2. Cliquez sur le bouton "+" en haut à droite, puis "New repository"
3. Nommez votre dépôt (par exemple "mosquees-app")
4. Choisissez "Public" pour la visibilité
5. Cliquez sur "Create repository"

### 3. Initialiser Git et pousser votre code

Ouvrez un terminal/invite de commande et exécutez les commandes suivantes :

```bash
# Naviguez vers le dossier de votre projet
cd chemin/vers/mosquees-app

# Initialisez Git
git init

# Ajoutez tous les fichiers
git add .

# Créez votre premier commit
git commit -m "Version initiale de l'application Mosquées multilingue"

# Liez votre dépôt local au dépôt GitHub
git remote add origin https://github.com/votre-nom-utilisateur/mosquees-app.git

# Poussez votre code sur GitHub
git push -u origin main
```

### 4. Activer GitHub Pages

1. Sur la page GitHub de votre dépôt, cliquez sur "Settings"
2. Dans le menu latéral, cliquez sur "Pages"
3. Dans la section "Source", sélectionnez "main" comme branche
4. Cliquez sur "Save"
5. Après quelques minutes, votre site sera disponible à l'adresse :
   `https://votre-nom-utilisateur.github.io/mosquees-app/`

## Fonctionnement du sélecteur de langue

- La page d'accueil (`index.html`) propose à l'utilisateur de choisir sa langue préférée
- Le choix est enregistré dans le localStorage du navigateur
- Lors des visites ultérieures, l'utilisateur est automatiquement redirigé vers sa langue préférée
- Des boutons de changement de langue sont présents sur chaque version pour basculer facilement entre les langues

## Mise à jour de l'application

Pour mettre à jour votre application après avoir effectué des modifications :

```bash
git add .
git commit -m "Description des modifications"
git push
```

GitHub Pages se mettra automatiquement à jour en quelques minutes.

## Test sur différents appareils

Une fois déployée, testez l'application sur :
- Différents navigateurs (Chrome, Firefox, Safari, Edge)
- Différents appareils (ordinateur de bureau, tablette, smartphone)
- Différentes tailles d'écran
- Différentes orientations (portrait/paysage) sur mobile

## Nom de domaine personnalisé (optionnel)

Si vous souhaitez utiliser un nom de domaine personnalisé :

1. Achetez un nom de domaine auprès d'un registraire (GoDaddy, Namecheap, OVH, etc.)
2. Dans les paramètres GitHub Pages, section "Custom domain", entrez votre nom de domaine
3. Configurez les enregistrements DNS chez votre registraire selon les instructions de GitHub

## Conseils pour l'optimisation SEO

Pour améliorer le référencement de votre application :

1. Assurez-vous que les balises meta description sont précises et pertinentes dans les deux langues
2. Utilisez des attributs hreflang pour indiquer les versions linguistiques alternatives
3. Créez un fichier sitemap.xml listant toutes les pages
4. Utilisez des URL claires et descriptives
5. Assurez-vous que le contenu est accessible aux moteurs de recherche