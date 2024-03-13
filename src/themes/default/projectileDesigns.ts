import { ProjectileType } from "../../types/ProjectileType";

export const projectileDesigns = {
    [ProjectileType.Basic]: {
        svgPath: 'assets/themes/default/projectiles/basic.svg',
        color: '#FF7467',
        width: 5,
        height: 20, 
    },
    [ProjectileType.Advanced]: {
        svgPath: 'assets/themes/default/projectiles/advanced.svg',
        color: '#FF9019',
        width: 7,
        height: 25, 
    },
    [ProjectileType.Ultimate]: {
        svgPath: 'assets/themes/default/projectiles/ultimate.svg',
        color: '#FFDD02',
        width: 10,
        height: 30, 
    },
};
