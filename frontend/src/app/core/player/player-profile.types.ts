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
    walls: PlayerWalls[];
    ground_line: PlayerGroundLine[];
}

export interface GameSession {
    id: number;
    player_profile_id: number;
    wave_set_type: string;
    is_winning_session: boolean;
    score: number;
    invader_kills: any;
    created_at: Date;
    updated_at: Date;
}

export interface BonusInventory {
    id: number;
    player_profile_id: number;
    type: string;
    effect: any;
    activation_timestamp: Date | null;
    state: string;
    remaining_duration: number;
    created_at: Date;
    updated_at: Date;
}

export interface PlayerSkills {
    id: number;
    player_profile_id: number;
    skill_id: string;
    is_active: boolean;
    created_at: Date;
    updated_at: Date;
}

export interface PlayerWalls {
    id: number;
    player_profile_id: number;
    level: number;
    created_at: Date;
    updated_at: Date;
}

export interface PlayerGroundLine {
    id: number;
    player_profile_id: number;
    level: number;
    created_at: Date;
    updated_at: Date;
}
