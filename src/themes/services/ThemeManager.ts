import { Theme } from "../models/Theme";

export class ThemeManager {
    private static instance: ThemeManager;
    private currentTheme: Theme;

    private constructor() {}

    public static getInstance(): ThemeManager {
        if (!this.instance) {
            this.instance = new ThemeManager();
        }
        return this.instance;
    }

    public setTheme(theme: Theme): void {
        this.currentTheme = theme;
    }

    public getTheme(): Theme {
        return this.currentTheme;
    }
}
