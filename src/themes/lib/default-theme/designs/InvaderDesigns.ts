import { InvaderDesign } from '../../../models/InvaderDesign';

export const invaderDesigns: Record<string, { new: InvaderDesign, damaged: InvaderDesign, critical: InvaderDesign }> = {
    "Light": {
        new: new InvaderDesign("Light", "assets/themes/alternative/invaders/light.svg", 30, 30),
        damaged: new InvaderDesign("Light", "assets/themes/alternative/invaders/light_damaged.svg", 30, 30),
        critical: new InvaderDesign("Light", "assets/themes/alternative/invaders/light_critical.svg", 30, 30),
    },
    "Basic": {
        new: new InvaderDesign("Basic", "assets/themes/alternative/invaders/basic.svg", 40, 40),
        damaged: new InvaderDesign("Basic", "assets/themes/alternative/invaders/basic_damaged.svg", 40, 40),
        critical: new InvaderDesign("Basic", "assets/themes/alternative/invaders/basic_critical.svg", 40, 40),
    },
    "Medium": {
        new: new InvaderDesign("Medium", "assets/themes/alternative/invaders/medium.svg", 40, 40),
        damaged: new InvaderDesign("Medium", "assets/themes/alternative/invaders/medium_damaged.svg", 40, 40),
        critical: new InvaderDesign("Medium", "assets/themes/alternative/invaders/medium_critical.svg", 40, 40),
    },
    "Strong": {
        new: new InvaderDesign("Strong", "assets/themes/alternative/invaders/strong.svg", 60, 60),
        damaged: new InvaderDesign("Strong", "assets/themes/alternative/invaders/strong_damaged.svg", 60, 60),
        critical: new InvaderDesign("Strong", "assets/themes/alternative/invaders/strong_critical.svg", 60, 60),
    },
    "Advanced": {
        new: new InvaderDesign("Advanced", "assets/themes/alternative/invaders/advanced.svg", 50, 50),
        damaged: new InvaderDesign("Advanced", "assets/themes/alternative/invaders/advanced_damaged.svg", 50, 50),
        critical: new InvaderDesign("Advanced", "assets/themes/alternative/invaders/advanced_critical.svg", 50, 50),
    },
    "Heavy": {
        new: new InvaderDesign("Heavy", "assets/themes/alternative/invaders/heavy.svg", 60, 60),
        damaged: new InvaderDesign("Heavy", "assets/themes/alternative/invaders/heavy_damaged.svg", 60, 60),
        critical: new InvaderDesign("Heavy", "assets/themes/alternative/invaders/heavy_critical.svg", 60, 60),
    },
    "Elite": {
        new: new InvaderDesign("Elite", "assets/themes/alternative/invaders/elite.svg", 55, 55),
        damaged: new InvaderDesign("Elite", "assets/themes/alternative/invaders/elite_damaged.svg", 55, 55),
        critical: new InvaderDesign("Elite", "assets/themes/alternative/invaders/elite_critical.svg", 55, 55),
    },
    "Boss": {
        new: new InvaderDesign("Boss", "assets/themes/alternative/invaders/boss.svg", 80, 80),
        damaged: new InvaderDesign("Boss", "assets/themes/alternative/invaders/boss_damaged.svg", 80, 80),
        critical: new InvaderDesign("Boss", "assets/themes/alternative/invaders/boss_critical.svg", 80, 80),
    },
};
