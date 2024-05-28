import { ProjectileDesign } from '../../../models/ProjectileDesign';

export const projectileDesigns: Record<string, ProjectileDesign> = {
    "None": new ProjectileDesign("None", "no need to have a svg path", 0, 0),
    "Light": new ProjectileDesign("Light", "assets/themes/default/projectiles/light.svg", 5, 15),
    "Basic": new ProjectileDesign("Basic", "assets/themes/default/projectiles/basic.svg", 5, 20),
    "Medium": new ProjectileDesign("Medium", "assets/themes/default/projectiles/medium.svg", 6, 20),
    "Advanced": new ProjectileDesign("Advanced", "assets/themes/default/projectiles/advanced.svg", 7, 25),
    "Heavy": new ProjectileDesign("Heavy", "assets/themes/default/projectiles/heavy.svg", 7, 25),
    "Ultimate": new ProjectileDesign("Ultimate", "assets/themes/default/projectiles/ultimate.svg", 10, 30),
};
