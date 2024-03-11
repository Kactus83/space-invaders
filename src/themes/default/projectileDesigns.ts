import { ProjectileType } from "../../types/ProjectileType";

export const projectileDesigns = {
    [ProjectileType.Basic]: {
        svgPath: 'assets/themes/default/projectiles/basic.svg',
        color: '#FF7467',
    },
    [ProjectileType.Advanced]: {
        svgPath: 'assets/themes/default/projectiles/advanced.svg',
        color: '#FF9019',
    },
    [ProjectileType.Ultimate]: {
        svgPath: 'assets/themes/default/projectiles/ultimate.svg',
        color: '#FFDD02',
    },
};
