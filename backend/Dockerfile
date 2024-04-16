# Utilisation d'une image Node.js
FROM node:latest

# Création du répertoire de travail dans le conteneur
WORKDIR /app

# Copie des fichiers package.json et package-lock.json
COPY package*.json ./

# Installation des dépendances
RUN npm install

# Copie du reste des fichiers sources
COPY . .

# Compilation du code TypeScript en JavaScript
RUN npm run build

# Exposition du port (le port que votre application Express écoute)
EXPOSE 3000

# Commande pour démarrer l'application compilée
CMD ["node", "dist/server.js"]
