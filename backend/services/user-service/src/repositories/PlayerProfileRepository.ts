import { pool } from '../config/database';
import { FullPlayerProfile } from '../models/player/FullPlayerProfile';

export default class PlayerProfileRepository {

    /**
     * Create a new player profile in the database.
     *
     * @param profile Data for the new player profile.
     * @returns The created player profile.
     */
    public async createPlayerProfile(profile: FullPlayerProfile): Promise<FullPlayerProfile> {
        const { user_id, player_name, best_score, experience_points, total_experience_points } = profile;

        const result = await pool.query(
            `INSERT INTO player_profiles (user_id, player_name, best_score, experience_points, total_experience_points) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING id, user_id, player_name, best_score, experience_points, total_experience_points, created_at, updated_at`,
            [user_id, player_name, best_score, experience_points, total_experience_points]
        );
        return result.rows[0];
    }

    /**
     * Retrieve a player profile by user ID.
     *
     * @param userId The ID of the user.
     * @returns The player profile if found, otherwise null.
     */
    public async getPlayerProfileByUserId(userId: number): Promise<FullPlayerProfile | null> {
        const result = await pool.query(
            `SELECT pp.*, gs.*, bi.*, ps.*, pw.*, pgl.*
            FROM player_profiles pp
            LEFT JOIN game_sessions gs ON pp.id = gs.player_profile_id
            LEFT JOIN bonus_inventory bi ON pp.id = bi.player_profile_id
            LEFT JOIN player_skills ps ON pp.id = ps.player_profile_id
            LEFT JOIN player_walls pw ON pp.id = pw.player_profile_id
            LEFT JOIN player_ground_lines pgl ON pp.id = pgl.player_profile_id
            WHERE pp.user_id = $1`,
            [userId]
        );

        if (result.rows.length > 0) {
            const row = result.rows[0];
            return {
                id: row.id,
                user_id: row.user_id,
                player_name: row.player_name,
                best_score: row.best_score,
                experience_points: row.experience_points,
                total_experience_points: row.total_experience_points,
                created_at: row.created_at,
                updated_at: row.updated_at,
                game_sessions: result.rows.map((r: any) => ({
                    id: r.id,
                    player_profile_id: r.player_profile_id,
                    wave_set_type: r.wave_set_type,
                    is_winning_session: r.is_winning_session,
                    score: r.score,
                    invader_kills: r.invader_kills,
                    created_at: r.created_at,
                    updated_at: r.updated_at
                })),
                bonus_inventory: result.rows.map((r: any) => ({
                    id: r.id,
                    player_profile_id: r.player_profile_id,
                    type: r.type,
                    effect: r.effect,
                    activation_timestamp: r.activation_timestamp,
                    state: r.state,
                    remaining_duration: r.remaining_duration,
                    created_at: r.created_at,
                    updated_at: r.updated_at
                })),
                skills: result.rows.map((r: any) => ({
                    id: r.id,
                    player_profile_id: r.player_profile_id,
                    skill_id: r.skill_id,
                    is_active: r.is_active,
                    created_at: r.created_at,
                    updated_at: r.updated_at
                })),
                walls: result.rows.map((r: any) => ({
                    id: r.id,
                    player_profile_id: r.player_profile_id,
                    level: r.level,
                    created_at: r.created_at,
                    updated_at: r.updated_at
                })),
                ground_line: result.rows.map((r: any) => ({
                    id: r.id,
                    player_profile_id: r.player_profile_id,
                    level: r.level,
                    created_at: r.created_at,
                    updated_at: r.updated_at
                }))
            };
        }

        return null;
    }
}
