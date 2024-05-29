export interface BonusInventory {
    id: number;
    player_profile_id: number;
    type: string;
    effect: Record<string, any>;
    activation_timestamp: Date | null;
    state: 'available' | 'active' | 'expired';
    remaining_duration: number;
    created_at: Date;
    updated_at: Date;
}