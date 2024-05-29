import { WaveSetType } from "@game/services/invader-wave/types/WaveSetType";
import { GameSessionStats } from "../experience/models/GameSessionStats";
import { PlayerExperienceData } from "../experience/types/PlayerExperienceData";
import { PlayerProfileData } from "./types/PlayerProfileData";
import { FullPlayerProfile } from "app/core/player/player-profile.types";
import { PlayerInventoryData } from "../inventory/types/PlayerInventoryData";
import { HealthBonusEffect } from "@game/entities/models/health-system/bonus/HealthBonusEffect";
import { HealthBonus } from "@game/entities/models/health-system/bonus/HealthBonus";
import { SpeedBonus } from "@game/entities/models/speed-system/bonus/SpeedBonus";
import { ExperienceBonus } from "@game/entities/models/experience-system/bonus/ExperienceBonus";
import { WeaponBonus } from "@game/entities/models/weapon-system/bonus/WeaponBonus";
import { SpeedBonusEffect } from "@game/entities/models/speed-system/bonus/SpeedBonusEffect";
import { ExperienceBonusEffect } from "@game/entities/models/experience-system/bonus/ExperienceBonusEffect";
import { WeaponBonusEffect } from "@game/entities/models/weapon-system/bonus/WeaponBonusEffect";
import { PlayerSkillsData } from "../skills/types/PlayerSkillsData";
import { SkillsIds } from "@game/entities/models/skill-system/types/SkillsIds";
import { PlayerWallsData } from "../walls/types/PlayerWallsData";
import { PlayerGroundLineData } from "../ground-line/types/PlayerGroundLineData";

export class PlayerDataService {
    private static instance: PlayerDataService;
    private profile: PlayerProfileData | null = null;

    private constructor() {}

    public static getInstance(): PlayerDataService {
        if (!this.instance) {
            this.instance = new PlayerDataService();
        }
        return this.instance;
    }

    public setProfile(profile: PlayerProfileData): void {
        this.profile = profile;
    }

    public getProfile(): PlayerProfileData | null {
        return this.profile;
    }

    public convertBackendProfile(profile: FullPlayerProfile): PlayerProfileData {
        const playerExperienceData: PlayerExperienceData = {
            bestScore: profile.best_score,
            experiencePoints: profile.experience_points,
            total_ExperiencePoints: profile.total_experience_points,
            gameSessions: profile.game_sessions.map(session => GameSessionStats.fromBackendData(session))
        };

        const playerInventoryData: PlayerInventoryData = {
            bonusInventory: profile.bonus_inventory.map(bonus => {
                switch (bonus.type) {
                    case 'Health':
                        return new HealthBonus(bonus.effect as HealthBonusEffect);
                    case 'Speed':
                        return new SpeedBonus(bonus.effect as SpeedBonusEffect);
                    case 'Experience':
                        return new ExperienceBonus(bonus.effect as ExperienceBonusEffect);
                    case 'Weapon':
                        return new WeaponBonus(bonus.effect as WeaponBonusEffect);
                    default:
                        throw new Error(`Unknown bonus type: ${bonus.type}`);
                }
            })
        };

        const playerSkillsData: PlayerSkillsData = {
            skillIds: profile.skills.map(skill => skill.skill_id as SkillsIds),
            activeSkills: profile.skills.filter(skill => skill.is_active).map(skill => skill.skill_id as SkillsIds)
        };

        const playerWallsData: PlayerWallsData = {
            level: profile.walls[0].level // Assuming there's only one walls record
        };

        const playerGroundLineData: PlayerGroundLineData = {
            level: profile.ground_line[0].level // Assuming there's only one ground line record
        };

        return {
            playerName: profile.player_name,
            experience: playerExperienceData,
            inventory: playerInventoryData,
            skills: playerSkillsData,
            walls: playerWallsData,
            groundLine: playerGroundLineData
        };
    }
}
