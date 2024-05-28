import { Theme } from "../models/Theme";
import { DefaultTheme } from "../lib/default-theme/DefaultTheme";
import { AlternativeTheme } from "../lib/alternative-theme/AlternativeTheme";
import { ThemeType } from "../types/ThemeType";

export class ThemeManager {
    private static instance: ThemeManager;
    private themes: Map<ThemeType, Theme> = new Map();
    private currentThemeType: ThemeType;

    private constructor() {
        // Initialiser tous les thèmes disponibles
        this.themes.set(ThemeType.Default, new DefaultTheme());
        this.themes.set(ThemeType.Alternative, new AlternativeTheme());
        // Définir le thème par défaut
        this.currentThemeType = ThemeType.Default;
    }

    public static getInstance(): ThemeManager {
        if (!this.instance) {
            this.instance = new ThemeManager();
        }
        return this.instance;
    }

    public setTheme(themeType: ThemeType): void {
        if (!this.themes.has(themeType)) {
            throw new Error("Theme not found.");
        }
        this.currentThemeType = themeType;
    }

    public getTheme(): Theme {
        return this.themes.get(this.currentThemeType);
    }
    
    // Méthode pour basculer entre les thèmes
    public toggleTheme(): void {
        const nextThemeType = this.currentThemeType === ThemeType.Default ? ThemeType.Alternative : ThemeType.Default;
        this.setTheme(nextThemeType);
    }

    // Méthode pour obtenir le nom du thème actuel
    public getCurrentThemeName(): string {
        return this.currentThemeType === ThemeType.Default ? "Default" : "Alternative";
    }
}
