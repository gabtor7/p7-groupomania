# Projet Groupomania
Le projet consistait à créer un réseau social pour faciliter les interactions entre collègues de l'entreprise.
Il a été réalisé avec vuejs, pour la partie front, et express + mongodb pour la partie backend.

## Clonage
Cloner le projet dans le dossier de votre choix.
ATTENTION: Il faudra créer un sous-dossier 'images' dans backend, celles-ci étant stockées en local pour le moment 

## Backend
On va commencer par initialiser le backend du projet. Il faudra au préalable avoir créé une base de données avec mongodb, qu'on ira ensuite connecter.
On se rend dans le dossier backend du projet et on initialise npm

```bash
npm init
```
Libre à vous de configurer le package comme vous le souhaitez

### Packages et dependencies
On aura besoin des packages suivants :
- bcrypt
- dotenv
- express
- jsonwebtoken
- mongoose
- mongoose-unique-validator
- multer

### Connexion à la BDD

Pour connecter la BDD et authentifier les utilisateurs, il y aura besoin de créer un fichier appelé ".env", il contiendra le path vers la BDD et le token d'authentification:
```bash
MONGODB_PATH='mongodb+srv://<username>:<password>@<reste_du_path>'
TOKEN_KEY='<clé à définir ou générer>'
```
MongoDB offre la possibilité de connecter la BDD via le path dont on aura besoin.
Il suffit de cliquer sur le bouton "Connecter" à côté du nom de notre BDD puis choisir notre moyen de connexion et copier le path en remplaçant <username> et <password> par ce que l'on a défini en créant la base. 
On peut ensuite lancer le back avec 
```sh
npm run start
```
Si tout se passe bien on obtient un message nous confirmant le succès de la connexion avec MongoDB

## Frontend
On se déplace maintenant dans le dossier frontend du projet

### Vue
On aura besoin vue, vue-router et vite, donc on les installe

```bash
npm install vue vue-router
npm install vite @vitejs/plugin-vue --save-dev

```
Pour pouvoir lancer on aura besoin de créer un fichier de configuration pour vite qu'on appellera vite.config.js, il contiendra le code suivant :
```javascript
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})

```

Si il n'existe pas on ajoute le script suivant dans package.json :```bash "dev": "vite"```

