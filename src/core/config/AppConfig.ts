import { IGlobalConfig } from "./IGlobalConfig";

export class AppConfig implements IGlobalConfig {
    private static instance: AppConfig;

    public readonly canvasWidth: number = 800;
    public readonly canvasHeight: number = 600;
    public readonly player_InitialX: number = 380;
    public readonly player_InitialY: number = 500;
    public readonly experience_PointPerScore: number = 0.1;
    public readonly experience_WinMultiplicator: number = 2;
    public readonly wall_InitialY: number = 490;
    public readonly wall_MaxY: number = 400;
    public readonly wall_Size: number = 8;
    public readonly rushLineLimit: number = 300;
    public readonly rushProbability: number = 0.001;
    public readonly bonusBaseSpeed: number = 25;
    public readonly shiftX_max: number = 50;
    public readonly shiftX_Probability: number = 0.01;

    // Game Settings
    public god_Mode: boolean = false;

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