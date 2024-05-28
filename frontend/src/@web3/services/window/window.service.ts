import { Injectable, Inject, InjectionToken } from '@angular/core';
import { WINDOW, ETHEREUM_TOKEN, BINANCE_TOKEN, WEB3_WINDOW_TOKEN } from './window.constants';
import { Web3WindowObject } from './window.types';

@Injectable({
    providedIn: 'root'
})
export class WindowService {
    private windowObject: Web3WindowObject = {};

    /**
     * Constructor
     * Injects the global window object and prepares the windowObject with wallet tokens.
     */
    constructor(@Inject(WINDOW) private window: Window) {
        this.initializeWindowObject();
    }

    /**
     * Initializes the windowObject with wallet tokens.
     */
    private initializeWindowObject(): void {
        this.windowObject.ethereum = this.window.ethereum || null;
        this.windowObject.binanceChain = this.window.BinanceChain || null;
    }

    /**
     * Provides the windowObject containing wallet tokens.
     * @returns The windowObject.
     */
    public getWindowObject(): Web3WindowObject {
        return this.windowObject;
    }

    /**
     * Provides the token of the windowObject.
     * @returns The InjectionToken of the windowObject.
     */
    public getWindowObjectToken(): InjectionToken<Web3WindowObject> {
        return WEB3_WINDOW_TOKEN;
    }

    // Other methods if necessary
}
