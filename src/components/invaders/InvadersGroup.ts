import { ITheme } from '../../themes/ITheme';
import { InvaderType } from '../../types/InvaderType';
import { Invader } from './Invader';
import { InvaderTypesAttributes } from './InvaderAttributes';

export class InvadersGroup {
    public invaders: Invader[] = [];
    private direction = 1;
    private speed = 1;
    private downStep = 10;

    constructor(private ctx: CanvasRenderingContext2D, private rows: number, private columns: number, private invaderSpacing: number, private theme: ITheme) {
        this.initialize();
    }

    private initialize() {
        for (let row = 0; row < this.rows; row++) {
            for (let column = 0; column < this.columns; column++) {
                const x = column * this.invaderSpacing + 100;
                const y = row * this.invaderSpacing + 50;
                const type = this.determineInvaderType(row, column); 
                this.invaders.push(new Invader(x, y, type, this.theme));
            }
        }
    }

    update() {
        let reachEdge = false;

        // Vérifier si les envahisseurs atteignent le bord
        this.invaders.forEach(invader => {
            if (invader.x <= 0 || invader.x >= this.ctx.canvas.width - 40) {
                reachEdge = true;
            }
        });

        if (reachEdge) {
            this.direction *= -1;
            this.invaders.forEach(invader => {
                invader.y += this.downStep;
            });
        }

        this.invaders.forEach(invader => {
            invader.x += this.speed * this.direction;
        });
        
        this.invaders = this.invaders.filter(invader => !invader.getDestroyed());
    }

    private determineInvaderType(row: number, column: number): InvaderType {
        // Logique simplifiée pour l'exemple. À enrichir pour varier les types.
        if (row === 0) return InvaderType.Elite; // La première rangée d'élites
        if (row === 1) return InvaderType.Advanced; // La seconde rangée d'avancés
        return InvaderType.Basic; // Les autres rangées de base
    }

    draw() {
        this.invaders.forEach(invader => invader.draw(this.ctx));
    }
}
