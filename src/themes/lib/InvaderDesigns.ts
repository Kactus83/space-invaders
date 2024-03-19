import { InvaderDesign } from '../models/InvaderDesign';

export const invaderDesigns: Record<string, InvaderDesign> = {
    "Light": new InvaderDesign("Light", "assets/themes/default/invaders/light.svg", "#342AA4", 30, 30),
    "Basic": new InvaderDesign("Basic", "assets/themes/default/invaders/basic.svg", "#342AA4", 40, 40),
    "Advanced": new InvaderDesign("Advanced", "assets/themes/default/invaders/advanced.svg", "#2F0D7D", 50, 50),
    "Strong": new InvaderDesign("Strong", "assets/themes/default/invaders/strong.svg", "#342AA4", 60, 60),
    "Elite": new InvaderDesign("Elite", "assets/themes/default/invaders/elite.svg", "#5F0D7D", 55, 55),
    "Boss": new InvaderDesign("Boss", "assets/themes/default/invaders/boss.svg", "#B91AC1", 80, 80),
};