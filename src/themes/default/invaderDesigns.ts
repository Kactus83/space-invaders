import { InvaderType } from "../../types/InvaderType";

export const invaderDesigns = {
    [InvaderType.Basic]: {
        svgPath: 'assets/themes/default/invaders/basic.svg',
        color: '#342AA4',
    },
    [InvaderType.Advanced]: {
        svgPath: 'assets/themes/default/invaders/advanced.svg',
        color: '#2F0D7D',
    },
    [InvaderType.Elite]: {
        svgPath: 'assets/themes/default/invaders/elite.svg',
        color: '#5F0D7D',
    },
    [InvaderType.Boss]: {
        svgPath: 'assets/themes/default/invaders/boss.svg',
        color: '#B91AC1',
    },
};
