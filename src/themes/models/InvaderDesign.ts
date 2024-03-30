import { InvaderType } from "../../entities/invader/InvaderType";
import { InvaderSpecs } from "../../entities/invader/InvaderTypesSpecs";
import { IDesign } from "../types/IDesign";

export class InvaderDesign implements IDesign {
    public width: number;
    public height: number;

    constructor(
        public type: InvaderType, 
        public svgPath: string
    ) {
        // Récupère les dimensions à partir des InvaderSpecs en utilisant le type
        const specs = InvaderSpecs[type];
        this.width = specs.width;
        this.height = specs.height;
    }
}
