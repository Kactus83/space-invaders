import { fabric } from 'fabric';

export interface IGameEntity {
    update(deltaTime: number): void;
    fabricObject: fabric.Object; 
}