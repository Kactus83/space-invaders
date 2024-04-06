import { IGlobalConfig } from "./IGlobalConfig";

export class AppConfig implements IGlobalConfig {
    private static instance: AppConfig;

    // Canvas settings
    public readonly canvasWidth: number = 800;
    public readonly canvasHeight: number = 600;

    // Player settings
    public readonly player_InitialX: number = 380;
    public readonly player_InitialY: number = 500;

    public readonly experience_PointPerScore: number = 0.1;
    public readonly experience_WinMultiplicator: number = 2;

    // Wall settings
    public readonly wall_InitialY: number = 490;
    public readonly wall_MaxY: number = 400;
    public readonly wall_Size: number = 8;

    // Invaders settings
    public readonly rushLineLimit: number = 280;
    public readonly rushProbability: number = 0.0025;

    // Bonus settings
    public readonly bonusBaseSpeed: number = 25;
    public readonly shiftX_max: number = 50;
    public readonly shiftX_Probability: number = 0.01;

    // Game Settings
    public god_Mode: boolean = false;
    public admin_Name: string = "Flo";
    public dev_Mode: boolean = false;   
    public default_Username: string = "Player";

    // Private constructor to prevent instantiation
    private constructor() {}

    /**
     * Get the singleton instance of the AppConfig class
     * @returns The singleton instance of the AppConfig class
     */
    public static getInstance(): AppConfig {
        if (!this.instance) {
            this.instance = new AppConfig();
        }
        return this.instance;
    }
}