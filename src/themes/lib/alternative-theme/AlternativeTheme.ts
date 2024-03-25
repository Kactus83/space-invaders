import { Theme } from "../../models/Theme";
import { invaderDesigns } from "./designs/InvaderDesigns";
import { playerDesigns } from "./designs/PlayerDesigns";
import { projectileDesigns } from "./designs/ProjectileDesigns";
import { wallDesigns } from "./designs/WallDesigns";

export class AlternativeTheme extends Theme {
    constructor() {
        super(invaderDesigns, playerDesigns, projectileDesigns, wallDesigns);
    }
}
