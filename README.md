
# Overview

This repository contains the source code for a modern version of the classic Space Invaders game.

# Technologies

- **Frontend**:
  - **TypeScript**
  - **Webpack**
  - **CSS**
  - **HTML**

- **Backend**:
  - **Node.js**
  - **Express**
  - **TypeScript**
  - **Sequelize**
  - **Docker**

- **Database**:
  - **PostgreSQL**
  - **Docker**

# Quick Start

To launch the project, follow these simple steps:

- Clone the repository:

git clone <repository_url>
cd space-invaders

- Launch the services:

Use Docker Compose to build and start the necessary services for the game

docker-compose up --build


- Access the game:
Once the containers are started, the game will be accessible via a web browser at the address http://localhost:8080.

# Game Commands

- Navigation menu :

Arrow keys: Move through the menus.
Enter: Confirm choices


- In-game controls :

Space bar: Shoot.
Side arrow keys: Move the spaceship left or right.
Vertical arrow keys: Change the selected bonus.
Shift key: Activate the selected bonus.
Keys 0 to 8: Activate special skills available on the right HUD.

# Project Architecture
The project is divided into several main folders:

backend/: Contains the backend server files.
frontend/: Currently contains all the game logic which should soon transition to the backend.
database/: Contains the SQL scripts for the database.

# Contribution
We encourage contributions to the project. If you wish to contribute, please fork the repository, create a branch for your changes, and submit a pull request.

# Future Objectives
Replace the use of local storage with the DB and backend
Separate the game itself from complementary modules (shop, player profile, etc.). The canvas should only contain the game itself and the rest of the modules will be integrated into an Angular app.
Integrate the game's services (shop, etc.) into the backend to no longer handle data on the front end.


----------------------------------------------------------------------------------------------------------


# Présentation

Ce dépôt contient le code source d'une version moderne du jeu classique Space Invaders.

# Technologies

- **Frontend**:
  - **TypeScript**
  - **Webpack**
  - **CSS**
  - **HTML**

- **Backend**:
  - **Node.js**
  - **Express**
  - **TypeScript**
  - **Sequelize**
  - **Docker**

- **Database**:
  - **PostgreSQL**
  - **Docker**

# Démarrage rapide

Pour lancer le projet, suivez ces étapes simples :

- Cloner le dépôt :


git clone <url_du_dépôt>
cd space-invaders


- Lancer les services :

Utilisez Docker Compose pour construire et démarrer les services nécessaires au jeu.

docker-compose up --build

- Accéder au jeu :

Une fois les conteneurs démarrés, le jeu sera accessible via un navigateur web à l'adresse http://localhost:8080.


# Commandes de jeu

- Menu de navigation
Flèches directionnelles : Se déplacer dans les menus.
Enter : Valider les choix


- Contrôles en jeu

Barre d'espace : Tirer.
Flèches latérales : Déplacer le vaisseau à gauche ou à droite.
Flèches verticales : Changer le bonus sélectionné.
Touche Shift : Activer le bonus sélectionné.
Touches 0 à 8 : Activer les compétences spéciales disponibles sur l'HUD droit.


# Architecture du projet
Le projet est divisé en plusieurs dossiers principaux :

backend/ : Contient les fichiers du serveur backend.
frontend/ : Contient actuellement toute la logique du jeu qui devrait bientot basculler dans le backend.
database/ : Contient les scripts SQL pour la base de données.

# Contribution
Nous encourageons la contribution au projet. Si vous souhaitez contribuer, veuillez forker le dépôt, créer une branche pour vos modifications et soumettre une pull request.

# Objectifs futurs

- remplacer l'usage du local storage par la DB et le backend

- Séparer le jeu lui meme des modules complémentaires (shop, player profile, etc ..) . Le canvas ne devrait contenir que le jeu lui meme et le reste des modules sera intégré dans un app Angular.

- Intégrer les services du jeu (shop, etc ...) dans le backend de manière a ne plus traiter les données dans le front.