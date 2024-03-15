import { InvaderDesign } from '../models/InvaderDesign';

export const invaderDesigns: Record<string, InvaderDesign> = {
    "Basic": new InvaderDesign("Basic", "assets/themes/default/invaders/basic.svg", "#342AA4", 40, 40),
    "Advanced": new InvaderDesign("Advanced", "assets/themes/default/invaders/advanced.svg", "#2F0D7D", 50, 50),
    "Elite": new InvaderDesign("Elite", "assets/themes/default/invaders/elite.svg", "#5F0D7D", 60, 60),
    "Boss": new InvaderDesign("Boss", "assets/themes/default/invaders/boss.svg", "#B91AC1", 80, 80),
};