import { PlayerDesign } from '../models/PlayerDesign';

export const playerDesigns: Record<number, PlayerDesign> = {
    1: new PlayerDesign(1, "assets/themes/default/player/level1.svg", "#ffff00", 50, 30),
    2: new PlayerDesign(2, "assets/themes/default/player/level2.svg", "#ffa500", 60, 35),
    3: new PlayerDesign(3, "assets/themes/default/player/level3.svg", "#ff0000", 70, 40),
    4: new PlayerDesign(4, "assets/themes/default/player/level4.svg", "#ff0000", 75, 40),
    5: new PlayerDesign(5, "assets/themes/default/player/level5.svg", "#ff0000", 75, 45),
    6: new PlayerDesign(1, "assets/themes/default/player/level6.svg", "#ffff00", 75, 45),
    7: new PlayerDesign(2, "assets/themes/default/player/level7.svg", "#ffa500", 75, 45),
    8: new PlayerDesign(3, "assets/themes/default/player/level8.svg", "#ff0000", 75, 45),
    9: new PlayerDesign(4, "assets/themes/default/player/level9.svg", "#ff0000", 75, 45),
    10: new PlayerDesign(5, "assets/themes/default/player/level10.svg", "#ff0000", 75, 45),
};