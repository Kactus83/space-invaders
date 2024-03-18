import { WallType } from '../../entities/game/wall/WallType';
import { WallDesign } from '../models/WallDesign';

export const wallDesigns: Record<WallType, WallDesign> = {
    [WallType.Damaged]: new WallDesign("Damaged", "assets/themes/default/walls/damaged.svg", "#808080", 10, 10),
    [WallType.Basic]: new WallDesign("Basic", "assets/themes/default/walls/basic.svg", "#7B8D8E", 10, 10),
    [WallType.Strong]: new WallDesign("Strong", "assets/themes/default/walls/strong.svg", "#5D6D7E", 10, 10),
    [WallType.Invincible]: new WallDesign("Invincible", "assets/themes/default/walls/invincible.svg", "#34495E", 10, 10),
};
