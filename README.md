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

- Séparer le jeu lui meme des modules complémentaires (shop, player profile, etc ..) . Le canvas ne devrait contenir que le jeu lui meme et le reste des modules sera intégré dans un app Angular.

- Intégrer les services du jeu (shop, etc ...) dans le backend de manière a ne plus traiter les données dans le front.