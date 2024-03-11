interface IGameObject {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    draw(ctx: CanvasRenderingContext2D): void;
    update(deltaTime?: number, moveDown?: boolean, direction?: number): void;
}
