import { InvaderType } from '../../../../entities/invader/InvaderType';
import { InvaderDesign } from '../../../models/InvaderDesign';

export const invaderDesigns: Record<string, { new: InvaderDesign, damaged: InvaderDesign, critical: InvaderDesign }> = {
    "Light": {
        new: new InvaderDesign(InvaderType.Light, "assets/themes/default/invaders/light.svg"),
        damaged: new InvaderDesign(InvaderType.Light, "assets/themes/default/invaders/light_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Light, "assets/themes/default/invaders/light_critical.svg"),
    },
    "Basic": {
        new: new InvaderDesign(InvaderType.Basic, "assets/themes/default/invaders/basic.svg"),
        damaged: new InvaderDesign(InvaderType.Basic, "assets/themes/default/invaders/basic_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Basic, "assets/themes/default/invaders/basic_critical.svg"),
    },
    "Medium": {
        new: new InvaderDesign(InvaderType.Medium, "assets/themes/default/invaders/medium.svg"),
        damaged: new InvaderDesign(InvaderType.Medium, "assets/themes/default/invaders/medium_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Medium, "assets/themes/default/invaders/medium_critical.svg"),
    },
    "Strong": {
        new: new InvaderDesign(InvaderType.Strong, "assets/themes/default/invaders/strong.svg"),
        damaged: new InvaderDesign(InvaderType.Strong, "assets/themes/default/invaders/strong_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Strong, "assets/themes/default/invaders/strong_critical.svg"),
    },
    "Advanced": {
        new: new InvaderDesign(InvaderType.Advanced, "assets/themes/default/invaders/advanced.svg"),
        damaged: new InvaderDesign(InvaderType.Advanced, "assets/themes/default/invaders/advanced_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Advanced, "assets/themes/default/invaders/advanced_critical.svg"),
    },
    "Heavy": {
        new: new InvaderDesign(InvaderType.Heavy, "assets/themes/default/invaders/heavy.svg"),
        damaged: new InvaderDesign(InvaderType.Heavy, "assets/themes/default/invaders/heavy_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Heavy, "assets/themes/default/invaders/heavy_critical.svg"),
    },
    "Elite": {
        new: new InvaderDesign(InvaderType.Elite, "assets/themes/default/invaders/elite.svg"),
        damaged: new InvaderDesign(InvaderType.Elite, "assets/themes/default/invaders/elite_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Elite, "assets/themes/default/invaders/elite_critical.svg"),
    },
    "Boss": {
        new: new InvaderDesign(InvaderType.Boss, "assets/themes/default/invaders/boss.svg"),
        damaged: new InvaderDesign(InvaderType.Boss, "assets/themes/default/invaders/boss_damaged.svg"),
        critical: new InvaderDesign(InvaderType.Boss, "assets/themes/default/invaders/boss_critical.svg"),
    },
};
