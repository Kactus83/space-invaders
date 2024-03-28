import { AppConfig } from '../../../../core/config/AppConfig';
import { WallType } from '../../../../entities/wall/WallType';
import { WallDesign } from '../../../models/WallDesign';

const wallSize = AppConfig.getInstance().wall_Size;

export const wallDesigns: Record<WallType, WallDesign> = {
    [WallType.None]: new WallDesign("None", "no design needed", wallSize, wallSize),
    [WallType.Light]: new WallDesign("Damaged", "assets/themes/default/walls/damaged.svg", wallSize, wallSize),
    [WallType.Basic]: new WallDesign("Basic", "assets/themes/default/walls/basic.svg", wallSize, wallSize),
    [WallType.Strong]: new WallDesign("Strong", "assets/themes/default/walls/strong.svg", wallSize, wallSize),
    [WallType.Invincible]: new WallDesign("Invincible", "assets/themes/default/walls/invincible.svg", wallSize, wallSize),
    [WallType.Reflective]: new WallDesign("Reflective", "assets/themes/default/walls/reflective.svg", wallSize, wallSize),
};
