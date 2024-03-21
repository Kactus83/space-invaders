import { ProjectileDesign } from '../models/ProjectileDesign';

export const projectileDesigns: Record<string, ProjectileDesign> = {
    "None": new ProjectileDesign("None", "no need to have a svg math", "#FF7467", 0, 0),
    "Basic": new ProjectileDesign("Basic", "assets/themes/default/projectiles/basic.svg", "#FF7467", 5, 20),
    "Advanced": new ProjectileDesign("Advanced", "assets/themes/default/projectiles/advanced.svg", "#FF9019", 7, 25),
    "Ultimate": new ProjectileDesign("Ultimate", "assets/themes/default/projectiles/ultimate.svg", "#FFDD02", 10, 30),
};