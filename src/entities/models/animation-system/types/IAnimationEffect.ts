export interface IAnimationEffect {
    start(target: fabric.Object): void;
    update(target: fabric.Object, elapsedTime: number): void;
    isCompleted(): boolean;
}
