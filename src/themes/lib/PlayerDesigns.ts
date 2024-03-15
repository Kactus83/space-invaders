import { PlayerDesign } from '../models/PlayerDesign';

export const playerDesigns: Record<number, PlayerDesign> = {
    1: new PlayerDesign(1, "assets/themes/default/player/level1.svg", "#ffff00", 50, 30),
    2: new PlayerDesign(2, "assets/themes/default/player/level2.svg", "#ffa500", 60, 35),
    3: new PlayerDesign(3, "assets/themes/default/player/level3.svg", "#ff0000", 70, 40),
};