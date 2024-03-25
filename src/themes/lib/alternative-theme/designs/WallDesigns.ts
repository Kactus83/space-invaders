import { WallType } from '../../../../entities/wall/WallType';
import { WallDesign } from '../../../models/WallDesign';

export const wallDesigns: Record<WallType, WallDesign> = {
    [WallType.None]: new WallDesign("None", "no design needed", 10, 10),
    [WallType.Light]: new WallDesign("Damaged", "assets/themes/default/walls/damaged.svg", 10, 10),
    [WallType.Basic]: new WallDesign("Basic", "assets/themes/default/walls/basic.svg", 10, 10),
    [WallType.Strong]: new WallDesign("Strong", "assets/themes/default/walls/strong.svg", 10, 10),
    [WallType.Invincible]: new WallDesign("Invincible", "assets/themes/default/walls/invincible.svg", 10, 10),
    [WallType.Reflective]: new WallDesign("Reflective", "assets/themes/default/walls/reflective.svg", 10, 10),
};
