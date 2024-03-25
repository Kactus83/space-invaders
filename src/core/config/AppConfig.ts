import { IGlobalConfig } from "./IGlobalConfig";

export class AppConfig implements IGlobalConfig {
    private static instance: AppConfig;

    public readonly canvasWidth: number = 800;
    public readonly canvasHeight: number = 600;
    public readonly player_InitialX: 400;
    public readonly player_InitialY: 550;

    // Empêche l'instanciation en dehors de la classe
    private constructor() {}

    // Méthode pour obtenir l'instance singleton
    public static getInstance(): AppConfig {
        if (!this.instance) {
            this.instance = new AppConfig();
        }
        return this.instance;
    }
}