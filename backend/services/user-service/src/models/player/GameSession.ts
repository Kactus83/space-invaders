export interface GameSession {
    id: number;
    player_profile_id: number;
    wave_set_type: string;
    is_winning_session: boolean;
    score: number;
    invader_kills: Record<string, number>;
    created_at: Date;
}