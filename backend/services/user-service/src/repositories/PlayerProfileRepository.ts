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
        console.log('Creating player profile with data:', profile);

        const { user_id, player_name, best_score, experience_points, total_experience_points } = profile;

        const result = await pool.query(
            `INSERT INTO player_profiles (user_id, player_name, best_score, experience_points, total_experience_points) 
             VALUES ($1, $2, $3, $4, $5) 
             RETURNING id, user_id, player_name, best_score, experience_points, total_experience_points, created_at, updated_at`,
            [user_id, player_name, best_score, experience_points, total_experience_points]
        );

        const newProfileId = result.rows[0].id;
        console.log('Created player profile with ID:', newProfileId);

        // Insert default values for related tables from provided profile
        const wallsResult = await pool.query(
            `INSERT INTO player_walls (player_profile_id, level) VALUES ($1, $2) RETURNING *`,
            [newProfileId, profile.walls.length > 0 ? profile.walls[0].level : 1]
        );
        console.log('Inserted default player walls:', wallsResult.rows);

        const groundLineResult = await pool.query(
            `INSERT INTO player_ground_lines (player_profile_id, level) VALUES ($1, $2) RETURNING *`,
            [newProfileId, profile.ground_line.length > 0 ? profile.ground_line[0].level : 1]
        );
        console.log('Inserted default player ground lines:', groundLineResult.rows);

        return {
            ...result.rows[0],
            game_sessions: [],
            bonus_inventory: [],
            skills: [],
            walls: wallsResult.rows,
            ground_line: groundLineResult.rows
        };
    }

    /**
     * Retrieve a player profile by user ID.
     *
     * @param userId The ID of the user.
     * @returns The player profile if found, otherwise null.
     */
    public async getPlayerProfileByUserId(userId: number): Promise<FullPlayerProfile | null> {
        console.log('Retrieving player profile for user ID:', userId);

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

        console.log('Retrieved rows:', result.rows);

        if (result.rows.length > 0) {
            const rows = result.rows;
            const profile: FullPlayerProfile = {
                id: rows[0].id,
                user_id: rows[0].user_id,
                player_name: rows[0].player_name,
                best_score: rows[0].best_score,
                experience_points: rows[0].experience_points,
                total_experience_points: rows[0].total_experience_points,
                created_at: rows[0].created_at,
                updated_at: rows[0].updated_at,
                game_sessions: rows.filter((r: any) => r.gs_id).map((r: any) => ({
                    id: r.gs_id,
                    player_profile_id: r.gs_player_profile_id,
                    wave_set_type: r.gs_wave_set_type,
                    is_winning_session: r.gs_is_winning_session,
                    score: r.gs_score,
                    invader_kills: r.gs_invader_kills,
                    created_at: r.gs_created_at,
                    updated_at: r.gs_updated_at
                })),
                bonus_inventory: rows.filter((r: any) => r.bi_id).map((r: any) => ({
                    id: r.bi_id,
                    player_profile_id: r.bi_player_profile_id,
                    type: r.bi_type,
                    effect: r.bi_effect,
                    activation_timestamp: r.bi_activation_timestamp,
                    state: r.bi_state,
                    remaining_duration: r.bi_remaining_duration,
                    created_at: r.bi_created_at,
                    updated_at: r.bi_updated_at
                })),
                skills: rows.filter((r: any) => r.ps_id).map((r: any) => ({
                    id: r.ps_id,
                    player_profile_id: r.ps_player_profile_id,
                    skill_id: r.ps_skill_id,
                    is_active: r.ps_is_active,
                    created_at: r.ps_created_at,
                    updated_at: r.ps_updated_at
                })),
                walls: rows.filter((r: any) => r.pw_id).map((r: any) => ({
                    id: r.pw_id,
                    player_profile_id: r.pw_player_profile_id,
                    level: r.pw_level,
                    created_at: r.pw_created_at,
                    updated_at: r.pw_updated_at
                })),
                ground_line: rows.filter((r: any) => r.pgl_id).map((r: any) => ({
                    id: r.pgl_id,
                    player_profile_id: r.pgl_player_profile_id,
                    level: r.pgl_level,
                    created_at: r.pgl_created_at,
                    updated_at: r.pgl_updated_at
                }))
            };

            // Ensure arrays are not null
            profile.bonus_inventory = profile.bonus_inventory.length > 0 ? profile.bonus_inventory : [];
            profile.skills = profile.skills.length > 0 ? profile.skills : [];
            profile.game_sessions = profile.game_sessions.length > 0 ? profile.game_sessions : [];
            profile.walls = profile.walls.length > 0 ? profile.walls : [];
            profile.ground_line = profile.ground_line.length > 0 ? profile.ground_line : [];

            console.log('Constructed player profile:', profile);
            return profile;
        }

        return null;
    }
}
