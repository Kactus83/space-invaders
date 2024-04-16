import { IDesign } from '../types/IDesign';

export class GroundLineDesign implements IDesign {
    constructor(
        public level: number,
        public svgPath: string,
        public width: number,
        public height: number
    ) {}
}