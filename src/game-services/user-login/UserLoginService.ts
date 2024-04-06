import { PlayerProfile } from "../player-profile/PlayerProfile";

export class UserLoginService {
    static instance: UserLoginService;

    private constructor() {}

    static getInstance(): UserLoginService {
        if (!UserLoginService.instance) {
            UserLoginService.instance = new UserLoginService();
        }
        return UserLoginService.instance;
    }

    savePlayerName(name: string): void {
        const players = this.getPlayers();
        if (!players.includes(name)) {
            players.push(name);
            localStorage.setItem('players', JSON.stringify(players));
        }
    }

    getPlayers(): string[] {
        const playersJson = localStorage.getItem('players');
        if (playersJson) {
            return JSON.parse(playersJson);
        } else {
            const defaultPlayer = ['player'];
            localStorage.setItem('players', JSON.stringify(defaultPlayer));
            return defaultPlayer;
        }
    }

    setActivePlayerName(name: string): void {
        PlayerProfile.getInstance().setPlayerName(name);
    }
}
