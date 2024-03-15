import { IGameEntity } from './types/IGameEntity';
import { fabric } from 'fabric';
import { ThemeManager } from '../../themes/ThemeManager';

export abstract class BaseEntity implements IGameEntity {
    public fabricObject: fabric.Object;
    constructor(protected themeManager: ThemeManager, protected x: number, protected y: number) {}

    abstract update(deltaTime: number): void;

    protected abstract loadDesign(): void;
}
