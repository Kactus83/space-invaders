export class PlayerExperience {
    private bestScore: number;
    private experiencePoints: number;

    constructor() {
        this.bestScore = 0;
        this.experiencePoints = 0;
    }

    getBestScore(): number {
        return this.bestScore;
    }

    getExperiencePoints(): number {
        return this.experiencePoints;
    }

    updateBestScore(score: number): void {
        if (score > this.bestScore) {
            this.bestScore = score;
        }
    }

    addExperiencePoints(points: number): void {
        this.experiencePoints += points;
    }

    // Vous pouvez ajouter ici des méthodes pour gérer les compétences, les niveaux, etc.
}
