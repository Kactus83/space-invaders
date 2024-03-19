export const PlayerLevels: Record<string, { scoreThreshold: number; fireRate: number; shield: number }> = {
    '1': { scoreThreshold: 0, fireRate: 1, shield: 0 },
    '2': { scoreThreshold: 100, fireRate: 1.75, shield: 0 },
    '3': { scoreThreshold: 250, fireRate: 2.5, shield: 1 },
};

export const MaxLevel = Object.keys(PlayerLevels).length;
