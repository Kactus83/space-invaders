import { IDesign } from '../types/IDesign';

export class PlayerDesign implements IDesign {
    constructor(
        public level: number,
        public svgPath: string,
        public color: string,
        public width: number,
        public height: number
    ) {}
}