export interface PlayerDesign {
    level: number;
    svgPath: string;
    color: string;
    width: number;
    height: number;
}

export interface InvaderDesign {
    type: string;
    svgPath: string; // Chemin vers le fichier SVG du design des envahisseurs
    color: string;
    width: number;
    height: number;
}

export interface ProjectileDesign {
    type: string;
    svgPath: string; // Chemin vers le fichier SVG du design des projectiles
    color: string;
    width: number;
    height: number;
}