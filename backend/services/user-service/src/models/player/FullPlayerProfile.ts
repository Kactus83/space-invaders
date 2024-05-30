import { BonusInventory } from "./BonusInventory";
import { GameSession } from "./GameSession";
import { PlayerGroundLine } from "./PlayerGroundLine";
import { PlayerSkills } from "./PlayerSkills";
import { PlayerWalls } from "./PlayerWalls";

export interface FullPlayerProfile {
    id: number;
    user_id: number;
    player_name: string;
    best_score: number;
    experience_points: number;
    total_experience_points: number;
    created_at: Date;
    updated_at: Date;
    game_sessions: GameSession[];
    bonus_inventory: BonusInventory[];
    skills: PlayerSkills[];
    walls: PlayerWalls;
    ground_line: PlayerGroundLine;
}