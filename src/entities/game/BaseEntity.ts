import { IGameEntity } from './types/IGameEntity';
import { fabric } from 'fabric';
import { ThemeManager } from '../../themes/ThemeManager';

let entityId = 0;

export abstract class BaseEntity implements IGameEntity {
    id: number;
    public fabricObject: fabric.Object;
    constructor(protected themeManager: ThemeManager, protected x: number, protected y: number) { 
        this.id = ++entityId;
    }

    abstract update(deltaTime: number): void;

    protected abstract loadDesign(): void;
}
