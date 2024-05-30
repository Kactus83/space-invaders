import { GroundLineLevels } from "../../../entities/ground-line/GroundLineLevels";
import { PlayerProfile } from "../PlayerProfile";
import { PlayerDataService } from "../datas/PlayerDataService";

export class PlayerGroundLine {
    private level: number = 1; // Niveau initial par défaut
    private playerProfile: PlayerProfile;

    constructor(playerProfile: PlayerProfile) {
        this.playerProfile = playerProfile;
        this.restoreFromData();
    }

    getLevel(): number {
        return this.level;
    }

    setLevel(newLevel: number): void {
        if (GroundLineLevels[newLevel]) {
            this.level = newLevel;
        }
    }

    upgradeLevel(): boolean {
        const nextLevel = this.level + 1;
        if (GroundLineLevels[nextLevel] && this.playerProfile.getExperience().getExperiencePoints() >= GroundLineLevels[nextLevel].experience_Cost) {
            this.playerProfile.getExperience().subtractExperiencePoints(GroundLineLevels[nextLevel].experience_Cost);
            this.setLevel(nextLevel);
            return true;
        }
        return false;
    }

    restoreFromData(): void {
        const data = PlayerDataService.getInstance().getProfile();
        if (data && data.groundLine && data.groundLine.level) {
            this.setLevel(data.groundLine.level);
        }
    }
}
