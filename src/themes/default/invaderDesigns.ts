import { InvaderType } from "../../types/InvaderType";

export const invaderDesigns = {
    [InvaderType.Basic]: {
        svgPath: 'assets/themes/default/invaders/basic.svg',
        color: '#342AA4',
        width: 40,
        height: 40,
    },
    [InvaderType.Advanced]: {
        svgPath: 'assets/themes/default/invaders/advanced.svg',
        color: '#2F0D7D',
        width: 50,
        height: 50,
    },
    [InvaderType.Elite]: {
        svgPath: 'assets/themes/default/invaders/elite.svg',
        color: '#5F0D7D',
        width: 60,
        height: 60,
    },
    [InvaderType.Boss]: {
        svgPath: 'assets/themes/default/invaders/boss.svg',
        color: '#B91AC1',
        width: 80,
        height: 80,
    },
};
