import { InvaderType } from '../../../../entities/invader/InvaderType';
import { InvaderDesign } from '../../../models/InvaderDesign';

export const invaderDesigns: Record<string, { new: InvaderDesign, damaged: InvaderDesign, critical: InvaderDesign }> = {
    "Light": {
        new: new InvaderDesign(InvaderType.Light, "assets/themes/alternative/invaders/light.svg"),
        damaged: new InvaderDesign(InvaderType.Light, "assets/themes/alternative/invaders/light_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Light, "assets/themes/alternative/invaders/light_critical.svg"),
    },
    "Basic": {
        new: new InvaderDesign(InvaderType.Basic, "assets/themes/alternative/invaders/basic.svg"),
        damaged: new InvaderDesign(InvaderType.Basic, "assets/themes/alternative/invaders/basic_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Basic, "assets/themes/alternative/invaders/basic_critical.svg"),
    },
    "Medium": {
        new: new InvaderDesign(InvaderType.Medium, "assets/themes/alternative/invaders/medium.svg"),
        damaged: new InvaderDesign(InvaderType.Medium, "assets/themes/alternative/invaders/medium_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Medium, "assets/themes/alternative/invaders/medium_critical.svg"),
    },
    "Fast": {
        new: new InvaderDesign(InvaderType.Fast, "assets/themes/alternative/invaders/fast.svg"),
        damaged: new InvaderDesign(InvaderType.Fast, "assets/themes/alternative/invaders/fast_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Fast, "assets/themes/alternative/invaders/fast_critical.svg"),
    },
    "Fast_Kamikaze": {
        new: new InvaderDesign(InvaderType.Fast_Kamikaze, "assets/themes/alternative/invaders/fast_kamikaze.svg"),
        damaged: new InvaderDesign(InvaderType.Fast_Kamikaze, "assets/themes/alternative/invaders/fast_kamikaze_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Fast_Kamikaze, "assets/themes/alternative/invaders/fast_kamikaze_critical.svg"),
    },
    "Strong": {
        new: new InvaderDesign(InvaderType.Strong, "assets/themes/alternative/invaders/strong.svg"),
        damaged: new InvaderDesign(InvaderType.Strong, "assets/themes/alternative/invaders/strong_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Strong, "assets/themes/alternative/invaders/strong_critical.svg"),
    },
    "Advanced": {
        new: new InvaderDesign(InvaderType.Advanced, "assets/themes/alternative/invaders/advanced.svg"),
        damaged: new InvaderDesign(InvaderType.Advanced, "assets/themes/alternative/invaders/advanced_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Advanced, "assets/themes/alternative/invaders/advanced_critical.svg"),
    },
    "Heavy": {
        new: new InvaderDesign(InvaderType.Heavy, "assets/themes/alternative/invaders/heavy.svg"),
        damaged: new InvaderDesign(InvaderType.Heavy, "assets/themes/alternative/invaders/heavy_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Heavy, "assets/themes/alternative/invaders/heavy_critical.svg"),
    },
    "Specialized": {
        new: new InvaderDesign(InvaderType.Specialized, "assets/themes/alternative/invaders/specialized.svg"),
        damaged: new InvaderDesign(InvaderType.Specialized, "assets/themes/alternative/invaders/specialized_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Specialized, "assets/themes/alternative/invaders/specialized_critical.svg"),
    },
    "Elite": {
        new: new InvaderDesign(InvaderType.Elite, "assets/themes/alternative/invaders/elite.svg"),
        damaged: new InvaderDesign(InvaderType.Elite, "assets/themes/alternative/invaders/elite_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Elite, "assets/themes/alternative/invaders/elite_critical.svg"),
    },
    "Light_Boss": {
        new: new InvaderDesign(InvaderType.Light_Boss, "assets/themes/alternative/invaders/light_boss.svg"),
        damaged: new InvaderDesign(InvaderType.Light_Boss, "assets/themes/alternative/invaders/light_boss_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Light_Boss, "assets/themes/alternative/invaders/light_boss_critical.svg"),
    },
    "Boss": {
        new: new InvaderDesign(InvaderType.Boss, "assets/themes/alternative/invaders/boss.svg"),
        damaged: new InvaderDesign(InvaderType.Boss, "assets/themes/alternative/invaders/boss_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Boss, "assets/themes/alternative/invaders/boss_critical.svg"),
    },
    "Heavy_Boss": {
        new: new InvaderDesign(InvaderType.Heavy_Boss, "assets/themes/alternative/invaders/heavy_boss.svg"),
        damaged: new InvaderDesign(InvaderType.Heavy_Boss, "assets/themes/alternative/invaders/heavy_boss_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Heavy_Boss, "assets/themes/alternative/invaders/heavy_boss_critical.svg"),
    },
};
