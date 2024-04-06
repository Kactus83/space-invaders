export class DataCleanupService {
    /**
     * Supprime toutes les données de jeu, y compris les profils des joueurs et la liste des joueurs.
     */
    static clearAllGameData(): void {
        // Suppression des données de profil pour tous les joueurs
        Object.keys(localStorage).forEach(key => {
            // Vérifie si la clé correspond à un profil de joueur ou à la liste des joueurs
            if (key.startsWith('playerProfile_') || key === 'players') {
                localStorage.removeItem(key);
            }
        });

        console.log("Toutes les données de jeu ont été supprimées.");
    }
}