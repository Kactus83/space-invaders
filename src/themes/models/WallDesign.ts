import { IDesign } from '../types/IDesign';

export class WallDesign implements IDesign {
    constructor(
        public type: string,
        public svgPath: string,
        public color: string,
        public width: number,
        public height: number
    ) {}
}