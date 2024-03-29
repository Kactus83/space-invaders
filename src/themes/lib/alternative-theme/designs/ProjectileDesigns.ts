import { ProjectileDesign } from '../../../models/ProjectileDesign';

export const projectileDesigns: Record<string, ProjectileDesign> = {
    "None": new ProjectileDesign("None", "no need to have a svg path", 0, 0),
    "Light": new ProjectileDesign("Light", "assets/themes/alternative/projectiles/light.svg", 5, 15),
    "Basic": new ProjectileDesign("Basic", "assets/themes/alternative/projectiles/basic.svg", 5, 20),
    "Medium": new ProjectileDesign("Medium", "assets/themes/alternative/projectiles/medium.svg", 6, 20),
    "Advanced": new ProjectileDesign("Advanced", "assets/themes/alternative/projectiles/advanced.svg", 7, 25),
    "Heavy": new ProjectileDesign("Heavy", "assets/themes/alternative/projectiles/heavy.svg", 7, 25),
    "Ultimate": new ProjectileDesign("Ultimate", "assets/themes/alternative/projectiles/ultimate.svg", 10, 30),
};
