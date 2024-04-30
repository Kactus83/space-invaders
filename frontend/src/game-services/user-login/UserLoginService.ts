import ApiService from "../../core/api/ApiService";
import { PlayerProfile } from "../player-profile/PlayerProfile";

export class UserLoginService {
    private static instance: UserLoginService;
    private apiService: ApiService;

    private constructor() {
        this.apiService = ApiService.getInstance();
    }

    public static getInstance(): UserLoginService {
        if (!UserLoginService.instance) {
            UserLoginService.instance = new UserLoginService();
        }
        return UserLoginService.instance;
    }

    async savePlayerName(name: string): Promise<void> {
        try {
            const players = await this.getPlayers();
            if (!players.includes(name)) {
                await this.apiService.post('profiles/addPlayer', { playerName: name });
            }
        } catch (error) {
            console.error('Error saving player name:', error);
            throw error; // Renvoie l'erreur pour gestion ultérieure ou pour affichage dans l'UI
        }
    }

    async getPlayers(): Promise<string[]> {
        try {
            const response = await this.apiService.get('profiles/allPlayers');
            return response.data; // Supposons que le backend renvoie directement un tableau de noms
        } catch (error) {
            console.error('Error retrieving players:', error);
            return []; // Renvoie un tableau vide en cas d'erreur ou gère autrement selon les besoins de l'application
        }
    }

    setActivePlayerName(name: string): void {
        PlayerProfile.getInstance().setPlayerName(name);
    }
}
