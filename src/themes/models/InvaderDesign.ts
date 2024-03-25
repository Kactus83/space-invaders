import { IDesign } from '../types/IDesign';

export class InvaderDesign implements IDesign {
    constructor(
        public type: string,
        public svgPath: string,
        public width: number,
        public height: number
    ) {}
}