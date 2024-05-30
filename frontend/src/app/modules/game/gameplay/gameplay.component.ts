import { Component, ElementRef, ViewChild, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { GameEngine } from '@game/GameEngine';
import { fabric } from "fabric";
import { PlayerProfileService } from 'app/core/player/player-profile.service';
import { FullPlayerProfile } from 'app/core/player/player-profile.types';

@Component({
    selector: 'gameplay',
    standalone: true,
    templateUrl: './gameplay.component.html',
    styleUrls: ['./gameplay.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class GameplayComponent implements OnInit, OnDestroy {
    @ViewChild('gameCanvas', { static: true }) gameCanvas: ElementRef<HTMLCanvasElement>;
  
    private canvas: fabric.Canvas;
    private ws: WebSocket;
    private engine: GameEngine;

    constructor(private _playerProfileService: PlayerProfileService) {}

    ngOnInit(): void {
        this.canvas = new fabric.Canvas(this.gameCanvas.nativeElement);
        this.canvas.setWidth(800);
        this.canvas.setHeight(600);

        this.ws = new WebSocket('ws://localhost:3003');
        
        this.ws.onopen = () => {
            console.log('Connected to game engine');
        };

        this.ws.onmessage = async (event) => {
            const gameState = JSON.parse(event.data);
            await this.updateGameState(gameState);
        };

        this.ws.onclose = () => {
            console.log('Disconnected from game engine');
        };

        this._playerProfileService.getPlayerProfile().subscribe((profile: FullPlayerProfile) => {
            console.log('Player profile loaded:', profile);
            this.engine = new GameEngine();
            // Initialize the player profile in the game engine
            this.engine.initializePlayerProfile(profile);
            this.engine.start(this.gameCanvas.nativeElement);
        });
    }

    ngOnDestroy(): void {
        this.ws.close();
    }

    private async updateGameState(gameState: any): Promise<void> {
        this.engine.sync(gameState);
    }
}
