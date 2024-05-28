# Utilisez une image Node.js comme base
FROM node:16

# Définir le répertoire de travail
WORKDIR /usr/src/app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances du projet
RUN npm install

# Copier les sources du projet
COPY . .

# Compiler le projet TypeScript
RUN npm run build

# Exposer le port sur lequel le microservice s'exécutera
EXPOSE 3001

# Définir la commande pour démarrer l'application
CMD ["node", "dist/index.js"]
